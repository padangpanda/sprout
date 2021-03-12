const bcrypt = require('bcryptjs');

function hashPassword(pass) {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(pass, salt);
}

function comparePassword(password, hashedPass) {
    return bcrypt.compareSync(password, hashedPass)
}

module.exports = {
    hashPassword,
    comparePassword
}