// To-Do
// 1. API Configuration
const API_KEY = 'dc4b897051cff370b53ad1317c609445'; // You must get this from TMDB
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const DISCOVER_URL = `${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`;
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`;

// 2. Select Elements from your HTML
const movieDisplay = document.getElementById('movie-display');
const searchInput = document.querySelector('.search-engine input');
const sortSelect = document.querySelector('.search-engine select');

// 3. Initial Fetch
getMovies(DISCOVER_URL);

async function getMovies(url) {
    const res = await fetch(url);
    const data = await res.json();
    showMovies(data.results);
}

// 4. The "Show" Function (Your Plan for 20 movies)
function showMovies(movies) {
    movieDisplay.innerHTML = ''; // Clear existing dummy cards

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, release_date } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-poster');

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <p>Release Date: ${release_date}</p>
                <p>Rating: ${vote_average}/10</p>
            </div>
        `;
        movieDisplay.appendChild(movieEl);
    });
}

// 5. Search Functionality
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const searchTerm = searchInput.value;
        if (searchTerm && searchTerm !== '') {
            getMovies(SEARCH_URL + searchTerm);
            searchInput.value = '';
        } else {
            window.location.reload();
        }
    }
});