const API_KEY = "973d76ce558d24fa6a5e07e6f4cae9cc";

const rootEl = document.querySelector("#root");

const select = document.getElementById("selectProvince");

let modal = document.getElementById("myModal");

let span = document.getElementsByClassName("close")[0];

const searchWeatherEl = document.querySelector("inputText");

let modalContent = document.querySelector(".modal-content");

//CHIAMATE API

const getData = async (idsArray) => {
  const idsString = idsArray.join(",");

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/group?id=${idsString}&appid=${API_KEY}`
  );

  const data = await res.json();
  return data;
};

const getWeatherData = async (idsArray) => {
  const weatherDataArray = await getData(idsArray);
  return weatherDataArray;
};
//END CHIAMATE API

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

  temperatureEl.textContent = `${(weatherData.main.temp - 273.15).toFixed(
    1
  )}°c`;

  wrapperEl.addEventListener("click", () => {
    openModal(weatherData);
  });

  wrapperEl.appendChild(iconEl);
  wrapperEl.appendChild(titleEl);
  wrapperEl.appendChild(temperatureEl);
  wrapperEl.appendChild(descriptionEl);

  //SE LA MODALE VIENE APERTA MOSTRA QUESTI ELEMENTI ADDIZIONALI
  if (modal.style.display === "block") {
    const minTempEl = document.createElement("h4");
    const separatorEl = document.createElement("h4");
    const separator2El = document.createElement("h4");
    const separator3El = document.createElement("h4");
    const separator4El = document.createElement("h4");
    const maxTempEl = document.createElement("h4");
    const feelsLikeEl = document.createElement("h4");
    const humidityEl = document.createElement("h4");

    const windEl = document.createElement("h4");

    separatorEl.textContent = "//////////";
    separator2El.textContent = "//////////";
    separator3El.textContent = "//////////";
    separator4El.textContent = "//////////";
    minTempEl.textContent = `Temperatura minima: ${(
      weatherData.main.temp_min - 273.15
    ).toFixed(1)}ºC`;
    maxTempEl.textContent = `Temperatura massima: ${(
      weatherData.main.temp_max - 273.15
    ).toFixed(1)}ºC`;
    feelsLikeEl.textContent = `Temperatura percepita: ${(
      weatherData.main.feels_like - 273.15
    ).toFixed(1)}ºC`;
    humidityEl.textContent = `Umidità: ${weatherData.main.humidity}%`;
    windEl.textContent = `Vento: ${weatherData.wind.speed} m/s`;

    wrapperEl.classList.add("city-modal");

    wrapperEl.appendChild(minTempEl);
    wrapperEl.appendChild(separatorEl);
    wrapperEl.appendChild(maxTempEl);
    wrapperEl.appendChild(separator2El);
    wrapperEl.appendChild(feelsLikeEl);
    wrapperEl.appendChild(separator3El);
    wrapperEl.appendChild(humidityEl);
    wrapperEl.appendChild(separator4El);
    wrapperEl.appendChild(windEl);
  }
  //END ELEMENTI ADDIZIONALI
  return wrapperEl;
};
//END GENERATORE CARTE

//CHIAMATA PER GENERARE DAGLI ID LE CARTE

const generateCards = async () => {
  //array di id per ogni città
  const idsArray = [
    2523920, //palermo
    2525068, //catania
    2525763, //agrigento
    2525448, //caltanissetta
    2524818, //enna
    2524170, //messina
    2523650, //ragusa
    2523083, //siracusa
    2522876, //trapani
    2517115, //Granada solo per fare vedere che funziona con la pioggia
    4575352,//Columbia
  ];

  const weatherDataArray = await getWeatherData(idsArray);

  for (let weatherData of weatherDataArray.list) {
    rootEl.appendChild(cityGen(weatherData));
  }
};

generateCards();

//Filtro
select.addEventListener("change", (evt) => {
  let id = evt.target.value;
  if (id === "") {
    generateCards();
  } else {
    getWeatherData([id]).then((weatherDataArray) => {
      rootEl.textContent = "";
      let card = cityGen(weatherDataArray.list[0]);
      card.classList.add("single-city");

      rootEl.appendChild(card);
    });
  }
});
//END FILTRO

//MODALE CHE SE CLICCATA UNA CARTA SI APRE
let openModal = (weatherData) => {
  modal.style.display = "block";
  let modalContent = document.querySelector(".modal-content");

  modalContent.appendChild(cityGen(weatherData));
  setBack(weatherData);
};
//
//
//CHIUDE E RESETTA IL CONTENUTO DELLA MODALE
let closeModal = () => {
  modal.style.display = "none";
  let modalContent = document.querySelector(".modal-content");
  let card = modalContent.querySelector(".city-modal");
  modalContent.removeChild(card);
  console.log("hi");
};

span.onclick = () => {
  closeModal();
};
//END CHIAMATE ALLA MODALE

//INIZIO SETTING IMMAGINE BACKGROUND MODALE

const setBack = (weatherData) => {
  let weather = weatherData.weather[0].main.toLowerCase();

  if (weather.includes("clear")) {
    modalContent.style.background =
      "url('./images/sunny-weather.jpg') no-repeat top / cover";
    console.log("hi");
  } else if (weather.includes("cloud")) {
    modalContent.style.background =
      "url('./images/cloudy-weather.jpg') no-repeat center center / cover";
  } else if (weather.includes("rain")) {
    modalContent.style.background =
      "url('./images/rainy-weather.jpg') no-repeat center center / cover";
  } else if (weather.includes("snow")) {
    modalContent.style.background =
      "url('./images/snowy-weather.jpg') no-repeat center center / cover";
  } else {
    modalContent.style.background =
      "url('./images/default.jpg') no-repeat center center /cover";
  }
};
//FINE BACKGROUND MODALE
