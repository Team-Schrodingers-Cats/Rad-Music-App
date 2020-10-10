/* eslint-disable no-await-in-loop */
const { Router } = require('express');
const { Show, Band, ShowsBands, Genre } = require('../db/index');

const Shows = Router();

Shows.get('/band', async (req, res) => {
  const { query, type } = req.query;
  const resp = { bandInfo: { bandName: query }, bandShows: [] };
  const bandId = await Band.findOne({
    where: resp.bandInfo,
  })
    .then((band) => {
      if (band) {
        resp.bandInfo.genreId = band.dataValues.genreId;
        return band.dataValues.id;
      }
      throw band;
    });
  await ShowsBands.findAll({
    where: {
      bandId,
    },
  })
    .then(async (foundShowsBands) => {
      for (let i = 0; i < foundShowsBands.length; i++) {
        const { showId } = foundShowsBands[i].dataValues;
        const showInfoMaybe = await Show.findOne({
          where: {
            id: showId,
          },
        })
          .then((something) => ({
            date: something.dataValues.date,
            venue: something.dataValues.venue,
            lat: something.dataValues.lat,
            lng: something.dataValues.lng,
            details: something.dataValues.details,
          }));
        resp.bandShows.push(showInfoMaybe);
      }
    });
  res.send(resp);
});

Shows.get('/', async (req, res) => {
  const { query, type } = req.query;
  const resp = { bandInfo: { bandName: query }, bandShows: [] };
  const bandId = await Band.findOne({
    where: resp.bandInfo,
  })
    .then((band) => {
      if (band) {
        resp.bandInfo.genreId = band.dataValues.genreId;
        return band.dataValues.id;
      }
      throw band;
    });
  await ShowsBands.findAll({
    where: {
      bandId,
    },
  })
    .then(async (foundShowsBands) => {
      for (let i = 0; i < foundShowsBands.length; i++) {
        const { showId } = foundShowsBands[i].dataValues;
        const showInfoMaybe = await Show.findOne({
          where: {
            id: showId,
          },
        })
          .then((something) => ({
            date: something.dataValues.date,
            venue: something.dataValues.venue,
            lat: something.dataValues.lat,
            lng: something.dataValues.lng,
            details: something.dataValues.details,
          }));
        resp.bandShows.push(showInfoMaybe);
      }
    });
  res.send(resp);
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
