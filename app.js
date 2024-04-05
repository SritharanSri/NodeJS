const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const weatherRoutes = require('./routes/weatherRoutes');
const axios = require('axios'); 
const WeatherStation = require('./models/WeatherStation');
const User = require ('./models/User') 
const authRoutes = require('./routes/authRoutes');


const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.json());


mongoose.connect('mongodb+srv://ssrikalai2255:SriSiva1409@weatherApp.pwvrku6.mongodb.net/weathers?retryWrites=true&w=majority&appName=weatherApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use('/api', weatherRoutes);

app.use('/api/auth', authRoutes);

app.get('/api/weather', async (req, res) => {
    try {
      const lastRecords = await WeatherStation.find().sort({ _id: -1 }).limit(25);
      res.json(lastRecords);
    } catch (error) {
      console.error('Error fetching last records:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


function setCoordinates(district) {
  let latitude, longitude;
  switch (district.toLowerCase()) {
    case 'colombo':
          latitude = 6.9271;
          longitude = 79.8612;
          break;
        case 'gampaha':
          latitude = 7.0873;
          longitude = 79.9883;
          break;
        case 'kalutara':
          latitude = 6.5838;
          longitude = 79.9607;
          break;
        case 'kandy':
          latitude = 7.2906;
          longitude = 80.6337;
          break;
        case 'matale':
          latitude = 7.4675;
          longitude = 80.6234;
          break;
        case 'nuwara eliya':
          latitude = 6.9554;
          longitude = 80.7811;
          break;
        case 'galle':
          latitude = 6.0535;
          longitude = 80.2210;
          break;
        case 'matara':
          latitude = 5.9480;
          longitude = 80.5350;
          break;
        case 'hambantota':
          latitude = 6.1244;
          longitude = 81.1185;
          break;
        case 'jaffna':
          latitude = 9.6615;
          longitude = 80.0255;
          break;
        case 'kilinochchi':
          latitude = 9.3917;
          longitude = 80.4037;
          break;
        case 'mannar':
          latitude = 8.9762;
          longitude = 79.8773;
          break;
        case 'mullaitivu':
          latitude = 9.2674;
          longitude = 80.8065;
          break;
        case 'vavuniya':
          latitude = 8.7480;
          longitude = 80.4980;
          break;
        case 'batticaloa':
          latitude = 7.7102;
          longitude = 81.6924;
          break;
        case 'ampara':
          latitude = 7.2955;
          longitude = 81.6756;
          break;
        case 'trincomalee':
          latitude = 8.5874;
          longitude = 81.2152;
          break;
        case 'kurunegala':
          latitude = 7.4804;
          longitude = 80.3606;
          break;
        case 'puttalam':
          latitude = 8.0341;
          longitude = 79.8437;
          break;
        case 'anuradhapura':
          latitude = 8.3145;
          longitude = 80.4037;
          break;
        case 'polonnaruwa':
          latitude = 7.9403;
          longitude = 81.0188;
          break;
        case 'badulla':
          latitude = 6.9934;
          longitude = 81.0550;
          break;
        case 'monaragala':
          latitude = 6.8848;
          longitude = 81.3420;
          break;
        case 'ratnapura':
          latitude = 6.7050;
          longitude = 80.3840;
          break;
        case 'kegalle':
          latitude = 7.2513;
          longitude = 80.3464;
          break;
    default:
      
      latitude = 0;
      longitude = 0;
      break;
  }
  return { latitude, longitude };
}


function generateWeatherDataForDistrict(district) {
    const temperature = Math.floor(Math.random() * (40 - 10) + 10); 
    const humidity = Math.floor(Math.random() * (100 - 30) + 30); 
    const airPressure = Math.floor(Math.random() * (1100 - 900) + 900); 
    const { latitude, longitude } = setCoordinates(district); 
  
    return {
      district,
      temperature,
      humidity,
      airPressure,
      latitude,
      longitude
    };
  }
  function generateWeatherData() {
    const districts = ['colombo', 'gampaha', 'kalutara','kandy', 'matale', 'nuwara eliya','galle', 'matara', 'hambantota','jaffna', 'kilinochchi', 'mannar','mullaitivu', 'vavuniya', 'batticaloa','ampara', 'trincomalee', 'kurunegala','puttalam', 'anuradhapura', 'polonnaruwa','badulla', 'monaragala', 'ratnapura','kegalle'];
  
    return districts.map(district => generateWeatherDataForDistrict(district));
  }
  
  
  async function sendWeatherData() {
    const weatherDataArray = generateWeatherData();
  
    try {
      await WeatherStation.insertMany(weatherDataArray); 
      console.log('Weather data inserted successfully');
    } catch (error) {
      console.error('Error inserting weather data:', error.message);
    }
  }


  

setInterval(sendWeatherData, 300000); 


process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server stopped');
    process.exit(0);
  });
});
