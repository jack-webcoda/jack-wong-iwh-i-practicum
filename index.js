require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = process.env.PRIVATE_KEY;

app.get('/', async (req, res) => {
    const customObject = 'https://api.hubapi.com/crm/v3/objects/airlines?properties=airline_name,airline_code,country,website';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const response = await axios.get(customObject, { headers });
        const data = response.data.results;
        console.log(data);
        res.render('index', { title: 'Airlines Data', data });
    } catch (error) {
        console.error(error);
    }
});

app.get('/update-cobj', async (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/update-cobj', async (req, res) => {
    const update = {
        properties: {
            airline_name: req.body.airline_name,
            airline_code: req.body.airline_code,
            country: req.body.country,
            website: req.body.website
        }
    }
    const endpoint = `https://api.hubapi.com/crm/v3/objects/airlines`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        await axios.post(endpoint, update, { headers } );
        res.redirect('/');
    } catch(err) {
        console.error(err);
    }

});

// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));