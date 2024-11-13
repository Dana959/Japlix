document.addEventListener('DOMContentLoaded', () => {
    const listaPeliculas = document.getElementById('lista');
    const inputBuscar = document.getElementById('inputBuscar');
    const btnBuscar = document.getElementById('btnBuscar');
    const detalleContenedor = document.getElementById('detallePelicula');
    const btnCerrarDetalle = document.getElementById('btnCerrarDetalle');
    const tituloPelicula = document.getElementById('tituloPelicula');
    const overviewPelicula = document.getElementById('overviewPelicula');
    const genresPelicula = document.getElementById('genresPelicula');
    const btnDetalles = document.getElementById('btnDetalles');
    const detallesAdicionales = document.getElementById('detallesAdicionales');
    const año = document.getElementById('año');
    const duracion = document.getElementById('duracion');
    const presupuesto = document.getElementById('presupuesto');
    const ganancias = document.getElementById('ganancias');

    let peliculas = [];

    // Obtener los datos de la API
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
    .then(response => response.json())
    .then(data => {
        peliculas = data;
    })
    .catch(error => console.error('Error al cargar los datos:', error));

    // Función para mostrar películas
    function mostrarPeliculas(peliculasFiltradas) {
        listaPeliculas.innerHTML = ''; 
    
        peliculasFiltradas.forEach(pelicula => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    
          // Calcular cuántas estrellas deben estar llenas
          const estrellasLlenas = Math.round(pelicula.vote_average / 2); 
    
        li.innerHTML = `
            <div>
            <strong>${pelicula.title}</strong>
            <p>${pelicula.tagline}</p>
            </div>
            <div class="d-flex align-items-center">
            
            <div class="stars">
                ${[...Array(5)].map((_, index) => {
                return `<i class="fa ${index < estrellasLlenas ? 'fa-star' : 'fa-star-o'}"></i>`;
                }).join('')}
            </div>
            </div>
        `;
        
        li.addEventListener('click', () => mostrarDetalles(pelicula));
        listaPeliculas.appendChild(li);
        });
    }
    

    // Función para mostrar detalles de una película
    function mostrarDetalles(pelicula) {
        
    detalleContenedor.style.display = 'block';
    tituloPelicula.textContent = pelicula.title;
    overviewPelicula.textContent = pelicula.overview;
    genresPelicula.innerHTML = pelicula.genres.map(genre => `<li>${genre.name}</li>`).join('');
    btnDetalles.onclick = () => {
        detallesAdicionales.style.display = detallesAdicionales.style.display === 'none' ? 'block' : 'none';
    };
    año.textContent = new Date(pelicula.release_date).getFullYear();
    duracion.textContent = `${pelicula.runtime} min`; 
    presupuesto.textContent = `$${pelicula.budget.toLocaleString()}`;
    ganancias.textContent = `$${pelicula.revenue.toLocaleString()}`;    
    }
    
    btnCerrarDetalle.addEventListener('click', () => {
        detalleContenedor.style.display = 'none';
      });

   // Función de búsqueda
btnBuscar.addEventListener('click', () => {
    const query = inputBuscar.value.toLowerCase();
    
    if (query) {
    const peliculasFiltradas = peliculas.filter(pelicula =>
        pelicula.title.toLowerCase().includes(query) || 
        (pelicula.tagline && pelicula.tagline.toLowerCase().includes(query)) ||
        (pelicula.overview && pelicula.overview.toLowerCase().includes(query)) ||
        (pelicula.genres.some(genre => genre.name.toLowerCase().includes(query))) 
    );
    mostrarPeliculas(peliculasFiltradas);
    } else {
      mostrarPeliculas(peliculas); 
    }
  }); 
});