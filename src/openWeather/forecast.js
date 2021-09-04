const request = require("request");

//   Function to get the forecast with longitude and latitude

const forecast = (lat, lon, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=316bc7b07f11cd34ee51f7ddb3f446fa`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("unable to load the data", null);
    }
    if (res.length === 0) {
      callback("data received is empty", null);
    } else {
      const result = {
        weather: res.body.weather[0].main,
        wind_speed: res.body.wind.speed,
        temp: res.body.main.temp,
        pressure: res.body.main.pressure,
        humidity: res.body.main.humidity,
      };

      callback(null, result);
    }
  });
};

//  forecast( 28.4667, 77.0333,(err,res)=> {
//     console.log(res);

// } )

module.exports = { forecast };
