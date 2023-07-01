// const loginForm = document.getElementById("loginForm");
// const homePage = document.getElementById("homePage");
// const movieDetails = document.getElementById("movieDetails");
// const logOutBtn = document.querySelector(".logout-btn");
// const searchInput = document.querySelector("#search");
// const searchForm = document.querySelector(".search-form");
// const loginPage = document.getElementById("loginPage");
// const logo = document.querySelector(".logo");

// const onLogin = (event) => {
//   event.preventDefault();

//   const emailInput = document.getElementById("email");
//   const passwordInput = document.getElementById("password");

//   if (emailInput.value && passwordInput.value) {
//     localStorage.setItem("isLoggedIn", "true");
//     location.hash = "";
//   } else {
//     console.log("Invalid login credentials");
//   }

//   emailInput.value = "";
//   passwordInput.value = "";
// };

// loginForm.addEventListener("submit", onLogin);

// const drawMovie = (movieCard) => {
//   return `<div class="movie" data-id="${movieCard.id}">
//     <img src="${movieCard.image}" />
//     <h2>${movieCard.title}</h2>
//     <p>${movieCard.genre}</p>
//     <p>${movieCard.year}</p>
//   </div>`;
// };

// const renderMovies = () => {
//   homePage.innerHTML = "";

//   movieList.forEach((movie) => {
//     const movieCard = drawMovie(movie);
//     homePage.innerHTML += movieCard;
//   });
// };

// const handleRoute = () => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");

//   if (!isLoggedIn) {
//     location.hash = "#login";
//   }
// Changed this to always true
// Changed each individual case, with includes method for better finding the route
//   switch (true) {
//     case location.hash.includes("#login"):
//       if (isLoggedIn) {
//         location.hash = "";
//       } else {
//         loginPage.style.display = "block";
//         searchForm.style.display = "none";
//         logOutBtn.style.display = "none";
//         movieDetails.style.display = "none";
//         homePage.style.display = "none";
//         console.log("Login route");
//       }
//       break;
//     case location.hash === "":
//       homePage.style.display = "block";
//       searchForm.style.display = "block";
//       logOutBtn.style.display = "block";
//       loginPage.style.display = "none";
//       movieDetails.style.display = "none";
//       renderMovies();
//       console.log("Home page and successfully logged in");
//       break;
//     case location.hash.includes("#moviedetails"):
//       const hash = location.hash;
//       const movieId = hash.split("/")[1];
//       console.log("Movie details route for ID:", movieId);

// Adjusted finding the corrent movie, used parseInt on movieID, because movie.id is a integer, and movieId is a string
//       let movie = movieList.find((movie) => movie.id === parseInt(movieId));

//       console.log(movie);

//       homePage.style.display = "none";
//       searchForm.style.display = "none";
//       logOutBtn.style.display = "block";
//       loginPage.style.display = "none";
//       movieDetails.style.display = "block";

//       movieDetails.innerHTML = "";

//       const movieCard = drawMovie(movie);
//       movieDetails.innerHTML += movieCard;
//       console.log(movie);
//       break;
//     default:
//       location.hash = "";
//       console.log("Empty strings");
//   }
// };

// window.addEventListener("load", handleRoute);
// window.addEventListener("hashchange", handleRoute);

// const onLogout = () => {
//   localStorage.removeItem("isLoggedIn");
//   location.hash = "#login";
// };

// logOutBtn.addEventListener("click", onLogout);
// searchForm.addEventListener("keyup", () => {
//   let searchQuery = searchInput.value.toLowerCase();

//   const filteredMovies = movieList.filter((movie) => {
//     return (
//       movie.title.toLowerCase().includes(searchQuery) ||
//       movie.year.toString().includes(searchQuery) ||
//       movie.genre.join(", ").toLowerCase().includes(searchQuery)
//     );
//   });

// homePage.innerHTML += filteredMovies;
//   console.log({ filteredMovies });
//   homePage.innerHTML = "";
//   filteredMovies.forEach((mov) => {
//     const movieCard = drawMovie(mov);
//     homePage.innerHTML += movieCard;
//   });
// });
// Remade the click event for each individual card, this is not a good solution, but it works :)
// window.addEventListener("click", (event) => {
//   if (event.target.hasAttribute("data-id")) {
// console.log(event.target.getAttribute("data-id"));
//     location.hash = `#moviedetails/${event.target.getAttribute("data-id")}`;
//   } else if (event.target.parentElement.hasAttribute("data-id")) {
// console.log(event.target.parentElement.getAttribute("data-id"));
//     location.hash = `#moviedetails/${event.target.parentElement.getAttribute(
//       "data-id"
//     )}`;
//   }
// });
// const goHome = () => {
//   location.hash = "";
//   homePage.innerHTML = "";
//   searchInput.value = "";
//   movieList.forEach((mov) => {
//     const movieCard = drawMovie(mov);
//     homePage.innerHTML += movieCard;
//   });
// }
// logo.addEventListener("click", goHome);

// Global settings for the whole web

