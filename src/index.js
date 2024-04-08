function fetchMovie() {
    fetch("http://localhost:3000/films")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response is not Ok");
            }
            return response.json();
        }).then(movieData => {
            const films = movieData[0]
            const poster = document.getElementById("poster");
            poster.src = films.poster;

            const title = document.getElementById("title");
            title.textContent = films.title;

            const runtime = document.getElementById("runtime");
            runtime.textContent = films.runtime + "minutes";

            const showTime = document.getElementById("showtime");
            showTime.textContent = films.showtime;

            const capacity = films.capacity
            const ticketsSold = films.tickets_sold

            const remTickets = document.getElementById("ticket-num");
            remTickets.textContent = capacity - ticketsSold;

            const descripton = document.getElementById("film-info");
            descripton.textContent = films.description;
        })
        .catch(error => {
            console.log("Error fetching movie data:", error);
        })
}

fetchMovie();

// const parent = document.getElementById("films");
// const child = document.getElementsByClassName("film item");
// parent.removeChild(child); 
// Why is this not working ??

// const ListOfFilms = document.getElementById("films");
// const placeHolder = ListOfFilms.querySelector(".film.item");
// if (placeHolder) {
//     placeHolder.remove();
// }
function populateMovieList() {
    // const filmsList = document.getElementById("films");

    // Remove placeholder li
    const listOfFilms = document.getElementById("films");
    const placeHolder = listOfFilms.querySelector(".film.item");
    if (placeHolder) {
        placeHolder.remove();
    }

    // Add movie title list items
    theMovieTitles.forEach(title => {
        const li = document.createElement("li");
        li.classList.add("film", "item");
        li.textContent = title;
        listOfFilms.appendChild(li);
    });
}

const theMovieTitles = [
    "The Giant Gila Monster",
    "Manos: The Hands Of Fate",
    "Time Chasers",
    "The Touch Of Satan",
    "Santa Claus Conquers The Martians",
    "Track Of The Moon Beast",
    "The Skydivers",
    "The Killer Shrews",
    "Project Moon Base",
    "The Giant Spider Invasion",
    "Catalina Caper",
    "Secret Agent Super Dragon",
    "Wild Rebels",
    "Danger: Diabolik",
    "Village Of The Giants",
];






document.addEventListener("DOMContentLoaded", function () {
    const buyTicket = document.getElementById("buy-ticket");
    const ticketNum = document.getElementById("ticket-num");
    const filmsList = document.getElementById("films");

    buyTicket.addEventListener("click", function () {

        let availableTickets = parseInt(ticketNum.textContent);
        if (availableTickets > 0) {
            availableTickets--
            ticketNum.textContent = availableTickets;
        } else {
            alert("Sorry, all the tickets are sold out!");
        }
    });
});











// Execute function when page loads
window.addEventListener("DOMContentLoaded", () => {
    populateMovieList();
});





// document.addEventListener("DOMContentLoaded", function() {
//     const filmsList = document.getElementById("films");

//     function renderFilms(films) {
//       films.forEach(film => {
//           const listItem = document.createElement("li");
//         listItem.className = "film item";
//         listItem.textContent = film.title;

//         const deleteButton = document.createElement("button");
//         deleteButton.textContent = "Delete";
//         deleteButton.className = "ui red button delete-btn";

//         deleteButton.addEventListener("click", function() {

//           listItem.remove();

//           fetch(`http://localhost:3000/films`, {
//             method: "DELETE"
//           })
//           .then(response => {
//             if (!response.ok) {
//               throw new Error("Failed to delete film");
//             }

//           })
//           .catch(error => {
//             console.error("Error deleting film:", error);
//           });
//         });

//         listItem.appendChild(deleteButton);


//         filmsList.appendChild(listItem);
//       });
//     }


//     const filmsData = [

//     ];


//     renderFilms(filmsData);
//   });