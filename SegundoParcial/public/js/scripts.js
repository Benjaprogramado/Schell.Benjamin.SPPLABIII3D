

let frm = document.forms[0];
frm.addEventListener('submit', manejadorSubmit);
document.getElementById("btnBorrar").addEventListener('click', bajaAnuncio);
document.getElementById("btnCancelar").addEventListener('click', cancelar);
document.getElementById("divChks").addEventListener('click', traerAnuncios);
document.getElementById("divFiltros").addEventListener('click', filtroTransaccion);



traerAnuncios();
let dataActual;

function actualizarVista() {

    let tds = document.getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
        let td = tds[i];
        td.addEventListener('click', setValues);
    }

    document.getElementById("btnBorrar").hidden = true;
    document.getElementById("btnCancelar").hidden = true;
    frm.removeEventListener('submit', manejadorModificar);
    frm.addEventListener('submit', manejadorSubmit);
    limpiarValues();
}

function manejadorSubmit(e) {
    e.preventDefault();
    let nuevoAnuncio = obtenerAnuncio(e.target);
    altaAnuncio(nuevoAnuncio);
}

function manejadorModificar(e) {
    e.preventDefault();
    let anuncio = obtenerAnuncio(e.target);
    modificarAnuncio(anuncio);
}


function cancelar() {
    document.getElementById("btnBorrar").hidden = true;
    document.getElementById("btnCancelar").hidden = true;
    frm.removeEventListener('submit', manejadorModificar);
    frm.addEventListener('submit', manejadorSubmit);
    actualizarVista();
}



function filtroCheks(anunciosOriginales) {
    let id = document.getElementById("cboxId");
    let titulo = document.getElementById("cboxTitulo");
    let transaccion = document.getElementById("cboxTransaccion");
    let descripcion = document.getElementById("cboxDescripcion");
    let precio = document.getElementById("cboxPrecio");
    let num_puertas = document.getElementById("num_puertas");
    let num_KMs = document.getElementById("num_KMs");
    let potencia = document.getElementById("potencia");

    nuevaData = anunciosOriginales.map((a) => {

        let object = new Object();
        if (id.checked) object.id = a.id;
        if (titulo.checked) object.titulo = a.titulo;
        if (transaccion.checked) object.transaccion = a.transaccion;
        if (descripcion.checked) object.descripcion = a.descripcion;
        if (precio.checked) object.precio = a.precio;
        if (num_puertas.checked) object.num_puertas = a.num_puertas;
        if (num_KMs.checked) object.num_KMs = a.num_KMs;
        if (potencia.checked) object.potencia = a.potencia;
        return object;
    })
    // console.log(anunciosOriginales);
    // console.log(nuevaData);
    return nuevaData;

}

function filtroTransaccion() {

    let anunciosOriginales = dataActual;

    let filtro = document.getElementById("txtFiltros").value;
    let nuevaData = anunciosOriginales;

    if (filtro == "Venta") {
        nuevaData = anunciosOriginales.filter(a => a.transaccion === "Venta").map(a => a);
    }
    if (filtro == "Alquiler") {
        nuevaData = anunciosOriginales.filter(a => a.transaccion === "Alquiler").map(a => a);
    }

    // console.log(anunciosOriginales);
    // console.log(nuevaData);

    document.getElementById("divTabla").innerHTML = "";
    // dataActual = filtroCheks(nuevaData);
    document.getElementById("divTabla").appendChild(crearTabla(nuevaData));

    //PROMEDIO//
    let prom = document.getElementById("promedio").value;
    let promp = nuevaData.reduce((prev, actual) => {
        return prev + actual.precio;
    }, 0);
    prom = promp / nuevaData.length;

}

//////////////////////////////
function obtenerAnuncio(frm) {
    let titulo;
    let transaccion;
    let descripcion;
    let precio;
    let num_puertas;
    let num_KMs;
    let potencia;
    let id = -1;

    for (element of frm.elements) {
        switch (element.name) {
            case "titulo":
                titulo = element.value;
                break;
            case "transaccion":
                transaccion = element.value;
                break;
            case "descripcion":
                descripcion = element.value;
                break;
            case "precio":
                precio = element.value;
                break;
            case "num_puertas":
                num_puertas = element.value;
                break;
            case "num_KMs":
                num_KMs = element.value;
                break;
            case "potencia":
                potencia = element.value;
                break;
            case "idAnuncio":
                id = element.value;
                break;
        }
    }

    return new Anuncio_Auto(id, titulo, transaccion, descripcion, precio, num_puertas, num_KMs, potencia);
}


