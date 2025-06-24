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

const assetsPath = path.join(__dirname, 'public')

app.use((express.urlencoded({extended: true})));
app.use(express.static(assetsPath));
app.use('/', indexRouter);
app.use('/categories', categoriesRouter);
app.use('/items', itemsRouter);
app.use((req, res) => {
  res.render('404', {url: req.originalUrl});
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message)
})

app.listen(PORT, () => {
  console.log(`The app is live on port - ${PORT}`)
});