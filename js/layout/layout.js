var layout = document.getElementById("layout");
var obj = document.getElementsByClassName("obj");
var widthInput = document.getElementById("widthInput");
var heightInput = document.getElementById("heightInput");
var deleteButton = document.getElementById("deleteButton");
var increaseZIndexButton = document.getElementById("increaseZIndexButton");
var decreaseZIndexButton = document.getElementById("decreaseZIndexButton");
var zIndexValueSpan = document.getElementById("zIndexValue");
var selectedObj = null; // Variable para mantener el objeto seleccionado
var zIndexCounter = 1; // Inicializar el contador de z-index

// Funciones auxiliares para permitir el arrastre
function permitirSoltar(ev) {
    ev.preventDefault();
}

function makeDraggable(element) {
    var initialX, initialY;
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e.preventDefault();
        if (selectedObj) {
            selectedObj.classList.remove('selected');
        }
        selectedObj = element;
        selectedObj.classList.add('selected');

        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - element.offsetLeft;
            initialY = e.touches[0].clientY - element.offsetTop;
        } else {
            initialX = e.clientX - element.offsetLeft;
            initialY = e.clientY - element.offsetTop;
        }

        document.onmouseup = closeDragElement;
        document.ontouchend = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        var clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;
        var clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
        element.style.left = (clientX - initialX) + "px";
        element.style.top = (clientY - initialY) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }

}

// Esta sección es para cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.container-menu .obj').forEach(function (obj) {
        obj.addEventListener('click', function () {
            var clone = obj.cloneNode(true);
            clone.style.position = 'absolute';
            clone.style.left = '0px'; // Posición inicial arbitraria
            clone.style.top = '0px'; // Posición inicial arbitraria

            layout.appendChild(clone);
            makeDraggable(clone);

            clone.addEventListener('click', function () {
                seleccionarObjeto(clone); // Llama a la función seleccionarObjeto para enfocar el objeto seleccionado
            });
        });

    });
    document.querySelectorAll('.container-layout .obj').forEach(function (obj) {
        obj.addEventListener('click', function () {
            seleccionarObjeto(obj); // Llama a la función seleccionarObjeto para enfocar el objeto seleccionado
        });
    });
});

function quitarFoco() {
    if (selectedObj) {
        selectedObj.classList.remove('selected');
        selectedObj.style.outline = ""; // O cualquier otro estilo que indique el foco
        // También oculta los botones de control
        deleteButton.style.display = 'inline';
        increaseZIndexButton.style.display = 'inline';
        decreaseZIndexButton.style.display = 'inline';
        zIndexValueSpan.style.display = 'inline';
        selectedObj = null;
    }
}

// Ahora, configura un detector de eventos en el contenedor o el documento:
document.addEventListener('click', function (e) {
    // Comprueba si el clic fue fuera de un objeto seleccionable
    if (!e.target.classList.contains('obj') && !e.target.classList.contains('propiedades') && !e.target.closest('.propiedades')) {
        quitarFoco();
    }
}, true);

function seleccionarObjeto(objeto) {
    document.getElementById('widthRange').value = parseInt(selectedObj.style.width);
    document.getElementById('heightRange').value = parseInt(selectedObj.style.height);

    if (selectedObj !== null && selectedObj !== objeto) {
        selectedObj.classList.remove('selected');
    }

    selectedObj = objeto; // Establecer el nuevo objeto seleccionado
    selectedObj.classList.add('selected');
    selectedObj.style.outline = "2px solid blue"; // Mostrar el foco en el objeto seleccionado

    widthInput.value = selectedObj.clientWidth;
    heightInput.value = selectedObj.clientHeight;
    zIndexValueSpan.textContent = "Capa: " + selectedObj.style.zIndex;
    // Mostrar los controles
    deleteButton.style.display = 'inline'; // Asegúrate de que el display se ajuste a tu CSS
    increaseZIndexButton.style.display = 'inline';
    decreaseZIndexButton.style.display = 'inline';
    zIndexValueSpan.style.display = 'inline';

    selectedObj.addEventListener('wheel', function (event) {
        event.preventDefault();

        var scaleFactor = 1.1; // Factor de escala para el zoom
        var delta = event.deltaY || event.detail || event.wheelDelta;

        // Determinar la dirección del zoom (in o out)
        var zoomDirection = delta < 0 ? 1 : -1;

        // Obtener el tamaño actual del objeto
        var currentWidth = parseFloat(selectedObj.style.width);
        var currentHeight = parseFloat(selectedObj.style.height);

        // Calcular el nuevo tamaño del objeto
        var newWidth = currentWidth * (1 + zoomDirection * 0.1);
        var newHeight = currentHeight * (1 + zoomDirection * 0.1);

        // Aplicar el nuevo tamaño al objeto
        selectedObj.style.width = newWidth + 'px';
        selectedObj.style.height = newHeight + 'px';

        // Actualizar los inputs de ancho y alto
        widthInput.value = newWidth;
        heightInput.value = newHeight;
    });
}


widthInput.addEventListener('change', function () {
    if (selectedObj) {
        selectedObj.style.width = widthInput.value + 'px';
    }
});

heightInput.addEventListener('change', function () {
    if (selectedObj) {
        selectedObj.style.height = heightInput.value + 'px';
    }
});

// Eventos para actualizar el tamaño del objeto seleccionado basado en los inputs

document.getElementById('widthRange').addEventListener('input', function () {
    if (selectedObj) {
        selectedObj.style.width = this.value + 'px';
        widthInput.value = this.value;
    }
});

document.getElementById('heightRange').addEventListener('input', function () {
    if (selectedObj) {
        selectedObj.style.height = this.value + 'px';
        heightInput.value = this.value;
    }
});

document.getElementById('widthInput').addEventListener('change', function () {
    if (selectedObj) {
        selectedObj.style.width = this.value + 'px';
        document.getElementById('widthRange').value = this.value;
    }
});

document.getElementById('heightInput').addEventListener('change', function () {
    if (selectedObj) {
        selectedObj.style.height = this.value + 'px';
        document.getElementById('heightRange').value = this.value;
    }
});

document.getElementById('widthRange').addEventListener('input', function () {
    if (selectedObj) {
        selectedObj.style.width = this.value + 'px';
        document.getElementById('widthInput').value = this.value;
    }
});

document.getElementById('heightRange').addEventListener('input', function () {
    if (selectedObj) {
        selectedObj.style.height = this.value + 'px';
        document.getElementById('heightInput').value = this.value;
    }
});

deleteButton.onclick = function () {
    if (selectedObj !== null) {
        selectedObj.remove(); // Eliminar el objeto seleccionado
        deleteButton.style.display = 'inline'; // Ocultar el botón de eliminar
        increaseZIndexButton.style.display = 'inline'; // Ocultar el botón de aumentar z-index
        decreaseZIndexButton.style.display = 'inline'; // Ocultar el botón de disminuir z-index
        zIndexValueSpan.style.display = 'inline'; // Ocultar el valor del z-index
        selectedObj = null; // Reiniciar el objeto seleccionado
    }
};

increaseZIndexButton.onclick = function () {
    if (selectedObj !== null) {
        selectedObj.style.zIndex = zIndexCounter++;
        zIndexValueSpan.textContent = "Capa: " + selectedObj.style.zIndex; // Actualizar el valor del z-index mostrado
    }
};

decreaseZIndexButton.onclick = function () {
    if (selectedObj !== null) {
        selectedObj.style.zIndex = zIndexCounter--;
        zIndexValueSpan.textContent = "Capa: " + selectedObj.style.zIndex; // Actualizar el valor del z-index mostrado
    }
};
