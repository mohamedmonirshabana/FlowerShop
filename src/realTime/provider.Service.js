const DeepstreamClient = require('deepstream.io-client-js');



function init() {

    const options = {
        reconnectIntervalIncrement: 10000,
        maxReconnectInterval: 30000,
        maxReconnectAttempts: Infinity,
        heartbeatInterval: 60000
    };

    const client = new DeepstreamClient('localhost:6020', options);

    client.login((data) => {
        console.log("data", data);
    });

    client.on('connectionStateChanged', connection => {
        if (connection === 'OPEN')
            console.log('\x1b[32m%s\x1b[0m', '[!] Deepsteam Connected: ', connectionUrl);

    });
    client.on('error', err => console.log('Deepsteam Error: ', err));

    client.record.getRecord(`flower/${client.getUid()}`).set({
        
    });


}

function createRecord(providerID, status) {
    const provider_record = client.record.getRecord(`provider/${client.getUid()}`);
    provider_record.set({
        provider: providerID,
        status: status
    });


}

module.exports = init;
