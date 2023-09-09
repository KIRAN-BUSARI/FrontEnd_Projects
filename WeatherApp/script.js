const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://forecast9.p.rapidapi.com/',
    prams: { city: 'Ballari' },
    headers: {
        'X-RapidAPI-Key': 'ff492a71f1msh4a1d11b47a180e2p162c3ejsn91a017cea9ec',
        'X-RapidAPI-Host': 'forecast9.p.rapidapi.com'
    }
};

try {
    const response = await axios.request(options);
    console.log(response.data);
} catch (error) {
    console.error(error);
}