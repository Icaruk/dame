
const dns = require("dns");



module.exports = function canReachGoogle() {
    return new Promise( resolve => {
        try {
            dns.lookup("google.com", function(err) {
                if (err && err.code === "ENOTFOUND") {
                    resolve(false);
                } else {
                    resolve(true);
                };
            });
        } catch ( err) {
            console.log( err );
            resolve(false);
        };
    });
    
};
