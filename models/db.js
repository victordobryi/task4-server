import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// // Create a connection to the database
// const connection = mysql.createConnection({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// // open the MySQL connection
// connection.connect((error) => {
//   if (error) throw error;
//   console.log('Successfully connected to the database.');
// });

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  }); // Recreate the connection, since

  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

export default connection;
