// HTML DOM elements 
let elWrapper = document.querySelector("#wrapper")
let elForm = document.querySelector("#form")
let elSearchInput = document.querySelector("#search_input")
let elRatingValue = document.querySelector("#rating")
let elSelectValue = document.querySelector("#category-select")
let elCounter = document.querySelector("#search_result")
let elTemplate =document.querySelector("#template-button").content;

// SPLICE MOVIES 
movies.splice(100);
let normalizeMovies = movies.map((movie)=>{
    return{
        Title: movie.Title.toString(),
        Year: movie.movie_year,
        Rating: movie.imdb_rating,
        Categories: movie.Categories,
        imageLink: `https://i.ytimg.com/vi/${movie.ytid}/mqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movie.ytid}`
    }
})
 
// RENDER MOVIES 

let elFragment = document.createDocumentFragment()

function renderMovie(item, wrapper) {
    wrapper.innerHTML = null
    item.forEach( (item) => {
        let newTemplate = elTemplate.cloneNode(true);
        newTemplate.querySelector(".card-img-top").src = item.imageLink;
        newTemplate.querySelector(".card-title").textContent = item.Title;
        newTemplate.querySelector(".card-year").textContent = item.Year;
        newTemplate.querySelector(".card-rate").textContent = item.Rating;
        newTemplate.querySelector(".card-link").href = item.youtubeLink;
        elFragment.appendChild(newTemplate)
    })
    wrapper.appendChild(elFragment)
    elCounter.textContent = item.length

}
renderMovie(normalizeMovies, elWrapper)

// SEARCH MOVIE
// function serachFind(movie_title) {
//     return normalizeMovies.filter(function (movie) {
//         return movie.Title.match(movie_title)
         
//     })
// }

// elForm.addEventListener("input", (evt) => {
//     evt.preventDefault()
//     let searchValue = elSearchInput.value.trim();

//     let pattern = new RegExp (searchValue, "gi")
//     let result = serachFind(pattern)
//     elWrapper.innerHTML = null
//     renderMovie(result, elWrapper)
// })

// RATING MOVIES 
// elForm.addEventListener("submit", (evt) => {
    //     evt.preventDefault();
    //     let ratingValue = elRatingValue.value;
//     let ratingmovies = normalizeMovies.filter(item => {
//         if(ratingValue <= item.Rating){
//             return item
//         }
//     })
//     renderMovie(ratingmovies, elWrapper)
// })

// SPLITTED CATEGORIES  

function newCategories(movie) {
    let newArray = [];

    movie.forEach(item => {
    let splitted = item.Categories.split("|")
   
    splitted.forEach(item => {
        if(!newArray.includes(item)){
           newArray.push(item)
        }
    })
})
newArray.sort()

// CREATE CATEGORIES OPTION 

let elFragmentOption = document.createDocumentFragment()

newArray.forEach(item => {
    let newOption = document.createElement("option")
    newOption.value = item
    newOption.textContent = item
    elFragmentOption.appendChild(newOption)
    elSelectValue.appendChild(elFragmentOption)
})

}
newCategories(normalizeMovies)


// // LISTENED CATEGORIES 
// elForm.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//     let optionValue = elSelectValue.value;
//     if(optionValue === "All"){
//         return normalizeMovies 
//     } else{
//         normalizeMovies.filter(item =>{
//             item.split("|").includes(item)
//         })
//     }
//     renderMovie(newArray, elWrapper)
// })

//++++++++++++++++++++++++++++++++++++++

// All FORM INPUT 

let findMovies = function (movie_title, minRating, genre) {
    return normalizeMovies.filter(function (movie) {
        let doesMatchCategory =
        genre === "All" || movie.Categories.split("|").includes(genre);
      return (
        movie.Title.match(movie_title) &&
        movie.Rating >= minRating &&
        doesMatchCategory
      );
    });
  };
  
  elForm.addEventListener("input", function (evt) {
    evt.preventDefault();
  
    let searchInput = elSearchInput.value.trim();
    let ratingInput = elRatingValue.value.trim();
    let selectOption = elSelectValue.value;
  
    let pattern = new RegExp(searchInput, "gi");
    let resultArray = findMovies(pattern, ratingInput, selectOption);
  
    renderMovie(resultArray, elWrapper);
  });