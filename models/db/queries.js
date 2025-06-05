const pool = require('./pool');

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

module.exports = {
  createVideoGame,
  createBoardGame,
}