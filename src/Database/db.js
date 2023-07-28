const { Pool } = require('pg');


const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'indigo',
    password: '123',
    port: 8100, 
  });

pool.on('error', (err) => {
    console.error('Error connecting to the database:', err);
  });

pool.on('connect', () => {
console.log('Connected to the database');
});
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client:', err);
    return;
  }

  console.log('Connected to the databasewww');

  // Don't forget to release the client when done with it
  release();
  

});



module.exports = pool