const reportAcudits = []
let acudit = "";

function getJoke() {
    random1 = Math.floor(Math.random() * 6);
    random2 = Math.floor(Math.random() * 6);
    random3 = Math.floor(Math.random() * 6);
    random4 = Math.floor(Math.random() * 6);
    document.body.style.backgroundImage = `url(./blob/blob${random1}.svg)`;
    document.getElementById("blobSx").style.backgroundImage = `url(./blob/blob${random2}.svg)`;
    document.getElementById("blobDx").style.backgroundImage = `url(./blob/blob${random3}.svg)`;
    if (random4 >= 3) { //acudit casual entre las dos APIs
        getAcudit()
    } else {
        getChuck()
    }
}

const getAcudit = async () => {
    document.querySelectorAll(".negativeButton").forEach(a => a.style.display = "inline");
    document.querySelectorAll(".neutralButton").forEach(a => a.style.display = "inline");
    document.querySelectorAll(".positiveButton").forEach(a => a.style.display = "inline");

    try {
        const respuesta = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                'Accept': 'application/json'
            }
        });  //await sirve a decirle que acabe la peticion antes de pasar 
        // a la linea siguiente. Se puede usar solo con funciones asincronas
        //console.log("respuesta: ", respuesta);

        const datos = await respuesta.json();
        acudit = datos.joke;
        document.getElementById("acudit").innerHTML = `<cite>"${acudit}"</cite>`;

        //console.log("datos (respuesta.json()): ", datos);
        console.log("acudit: ", acudit);
        //console.log("JSON.stringify(datos): ", JSON.stringify(datos));

    } catch (error) {
        console.log(error);
    }

}
const getChuck = async () => {
    document.querySelectorAll(".negativeButton").forEach(a => a.style.display = "inline");
    document.querySelectorAll(".neutralButton").forEach(a => a.style.display = "inline");
    document.querySelectorAll(".positiveButton").forEach(a => a.style.display = "inline");

    try {
        const respuesta = await fetch("https://api.chucknorris.io/jokes/random");  //await sirve a decirle que acabe la peticion antes de pasar 
        // a la linea siguiente. Se puede usar solo con funciones asincronas
        console.log("respuesta2: ", respuesta);

        const datos = await respuesta.json();
        acudit = datos.value;
        document.getElementById("acudit").innerHTML = `<cite>"${acudit}"</cite>`;

    } catch (error) {
        console.log(error);
    }

}
const getMeteo = async () => {

    try { //units=metric for temperature in c. 
        const respuesta = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=41.3828939&lon=2.1774322&appid=b8bbbf0fe403ed96607907fcfdeb0295&lang=es&units=metric");
        console.log("respuesta", respuesta);
        const datos = await respuesta.json();

        console.log("meteo datos: ", datos);
        meteoTemp = Math.round(datos.main.temp);
        meteoIcono = datos.weather[0].icon;
        console.log("meteo Barcelona: ", meteo);
        console.log("meteo icono: ", meteoIcono);

    } catch (error) {
        console.log(error);
    }
    document.getElementById("meteo").innerHTML = `${meteoTemp} ºC`;
    document.getElementById("icono").src = `./icon/${meteoIcono}.png`;
}

getMeteo();

function puntuacion(score) {
    let report = {
        joke: acudit,
        score: score,
        date: (new Date).toISOString(),
    }
    reportAcudits.push(report);
    document.querySelectorAll(".negativeButton").forEach(a => a.style.display = "none");
    document.querySelectorAll(".neutralButton").forEach(a => a.style.display = "none");
    document.querySelectorAll(".positiveButton").forEach(a => a.style.display = "none");
    console.table(reportAcudits);
}