function setValues(e) {
    let tr = e.target.parentElement;
    let nodos = tr.childNodes;
    document.getElementById("idAnuncio").value = nodos[0].innerText;
    document.getElementById("idAnuncio").hidden = false;
    document.getElementById("lblId").hidden = false;
    document.getElementById("txtTitulo").value = nodos[1].innerText;
    document.getElementById("txtDescripcion").value = nodos[3].innerText;
    document.getElementById("numPrecio").value = nodos[4].innerText;
    document.getElementById("kms").value = nodos[6].innerText;
    document.getElementById("txtPotencia").value = nodos[7].innerText;
    document.getElementById("txtTransaccion").value = nodos[2].innerText;
    document.getElementById("txtPuertas").value = nodos[5].innerText;
    document.getElementById("btnBorrar").hidden = false;
    document.getElementById("btnCancelar").hidden = false;
    frm.removeEventListener('submit', manejadorSubmit);
    frm.addEventListener('submit', manejadorModificar);

}

function limpiarValues() {
    document.getElementById("idAnuncio").value = "";
    document.getElementById("idAnuncio").hidden = true;
    document.getElementById("lblId").hidden = true;
    document.getElementById("txtTitulo").value = "";
    document.getElementById("txtDescripcion").value = "";
    document.getElementById("numPrecio").value = "";
    document.getElementById("kms").value = "";
    document.getElementById("txtPuertas").value = "";
    document.getElementById("txtPotencia").value = "";
    document.getElementById("txtTransaccion").value = "nada";
    document.getElementById("btnCrearModificar").value = "Crear Anuncio";

}



///////////////////////// CREAR TABLA////////////////////////////////////

function crearTabla(array) {
    let tabla = document.createElement("table");
    let cabecera = document.createElement("tr");


    for (atributo in array[0]) {
        let th = document.createElement("th");
        th.textContent = atributo;
        cabecera.appendChild(th);
    }

    tabla.appendChild(cabecera);

    for (i in array) {
        let fila = document.createElement("tr");
        let objeto = array[i];

        for (j in objeto) {
            let celda = document.createElement("td");
            let dato = document.createTextNode(objeto[j]);
            celda.appendChild(dato);
            fila.appendChild(celda);
        }
        tabla.appendChild(fila);
    }
    return tabla;
}


//////////////////////CRUD AXIOS//////////////////////////////////////////////////

function traerAnuncios() {
    document.getElementById("divTabla").innerHTML = "";
    document.getElementById('divTabla').innerHTML =
        '<img src="./img/208.gif" alt="spinner">';

    axios.get("http://localhost:3000/anuncios")
        .then((res) => {
            console.log("Anuncios cargados con exito");
            console.log(res.data);
            document.getElementById("divTabla").innerHTML = "";
            dataActual = filtroCheks(res.data);
            document.getElementById("divTabla").appendChild(crearTabla(dataActual));

        })
        .catch((err) => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            actualizarVista();
            // console.log("BBBBBBBBBBBBBB", dataActual);
            return dataActual;

        });
}


function altaAnuncio(anuncio) {

    document.getElementById("divTabla").innerHTML = "";
    document.getElementById('divTabla').innerHTML =
        '<img src="./img/208.gif" alt="spinner">';

    const config = {
        method: "POST",
        headers: { "Content-type": "application/json;charset=utf-8" },
        data: JSON.stringify(anuncio)
    }

    axios("http://localhost:3000/anuncios", config)
        .then((res) => {
            console.log("Anuncio cargado con exito: \n\n", res.data);
        })
        .catch((err) => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            actualizarVista();
        });
}


function modificarAnuncio(anuncio) {

    document.getElementById("divTabla").innerHTML = "";
    document.getElementById('divTabla').innerHTML =
        '<img src="./img/208.gif" alt="spinner">';

    const config = {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=utf-8" },
        data: JSON.stringify(anuncio)
    }

    axios("http://localhost:3000/anuncios/" + anuncio.id, config)
        .then((res) => {
            console.log("Anuncio modificado con exito: \n\n", res);
        })
        .catch((err) => {
            console.error(err.response.status, err.response.statusText);
        })
        .finally(() => {
            actualizarVista();
        });
}


function bajaAnuncio(anuncio) {

    anuncio = obtenerAnuncio(frm);

    if (window.confirm("DESEA ELIMINAR ESTE ANUNCIO??")) {

        document.getElementById("divTabla").innerHTML = "";
        document.getElementById('divTabla').innerHTML =
            '<img src="./img/208.gif" alt="spinner">';

        const config = {
            method: "DELETE",
            headers: { "Content-type": "application/json;charset=utf-8" },
        }

        axios("http://localhost:3000/anuncios/" + anuncio.id, config)
            .then((res) => {
                console.log("Anuncio borrado con exito: \n\n", res);
            })
            .catch((err) => {
                console.error(err.response.status, err.response.statusText);
            })
            .finally(() => {
                actualizarVista();
            });
    }


}
//////////////////////FIN CRUD AXIOS//////////////////////////////////////////////////

