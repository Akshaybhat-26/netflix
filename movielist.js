document.addEventListener("DOMContentLoaded", () => {
    getGenresList();
    console.log(name);
});

//DECLARE API VARIABLES
let genres_list_url = "https://api.themoviedb.org/3/genre/movie/list?api_key=70250b8932a589e5eb0d444832559bee";
let movie_collection_url = "https://api.themoviedb.org/3/discover/movie?";
let img_url = "https://image.tmdb.org/t/p/w500";
let original_img_url = "https://image.tmdb.org/t/p/original";
let movie_info = "https://api.themoviedb.org/3/movie";
function getGenresList(){
    fetch(genres_list_url)
    .then(res => res.json())
    .then(data => {
        let genresArray = data.genres;
        genresArray.forEach(genre =>{
            let genreId = genre.id;
            let genreName = genre.name;
            getMovieCollectionBasedOnGenre(genreId,genreName);
        });
    });

}

function getMovieCollectionBasedOnGenre(id,name){
    fetch(movie_collection_url + new URLSearchParams({
        api_key: "70250b8932a589e5eb0d444832559bee",
        with_genres: id,
        page: 1
    }))
    .then(res => res.json())
    .then(data => {
        createDOMContainer(name,data);
        console.log(name,data);

    })
    .catch(err =>  console.log(err));
}

function createDOMContainer(genre_name,genre_data){
    let genreName = genre_name;
    if(genre_name == "Science Fiction" || genre_name == "TV Movie"){
        let a = genre_name.replace(" ","_");
        genre_name = a;
    }

    let movie_box = document.querySelector(".movie-box");
    movie_box.innerHTML+=
    `<div class="genre ps-3" id=${genre_name}>
        <div class="title fs-2 py-3 text-white">
            ${genreName}
        </div>
        <ul class="movie-list d-flex owl-carousel ps-1 mb-0">
        </ul>
    </div>`
    showGenreResults(genre_name,genre_data);
    activateOwlCarousel();
}

function showGenreResults(genre_name,genre_data){
    console.log("genre_data",genre_data)
    genre_data.results.forEach(res => {
        let movie_list = document.querySelector("#"+genre_name).querySelector(".movie-list")
        let original_title = res.original_title;
        let poster_path = res.poster_path;
        let movie_id = res.id;
        movie_list.innerHTML+=
        `<li class="movie-item item" data-id="/${movie_id}" onClick="getMovieInfo(this)">
            <img src="${img_url+poster_path}" class="img-fluid" alt="...">
            <p class="movie-text px-3 mb-0 position-absolute w-100 text-white">${original_title}</p>
        </li>`
    });
}


function activateOwlCarousel(){
    console.log("I am called!!!")
    $('.owl-carousel').owlCarousel({
        loop:false,
        margin:10,
        nav:true,
        singleItem:true,
        autoplay: true,
        navText: [
            "<i class='fa fa-caret-left'></i>",
            "<i class='fa fa-caret-right'></i>"
          ],
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:4
            }
        }
    });


}


