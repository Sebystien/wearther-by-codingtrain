const express=require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

console.log(process.env)

const app = express();

app.listen(1111, ()=>console.log('listen'));
app.use(express.static(__dirname + '/public'));

app.use(express.json({limit: '1mb'}));

const createDatabase = new Datastore('myData.db');
createDatabase.loadDatabase();


app.get('/dbData', (req, resp)=>{
    createDatabase.find({}, (err, response)=>{
        if(err){
            resp.end();
            return;
        }
        resp.json(response)
    });
});



app.post('/clientData', (resq, resp)=>{
    const data = resq.body;
    const timing = Date.now();
    timing.data = timing;
    createDatabase.insert(data);
    resp.json(data);
})

//We set up a proxy and a route parameter
app.get('/api/:llong', async (resq, resp) =>{
    const latlong = resq.params.llong.split(',');
    const lat = latlong[0];
    const long = latlong[1];

    const api_key = process.env.API_KEY;

    const weather_api = await fetch(`https://api.darksky.net/forecast/${api_key}/${lat},${long}`);
    const weather_json = await weather_api.json();

    const air_api= await fetch(`https://api.openaq.org/v1/latest?coordinates=${lat},${long}`);
    const air_json = await air_api.json();
   
    console.log(air_json);
    
    const weatherAndAir = {
        weather: weather_json,
        air: air_json
    }
    resp.json(weatherAndAir);
})