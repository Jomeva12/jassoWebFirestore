
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
  const idAsesor = params.get("asesor");
  const idColeccion = params.get("id");

  console.log("idColeccion: ", idColeccion);
  console.log("idAsesor: ", idAsesor);

  obtenerDocumento(idColeccion);
 
  $("#fotosPublicacion").owlCarousel();  
});

// Función para obtener un documento por ID
function obtenerDocumento(id) {
  const docRef = db.collection("galeriaCompartida").doc(id);
  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc;
      //this.nombrePublicacion=data.data().nombre
          mostrarResultado(data);
    } else {
      console.log("Documento no encontrado galeria");
    }
  });
}
function mostrarResultado(data) {
  // Obtener el objeto con los datos del documento
  const datosDocumento = data.data();
  if (datosDocumento.imagenes) {
    mostrarImagenes(datosDocumento.imagenes);
  }
  
}
function mostrarImagenes(valor) {
  const multimediaUrl = String(valor);
  console.log(`llll: ${multimediaUrl}`);
  const imagenes = multimediaUrl.split(",");
  const primeraImagen = imagenes[0]; // Obtenemos la primera imagen del array

  // Cambia el estilo de fondo del banner existente
  $("#bgBanner").css({
    "background-image": `url(${primeraImagen})`,
    "background-size": "cover",  // Por ejemplo, puedes agregar más propiedades aquí
    "background-position": "center",
    "background-repeat": "no-repeat",
    "filter": "contrast(40%);"
});


  // Genera la plantilla de las imágenes
  var plantilla = "";
  imagenes.forEach(imagen => {
      plantilla += `
          <div class="card">
              <div class="card-body">
                  <img src="${imagen}" class="card-img-top" alt="Imagen">
              </div>
          </div>`;
  });

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




