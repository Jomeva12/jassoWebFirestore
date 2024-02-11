

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

// Función para obtener un documento por ID
function obtenerDocumento(id) {
  const docRef = db.collection("publicaciones").doc(id);

  docRef.get().then((doc) => {
    if (doc.exists) {
      const data = doc.data();
      mostrarResultado(data);
    } else {
      console.log("Documento no encontrado");
    }
  });
}


function mostrarResultado(publicacion) {
  const nombreElement = document.getElementById("nombrePublicacion");
  nombreElement.innerHTML = publicacion.categoria;

  const descripcionElement = document.getElementById("descripcionPublicacion");
  descripcionElement.innerHTML = publicacion.descripcion;

  const fechaPublicacionElement = document.getElementById("fechaPublicacion");
  fechaPublicacionElement.value = publicacion.fechaPost;

  const categoriasElement = document.getElementById("categoriasPublicacion");
  categoriasElement.innerHTML = publicacion.tipoEvento

  // Mostrar otros atributos del modelo
  const precioElement = document.getElementById("precioPublicacion");
  precioElement.innerHTML = `Precio: $${publicacion.precio}`;

  const tipoEventoElement = document.getElementById("tipoEventoPublicacion");
  tipoEventoElement.innerHTML = `Tipo de evento: ${publicacion.tipoEvento[0]}`;



}
const urlParams = new URLSearchParams(window.location.search);
const idColeccion = urlParams.get("id");


obtenerDocumento(idColeccion);

