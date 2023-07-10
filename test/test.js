/* eslint-disable max-len */
/* eslint-disable arrow-parens */
const axios = require('axios');
const chai = require('chai');
const assert = chai.assert;

describe('Test Starships endpoint', () => {
  const request = axios.get('http://localhost:3000/starships');
  it('Returns 200', async () => {
    const res = await request;
    assert.equal(res.status, 200);
  });

  it('returns X-wing and Imperial shuttle', async () => {
    const res = await request;
    const starshipNames = res.data.message.map((starship) => starship.name);
    assert.include(starshipNames, 'X-wing');
    assert.include(starshipNames, 'Imperial shuttle');
  });

  it('returns only 2 ships', async () => {
    const res = await request;
    assert.lengthOf(res.data.message, 2);
  });
});

describe('Test species endpoint', () => {
  const request = axios.get('http://localhost:3000/species');
  it('Returns 200', async () => {
    const res = await request;
    assert.equal(res.status, 200);
  }, 50000);

  it('Returns classification includes', async () => {
    const res = await request;
    assert.include(res.data.message, 'mammal', 'artificial', 'unknown', 'amphibian', 'mammals', 'reptile');
  }, 50000);

  it('Returns length is only 6', async () => {
    const res = await request;
    assert.lengthOf(res.data.message, 6);
  }, 50000);
});

describe('Test population endpoint', () =>{
  const request = axios.get('http://localhost:3000/population');

  it('Returns 200', async () => {
    const res = await request;
    assert.equal(res.status, 200);
  }, 50000);

  it('Returns total population equals 1711401432500', async () => {
    const res = await request;
    assert.equal(res.data.message.totalPopulation, 1711401432500);
  });

  it('Returns planet counter equals 60', async () => {
    const res = await request;
    assert.equal(res.data.message.planetTotal, 60);
  });
});
