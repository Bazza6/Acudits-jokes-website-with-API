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
    document.querySelector(".negativeButton").style.display = "inline";
    document.querySelector(".neutralButton").style.display = "inline";
    document.querySelector(".positiveButton").style.display = "inline";
};
const hideButtons = () => {
    document
        .querySelectorAll(".negativeButton")
        .forEach((a) => (a.style.display = "none"));
    document
        .querySelectorAll(".neutralButton")
        .forEach((a) => (a.style.display = "none"));
    document
        .querySelectorAll(".positiveButton")
        .forEach((a) => (a.style.display = "none"));
};
function getJoke() {
    let random1 = Math.floor(Math.random() * 6);
    let random2 = Math.floor(Math.random() * 6);
    let random3 = Math.floor(Math.random() * 6);
    let random4 = Math.floor(Math.random() * 6);
    document.body.style.backgroundImage = `url(./blob/blob${random1}.svg)`;
    document.getElementById("blobSx").style.backgroundImage = `url(./blob/blob${random2}.svg)`;
    document.getElementById("blobDx").style.backgroundImage = `url(./blob/blob${random3}.svg)`;
    if (random4 >= 3) {
        //acudit casual entre las dos APIs
        getAcudit();
    }
    else {
        getChuck();
    }
}
const getAcudit = () => __awaiter(void 0, void 0, void 0, function* () {
    showButtons();
    try {
        const respuesta = yield fetch("https://icanhazdadjoke.com/", {
            headers: {
                Accept: "application/json",
            },
        }); //await sirve a decirle que acabe la peticion antes de pasar
        // a la linea siguiente. Se puede usar solo con funciones asincronas
        //console.log("respuesta: ", respuesta);
        const datos = yield respuesta.json();
        acudit = datos.joke;
        document.getElementById("acudit").innerHTML = `<cite>"${acudit}"</cite>`;
        //console.log("datos (respuesta.json()): ", datos);
        console.log("acudit: ", acudit);
        //console.log("JSON.stringify(datos): ", JSON.stringify(datos));
    }
    catch (error) {
        console.log(error);
    }
});
const getChuck = () => __awaiter(void 0, void 0, void 0, function* () {
    showButtons();
    try {
        const respuesta = yield fetch("https://api.chucknorris.io/jokes/random"); //await sirve a decirle que acabe la peticion antes de pasar
        // a la linea siguiente. Se puede usar solo con funciones asincronas
        console.log("respuesta2: ", respuesta);
        const datos = yield respuesta.json();
        acudit = datos.value;
        document.getElementById("acudit").innerHTML = `<cite>"${acudit}"</cite>`;
    }
    catch (error) {
        console.log(error);
    }
});
const getMeteo = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //units=metric for temperature in c.
        const respuesta = yield fetch("https://api.openweathermap.org/data/2.5/weather?lat=41.3828939&lon=2.1774322&appid=b8bbbf0fe403ed96607907fcfdeb0295&lang=es&units=metric");
        console.log("respuesta", respuesta);
        const datos = yield respuesta.json();
        console.log("meteo datos: ", datos);
        let meteoTemp = Math.round(datos.main.temp);
        let meteoIcono = datos.weather[0].icon;
        console.log("meteo Barcelona: ", meteoTemp);
        console.log("meteo icono: ", meteoIcono);
    }
    catch (error) {
        console.log(error);
    }
    document.getElementById("meteo").innerHTML = `${meteoTemp} ºC`;
    document.getElementById("icono").src = `./icon/${meteoIcono}.png`;
});
function puntuacion(score) {
    let report = {
        joke: acudit,
        score: score,
        date: new Date().toISOString(),
    };
    hideButtons();
    reportAcudits.push(report);
    console.table(reportAcudits);
}
getMeteo();
