const pool = require('./pool');

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
  const SQL = `
  TRUNCATE categories, video_games, board_games, items
  RESTART IDENTITY CASCADE;
  `
  await pool.query(SQL);
}

async function createItem(values) {
  const SQL = `
  INSERT INTO items(name, categories_id)
  VALUES ($1, $2);
  `
  await pool.query(SQL, values);
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
  SELECT items.name FROM categories
  JOIN items ON categories.id = items.categories_id
  WHERE categories.id = $1;
  `
  const { rows } = await pool.query(SQL, categoryId);
  return rows;
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
}