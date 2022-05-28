// HTML DOM elements 
let elWrapper = document.querySelector("#wrapper")
let elForm = document.querySelector("#form")
let elSearchInput = document.querySelector("#search_input")
let elRatingValue = document.querySelector("#rating")
let elSelectValue = document.querySelector("#category-select")
let elSelectSort = document.querySelector("#selectOptionSort")
let elCounter = document.querySelector("#search_result")
let elBookmarkedMovies = document.querySelector(".bookmarked-movies")
let elTemplate =document.querySelector("#template-button").content;
let elBookmarkTemplate =document.querySelector("#bookmarked").content;

// SPLICE MOVIES  
movies.splice(300);
let normalizeMovies = movies.map((movie, index)=>{
    return{
        id: index + 1,
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
})
elSelectValue.appendChild(elFragmentOption)

}
newCategories(normalizeMovies)

// All input 

let findMovies = function (movieTitle, minRating, genre) {
    return normalizeMovies.filter(movie => {
        let doesCategories = genre === "All" || movie.Categories.includes(genre)

        return movie.Title.match(movieTitle) && movie.Rating >= minRating && doesCategories;
    })
}
elForm.addEventListener("input", (evt) => {
    evt.preventDefault()
    let searchInput = elSearchInput.value.trim();
    let ratingInput = elRatingValue.value.trim();
    let selectOptionValue = elSelectValue.value;
    let selectSort = elSelectSort.value;
    
    let pattern = new RegExp(searchInput, "gi");
    let result = findMovies(pattern, ratingInput, selectOptionValue)
    
    if (selectSort === "high") {
        result.sort((b, a) => a.Rating - b.Rating);
    }
    
    if (selectSort === "low") {
        result.sort((a, b) => a.Rating - b.Rating);
    }

    if(selectSort === "title-grow")
    result.sort(function(a, b){
        let x = a.Title.toLowerCase();
        let y = b.Title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });

    if(selectSort === "title-decrease")
    result.sort(function(a, b){
        let x = a.Title.toLowerCase();
        let y = b.Title.toLowerCase();
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      });
    
     
    if (selectSort === "new-year") {
        result.sort((b, a) => a.Year - b.Year);
    }
    if (selectSort === "old-year") {
        result.sort((a, b) => a.Year - b.Year);
    }
   
    renderMovie(result, elWrapper);
})



//local


// let storage = window.localStorage;

// let bookmarkedMovies = JSON.parse(storage.getItem("movieArray")) || [];

// // if (getItemFromLocalStorage) {
// //     bookmarkedMovies = getItemFromLocalStorage
// // }else {
// //     bookmarkedMovies = []
// // }

// elWrapper.addEventListener("click", function (evt) {
//   let movieID = evt.target.dataset.movieItemId;

//   if (movieID) {
//     let foundMovie = normolizedMovieList.find((item) => item.id == movieID);

//     let doesInclude = bookmarkedMovies.findIndex(
//       (item) => item.id === foundMovie.id
//     );

//     if (doesInclude === -1) {
//       bookmarkedMovies.push(foundMovie);
//       storage.setItem("movieArray", JSON.stringify(bookmarkedMovies));

//       renderBookmarkedMovies(bookmarkedMovies, elBookmarkedMovies);
//     }
//   }
// });

// //Render bookmarked movies
// function renderBookmarkedMovies(array, wrapper) {
//   wrapper.innerHTML = null;
//   let elFragment = document.createDocumentFragment();
//   array.forEach(function (item) {
//     let templateBookmark = elBookmarkTemplate.cloneNode(true);

//     templateBookmark.querySelector(".movie-title").textContent = item.Title;
//     templateBookmark.querySelector(".btn-remove").dataset.markedId = item.id;

//     elFragment.appendChild(templateBookmark);
//     console.log(elFragment);
//   });

//   wrapper.appendChild(elFragment);
// }

// renderBookmarkedMovies(bookmarkedMovies, elBookmarkedMovies);

// elBookmarkedMovies.addEventListener("click", function (evt) {
//   let removedMovieId = evt.target.dataset.markedId;

//   console.log(removedMovieId);
//   if (removedMovieId) {
//     let indexOfMovie = bookmarkedMovies.findIndex(function (item) {
//       return item.id == removedMovieId;
//     });

//     bookmarkedMovies.splice(indexOfMovie, 1);
//     storage.setItem("movieArray", JSON.stringify(bookmarkedMovies));
//     storage.clear();

//     renderBookmarkedMovies(bookmarkedMovies, elBookmarkedMovies);
//   }
// });