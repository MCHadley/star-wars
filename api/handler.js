/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const axios = require('axios');
const {responseHandler, swapi} = require('../util/Utils');

const getStarships = async (event, context) => {
  try {
    const starships = swapi('people');
    const response = await axios.get(starships, {params: {search: 'Luke Skywalker'}});
    const starshipsData = response.data.results[0].starships;
    let starshipsList = [];
    for (const [key, value] of Object.entries(starshipsData)) {
      const res = await axios.get(value);
      starshipsList.push(res.data);
    }
    return responseHandler(200, starshipsList);
  } catch (err) {
    console.error(`An error has occured: ${err}`);
    return responseHandler(400, `There was an error: ${err}`);
  }
};

const getSpecies = async (event, context) => {
  try {
    const episodeOne = swapi('films');
    const response = await axios.get(episodeOne, {params: {search: 'The Phantom Menace'}});
    const species = response.data.results[0].species;
    let speciesSet = new Set();
    for (const [key, value] of Object.entries(species)) {
      const res = await axios.get(value);
      const classification = res.data.classification;
      speciesSet.add(classification);
    }
    const speciesArray = Array.from(speciesSet);
    return responseHandler(200, speciesArray);
  } catch (err) {
    console.error(`An error has occured: ${err}`);
    return responseHandler(400, `There was an error: ${err}`);
  }
};

const getPopulation = async (event, context) => {
  const planets = swapi('planets');
  let page = 1;
  let populationList = [];
  let lastResult = [];
  do {
    try {
      const response = await axios.get(planets, {params: {page: page}});
      const data = await response.data;
      lastResult = data;
      data.results.forEach((planet) => {
        const {population} = planet;
        if (population !== 'unknown') {
          populationList.push(parseInt(population));
        }
      });
      page++;
    } catch (err) {
      console.error(`Something went wrong ${err}`);
    }
  } while (lastResult.next !== null);
  const populationSum = populationList.reduce((partialSum, a) => partialSum + a, 0);
  return responseHandler(200, populationSum);
};


module.exports = {
  getStarships,
  getSpecies,
  getPopulation,
};
