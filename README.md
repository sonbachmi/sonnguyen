# Solutions to Technical Challenges
Made by Son Nguyen <sonnhjamy@gmail.com> for 99 Tech

## Overview
This repos contains all my solutions to the 3 problems for Backend Developer role, including code and documentation.

## Getting Started
All source code is in the `/src` folder. Need to install dependencies first (Best use Node 20+).

~~~ bash
npm install
~~~

TypeScript code has been set up to run instantly so no need to compile first.

## Problem 4 (Sum to N)

Check `/src/sum.ts` for source code with self-descriptive comments.
Unit tests in `/src/sum.test.ts` can be run by Node native test runner:

~~~ bash
npm run test:sum
~~~

## Problem 5 (CRUD Server)
Source code (single route Express application connecting to data store) is in `/src/server.ts`. 
To review, run local server:

~~~ bash
npm run server
~~~

The server runs at https://localhost:3000, but you don't need to test it manually.
Just review the API by checking the live OpenAPI documentation at:
https://localhost:3000/apidocs

Using that UI you can read the documentation of all API endpoints and can execute right on the spot.

The application implements a simple Todo CRUD, with all features done as required:
- Data stored in SQLite database file (using Sequelize as ORM). It is initially empty, just need to use API to create some item if you want to test, but it's very easy :)
- RESTful API with basic data validation and error handling (no authentication)
- Resource listing with filter using `AND` op of all attributes (using case-sensitive `LIKE` for simplicity). Also no limit, paging, etc.
- Resource operations with proper return code for core functions

## Problem 6 (Architecture)
Check all inside the `/architect` folder.
See the documentation in `README.md`. Visual diagram is available as image and high-quality PDF.

## Conclusion
Thanks for reviewing. Please do send me feedback to help me improve my skills.
