import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// const pool = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// Create a connection to the database
const connection = mysql.createConnection(process.env.DATABASE_URL);

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

export default connection;
