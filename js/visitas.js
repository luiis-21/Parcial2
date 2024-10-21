// Cargar los reclusos almacenados en LocalStorage al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const reclusoAsociado = document.getElementById('reclusoAsociado');
    
    // Obtener los reclusos desde LocalStorage
    const reclusos = JSON.parse(localStorage.getItem('reclusos')) || [];

    // Verificar si hay reclusos almacenados
    if (reclusos.length === 0) {
        const option = document.createElement('option');
        option.text = 'No hay reclusos registrados';
        option.disabled = true;
        reclusoAsociado.appendChild(option);
    } else {
        // Llenar el select con los reclusos almacenados
        reclusos.forEach(function(recluso) {
            const option = document.createElement('option');
            option.value = recluso.identificacion; // Usar la identificación como valor
            option.text = `${recluso.nombre} (ID: ${recluso.identificacion})`; // Mostrar el nombre y la identificación
            reclusoAsociado.appendChild(option);
        });
    }
});

// Manejar el formulario de registro de visitas
document.getElementById('visitaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los datos del formulario
    const nombreVisitante = document.getElementById('nombreVisitante').value;
    const reclusoSeleccionado = document.getElementById('reclusoAsociado').value;
    const fechaVisita = document.getElementById('fechaVisita').value;

    // Crear el objeto visita
    const visita = {
        nombreVisitante: nombreVisitante,
        identificacionRecluso: reclusoSeleccionado, // Usar identificacionRecluso para que coincida
        fechaVisita: fechaVisita
    };

    // Obtener visitas almacenadas en LocalStorage o crear una lista vacía si no hay
    const visitas = JSON.parse(localStorage.getItem('visitas')) || [];
    visitas.push(visita);
    
    // Guardar la lista actualizada de visitas en LocalStorage
    localStorage.setItem('visitas', JSON.stringify(visitas));

    // Limpiar el formulario después de registrar la visita
    this.reset();

    // Mostrar las visitas actualizadas
    mostrarVisitas();
});


// Función para mostrar las visitas registradas
function mostrarVisitas() {
    const listaVisitas = document.getElementById('listaVisitas');
    listaVisitas.innerHTML = ''; // Limpiar la lista de visitas
    
    // Obtener las visitas almacenadas en LocalStorage
    const visitas = JSON.parse(localStorage.getItem('visitas')) || [];

    // Mostrar cada visita en la lista
    visitas.forEach(function(visita, index) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'bg-dark', 'text-light');
        li.innerHTML = `
            Visitante: ${visita.nombreVisitante} - Recluso: ${visita.reclusoSeleccionado} - Fecha: ${visita.fechaVisita}
            <button class="btn btn-danger btn-sm float-end" onclick="eliminarVisita(${index})">Eliminar</button>
        `;
        listaVisitas.appendChild(li);
    });
}

// Función para eliminar una visita
function eliminarVisita(index) {
    const visitas = JSON.parse(localStorage.getItem('visitas')) || [];
    visitas.splice(index, 1); // Eliminar la visita del array
    localStorage.setItem('visitas', JSON.stringify(visitas)); // Guardar la lista actualizada
    mostrarVisitas(); // Volver a mostrar las visitas actualizadas
}

// Función para guardar una visita en LocalStorage
function guardarVisita(visitante, identificacionRecluso) {
    const visitas = obtenerVisitas();
    const nuevaVisita = {
        nombreVisitante: visitante,
        identificacionRecluso: identificacionRecluso,
        fechaVisita: new Date().toLocaleString() // O la fecha que desees
    };
    visitas.push(nuevaVisita);
    localStorage.setItem('visitas', JSON.stringify(visitas));
}

// Mostrar las visitas cuando la página se carga
document.addEventListener('DOMContentLoaded', mostrarVisitas);
