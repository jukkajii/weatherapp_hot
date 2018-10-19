import React from 'react';
import ReactDOM from 'react-dom';

const API_URI = process.env.API_URI;

const geoLocOpts = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
};

const getWeatherFromApi = async (coords) => {
  const res = await fetch(`${API_URI}/weather/${coords.latitude}/${coords.longitude}`);

  if (!res.ok) {
    console.log('res', res);
    throw Error(res.statusText);
  }

  return res;
};

const loadWeather = async (coords) => {
  try {
    const apiWeather = await getWeatherFromApi(coords).then((resp) => resp.json());

    return apiWeather ? apiWeather : {};
  } catch (error) {
    console.log(error);
  }

  return {};
};

const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, geoLocOpts);
  });
};

const loadCoordinates = async () => {
  try {
    const coordinates = await getGeoLocation(geoLocOpts);

    return coordinates ? coordinates.coords : {};
  } catch (error) {
    console.log(error);
  }

  return {};
};

class Weather extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      weather: [],
      coords: {},
    };
  }

  async componentDidMount () {
    if ('geolocation' in navigator) {
      console.log('geolocation in navigator is ok. loads weather. ');
      const coords = await loadCoordinates();
      const weather = await loadWeather(coords);

      this.setState({ coords });
      console.log('coords', coords);
      console.log('weather', weather);

      const iconStartIndex = 0;
      const iconEndIndex = -1;

      const weatherItems = weather.map((wm, index) =>
        <li key={ index }>
          <div>
            <span>
              { wm.weather[0].icon && <img height="42" width="42" src={`/img/${wm.weather[0].icon.slice(iconStartIndex, iconEndIndex)}.svg`} /> }
              { wm.weather[0].description },
              temp (F): { wm.main.temp },
              temp (C): { (wm.main.temp - 32) / 1.8 },
              time: { wm.dt_txt }
            </span>
          </div>
        </li>
      );

      this.setState({ weather: weatherItems });
      console.log('weather loaded.');
    }
  }

  render () {
    const { weather, coords } = this.state;

    return (
      <div>
        <h1>Hot weather forecast for lat: { coords.latitude } / lon: { coords.longitude }</h1>
        <div style={{ overflow: 'auto', maxHeight: 500 }}>
          { weather }
        </div>
      </div>
    );
  }

}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
