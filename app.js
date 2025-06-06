require('dotenv').config();
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/indexRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const itemsRouter = require('./routes/itemsRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use((express.urlencoded({extended: true})));
app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);

app.listen(PORT, () => {
  console.log(`The app is live on port - ${PORT}`)
});