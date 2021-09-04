const path = require("path");
const express = require("express");
const hbs = require("hbs");
const { geocode } = require("./openWeather/getLatitude");
const { forecast } = require("./openWeather/forecast");

const app = express();
const port = Process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);



// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/test", (req, res) => {
  res.send("test ")
});

app.get("/", (req, res) => {
  const responseData = {};
  res.render("index", {
    title: "Weather",
    name: "Pankaj Kumar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Pankaj Kumar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Pankaj Kumar",
  });
});

// weather
//**************************************************************************************************** */
                    //Calling Api 
/***************************************************************************************************** */
app.get("/weather", (req, res) => {
  
  const responseData = [];
  console.log(req.query.address)
  if (!req.query.address) {
    res.json({
      error:
        'You have not entered the input ( Please input the address "query" in url)',
    });
  } else {
    geocode(req.query.address, (geoCodeErr, geoCodeResponse) => {
      if (geoCodeErr) {
        res.send("could not fetch the longitude and latitude");
      } else {
        responseData.push(geoCodeResponse);
        forecast(
          geoCodeResponse.latitude,
          geoCodeResponse.logitude,
          (err, forCastResponse) => {
            if (err) {
              res.send("could not fetch the forecast of location");
            } else {
              responseData.push(forCastResponse);
              //send.json(forCastResponse);
            //es.send(responseData)
              console.log(forCastResponse)
              console.log(responseData)
              res.status(200).json({data: responseData})
            }
          }
        );
      }
    });
    
  }

  //************************************************************************************************** */

  // res.send({
  //     forecast: 'It is snowing',
  //     location: 'Philadelphia'
  // })
});

app.get("/help/*", (req, res) => {
  res.render("404", { 
    title: "404",
    name: "Pankaj Kumar",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pankaj Kumar",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});






