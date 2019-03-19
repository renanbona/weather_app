window.addEventListener("load", () => {
  let latitude;
  let longitude;
  let temperatureDegree;
  let timeZone = document.querySelector(".location-timezone");
  let temperatureElement = document.querySelector(".temperature-degree");
  let temperatureDescription = document.querySelector(".temperature-description");
  let degreeSpan = document.querySelector(".degree-section span");
  let degreeSection = document.querySelector(".degree-section");

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;

      let proxy = 'https://cors-anywhere.herokuapp.com/';
      let api = `${proxy}https://api.darksky.net/forecast/08c3ba01ebc14416ea7b4303981c0621/${latitude},${longitude}`;

      fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        let { temperature, summary, icon } = data.currently;
        timeZone.textContent = data.timezone;
        temperatureDegree = temperature;
        temperatureElement.textContent = temperature;
        temperatureDescription.textContent = summary;
        setIcon(icon, "icon1");
      })
    });
  }

  function setIcon(icon, iconID) {
    let skycon = new Skycons({"color": "white"});
    let currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycon.play();
    return skycon.set(iconID, Skycons[currentIcon]);
  }

  function convertTemperature() {
    if(degreeSpan.textContent === "F") {
      degreeSpan.textContent = "C";
      let celcius = (temperatureElement.textContent - 32) * 5/9;
      temperatureElement.textContent = Math.floor(celcius);
    } else {
      degreeSpan.textContent = "F";
      temperatureElement.textContent = temperatureDegree; 
    }
  }

  degreeSection.addEventListener("click", convertTemperature);
});