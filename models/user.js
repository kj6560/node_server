const db = require('../db'); 

const User = {
    getAll(callback) {
        db.query('SELECT * FROM users', callback);
    },

    getById(id, callback) {
        db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result[0]);
            }
        });
    },

    create(newUser, callback) {
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                const createdUser = { id: result.insertId, ...newUser };
                callback(null, createdUser);
            }
        });
    },

    update(id, updatedUser, callback) {
        db.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id], (err, result) => {
            if (err) {
                callback(err, null);
            } else if (result.affectedRows === 0) {
                callback(null, null);
            } else {
                const user = { id, ...updatedUser };
                callback(null, user);
            }
        });
    },

    delete(id, callback) {
        db.query('DELETE FROM users WHERE id = ?', [id], callback);
    },
};

module.exports = User;
