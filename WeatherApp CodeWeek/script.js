const API_KEY = "973d76ce558d24fa6a5e07e6f4cae9cc";

const rootEl = document.querySelector("#root");

const select = document.getElementById("selectProvince");

//CHIAMATE API
const getData = async (lon, lat) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lon}&lon=${lat}&appid=${API_KEY}`
  );

  const data = await res.json();
  return data;
};

const getWeatherData = async (coord) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lon}&lon=${coord.lat}&appid=${API_KEY}`
  );

  const data = await res.json();
  return data;
};//END CHIAMATE API

//GENERATORE DELLE CARTE METEO
const cityGen = (weatherData) => {
  const wrapperEl = document.createElement("div");
  const temperatureEl = document.createElement("h1");

  const descriptionEl = document.createElement("h2");
  const titleEl = document.createElement("h3");

  const iconEl = document.createElement("img");

  wrapperEl.className = "city";
  temperatureEl.className = "temp";
  titleEl.className = "title";
  descriptionEl.className = "description";
  iconEl.className = "icon";

  let icon = weatherData.weather[0].icon;

  let iconUrl = "http://openweathermap.org/img/w/" + icon + ".png";

  iconEl.setAttribute("src", iconUrl);

  titleEl.textContent = weatherData.name;

  descriptionEl.textContent = weatherData.weather[0].description;

  temperatureEl.textContent = (weatherData.main.temp - 273.15).toFixed(1);

  wrapperEl.appendChild(titleEl);
  wrapperEl.appendChild(temperatureEl);
  wrapperEl.appendChild(descriptionEl);
  wrapperEl.appendChild(iconEl);
  return wrapperEl;
};
//END GENERATORE CARTE

//CHIAMATA PER GENERARE DALLE CORDINATE LE CARTE
const palermo = async () => {
  const data = await getData(13.5833, 37.8167);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};

const catania = async () => {
  const data = await getData(15.0872, 37.5021);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};

const agrigento = async () => {
  const data = await getData(13.5, 37.45);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};

const caltanissetta = async () => {
  const data = await getData(14.0642, 37.3745);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};

const enna = async () => {
  const data = await getData(14.2892, 37.5588);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};

const messina = async () => {
  const data = await getData(15.5497, 38.1933);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};

const ragusa = async () => {
  const data = await getData(14.6, 36.9167);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};

const siracusa = async () => {
  const data = await getData(15.2792, 37.0881);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};

const trapani = async () => {
  const data = await getData(12.6667, 37.8333);
  const weatherData = await getWeatherData(data.coord);
  rootEl.appendChild(cityGen(weatherData));
};


palermo();
catania();
agrigento();
caltanissetta();
enna();
messina();
ragusa();
siracusa();
trapani();
//END

//FITRO
select.addEventListener("change", () => {
  let value = select.value;
  palermo.style.display = "none";
  catania.style.display = "none";
  agrigento.style.display = "none";
  caltanissetta.style.display = "none";
  enna.style.display = "none";
  messina.style.display = "none";
  ragusa.style.display = "none";
  siracusa.style.display = "none";
  trapani.style.display = "none";

  if (value === "Palermo") {
    palermo.style = "block";
  } else if (value === "Catania") {
    catania.style.display = "block";
  } else if (value === "Agrigento") {
    agrigento.style.display = "block";
  } else if (value === "Caltanissetta") {
    caltanissetta.style.display = "block";
  } else if (value === "Enna") {
    enna.style.display = "block";
  } else if (value === "Messina") {
    messina.style.display = "block";
  } else if (value === "Ragusa") {
    ragusa.style.display = "block";
  } else if (value === "Siracusa") {
    siracusa.style.display = "block";
  } else if (value === "Trapani") {
    trapani.style.display = "block";
  }
});
