#! usr/bin/node

// ONLY RUN ONCE FOR INITIAL DATABASE POPULATION

const db = require('./queries');

const videoGames = {
  categoryName: 'video_games',
  description: 'Digital games where player control actions through input devices.',
  platform: 'platform TEXT',
  genre: 'genre TEXT',
  developer: 'developer TEXT',
  publisher: 'publisher TEXT',
  price: 'price INTEGER',
  release_date: 'release_date TEXT',
  cover_image: 'cover_image TEXT',
  stock: 'stock INTEGER',
}
  
const boardGames = {
  categoryName: 'board_games',
  description: 'Digital games where player control actions through input devices.',
  genre: 'genre TEXT',
  designer: 'designer TEXT',
  publisher: 'publisher TEXT',
  min_players: 'min_players INTEGER',
  max_players: 'max_players INTEGER',
  age_rating: 'age_rating INTEGER',
  duration: 'duration INTEGER',
  release_year: 'release_year INTEGER',
  price: 'price INTEGER',
  cover_image: 'cover_image TEXT',
  stock: 'stock INTEGER',
}

const categories = [videoGames, boardGames]

const items = [
  {
    title: 'GTA 5',
    platform: ' PlayStation 4, PlayStation 5, Xbox One, Xbox Series X and Series S, Xbox 360, PlayStation 3, Microsoft Windows',
    genre: 'Open world, Action-adventure game, First-person shooter, Nonlinear gameplay',
    developer: 'Rockstar North',
    publisher: 'Rockstar Games',
    price: 30,
    release_date: '2020',
    cover_image: 'image_url',
    stock: 6
  },
  {
    title: 'FC25',
    platform: 'PlayStation 4, PlayStation 5',
    genre: 'sport',
    developer: 'EA Vancouver and EA Romania',
    publisher: 'Electronic Arts Inc',
    price: 25,
    release_date: '9/20/2024',
    cover_image: 'image_url',
    stock: 3
  },
  {
    title: 'Catan',
    genre: 'Strategy',
    designer: 'Klaus Teuber',
    publisher: 'Kosmos',
    min_players: 3,
    max_players: 4,
    age_rating: 10,
    duration: 90,
    release_year: 1995,
    price: 45,
    cover_image: 'image_url',
    stock: 15
  },
  {
    title: 'Dominion',
    genre: 'Deck building',
    designer: 'Donald X. Vaccarino',
    publisher: 'Rio Grande Games',
    min_players: 2,
    max_players: 4,
    age_rating: 13,
    duration: 30,
    release_year: 2008,
    price: 44,
    cover_image: 'image_url',
    stock: 9
  },
]

async function main(){
  try {
    console.log('Populating database...');
    // Reset Database First
    await db.resetDatabase();

    // Populate categories table
    for (const category of categories) {
      await db.createUserCategory(category)
    }

    // Populate items and corresponding category table
    for (const item of items) {
      const values = new Map(Object.entries(item));
      let categoryId = 1;
      if (item.title === 'Dominion' || item.title === 'Catan') {
        categoryId = 2;
      }
      await db.createItem(categoryId, values);
    }
    
    console.log('Success');
  }
  catch(err) {
    console.log(`Ooops! An error occured: ${err}`)
  }
};

main()