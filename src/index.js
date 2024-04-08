// This function fetches movie data from the server using the Fetch

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

// This function is responsible for dynamically populating a list of films and their corresponding delete buttons.
function populateMovieList() {
    
// Select an element by its id and assign is a variable listOfFilms
    
    const listOfFilms = document.getElementById("films");
    // It removes any placeholder film item from the list.
    const placeHolder = listOfFilms.querySelector(".film.item");
    if (placeHolder) {
        placeHolder.remove();
    }

    // Add movie title list items
    theMovieTitles.forEach((title, index) => {
        const li = document.createElement("li");
        li.classList.add("film", "item");
        li.textContent = title;
        listOfFilms.appendChild(li);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("ui", "red", "button", "delete-button");
        deleteButton.textContent = "Delete";
        listOfFilms.appendChild(deleteButton);

        deleteButton.addEventListener("click", () => {
            fetch(`http://localhost:3000/films/${index}`, {
                    method: "DELETE"
                })
                .then(response => {
                    if (response.ok) {
                        listOfFilms.removeChild(li);
                    } else {
                        console.log("Error deleting film from the server")
                    }
                })
                .catch(error => {
                    console.log("Error deleting film from the server", error);
                });
        });
        
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


// There is an event listener added to the "Buy Ticket" button, which decrements the number of available tickets displayed on the page when clicked.
document.addEventListener("DOMContentLoaded", function () {
    const buyTicket = document.getElementById("buy-ticket");
    const ticketNum = document.getElementById("ticket-num");

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



window.addEventListener("DOMContentLoaded", () => {
    populateMovieList();
});