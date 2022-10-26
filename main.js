const elList = document.querySelector(".movies__list");
const elTemp = document.querySelector(".movies__temp").content;

const elFragment = document.createDocumentFragment();

const elMovies = movies.slice(0 , 99)

for (const movie of elMovies){

    const elClone = elTemp.cloneNode(true);

    elClone.querySelector(".movies__title").textContent = movie.Title;
    elClone.querySelector(".movies_year").textContent = movie.movie_year;
    elClone.querySelector(".movies__cat").textContent = movie.Categories;
    elClone.querySelector(".movies__lang").textContent = movie.language;

    elFragment.appendChild(elClone);

    elList.appendChild(elFragment);

}


// const array = [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]

// const newArr = array.slice(0 , 10)

// for (const arr of newArr) {
  

    
//     const item = document.createElement("li");
//     item.textContent = arr;

//     elList.appendChild(item);

// }
