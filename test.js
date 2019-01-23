const freePort = require('.');
(async () => {
    let port = await freePort(8000)
    console.log('Found free port at: ', port);

})()