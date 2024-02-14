
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
  $("#anticipo").html(datosDocumento.anticipo)
  $("#cantidadPersonas").html(datosDocumento.cantidadDePersonas)
  $("#costoFirma").html(datosDocumento.costoParaFirmar)
  $("#direcccion").html(datosDocumento.direccion)
  $("#validoHasta").html(datosDocumento.fechaPromocionFinal)
  $("#valorAgregado").html(datosDocumento.valorAgregado)
  $("#lugar").html(datosDocumento.lugar)
  $("#precio").html(datosDocumento.precio)
  $("#tipoEventos").html(datosDocumento.tipoEvento)
  
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



