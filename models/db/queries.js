const pool = require('./pool');
const format = require('pg-format');

async function createCategory(values) {
  const SQL = `
  INSERT INTO categories (name, description)
  VALUES($1, $2)
  `
  await pool.query(SQL, values);
}

async function createVideoGame(values) {
  const SQL = `
  INSERT INTO video_games
  (title, platform, genre, developer, publisher,
  price, release_date, cover_image, stock)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
  `
  await pool.query(SQL, values);
}

async function createBoardGame(values) {
  const SQL = `
  INSERT INTO board_games
  (title, genre, designer, publisher,min_players, max_players,
  age_rating, duration, release_year, price, cover_image, stock)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
  `
  await pool.query(SQL, values);
}

async function getAllCategories() {
  const SQL = `
  SELECT * FROM categories;
  `
  const { rows } = await pool.query(SQL);
  return rows;
}

async function resetDatabase() {
  let SQL = `
  SELECT table_name FROM information_schema.tables
  WHERE table_schema = 'public'
  `
  const { rows } = await pool.query(SQL);
  let tables = (rows.map((obj) => obj.table_name)).join(',');
  SQL = `
  TRUNCATE ${tables}
  RESTART IDENTITY CASCADE;
  `
  await pool.query(SQL);
  for (const table of tables.split(',')) {
    if(table !== 'categories' && table !== 'items') {
      SQL = `
      DROP TABLE ${table};
      `
      await pool.query(SQL);
    }
  }
}

async function createItem(categoryId, mappedValues) {
  const name = mappedValues.get('title');
  const categoryValues = [...mappedValues.values()];
  const columns = [...mappedValues.keys()].join(',');
  const category = await getCategory([Number(categoryId)]);
  const placeholders = categoryValues.map((value, index) => {
    return `$${index + 1}`
  })
  let SQL = `
  INSERT INTO ${category.name} (${columns})
  VALUES (${placeholders.join(',')});
  `;
  await pool.query(SQL, categoryValues);

  const itemValues = [name, categoryId]
  SQL = `
  INSERT INTO items (name, categories_id)
  VALUES ($1, $2);
  `
  await pool.query(SQL, itemValues);
}

async function getCategory(id) {
  const SQL = `
  SELECT * FROM categories
  WHERE id = $1;
  `
  const { rows } = await pool.query(SQL, id);
  return rows[0];
}

async function getAllItems(categoryId) {
  const SQL = `
  SELECT items.name, items.id FROM categories
  JOIN items ON categories.id = items.categories_id
  WHERE categories.id = $1;
  `
  const { rows } = await pool.query(SQL, categoryId);
  return rows;
}

async function getItem(id) {
  let SQL = `
    SELECT categories.name FROM categories
    JOIN items
    ON items.categories_id = categories.id
    WHERE items.id = $1
    LIMIT 1;
  `

  const { rows } = await pool.query(SQL, id)
  const tableName = rows[0].name;

  SQL = `
  SELECT * FROM ${tableName}
  JOIN items
  ON items.name = ${tableName}.title
  WHERE items.id = $1;
  `

  const result = await pool.query(SQL, id);
  return result.rows[0];
}

async function updateItem(category, newValue, oldValue) {
  let SQL = `
  UPDATE items SET name = $1
  WHERE name = $2;
  `
  let values = [newValue, oldValue]
  await pool.query(SQL, values);

  SQL = `
  UPDATE ${category} SET title = $1
  WHERE title = $2
  `
  values = [newValue, oldValue]
  await pool.query(SQL, values);
}

async function getCategoryFields(category) {
  const SQL = `
  SELECT column_name, data_type
  FROM information_schema.columns
  WHERE table_name = '${category}';
  `
  const { rows } = await pool.query(SQL)
  return rows;
}

async function deleteItem(itemId, itemName, categoryName) {
  let SQL = `
  DELETE FROM items
  WHERE id = $1;
  `
  await pool.query(SQL, itemId);

  SQL = `
  DELETE FROM ${categoryName}
  WHERE title = '${itemName}';
  `
  await pool.query(SQL);
}

async function createUserCategory(input) {
  let { categoryName, description } = input;
  categoryName = categoryName.toLowerCase()
  await createCategory([categoryName, description]);
  let fields = [];
  const whitelist = [
    'price INTEGER', 'stock INTEGER', 'cover_image TEXT', 'genre TEXT', 'platform TEXT',
    'developer TEXT','designer TEXT', 'publisher TEXT', 'release_date TEXT', 'min_players INTEGER',
    'max_players INTEGER', 'age_rating INTEGER', 'duration INTEGER', 'release_year INTEGER',
  ];
  (Object.values(input)).forEach((field) => {
    if (whitelist.includes(field)) {
      fields.push(field);
    }
  })
  fields = fields.join(',');
  const SQL = format(`
  CREATE TABLE IF NOT EXISTS %I
  (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title TEXT,
  ${fields});
  `, categoryName);
  await pool.query(SQL);
}

async function deleteCategory(id) {
  let categoryId = Number(id);
  const category = await getCategory([categoryId]);
  const tableName = category.name;
  // Drop table
  let SQL = `
  DROP TABLE ${tableName};
  `
  await pool.query(SQL);
  // Delete record in categories
  SQL = `
  DELETE FROM categories
  WHERE id = $1;
  `
  await pool.query(SQL, [categoryId]);
}

async function updateCategory(input) {
  const { categoryName, previousName, categoryDescription } = input;
  let values = [previousName, categoryDescription]
  let SQL = `
  UPDATE categories
  SET description = $2
  WHERE name = $1
  `
  await pool.query(SQL, values);

  SQL = `
  UPDATE categories
  SET name = $1
  WHERE name = $2;
  `
  values = [categoryName, previousName]
  await pool.query(SQL, values);

  SQL = format(`
  ALTER TABLE ${previousName}
  RENAME TO %I;
  `, categoryName);

  await pool.query(SQL);

  if(input.newCol) {
    const { newCol, dataType } = input;
    SQL = format(`
    ALTER TABLE %I
    ADD %s %s;
    `, categoryName, newCol, dataType)
    await pool.query(SQL);
  }
  if(input.delCol) {
    const { delCol } = input;
    SQL = format(`
    ALTER TABLE %I
    DROP COLUMN %s;
    `, categoryName, delCol)
    await pool.query(SQL);
  }
}

module.exports = {
  createCategory,
  createVideoGame,
  createBoardGame,
  getAllCategories,
  createItem,
  resetDatabase,
  getCategory,
  getAllItems,
  getItem,
  updateItem,
  getCategoryFields,
  deleteItem,
  createUserCategory,
  deleteCategory,
  updateCategory,
}