//MOVIE DETAILS
function getMovieInfo(listItem){
    let id = listItem.getAttribute('data-id');
    // fetching movie details

    fetch(`${movie_info}${id}?` + new URLSearchParams({
        api_key: "70250b8932a589e5eb0d444832559bee"
    }))
    .then(res => res.json())
    .then(movieInfo => {
        console.log("movie info",movieInfo);
        let backdrop = original_img_url+movieInfo.backdrop_path;
        let original_title = movieInfo.original_title;
        let year = movieInfo.release_date.split("-")[0];
        let genresArray = movieInfo.genres;
        let genres = [];
        genresArray.forEach(genre => {
            genres.push(genre.name);
        });
        let genresList = genres.join(", ");
        let overview = movieInfo.overview;
        let idWithoutSlash = id.substr(1);
        let m = document.querySelector("#modal-jee");
        m.innerHTML+=
        `<div class="modal fade" id="staticBackdrop${idWithoutSlash}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true"><div class="modal-dialog modal-dialog-scrollable modal-fullscreen">
            <div class="modal-content">
                <div class="modal-body p-0 text-white" style="background: url(${backdrop}) 0 0 no-repeat scroll;height:100vh;background-size:cover">
                <header class="px-3 py-1 d-flex align-items-center justify-content-between bg-dark position-fixed w-100">
                    <h1 class="logo mb-0">
                        <svg viewBox="0 0 111 30" class="svg-icon svg-icon-netflix-logo" aria-hidden="true" focusable="false">
                            <g id="netflix-logo">
                                <path
                                    d="M105.06233,14.2806261 L110.999156,30 C109.249227,29.7497422 107.500234,29.4366857 105.718437,29.1554972 L102.374168,20.4686475 L98.9371075,28.4375293 C97.2499766,28.1563408 95.5928391,28.061674 93.9057081,27.8432843 L99.9372012,14.0931671 L94.4680851,-5.68434189e-14 L99.5313525,-5.68434189e-14 L102.593495,7.87421502 L105.874965,-5.68434189e-14 L110.999156,-5.68434189e-14 L105.06233,14.2806261 Z M90.4686475,-5.68434189e-14 L85.8749649,-5.68434189e-14 L85.8749649,27.2499766 C87.3746368,27.3437061 88.9371075,27.4055675 90.4686475,27.5930265 L90.4686475,-5.68434189e-14 Z M81.9055207,26.93692 C77.7186241,26.6557316 73.5307901,26.4064111 69.250164,26.3117443 L69.250164,-5.68434189e-14 L73.9366389,-5.68434189e-14 L73.9366389,21.8745899 C76.6248008,21.9373887 79.3120255,22.1557784 81.9055207,22.2804387 L81.9055207,26.93692 Z M64.2496954,10.6561065 L64.2496954,15.3435186 L57.8442216,15.3435186 L57.8442216,25.9996251 L53.2186709,25.9996251 L53.2186709,-5.68434189e-14 L66.3436123,-5.68434189e-14 L66.3436123,4.68741213 L57.8442216,4.68741213 L57.8442216,10.6561065 L64.2496954,10.6561065 Z M45.3435186,4.68741213 L45.3435186,26.2498828 C43.7810479,26.2498828 42.1876465,26.2498828 40.6561065,26.3117443 L40.6561065,4.68741213 L35.8121661,4.68741213 L35.8121661,-5.68434189e-14 L50.2183897,-5.68434189e-14 L50.2183897,4.68741213 L45.3435186,4.68741213 Z M30.749836,15.5928391 C28.687787,15.5928391 26.2498828,15.5928391 24.4999531,15.6875059 L24.4999531,22.6562939 C27.2499766,22.4678976 30,22.2495079 32.7809542,22.1557784 L32.7809542,26.6557316 L19.812541,27.6876933 L19.812541,-5.68434189e-14 L32.7809542,-5.68434189e-14 L32.7809542,4.68741213 L24.4999531,4.68741213 L24.4999531,10.9991564 C26.3126816,10.9991564 29.0936358,10.9054269 30.749836,10.9054269 L30.749836,15.5928391 Z M4.78114163,12.9684132 L4.78114163,29.3429562 C3.09401069,29.5313525 1.59340144,29.7497422 0,30 L0,-5.68434189e-14 L4.4690224,-5.68434189e-14 L10.562377,17.0315868 L10.562377,-5.68434189e-14 L15.2497891,-5.68434189e-14 L15.2497891,28.061674 C13.5935889,28.3437998 11.906458,28.4375293 10.1246602,28.6868498 L4.78114163,12.9684132 Z"
                                    id="Fill-14"></path>
                            </g>
                        </svg>
                    </h1>
                </header>
                <div class="movie-info w-50 h-100 d-flex flex-column justify-content-end p-4 fs-5">
                    <p>${original_title}</p>
                    <p>${year} | ${genresList}</p>
                    <p>${overview}</p>
                    <div class="cross-icon cursor-pointer" data-bs-dismiss="modal">&#x292C;</div>
                </div>
                <div class="videos">
                    <p class="fs-3 ps-3">Videos</p>
                    <ul id="videos">

                    </ul>
                </div>
            </div>
            </div>
        </div>`;

        let modalId = "#staticBackdrop"+idWithoutSlash;
        const myModal = new bootstrap.Modal(modalId, {
            keyboard: false,
        })

        const modalToggle = document.getElementById(modalId);
        myModal.show(modalToggle)
    });
    setTimeout(() => {
        getVideos(id);
    },3000);
}

//YOUTUBE VIDEOS
function getVideos(id){
    fetch(`${movie_info}${id}/videos?` + new URLSearchParams({
        api_key: "70250b8932a589e5eb0d444832559bee"
    }))
    .then(res => res.json())
    .then(data => {
        console.log("videos",data);
        let maxClips = (data.results.length > 4) ? 4 : data.results.length;
        let videosWrapper = document.querySelector("#videos");
        console.log(videosWrapper);
        for (let index = 0; index < maxClips; index++) {
            const key = data.results[index].key;
            if(videosWrapper == null ) return;
            videosWrapper.innerHTML+=`<iframe src="https://youtube.com/embed/${data.results[index].key}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            `;
        }
    })
}