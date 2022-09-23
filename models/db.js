import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

let connection;

function handleDisconnect() {
  // Create a connection to the database
  connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  });

  // open the MySQL connection
  connection.connect(function (err) {
    if (err) {
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000);
    }
    console.log('Successfully connected to the database.');
  });

  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// connection.connect((error) => {
//   if (error) throw error;
//   console.log('Successfully connected to the database.');
// });

export default connection;
