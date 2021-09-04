const request = require("request");

const geocode = (city, callback) => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    city
  )}&limit=5&appid=316bc7b07f11cd34ee51f7ddb3f446fa`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("unable to fetch data from the server", null);
    } else if (res.length === 0) {
      callback("json data is empty", null);
    } else {
      callback(null, {
        name: res.body[0].name,
        latitude: res.body[0].lat,
        logitude: res.body[0].lon,
      });
    }
  });
};

// console.log( geocode('gurgaon' , (err,res)=> {
//     console.log(res);
//     console.log(err)

// })  )

module.exports = { geocode };
