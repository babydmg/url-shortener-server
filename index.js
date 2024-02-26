const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const URLModel = require('./models/URL.model');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello',
  });
});

app.post('/create/new-url', async (req, res) => {
  const { full_url, short_url } = req.body;

  const newUrl = new URLModel({
    full_url,
    short_url,
  });

  await newUrl.save();

  res.status(200).json({
    data: newUrl,
  });
});

app.get('/:url', async (req, res) => {
  const { url } = req.params;

  const findUrl = await URLModel.findOne({
    short_url: url,
  });

  res.redirect(`${findUrl.full_url}`);

  // res.status(200).json({
  //  data: findUrl.short_url,
  // });
});

const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log('Server running'));
  })
  .catch((err) => console.log(err));
