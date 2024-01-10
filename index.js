require('dotenv').config();
const express = require('express');
const URL = require('./models/URL.model');
const dbConnect = require('./dbConnect');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

dbConnect();

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Hello, World',
  });
});

app.post('/new', async (req, res) => {
  const { shortUrl, fullUrl } = req.body;

  const isShortUrlExist = await URL.findOne({ short_url: shortUrl });

  if (isShortUrlExist.short_url === shortUrl) {
    res.status(401).json({ message: 'Short URL Exists. Try Another One' });
  }

  const newURL = new URL({
    full_url: fullUrl,
    short_url: shortUrl,
  });

  await newURL.save();

  res.status(200).json(newURL);
});

app.get('/:redirect', async (req, res) => {
  const { redirect } = req.params;

  const redirectLink = await URL.findOne({ short_url: redirect });

  if (redirectLink.full_url === null) {
    res.status(404).json({
      message: '404 Not Founded',
    });
  }

  res.redirect(redirectLink.full_url);

  res.status(200).json({
    redirectLink,
  });
});

const PORT = 3001 || process.env.PORT;
app.listen(PORT);
