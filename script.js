// To-Do

const apiKey = 'dc4b897051cff370b53ad1317c609445';
const apiBaseUrl = 'https://api.themoviedb.org/3';
const apiImageUrl = 'https://image.tmdb.org/t/p/w1280';


const defaultURL = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const searchURL = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;


const movieDisplay = document.getElementById("movie-display");

function displayMovies(movies)
{
    movieDisplay.innerHTML = '';

    movies.forEach(
        (movie) => {
            //declaring the neccessary variable for movie
            const poster_path = movie.poster_path;
            const title = movie.title;
            const vote_average = movie.vote_average.toFixed(1);
            const release_date = movie.release_date;

            //defining each movie
            const movieElement = document.createElement('div');
            movieElement.classList.add("movie-poster")

            movieElement.innerHTML =
            `
                <img src="${apiImageUrl + poster_path}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <p>Release Date: ${release_date}</p>
                    <p>Rating: ${vote_average}</p>
                </div>
            `;

            movieDisplay.appendChild(movieElement);
        }
    );
}

async function getMovies(url) // pulling movies from the database
{
    const response = await fetch(url); //response stores the data with fetch
    const data = await response.json(); // data stores the data stored in response, and translate to json

    //the data has been successfully pull from database, now we display them on web page
    displayMovies(data.results);
}

getMovies(defaultURL);
