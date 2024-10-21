// Obtener los elementos del DOM
const reclusoForm = document.getElementById('reclusoForm');
const listaReclusos = document.getElementById('listaReclusos');
const editarReclusoForm = document.getElementById('editarReclusoForm');
const indexEditar = document.getElementById('indexEditar');

// Cargar los reclusos almacenados en LocalStorage al cargar la página
document.addEventListener('DOMContentLoaded', mostrarReclusos);

// Evento para añadir un nuevo recluso
reclusoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const identificacion = document.getElementById('identificacion').value;
    const delito = document.getElementById('delito').value;
    const condena = document.getElementById('condena').value;
    const fechaIngreso = document.getElementById('fechaIngreso').value;

    // Crear un objeto con los datos del recluso
    const recluso = {
        nombre,
        identificacion,
        delito,
        condena,
        fechaIngreso
    };

    // Guardar en LocalStorage
    guardarRecluso(recluso);

    // Limpiar el formulario
    reclusoForm.reset();

    // Mostrar el recluso en la lista
    mostrarReclusos();
});

// Función para guardar un recluso en LocalStorage
function guardarRecluso(recluso) {
    let reclusos = obtenerReclusos();

    // Añadir el nuevo recluso a la lista
    reclusos.push(recluso);

    // Guardar la lista actualizada en LocalStorage
    localStorage.setItem('reclusos', JSON.stringify(reclusos));
}

// Función para obtener los reclusos desde LocalStorage
function obtenerReclusos() {
    let reclusos;
    if (localStorage.getItem('reclusos') === null) {
        reclusos = [];
    } else {
        reclusos = JSON.parse(localStorage.getItem('reclusos'));
    }
    return reclusos;
}

// Función para mostrar los reclusos en la lista
function mostrarReclusos() {
    listaReclusos.innerHTML = '';

    const reclusos = obtenerReclusos();

    reclusos.forEach(function (recluso, index) {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'bg-dark', 'text-light');
        li.innerHTML = `
            <strong>${recluso.nombre}</strong> - ${recluso.identificacion} - ${recluso.delito} - ${recluso.condena} años - Ingresado: ${recluso.fechaIngreso}
            <button class="btn btn-warning btn-sm float-end me-2" onclick="mostrarModalEdicion(${index})">Editar</button>
            <button class="btn btn-danger btn-sm float-end me-2" onclick="eliminarRecluso(${index})">Eliminar</button>
            <button class="btn btn-info btn-sm float-end me-2" onclick="mostrarHistorialVisitas('${recluso.identificacion}')">Historial de Visitas</button>
        `;
        listaReclusos.appendChild(li);
    });
}

// Función para mostrar el historial de visitas en un modal
function mostrarHistorialVisitas(identificacionRecluso) {
    const visitas = obtenerVisitas();
    const visitasFiltradas = visitas.filter(visita => visita.identificacionRecluso === identificacionRecluso); // Filtra por identificación del recluso

    const listaVisitas = document.getElementById('listaVisitas');
    listaVisitas.innerHTML = '';

    if (visitasFiltradas.length > 0) {
        visitasFiltradas.forEach(visita => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'bg-dark', 'text-light');
            li.innerHTML = `
                <strong>Visitante:</strong> ${visita.nombreVisitante} - <strong>Fecha:</strong> ${visita.fechaVisita}
            `;
            listaVisitas.appendChild(li);
        });
    } else {
        listaVisitas.innerHTML = '<li class="list-group-item bg-dark text-light">No hay visitas registradas para este recluso.</li>';
    }

    const modal = new bootstrap.Modal(document.getElementById('historialVisitasModal'));
    modal.show();
}

// Función para obtener visitas desde LocalStorage
function obtenerVisitas() {
    let visitas;
    if (localStorage.getItem('visitas') === null) {
        visitas = [];
    } else {
        visitas = JSON.parse(localStorage.getItem('visitas'));
    }
    return visitas;
}

// Función para eliminar un recluso
function eliminarRecluso(index) {
    let reclusos = obtenerReclusos();

    // Eliminar el recluso del array
    reclusos.splice(index, 1);

    // Guardar la lista actualizada en LocalStorage
    localStorage.setItem('reclusos', JSON.stringify(reclusos));

    // Actualizar la lista de reclusos en la vista
    mostrarReclusos();
}

// Función para mostrar el modal de edición
function mostrarModalEdicion(index) {
    const reclusos = obtenerReclusos();
    const recluso = reclusos[index];

    // Llenar el formulario del modal con los datos del recluso a editar
    document.getElementById('editarNombre').value = recluso.nombre;
    document.getElementById('editarIdentificacion').value = recluso.identificacion;
    document.getElementById('editarDelito').value = recluso.delito;
    document.getElementById('editarCondena').value = recluso.condena;
    document.getElementById('editarFechaIngreso').value = recluso.fechaIngreso;

    // Guardar el índice del recluso a editar
    indexEditar.value = index;

    // Mostrar el modal
    const modal = new bootstrap.Modal(document.getElementById('editarReclusoModal'));
    modal.show();
}

// Evento para guardar los cambios al editar un recluso
editarReclusoForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const index = indexEditar.value;
    const reclusos = obtenerReclusos();

    // Actualizar los datos del recluso
    reclusos[index].nombre = document.getElementById('editarNombre').value;
    reclusos[index].identificacion = document.getElementById('editarIdentificacion').value;
    reclusos[index].delito = document.getElementById('editarDelito').value;
    reclusos[index].condena = document.getElementById('editarCondena').value;
    reclusos[index].fechaIngreso = document.getElementById('editarFechaIngreso').value;

    // Guardar los cambios en LocalStorage
    localStorage.setItem('reclusos', JSON.stringify(reclusos));

    // Actualizar la lista de reclusos en la vista
    mostrarReclusos();

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editarReclusoModal'));
    modal.hide();
});
