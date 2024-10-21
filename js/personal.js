// Función para obtener el personal desde localStorage
function obtenerPersonal() {
    const personalJSON = localStorage.getItem('personal');
    return personalJSON ? JSON.parse(personalJSON) : [];
}

// Función para guardar el personal en localStorage
function guardarPersonal(personal) {
    localStorage.setItem('personal', JSON.stringify(personal));
}

// Función para renderizar la lista de personal
function renderizarPersonal() {
    const listaPersonal = document.getElementById('listaPersonalCompleta');
    listaPersonal.innerHTML = '';

    const personal = obtenerPersonal();
    personal.forEach((miembro, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            ${miembro.nombre} - ${miembro.rol} - ${miembro.permisos}
            <div>
                <button class="btn btn-warning btn-sm me-2" onclick="abrirModalEditar(${index})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="abrirModalEliminar(${index})">Eliminar</button>
            </div>
        `;
        
        listaPersonal.appendChild(li);
    });
}

// Función para abrir el modal de edición
function abrirModalEditar(index) {
    const personal = obtenerPersonal();
    const miembro = personal[index];

    document.getElementById('indexEditar').value = index;
    document.getElementById('editarNombrePersonal').value = miembro.nombre;
    document.getElementById('editarRol').value = miembro.rol;
    document.getElementById('editarPermisos').value = miembro.permisos;

    const modal = new bootstrap.Modal(document.getElementById('editarPersonalModal'));
    modal.show();
}

// Función para abrir el modal de eliminación
function abrirModalEliminar(index) {
    const modal = new bootstrap.Modal(document.getElementById('eliminarPersonalModal'));
    modal.show();

    const confirmarEliminar = document.getElementById('confirmarEliminar');
    confirmarEliminar.onclick = () => eliminarPersonal(index);
}

// Función para eliminar un miembro del personal
function eliminarPersonal(index) {
    const personal = obtenerPersonal();
    personal.splice(index, 1);
    guardarPersonal(personal);
    renderizarPersonal();

    const modal = bootstrap.Modal.getInstance(document.getElementById('eliminarPersonalModal'));
    modal.hide();
}

// Evento para agregar personal
document.getElementById('personalForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombrePersonal').value;
    const rol = document.getElementById('rol').value;
    const permisos = document.getElementById('permisos').value;

    const personal = obtenerPersonal();
    personal.push({ nombre, rol, permisos });
    guardarPersonal(personal);
    renderizarPersonal();

    this.reset(); // Reinicia el formulario
});

// Evento para editar personal
document.getElementById('editarPersonalForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const index = document.getElementById('indexEditar').value;
    const nombre = document.getElementById('editarNombrePersonal').value;
    const rol = document.getElementById('editarRol').value;
    const permisos = document.getElementById('editarPermisos').value;

    const personal = obtenerPersonal();
    personal[index] = { nombre, rol, permisos };
    guardarPersonal(personal);
    renderizarPersonal();

    const modal = bootstrap.Modal.getInstance(document.getElementById('editarPersonalModal'));
    modal.hide();
});

// Evento para buscar personal
document.getElementById('busquedaPersonal').addEventListener('input', function() {
    const filtro = this.value.toLowerCase();
    const listaPersonal = document.getElementById('listaPersonal');
    listaPersonal.innerHTML = '';

    const personal = obtenerPersonal();
    const resultados = personal.filter(miembro =>
        miembro.nombre.toLowerCase().includes(filtro) ||
        miembro.rol.toLowerCase().includes(filtro) ||
        miembro.permisos.toLowerCase().includes(filtro)
    );

    resultados.forEach(miembro => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${miembro.nombre} - ${miembro.rol} - ${miembro.permisos}`;
        listaPersonal.appendChild(li);
    });
});

// Inicializar la lista de personal al cargar la página
document.addEventListener('DOMContentLoaded', renderizarPersonal);
