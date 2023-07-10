/* eslint-disable max-len */
/* eslint-disable arrow-parens */
const axios = require('axios');
const chai = require('chai');
const assert = chai.assert;

describe('Test Starships endpoint', () =>{
  it('should fetch Luke Skywalkers starships', async () => {
    const res = await axios.get('http://localhost:3000/starships', {params: {search: 'Luke Skywalker'}});
    assert.equal(res.status, 200);
    const starshipNames = res.data.message.map((starship) => starship.name);
    const pilots = res.data.message.map((starship) => starship.pilots);
    assert.include(starshipNames, 'X-wing');
    assert.include(starshipNames, 'Imperial shuttle');
    assert.include(pilots[0], 'https://swapi.dev/api/people/1/');
    assert.include(pilots[1], 'https://swapi.dev/api/people/1/');
  });
});

describe('Test species endpoint', () =>{
  it('Should return a list of 6 species', async () => {
    const res = await axios.get('http://localhost:3000/species', {params: {search: 'The Phantom Menace'}});
    assert.equal(res.status, 200);
    assert.lengthOf(res.data.message, 6);
    assert.include(res.data.message, 'mammal', 'artificial', 'unknown', 'amphibian', 'mammals', 'reptile');
  }, 50000);
});

describe('Test population endpoint', () =>{
  it('Should a return a calcuation of all the species in the galaxy', async () => {
    const res = await axios.get('http://localhost:3000/population');
    assert.equal(res.status, 200);
    assert.equal(res.data.message, 1711401432500);
  }, 50000);
});

