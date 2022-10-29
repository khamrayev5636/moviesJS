const elList = document.querySelector(".movies__list");
const elTemp = document.querySelector(".movies__temp").content;
const elForm = document.querySelector(".form")
const elSearch = document.querySelector(".input__search");
const elFragment = document.createDocumentFragment();

// Modal =====

const elModal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalIframe = document.querySelector(".modal-iframe");
const modalRating = document.querySelector(".modal-rating");
const modalYear = document.querySelector(".modal-year");
const modalRuntime = document.querySelector(".modal-runtime");
const modalCateg = document.querySelector(".modal-categories");
const modalSumm = document.querySelector(".modal-summary");
const modalLink = document.querySelector(".modal-imdb-link")



function greetingHour(time){

    const hours = Math.floor(time / 60);
    const minut = Math.floor(time % 60);

    return `${hours} hrs ${minut} min`;
}

function renderMovie(kino){

    elList.textContent = "";

    

    kino.forEach(item => {
        
        const elClone = elTemp.cloneNode(true);

        elClone.querySelector(".movie-img").src =`https://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg`
        elClone.querySelector(".movies__title").textContent = item.Title;
        elClone.querySelector(".movies__rating").textContent = item.imdb_rating;
        elClone.querySelector(".movies__year").textContent = item.movie_year;
        elClone.querySelector(".movies__runtime").textContent = greetingHour(item.runtime);
        elClone.querySelector(".movies__cat").textContent = item.Categories.split("|").join(", ")
        elClone.querySelector(".movies-btn").dataset.id = item.imdb_id;

        elFragment.appendChild(elClone);
    });
    elList.appendChild(elFragment);
};


function renderMovieInfo(topilganKino){

    modalTitle.textContent = topilganKino.Title;
    modalIframe.src = `https://www.youtube-nocookie.com/embed/${topilganKino.ytid}`;
    modalRating.textContent = topilganKino.imdb_rating;
    modalYear.textContent = topilganKino.movie_year;
    modalRuntime.textContent = greetingHour(topilganKino.runtime);
    modalCateg.textContent = topilganKino.Categories.split("|").join(", ");
    modalSumm.textContent = topilganKino.summary;
    modalLink.href = `https://www.imdb.com/title/${topilganKino.imdb_id}`;
};

// Even Delegation

elList.addEventListener("click" , function(evt){

    if(evt.target.matches(".movies-btn")){

        const btnId = evt.target.dataset.id;
        const findMovie = movies.find(movie => movie.imdb_id === btnId);

        renderMovieInfo(findMovie);
    };
});

elForm.addEventListener("submit" , function(evt){
    evt.preventDefault();

    const  elSearchValue = elSearch.value.trim();

    const elSearchReg = new RegExp(elSearchValue , "gi");

    const findSearch = movies.filter(searchKino => String(searchKino.Title).match(elSearchReg));

    renderMovie(findSearch);

})



renderMovie(movies);


elModal.addEventListener("hide.bs.modal", function(){
    modalIframe.src = "";
})





// function getDuration(time) {

//     const hours = Math.floor(time / 60);
//     const minut = Math.floor(time % 60);

//     return `${hours} hrs ${minut} min`

// }


// function renderMovies(kino){

//     kino.forEach(item => {

//         const elClone = elTemp.cloneNode(true);

//         elClone.querySelector(".movie-img").src = `https://i3.ytimg.com/vi/${item.ytid}/mqdefault.jpg`
//         elClone.querySelector(".movies__title").textContent = item.Title;
//         elClone.querySelector(".movies__rating").textContent = item.imdb_rating;
//         elClone.querySelector(".movies__year").textContent = item.movie_year;
//         elClone.querySelector(".movies__runtime").textContent = getDuration(item.runtime);
//         elClone.querySelector(".movies__cat").textContent = item.Categories.split("|").join(", ");
//         elClone.querySelector(".movies-btn").dataset.id = item.imdb_id;
//         elFragment.appendChild(elClone);

//     });
//     elList.appendChild(elFragment);
// }


// function renderMoviesInfo(topilganKino){

//     modalTitle.textContent = topilganKino.Title;
//     modalIframe.src = `https://www.youtube-nocookie.com/embed/${topilganKino.ytid}`;
//     modalRating.textContent = topilganKino.imdb_rating;
//     modalYear.textContent = topilganKino.movie_year;
//     modalRuntime.textContent = getDuration(topilganKino.runtime);
//     modalCateg.textContent = topilganKino.Categories.split("|").join(", ");
//     modalSumm.textContent = topilganKino.summary;
    // modalLink.href = `https://www.imdb.com/title/${topilganKino.imdb_id}`;
// }

// elList.addEventListener("click" ,function(evt){
//     const targetElement = evt.target;
//     if(targetElement.matches(".movies-btn")){

//         // buttonning id attributining qiymatini olib, o'sha qiymatga ega bo'lgan kinoni topish
//         const btnId = targetElement.dataset.id;
//         const foundMovies = movies.find(movie => movie.imdb_id === btnId);
//         renderMoviesInfo(foundMovies);
//     }
// });

// elModal.addEventListener("hide.bs.modal", function(){
//     modalIframe.src = "";
// })

// renderMovies(movies.slice(0 , 33));

