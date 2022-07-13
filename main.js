const reportAcudits = []
let acudit = "";

const getJoke = async () => {
    document.querySelectorAll(".puntuacionButtons").forEach(a => a.style.display = "inline");

    try {
        const respuesta = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                'Accept': 'application/json'
            }
        });  //await sirve a decirle que acabe la peticion antes de pasar 
        // a la linea siguiente. Se puede usar solo con funciones asincronas
        //console.log("respuesta: ", respuesta);

        const datos = await respuesta.json(); //a que sirve .json() ?
        acudit = datos.joke;
        document.getElementById("acudit").innerHTML = `<cite>"${acudit}"</cite>`;

        //console.log("datos (respuesta.json()): ", datos);
        console.log("acudit: ", acudit);
        //console.log("JSON.stringify(datos): ", JSON.stringify(datos));

    } catch (error) {
        console.log(error);
    }

}

const getMeteo = async () => { // b8bbbf0fe403ed96607907fcfdeb0295

    try {
        const respuesta = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=41.3828939&lon=2.1774322&appid=b8bbbf0fe403ed96607907fcfdeb0295&lang=es");
        console.log("respuesta", respuesta);
        const datos = await respuesta.json(); //a que sirve .json() ?

        console.log("meteo datos: ", datos);
        meteo = datos.weather[0].description;
        console.log("meteo Barcelona: ", meteo);

        /*         meteo = datos.joke;
                document.getElementById("acudit").innerHTML = `<cite>"${acudit}"</cite>`;
        
                //console.log("datos (respuesta.json()): ", datos);
                console.log("acudit: ", acudit);
            } */
    } catch (error) {
        console.log(error);
    }
    document.getElementById("meteo").innerHTML = `Avui en Barcelona: ${meteo}`;

}

getMeteo();

function puntuacion(score) {
    let report = {
        joke: acudit,
        score: score,
        date: (new Date).toISOString(),
    }
    reportAcudits.push(report);
    document.querySelectorAll(".puntuacionButtons").forEach(a => a.style.display = "none");

    console.table(reportAcudits);
}
