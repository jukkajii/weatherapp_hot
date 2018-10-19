const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
const appId = process.env.APPID || '4051c538d86592896fa88b7153a565e0';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const defaultPort = 9000;
const port = process.env.PORT || defaultPort;
const app = new Koa();

app.use(cors());

const fetchWeather = async (latitude, longitude) => {
  console.log('latitude', latitude);
  console.log('longitude', longitude);
  const weatherUri = `${mapURI}/forecast?lat=${latitude}&lon=${longitude}&appid=${appId}`;
  const response = await fetch(weatherUri);

  return response ? response.json() : {};
};

router.get('/api/weather/:latitude/:longitude', async (ctx) => {
  console.log('latitude', ctx.params.latitude);
  console.log('longitude', ctx.params.longitude);

  const weatherData = await fetchWeather(ctx.params.latitude, ctx.params.longitude);
  console.log('weatherData.list[0] (sample)', weatherData.list[0]);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData ? weatherData.list : {};
});

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(port);
