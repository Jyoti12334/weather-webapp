const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const infoHumidity = document.querySelector('.info_humidity');
const infoWind = document.querySelector('.info_wind');

search.addEventListener('click', () => {
    const APIKey = '0c5c3e36bd2db2d1f86336f2d8a8867a';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '100px';
                error404.classList.add('active');
                container.classList.add('active');
                weatherbox.classList.remove('active');
                weatherdetails.classList.remove('active');
                infoHumidity.classList.remove('active');
                infoWind.classList.remove('active');
                return;
            }

            setTimeout(() => {
                container.classList.remove('active');
                infoHumidity.classList.add('active');
                infoWind.classList.add('active');
            }, 2500);

            container.style.height = '555px';
            error404.classList.remove('active');
            weatherbox.classList.add('active');
            weatherdetails.classList.add('active');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    break;
                case 'Clouds':
                    image.src = 'cloud.png';
                    break;
                case 'Mist':
                    image.src = 'mist.png';
                    break;
                case 'Snow':
                    image.src = 'snow.png';
                    break;
                case 'Haze':
                    image.src = 'mist.png';
                    break;
                default:
                    image.src = 'cloud.png';
                    break;
            }
            temperature.innerHTML = `${parseInt(json.main.temp)}
            <span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}km/h`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
