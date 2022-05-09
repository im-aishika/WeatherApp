
const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded());

const port = 3000;
const appid = "265ad9801a46a8e5a4f1cb424a1ed4fc";
var city = "Kolkata";

app.get("/", function(req, res){
      res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
  city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?appid=" + appid + "&q=" + city + "&units=metric";

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        const imgUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";

        res.write("<h1>The temperature in " + city + " is " + temp + " degree Celcius</h1>")
        res.write("<p>" + weatherDescription + "</p>");
        res.write("<img src =" + imgUrl + " >");
        res.send();
      })
   })

})




app.listen(port, function() {
  console.log("Server is listening to port " + port);
});
