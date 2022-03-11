/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
const mysql = require("mysql");
const { MongoClient } = require("mongodb");

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
//For connecting to SQL Server
function queryTestDb(query, config) {
  // creates a new mysql connection using credentials from cypress.json env's
  const connection = mysql.createConnection(config.env.db);
  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}

async function connect(client) {
  await client.connect();
  return client.db("sample_airbnb");
}

// eslint-disable-next-line no-unused-vars
module.exports = async (on, config) => {
  const client = new MongoClient(config.env.mongo);

  on("task", {
    queryDb: (query) => {
      return queryTestDb(query, config);
    },
    async clearListing() {
      try {
        const db = await connect(client);
        const listingsAndReviews = db.collection("listingsAndReviews");
        return await listingsAndReviews.remove({});
      } catch (error) {
        console.error(error);
      } finally {
        await client.close();
      }
    },
    async createList(list) {
      try {
        const db = await connect(client);
        const listingsAndReviews = db.collection("listingsAndReviews");
        return await listingsAndReviews.insertOne(list);
      } catch (error) {
        console.error(error);
      } finally {
        await client.close();
      }
    },
    async getListing() {
      try {
        const db = await connect(client);
        const listingsAndReviews = db.collection("listingsAndReviews");
        return await listingsAndReviews.find({}).limit(50).toArray();
      } catch (error) {
        console.error(error);
      } finally {
        await client.close();
      }
    },
  });

  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
};
