const { Router } = require('express');
const { Show, Band, ShowsBands, Genre } = require('../db/index');

const Shows = Router();

Shows.get('/', (req, res) => {
  console.log(req.query, 'GET');
  res.send('idk man');
});

Shows.post('/', async (req, res) => {
  // get variables from req
  const {
    bandName,
    venue,
    date,
    details,
    genre,
    lat,
    lng,
  } = req.body;
  // get genreId from genre DB
  const genreId = await Genre.findOne({
    where: {
      genreName: genre,
    },
  })
    .then((genreInfo) => genreInfo.dataValues.id);
  // get showId from show DB
  const showId = await Show.findOne({
    where: {
      venue,
      date,
    },
  })
    .then(async (show) => {
      if (show) {
        return show.dataValues.id;
      }
      const newShow = await Show.create({
        venue,
        date,
        details,
        genreId,
        lat,
        lng,
      });
      return newShow.id;
    });
  // get bandId from band DB
  const bandId = await Band.findOne({
    where: {
      bandName,
    },
  })
    .then(async (band) => {
      if (band) {
        return band.dataValues.id;
      }
      const newBand = await Band.create({
        bandName,
        genreId,
      });
      return newBand.id;
    });
  // check if band/show combo already exists
  await ShowsBands.findOne({
    where: {
      bandId,
      showId,
    },
  })
    .then(async (showBand) => {
      // if combo doesnt exist, create it
      if (!showBand) {
        await ShowsBands.create({
          bandId,
          showId,
        });
        console.log('show created');
      } else {
        console.log('show already exists');
      }
    });
});

module.exports = {
  Shows,
};
