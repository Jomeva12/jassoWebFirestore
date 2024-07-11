const firebaseConfig = {
    apiKey: "AIzaSyBTD0WrmlvOYViJ5J8_Tt3vDzCDmxQL3tQ",
    authDomain: "jassodb-4b8e4.firebaseapp.com",
    projectId: "jassodb-4b8e4",
    storageBucket: "jassodb-4b8e4.appspot.com",
    messagingSenderId: "851107842246",
    appId: "1:851107842246:web:166bb374ed3dd2cf7e6fc7",
    measurementId: "G-WXYY0N3TMG",
  };
  
  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
  
  $(function () {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const idAsesor = params.get("asesor");
    const idColeccion = params.get("id");
  
    console.log("idColeccion: ", idColeccion);
    console.log("idAsesor: ", idAsesor);
  
    if (idColeccion) {
      obtenerDocumento(idColeccion);
    } else {
      $("#pagos-container").html("<p class='erroMessage'>ID del prospecto no proporcionado.</p>");
    }
  
    if (idAsesor) {
      obtenerAsesor(idAsesor);
    }
  });
  
  function obtenerDocumento(id) {
    const docRef = db.collection("prospectos").doc(id);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        mostrarPagos(data);
      } else {
        console.log("Documento no encontrado");
        $("#pagos-container").html("<p class='prospectoNoData'>Prospecto no encontrado.</p>");
      }
    }).catch((error) => {
      console.log("Error al obtener el prospecto:", error);
      $("#pagos-container").html("<p class='errorMessageProspectos'>Error al obtener los datos del prospecto.</p>");
    });
  }
  
  function mostrarPagos(prospecto) {
    var pagos = prospecto.registro_de_pagos;
  
    var tableHtml = `
        <table class='tablePagos'>
        <thead>
            <tr class='trTablePagos'>
                <th class='thTablePagos1'>Num.</th>
                <th class='thTablePagos2'>Fecha</th>
                <th class='thTablePagos3'>Monto</th>
            </tr>
            </thead>
    `;
    if (pagos && pagos.length > 0) {
      pagos.reverse().forEach(function (pago, index) {
        tableHtml += `
            <tr class='trBodyTablePagos'>
                <td class='tdBodyTablePagos1'>${index + 1}</td>
                <td class='tdBodyTablePagos2'>${pago.fecha}</td>
                <td class='tdBodyTablePagos3'>${formatearMonto(pago.monto)}</td>
            </tr>
        `;
      });
    } else {
      tableHtml += `
            <tr class='tableError'>
                <td colspan="3" class='erroData'>No hay pagos registrados.</td>
            </tr>
        `;
    }
    tableHtml += `</table>`;
    $("#pagos-container").html(tableHtml);
  }


  function formatearMonto(monto) {
    return '$' + parseFloat(monto).toLocaleString('es-MX');
  }
  
  function obtenerAsesor(idAsesor) {
    const docRef = db.collection("usuarios").doc(idAsesor);
    docRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const nombreAsesor = data.name;
        const telefonoAsesor = data.phone;
        const mensajeWhatsapp = `Hola ${nombreAsesor}, me gustaría cotizar la promoción de *${this.nombrePublicacion}*.\n ¡Gracias!`;
        const urlWhatsapp = "https://wa.me/" + telefonoAsesor + "?text=" + encodeURIComponent(mensajeWhatsapp);
  
        $("#whatsappLink").attr("href", urlWhatsapp);
        console.log("Nombre del asesor:", nombreAsesor);
        console.log("Número de teléfono del asesor:", telefonoAsesor);
      } else {
        console.log("Documento no encontrado");
      }
    });
  }
  