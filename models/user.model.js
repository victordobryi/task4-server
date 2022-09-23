import sql from './db.js';
import { v4 as uuidv4 } from 'uuid';
import uuid_to_bin from 'mysql';

// constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.isBlock = user.isBlock;
  this.id = user.id;
};

User.create = (newUser, result) => {
  sql.query('INSERT INTO users SET ?', newUser, (err, res) => {
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
  sql.query(`SELECT * FROM users WHERE id = ? `, userId, (err, res) => {
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
  sql.query('SELECT * FROM users', (err, res) => {
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
  sql.query(
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
  sql.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
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
  sql.query('DELETE FROM users', (err, res) => {
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