const loginForm = document.getElementById("loginForm");
const homePage = document.getElementById("homePage");
const movieDetails = document.getElementById("movieDetails");
const logOutBtn = document.querySelector(".logout-btn");
const searchInput = document.querySelector("#search");
const searchForm = document.querySelector(".search-form");
const loginPage = document.getElementById("loginPage");
const logo = document.querySelector(".logo");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

// Handle login function is for the login page,whether the user is logged in or not.
function handleLogin(e) {
  e.preventDefault();
  // With this check we are saying,if the user inputs are blanked(or there is no value) throw an alert,and return nothing.
  if (!emailInput.value || !passwordInput.value) {
    alert("Please fill in both fields");
    return;
  }
  // The local storage making us saved the data for the next time we try to open the website,but this is only on our local computers.
  // Also with the local storage,with the method setItem,we are setting one key(isLoggedIn) and one value(true) in this case.
  localStorage.setItem("isLoggedIn", true);
  // With the location hash,we are setting the Route to be on empty strings,we want to show the user that route we are setting with the location.hash(in this case,the default route is homepage)
  location.hash = "";
  // With the reset method,we are clearing all inputs that have this login form.
  loginForm.reset();
}
// Draw movie function,function made with one parameter,cause we are reusing more times base on the code.
const drawMovie = (movieCard) => {
  let divEl = document.createElement("div");
  divEl.classList.add("movie");

  divEl.innerHTML += `<img src="${movieCard.image}" />
    <h2>${movieCard.title}</h2>
    <p>${movieCard.genre}</p>
    <p>${movieCard.year}</p>
  `;
  divEl.addEventListener("click", () => {
    location.hash = `#movieDetails/${movieCard.id}`;
  });
  return divEl;
};
const handleRoute = (e) => {
  e.preventDefault();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  let _hash = location.hash;
  // We are saying if the value is false than set the hash location to #login.
  if (!isLoggedIn) {
    _hash = "#login";
  }
  loginPage.style.display = "none";
  homePage.style.display = "none";
  movieDetails.style.display = "none";
  searchForm.style.display = "none";
  logOutBtn.style.display = "none";

  if (_hash.includes("#login")) {
    // Checking if the user is not logged in than we are setting the login page to block
    loginPage.style.display = "block";
  } else if (_hash.includes("")) {
    // checking if the hash location include the empty string,and than we are setting the homePage to display block
    homePage.innerHTML = "";
    // Making a for loop to the database,to show every movie,who is inside this database.
    movieList.forEach((movie) => {
      let movieEl = drawMovie(movie);
      homePage.append(movieEl);
    });
    homePage.style.display = "block";
    searchForm.style.display = "block";
    logOutBtn.style.display = "block";
    // Making the search input functional.
    searchForm.addEventListener("keyup", () => {
      let searchQuery = searchInput.value.toLowerCase();
      // The filtering method it's simillar to the forLoop,it's filtering through the items,taking a callback function,the parameter it's a must,and than is returning something.
      const filteredMovies = movieList.filter((movie) => {
        return (
          movie.title.toLowerCase().includes(searchQuery) ||
          movie.year.toString().includes(searchQuery) ||
          movie.genre.join(", ").toLowerCase().includes(searchQuery)
        );
      });
      homePage.innerHTML = "";
      filteredMovies.forEach((mov) => {
        const movieCard = drawMovie(mov);
        homePage.appendChild(movieCard);
      });
    });
  } else if (_hash.includes("movieDetails")) {
    // With this we are checking if the user clicked on some of the movie,and we are setting the location hash to true in this case.
    // In summary, the code extracts the current movie ID from the URL hash and searches for the corresponding movie object in the movieList array. The resulting movie object is assigned to the clickedMovie variable.
    let currentMovieId = Number(location.hash.split("/")[1]);
    let clickedMovie = movieList.find((mov) => mov.id === currentMovieId);

    movieDetails.innerHTML = "";
    let movieCardDetail = drawMovie(clickedMovie);
    movieDetails.style.display = "block";
    movieDetails.style.display = "block";
    logOutBtn.style.display = "block";
    movieDetails.append(movieCardDetail);
  } else {
    _hash = "";
  }
};

const onLogOut = (e) => {
  e.preventDefault();
  // logout function,only removing the key with his value from the localstorage,or making the local storage to be on false.
  localStorage.removeItem("isLoggedIn");
  location.hash = "#login";
};
const goHome = () => {
  location.hash = "";
  homePage.innerHTML = "";
  searchInput.value = "";
  movieList.forEach((mov) => {
    const movieCard = drawMovie(mov);
    homePage.appendChild(movieCard);
  });
};
logo.addEventListener("click", goHome);
// Handling route,with the location hash.
window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);

loginForm.addEventListener("submit", handleLogin);
logOutBtn.addEventListener("click", onLogOut);

// Two different solutions for the Movie WebSite,One with SWITCH SOLUTION,and the other is with IF ELSE STATEMENT.
// Also in the second solution the code it's little optimized.
