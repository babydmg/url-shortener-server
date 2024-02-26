const express = require('express');

const dbConnect = require('./dbConnect');
const URLModel = require('./models/URL.model');
require('dotenv').config();

const app = express();

app.use(express.json());

dbConnect();

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

const PORT = 3001 || process.env.PORT;
app.listen(PORT, () => console.log('Server running'));
