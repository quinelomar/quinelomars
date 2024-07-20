var costoTotal = 0; // Costo inicial de la quiniela

function selectCell(cell) {
    var row = cell.parentNode;
    var cells = row.getElementsByTagName("td");
    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove("selected");
    }
    cell.classList.add("selected");
    updateSummary();
}

function updateSummary() {
    var selectedCells = document.querySelectorAll(".selected");
    var nombreUsuario = document.getElementById("nombre-usuario").value;
    var totalGoles = document.getElementById("total-goles").value;
    var summaryText = "Resumen: ";
    selectedCells.forEach(function(cell, index) {
        if (index > 0) {
            summaryText += " - ";
        }
        summaryText += cell.textContent.trim();
    });
    summaryText += " - " + nombreUsuario + " - " + totalGoles + " goles";
    document.getElementById("total").textContent = "TOTAL: $" + costoTotal;
}

function sendWhatsAppMessage() {
    var historialItems = document.querySelectorAll(".historial-item");

    // Verificar que haya elementos en el historial
    if (historialItems.length === 0) {
        alert("Debe agregar al menos una quiniela al historial antes de enviar el mensaje.");
        return;
    }

    var historialText = "";
    historialItems.forEach(function(item, index) {
        historialText += item.textContent.replace("❌", "").trim() + "\n";
    });
    var costoTotal = document.getElementById("total").textContent;
    var phoneNumber = "tu_numero_de_whatsapp";
    var whatsappUrl = "https://wa.me/" + 3336263675 + "/?text=" + encodeURIComponent(historialText + "\n" + costoTotal);
    window.open(whatsappUrl, "_blank");
}

function sendWhatsAppMessageInformes() {
    var mensaje = "!!!QUIERO MAS INFORMES SOBRE LAS QUINIELAS!!!⚽😄";
    var phoneNumber = "tu_numero_de_whatsapp";
    var whatsappUrl = "https://wa.me/" + 3336263675 + "/?text=" + encodeURIComponent(mensaje);
    window.open(whatsappUrl, "_blank");
}

function seleccionAleatoria() {
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var randomIndex = Math.floor(Math.random() * 3); // 0, 1, 2
        cells[randomIndex * 2].click();
    }
}

function agregarQuiniela() {
    var selectedCells = document.querySelectorAll(".selected");
    var nombreUsuario = document.getElementById("nombre-usuario").value;
    var totalGoles = document.getElementById("total-goles").value;

    // Verificar que todos los campos estén completos
    if (nombreUsuario === "" || totalGoles === "") {
        alert("Debe ingresar su nombre/apodo y el total de goles antes de agregar más quinielas.");
        return;
    }

    // Verificar que se haya seleccionado una opción en cada fila de la tabla
    var table = document.getElementsByTagName("table")[0];
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        if (!Array.from(cells).some(cell => cell.classList.contains("selected"))) {
            alert("Debe seleccionar una opción para cada partido antes de agregar más quinielas.");
            return;
        }
    }

    // Si todos los campos están completos, agregar la quiniela al historial
    var nuevaQuiniela = document.createElement("div");
    nuevaQuiniela.classList.add("historial-item");
    nuevaQuiniela.textContent = nombreUsuario + " - " + totalGoles + " goles - ";
    selectedCells.forEach(function(cell, index) {
        if (index > 0) {
            nuevaQuiniela.textContent += " - ";
        }
        nuevaQuiniela.textContent += cell.textContent.trim();
    });

    var deleteButton = document.createElement("span");
    deleteButton.textContent = "❌";
    deleteButton.classList.add("delete-btn");
    deleteButton.onclick = function() {
        nuevaQuiniela.remove();
        costoTotal -= 10; // Restar 10 pesos al quitar una quiniela
        document.getElementById("total").textContent = "TOTAL: $" + costoTotal;
    };
    nuevaQuiniela.appendChild(deleteButton);

    document.getElementById("historial").appendChild(nuevaQuiniela);

    // Actualizar el total
    costoTotal += 10; // Sumar 10 pesos al agregar una quiniela
    document.getElementById("total").textContent = "TOTAL: $" + costoTotal;

    // Limpiar selecciones después de agregar la quiniela
    limpiarSeleccion();
}

function limpiarSeleccion() {
    var selectedCells = document.querySelectorAll(".selected");
    selectedCells.forEach(function(cell) {
        cell.classList.remove("selected");
    });
    document.getElementById("total-goles").value = "";
}