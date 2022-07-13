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
