

const express = require('express');
const router = express.Router();
const WeatherStation = require('../models/WeatherStation');


router.post('/data', async (req, res) => {
  try {
    const { district, temperature, humidity, airPressure } = req.body;
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
    const newWeatherData = new WeatherStation({
      district,
      temperature,
      humidity,
      airPressure,
      latitude,
      longitude
    });
    await newWeatherData.save();
    res.status(201).json(newWeatherData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.get('/data', async (req, res) => {
  try {
    const weatherData = await WeatherStation.find().sort({ timestamp: -1 });
    res.json(weatherData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
