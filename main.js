const elList = document.querySelector(".movies__list");
const elTemp = document.querySelector(".movies__temp").content;
const elFragment = document.createDocumentFragment();

// FORM ============
const elFormSearch = document.querySelector(".form")
const elSearch = document.querySelector(".input__search");
const elSelect = document.querySelector(".form-select");
const elOptionAll = document.querySelector(".option-js");
const elMinYear = document.querySelector(".input__min");
const elMaxYear = document.querySelector(".input__max");
const elSelectSort = document.querySelector(".select__sort")

// Modal ==========
const elModal = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal-title");
const modalIframe = document.querySelector(".modal-iframe");
const modalRating = document.querySelector(".modal-rating");
const modalYear = document.querySelector(".modal-year");
const modalRuntime = document.querySelector(".modal-runtime");
const modalCateg = document.querySelector(".modal-categories");
const modalSumm = document.querySelector(".modal-summary");
const modalLink = document.querySelector(".modal-imdb-link")

// GrettingHour

function greetingHour(time){
    
    const hours = Math.floor(time / 60);
    const minut = Math.floor(time % 60);
    
    return `${hours} hrs ${minut} min`;
};

// RenderMovie Domga kinoni chizish

function renderMovie(kino){
    
    elList.innerHTML = "";
    
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


// RenderMovieInfo Modalga chizish

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


// Even Delegation elList

elList.addEventListener("click" , function(evt){
    
    if(evt.target.matches(".movies-btn")){
        
        const btnId = evt.target.dataset.id;
        const findMovie = movies.find(movie => movie.imdb_id === btnId);
        
        renderMovieInfo(findMovie);
    };
});


// Elselect ============

function renderSelect(item){
    
    const selectArr = [];
    item.forEach(selectItem => {
        selectItem.Categories.split("|").forEach(selectList => {
            if(!selectArr.includes(selectList)){
                selectArr.push(selectList);
            };
        });
        
    });
    
    const elSelectFragment = document.createDocumentFragment();
    
    selectArr.forEach(option => {
        
        const elOption = document.createElement("option");
        
        elOption.value = option;
        elOption.textContent = option;
        
        elSelectFragment.appendChild(elOption);
        
    });
    
    elSelect.appendChild(elSelectFragment);
};


// ElSort ====================


function renderSort(moviesort,value){
    
    if(value == "a-z"){
        moviesort.sort((a , b) => {
            if(a.Title > b.Title){
                return 1
            };
            if(a.Title < b.Title){
                return -1
            }else {
                return 0;
            };
        });
    };
    
    if(value == "z-a"){
        moviesort.sort((a , b) => {
            if(a.Title > b.Title){
                return -1
            };
            if(a.Title < b.Title){
                return 1
            }else {
                return 0;
            };
        });
    };
    
    if(value === "10-1"){
        moviesort.sort((a,b) => b.imdb_rating - a.imdb_rating);
    };
    
    if(value === "1-10"){
        moviesort.sort((a,b) => a.imdb_rating - b.imdb_rating);
    }
    
    if(value === "2018-2000"){
        moviesort.sort((a,b) => b.movie_year - a.movie_year);
    };
    
    if(value === "2000-2018"){
        moviesort.sort((a,b) => a.movie_year - b.movie_yea);
    }
      
}


// ElformSearch 

elFormSearch.addEventListener("submit" , function(evt){
    evt.preventDefault();
    
    const elSearchValue = elSearch.value.trim();
    const elSelectValue = elSelect.value;
    const elMinYearValue = elMinYear.value;
    const elMaxYearValue = elMaxYear.value;
    const elSelectSortValue = elSelectSort.value;
        
    const regTitle = new RegExp(elSearchValue , "gi");
    
    const searchMovie = movies.filter(element => String(element.Title).match(regTitle) && (element.Categories.includes(elSelectValue) || elSelectValue === "All") && (elMinYearValue <= element.movie_year || elMinYearValue === "") && (elMaxYearValue >= element.movie_year || elMaxYearValue === ""));
    
    
    if(searchMovie.length > 0){
        renderMovie(searchMovie);
        renderSort(searchMovie, elSelectSortValue);
    }else{
        elList.textContent = "Not found Movies❌❌❌"
    }
});

renderSelect(movies);
renderMovie(movies.slice(0,99));


elModal.addEventListener("hide.bs.modal", function(){
    modalIframe.src = "";
});
