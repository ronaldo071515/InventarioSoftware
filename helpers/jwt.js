const jwt = require('jsonwebtoken');


const generarToken = (id) => {

    const payload = { id };

    return new Promise((resolve, reject) => {

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {
            if( err ) {
                reject(err)/* Sale mal, no genera Token! */
            } else {
                resolve( token )/* todo sale bien y retorna token */
            }
        });
    });

}

module.exports = {
    generarToken
}