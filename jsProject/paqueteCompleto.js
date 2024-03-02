
const firebaseConfig = {
  apiKey: "AIzaSyBTD0WrmlvOYViJ5J8_Tt3vDzCDmxQL3tQ",
  authDomain: "jassodb-4b8e4.firebaseapp.com",
  projectId: "jassodb-4b8e4",
  storageBucket: "jassodb-4b8e4.appspot.com",
  messagingSenderId: "851107842246",
  appId: "1:851107842246:web:166bb374ed3dd2cf7e6fc7",
  measurementId: "G-WXYY0N3TMG"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var nombrePublicacion=""
$(function () {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const idAsesor = queryString.split("?asesor=")[1];
  const idMatch = queryString.match(/[\?&]id=([^&?]*)/);
  const idColeccion = idMatch ? idMatch[1] : null;
  //const idColeccion = params.get("id");

  console.log("idColeccion: ", idColeccion);
  console.log("idAsesor: ", idAsesor);

  obtenerDocumento(idColeccion);
  obtenerAsesor(idAsesor)
  $("#fotosPublicacion").owlCarousel();  
})
// Función para obtener un documento por ID
function obtenerDocumento(id) {
  const docRef = db.collection("publicaciones").doc(id);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc;
      this.nombrePublicacion=data.data().nombre
          mostrarResultado(data);
    } else {
      console.log("Documento no encontrado");
    }
  });
}

function obtenerAsesor(idAsesor) {
  const docRef = db.collection("usuarios").doc(idAsesor);
  docRef.get().then((doc) => {
    if (doc.exists) {
      console.log("this.nombrePublicacion", this.nombrePublicacion.toString());
      const data = doc.data();
      const nombreAsesor = data.name; // Ajusta esto según la estructura de tu documento
      const telefonoAsesor = data.phone
      const mensajeWhatsapp =
      `Hola ${nombreAsesor}, me gustaría cotizar la promoción de *${this.nombrePublicacion}*.\n ¡Gracias!`;
      const urlWhatsapp =
      "https://wa.me/" +
      telefonoAsesor +
      "?text=" +
      encodeURIComponent(mensajeWhatsapp);

    $("#whatsappLink").attr("href", urlWhatsapp);
    console.log("Nombre del asesor:", nombreAsesor);
    console.log("Número de teléfono del asesor:", telefonoAsesor);
    // $("#whatsappLink").attr("href", "https://wa.me/" + nuevoNumero + "?text=Me%20gustaría%20saber%20el%20precio%20de%20la%20promoción");

    } else {
      console.log("Documento no encontrado");
    }
  });
}

function mostrarResultado(data) {
  // Obtener el objeto con los datos del documento
  const datosDocumento = data.data();
  if (datosDocumento.multimediaUrl) {
   mostrarImagenes(datosDocumento.multimediaUrl);
  }

  $("#nombrePublicacion").html(datosDocumento.nombre)
  $("#categoria").html(datosDocumento.categoria)
  $("#descripcion").html(datosDocumento.descripcion)
  $("#telefono").html(datosDocumento.celularContacto)
  $("#direcccion").html(datosDocumento.lugarDelEventoMapa)
  $("#valorAgregado").html(datosDocumento.valorAgregado)
  $("#tipoEventos").html(datosDocumento.tipoEvento)
  $("#lugar").html(datosDocumento.lugar)
  $("#Categoria").html(datosDocumento.categoria)
  
  //$("#validoHasta").html(datosDocumento.fechaVigencia)
  var validoHastaElement = document.getElementById("validoHasta");
  var fechaVigencia = datosDocumento.fechaVigencia;
  var fecha = new Date(fechaVigencia);
  var fechaFormateada = fecha.toLocaleDateString();
  validoHastaElement.innerHTML = fechaFormateada;
  
  var fechaDelEventoElement = document.getElementById("fechaDelEvento");
  var fechaDelEvento = datosDocumento.fechaDeEvento;
  var fechaEvento = new Date(fechaDelEvento);
  var fechaEventoFormateada = fechaEvento.toLocaleDateString();
  fechaDelEventoElement.innerHTML = fechaEventoFormateada;
  
  
  //$("#cantidadPersonas").html(datosDocumento.cantidadDePersonas)
  var cantidadPersonasElement = document.getElementById("cantidadPersonas");
  var cantidadPersonas = datosDocumento.cantidadDePersonas;
  if (cantidadPersonas === "") {
    cantidadPersonasElement.innerHTML = "0";
  } else {
    cantidadPersonasElement.innerHTML = cantidadPersonas;
  }
  
  // $("#costoFirma").html(datosDocumento.costoParaFirmar)
  // $("#precio").html("$"+datosDocumento.costoPaquete)
  // $("#anticipo").html(datosDocumento.anticipo)
  var anticipoElement = document.getElementById("anticipo");
  var costoanticipo = datosDocumento.anticipo;
  var costoanticipoFormateado = formatoConComas(costoanticipo);
  anticipoElement.innerHTML = "$" + costoanticipoFormateado;

  var precioElement = document.getElementById("precio");
  var costoPaquete = datosDocumento.costoPaquete;
  var costoFormateado = formatoConComas(costoPaquete);
  precioElement.innerHTML = "$" + costoFormateado;

  var costoFirmaElement = document.getElementById("costoFirma");
  var costoFirma = datosDocumento.costoParaFirmar;
  var costoFormateadocostoFirma = formatoConComas(costoFirma);
  costoFirmaElement.innerHTML = "$" + costoFormateadocostoFirma;
  // Función para formatear un número con comas cada tres dígitos
  function formatoConComas(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
}

function mostrarImagenes(valor){
  
  const multimediaUrl = String(valor);
  console.log(`llll: ${multimediaUrl}`);
  const imagenes = multimediaUrl.split(",");
  const imagenFija="img/jasso3.jpg"
  var plantilla=""
  imagenes.forEach(imagen => {
    //console.log(`imagen: ${imagen}`);
    plantilla += `
    <div class="card">
        <div class="card-body">
            <img src="${imagen}" class="card-img-top" alt="Imagen">
        </div>
    </div>`;
 })
    // Agrega la plantilla al contenedor
    $("#fotosPublicacion").html(plantilla);
    // Inicializa Owl Carousel después de cargar las imágenes
    $("#fotosPublicacion").owlCarousel({
      loop: true,
      margin: 10,
      nav: true,
      responsive: {
          0: {
              items: 1
          },
          600: {
              items: 3
          },
          1000: {
              items: 5
          }
      }
  });

}



