const bcrypt = require('bcryptjs');

function createUser(username, password, email, callback){
    const cryptoPassword = bcrypt.hashSync(password, 10);
    global.db.collection("users").insert({username, password: cryptoPassword, email}, callback);
}

function resetPassword(email, callback){
    const utils = require('./utils');
    const newPassword = utils.generatePassword();
    const cryptoPassword = bcrypt.hashSync(newPassword, 10);
    global.db.collection("users").updateOne({email: email}, { $set: {password: cryptoPassword }}, (err, res) => {
        callback(err, res, newPassword);
    });
}

module.exports = { createUser, resetPassword }