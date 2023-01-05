"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const reportAcudits = [];
let acudit = "";
const showButtons = () => {
    //show puntuaction buttons
    let negativeButton = document.querySelector(".negativeButton");
    let neutralButton = document.querySelector(".neutralButton");
    let positiveButton = document.querySelector(".positiveButton");
    negativeButton.style.display = "inline";
    neutralButton.style.display = "inline";
    positiveButton.style.display = "inline";
};
const hideButtons = () => {
    // hide puntuaction buttton
    let negativeButton = document.querySelector(".negativeButton");
    let neutralButton = document.querySelector(".neutralButton");
    let positiveButton = document.querySelector(".positiveButton");
    negativeButton.style.display = "none";
    neutralButton.style.display = "none";
    positiveButton.style.display = "none";
};
const getJoke = () => {
    let random1 = Math.floor(Math.random() * 6);
    let random2 = Math.floor(Math.random() * 6);
    let random3 = Math.floor(Math.random() * 6);
    let random4 = Math.floor(Math.random() * 6);
    let blobCentro = document.body;
    let blobSx = document.getElementById("blobSx");
    let blobDx = document.getElementById("blobDx");
    blobCentro.style.backgroundImage = `url(./blob/blob${random1}.svg)`;
    blobSx.style.backgroundImage = `url(./blob/blob${random2}.svg)`;
    blobDx.style.backgroundImage = `url(./blob/blob${random3}.svg)`;
    if (random4 >= 3) {
        // random joke between dad jokes and chuck jokes
        getAcudit();
    }
    else {
        getChuck();
    }
};
const getAcudit = () => __awaiter(void 0, void 0, void 0, function* () {
    // dad jokes
    try {
        let respuesta = yield fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json",
            },
        });
        let datos = yield respuesta.json();
        acudit = datos.joke;
        let acuditHTML = document.getElementById("acudit");
        acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
        showButtons();
    }
    catch (error) {
        console.log(error);
    }
});
const getChuck = () => __awaiter(void 0, void 0, void 0, function* () {
    // chuck norris jokes
    try {
        let respuesta = yield fetch("https://api.chucknorris.io/jokes/random");
        let datos = yield respuesta.json();
        acudit = datos.value;
        let acuditHTML = document.getElementById("acudit");
        acuditHTML.innerHTML = `<cite>"${acudit}"</cite>`;
        showButtons();
    }
    catch (error) {
        console.log(error);
    }
});
const getMeteo = () => __awaiter(void 0, void 0, void 0, function* () {
    let meteoTemp, meteoIcono;
    try {
        const apiKey = "b8bbbf0fe403ed96607907fcfdeb0295"; // please don't steal my API key!
        const apiLang = "es";
        const apiUnit = "metric";
        const apiLatLon = "lat=41.3828939&lon=2.1774322"; // Barcelona latitude & longitude
        const respuesta = yield fetch(`https://api.openweathermap.org/data/2.5/weather?${apiLatLon}&appid=${apiKey}&lang=${apiLang}&units=${apiUnit}`);
        const datos = yield respuesta.json();
        meteoTemp = Math.round(datos.main.temp);
        meteoIcono = datos.weather[0].icon;
    }
    catch (error) {
        console.log(error);
    }
    let temperatura = document.getElementById("meteo");
    temperatura.innerHTML = `${meteoTemp} ºC`;
    let icono = document.getElementById("icono");
    icono.src = `./icon/${meteoIcono}.png`;
});
const puntuacion = (score) => {
    let report = {
        joke: acudit,
        score: score,
        date: new Date().toISOString(),
    };
    hideButtons();
    reportAcudits.push(report); // we add the report object to the report
    console.table(reportAcudits);
};
getMeteo();
