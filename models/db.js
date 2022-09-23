import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

let connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  }); // Recreate the connection, since
  // the old one cannot be reused.

  connection.connect(function (err) {
    // The server is either down
    if (err) {
      // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    } // to avoid a hot loop, and to allow our node script to
  }); // process asynchronous requests in the meantime.
  // If you're also serving http, display a 503 error.
  connection.on('error', function (err) {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      // Connection to the MySQL server is usually
      handleDisconnect(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      throw err; // server variable configures this)
    }
  });
}

handleDisconnect();

const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.isBlock = user.isBlock;
  this.id = user.id;
};

User.create = (newUser, result) => {
  connection.query('INSERT INTO users SET ?', newUser, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created user: ', { newUser });
    result(null, { newUser });
  });
};

User.findById = (userId, result) => {
  connection.query(`SELECT * FROM users WHERE id = ? `, userId, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log('found user: ', res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the id
    result({ kind: 'not_found' }, null);
  });
};

User.getAll = (result) => {
  connection.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('users: ', res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  connection.query(
    'UPDATE users SET username = ?, password = ?, isBlock = ? WHERE id = ?',
    [user.username, user.password, user.isBlock, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found user with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated user: ', { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  connection.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found user with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted user with id: ', id);
    result(null, res);
  });
};

User.removeAll = (result) => {
  connection.query('DELETE FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

export default User;

// Create a connection to the database
// const connection = mysql.createConnection({
// host: process.env.HOST,
// user: process.env.USER,
// password: process.env.PASSWORD,
// database: process.env.DATABASE,
// });

// // open the MySQL connection
// connection.connect((error) => {
//   if (error) throw error;
//   console.log('Successfully connected to the database.');
// });

// connection.end(() => {
//   console.log('Connection end');
// });

// export default connection;
