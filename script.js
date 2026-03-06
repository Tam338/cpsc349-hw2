// To-Do

const apiKey = 'dc4b897051cff370b53ad1317c609445';
const apiBaseUrl = 'https://api.themoviedb.org/3';
const apiImageUrl = 'https://image.tmdb.org/t/p/w1280';


const defaultURL = `${apiBaseUrl}/discover/movie?api_key=${apiKey}`;
const searchURL = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

const movieDisplay = document.getElementById("movie-display");
const prevButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

let currentPage = defaultURL;

function displayMovies(movies)
{
    movieDisplay.innerHTML = '';


    //movies array using method forEach to add movies into the movieDisplay
    //it's using an anonymous function, which takes in movie object as arg, to grab the movie's info
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
    currentMovies = data.results;
    displayMovies(currentMovies);

    //data for buttons
    currentPage = data.page;
    totalPage = data.total_pages;
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = currentPage == totalPage;

    document.getElementById("page_info").innerHTML = `Page ${currentPage} of ${totalPage}`;
}

getMovies(defaultURL);




///////////// functionality /////////////


//search functionality
const search = document.getElementById("searchQuery");

const handleSearch = (event_) => {
    const inputValue = event_.target.value.trim();

    if( inputValue && inputValue !== '')
    {
        currentPage = getMovies(searchURL + '&query=' + inputValue);
    } 
    else
        {
            getMovies(defaultURL);
        }
} 

search.addEventListener('input', handleSearch);


//sort by functionality
const sortContainer = document.getElementById("sort-container");

const handleSort = (event_) => {
    const sortType = event_.target.value;

    let sorted_url = defaultURL;

    if( sortType === "Sort By")
    {
        sorted_url = defaultURL;
    }
    else if( sortType === "Release Date (Asc)")
    {
        sorted_url += "&sort_by=primary_release_date.asc";
    }
    else if (sortType == "Release Date (Desc)")
    {
        sorted_url += "&sort_by=primary_release_date.desc";
    }
    else if (sortType == "Rating (Asc)")
    {
        sorted_url += "&sort_by=vote_average.asc";
    }
    else if (sortType == "Rating (Desc)")
    {
        sorted_url += "&sort_by=vote_average.desc";
    }


    currentPage = getMovies(sorted_url);
}

sortContainer.addEventListener('change', handleSort);



//buttons

let currentPageCounter = 1;

const handleNextButton = () => {
    currentPageCounter++;
    //let nextPage = defaultURL +`&page=${currentPageCounter}`;
    let nextPage = currentPage + `&page=${currentPageCounter}`;

    getMovies(nextPage);
}; 

nextButton.addEventListener('click' , handleNextButton);


const handlePrevButton = () => {
    currentPageCounter--;
    //let prevPage = defaultURL +`&page=${currentPageCounter}`;
    let prevPage = currentPage +`&page=${currentPageCounter}`;

    getMovies(prevPage);
}; 

prevButton.addEventListener('click' , handlePrevButton);