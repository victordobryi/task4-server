import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

// Create a connection to the database
// const pool = mysql.createPool({
//   host: process.env.HOST,
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

// // Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// // open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log('Successfully connected to the database.');
});

// pool.getConnection((err, connection) => {
//   if (err) throw err;
//   console.log('Database connected successfully');
//   connection.release();
// });

export default connection;
