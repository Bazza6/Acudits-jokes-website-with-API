let jokes = "";

const getJoke = async () => {
    try {
        const respuesta = await fetch("https://icanhazdadjoke.com/", {
            headers: {
                'Accept': 'application/json'
            }
        });  //await sirve a decirle que acabe la peticion antes de pasar 
        // a la linea siguiente. Se puede usar solo con funciones asincronas
        //console.log("respuesta: ", respuesta);

        const datos = await respuesta.json(); //a que sirve .json() ?
        joke = datos.joke;
        //document.getElementById("contenedor").innerHTML = joke;

        //console.log("datos (respuesta.json()): ", datos);
        console.log("acudit: ", joke);
        //console.log("JSON.stringify(datos): ", JSON.stringify(datos));

    } catch (error) {
        console.log(error);
    }
}
