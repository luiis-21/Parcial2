// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const reporteActividadesForm = document.getElementById('reporteActividadesForm');
    const listaReportes = document.getElementById('listaReportes');

    // Cargar reportes desde LocalStorage al cargar la página
    cargarReportes();

    // Función para cargar reportes desde LocalStorage
    function cargarReportes() {
        const reportes = JSON.parse(localStorage.getItem('reportes')) || [];
        reportes.forEach(reporte => {
            agregarReporteALista(reporte);
        });
    }

    // Agregar reporte a la lista visualmente
    function agregarReporteALista(reporte) {
        const li = document.createElement('li');
        li.className = 'list-group-item bg-dark text-light';
        li.textContent = `Fecha: ${reporte.fecha}, Visitas: ${reporte.visitas}, Evento: ${reporte.evento}, Actividad: ${reporte.actividad}`;
        listaReportes.appendChild(li);
    }

    // Manejar el evento de envío del formulario
    reporteActividadesForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevenir el envío del formulario

        // Obtener los valores del formulario
        const numeroVisitas = document.getElementById('numeroVisitas').value;
        const eventoSeleccionado = document.getElementById('eventos').value;
        const actividadSeleccionada = document.getElementById('actividadesRecreativas').value;
        const fechaReporte = document.getElementById('fechaReporte').value;

        // Crear un objeto para el reporte
        const reporte = {
            visitas: numeroVisitas,
            evento: eventoSeleccionado,
            actividad: actividadSeleccionada,
            fecha: fechaReporte
        };

        // Guardar el reporte en LocalStorage
        guardarReporte(reporte);
        
        // Limpiar el formulario
        reporteActividadesForm.reset();
    });

    // Función para guardar el reporte en LocalStorage
    function guardarReporte(reporte) {
        const reportes = JSON.parse(localStorage.getItem('reportes')) || [];
        reportes.push(reporte);
        localStorage.setItem('reportes', JSON.stringify(reportes));
        
        // Agregar el reporte a la lista visualmente
        agregarReporteALista(reporte);
    }
});
