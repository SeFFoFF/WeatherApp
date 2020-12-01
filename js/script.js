window.addEventListener('load', () => {
    let lat;  // latitude
    let long; // longitude
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const api = `http://api.weatherstack.com/current?access_key=f6dc20ba08bf16b0cd9137d0c3cfe0d1&query=${lat}, ${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const { temperature, weather_descriptions } = data.current;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = weather_descriptions;

                    const { country, name, region } = data.location;
                    locationTimezone.textContent = country + ' / ' + region;

                    let fahrenheit = temperature * 9 / 5 + 32;

                    setIcons(weather_descriptions, document.querySelector('.icon'));
                
                    degreeSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "°C") {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = Math.floor(fahrenheit);
                        }
                        else {
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.toString().replace(/ /g, "_").toUpperCase();

        skycons.play();

        return skycons.set(iconID, Skycons[currentIcon]);
    }
});