const cors = require('cors');
const morgan = require('morgan');
const express = require('express');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));

const database = [];

app.get('/cars', (req, res) => {
  res.json(database);
});

app.post('/car', (req, res) => {
  const { image, brand, year, plate, color } = req.body;

  const newCar = {
    image,
    brand,
    year,
    plate,
    color,
  };

  database.push(newCar);

  res.json(newCar);
});

app.listen(3000);
