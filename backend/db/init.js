import * as pgPromise from 'pg-promise';

// for pgOptions
/* eslint-disable */ // because it's taken from online source, may want to rewrite some time
const camelizeColumns = (data) => {
  const template = data[0];
  for (let prop in template) {
    const camel = pgPromise.utils.camelize(prop);
    if (!(camel in template)) {
      data.map((d) => {
        d[camel] = d[prop];
        delete d[prop];
      });
    }
  }
};

const pgOptions = {
  query: (e) => {
    const cyan = "\x1b[36m%s\x1b[0m";
    console.log(cyan, e.query); // log the query being executed
  },
  receive: (data) => {
    camelizeColumns(data);
  } // https://coderwall.com/p/irklcq
};

const getConnectionString = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return {
        host: 'localhost', // 'localhost' is the default;
        port: 5432, // 5432 is the default;
        database: 'memcode',
        user: 'postgres',
        password: '`1`1`1'
      };
    case 'test':
      return {
        host: 'localhost', // 'localhost' is the default;
        port: 5432, // 5432 is the default;
        database: 'memcode_test',
        user: 'postgres',
        password: '`1`1`1'
      };
    case 'production':
      // this variable is set automatically after we do heroku addons:create heroku-postgresql:hobby-dev
      return process.env.DATABASE_URL;
  }
};

const pgPackage = pgPromise.default(pgOptions);
const db = pgPackage(getConnectionString());
db.connect()
  .then((obj) => {
    obj.done(); // success, release the connection;
  })
  .catch((error) => {
    console.log("ERROR:", error.message || error);
  });

export { db };
