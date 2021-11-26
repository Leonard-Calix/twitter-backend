const jwt = require('jsonwebtoken');

const generateJWT = (id, userName) => {

    return new Promise((resolve, reject) => {
        const payload = { id, userName }

        jwt.sign(payload, 'palabrasecreta', {
            expiresIn: '2h'
        }, (error, token) => {
            
            if (error) {
                reject('No se pudo crear el token');
            }
            resolve(token);
        });
    });

}

module.exports = {
    generateJWT
};