<!--
title: 'AWS Simple HTTP Endpoint example in NodeJS'
description: 'This template demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

## Star Wars API Instructions

This is a small API to return the following information from the Star Wars API:
1. The Starships associated with Luke Skywalker
2. The species classifications in The Phantom Menace
3. The total galactic population

To run the api
1. run `npm install`
2. run `sls offline`
3. Use Postman or Insomnia to hit the following:
- http://localhost:3000/starships
- http://localhost:3000/species
- http://localhost:3000/population