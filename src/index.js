let url = "http://localhost:3000/films";

displayTitles();

function displayTitles() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.json();
        })
        .then(data => {
            const filmsList = document.getElementById("films");
            filmsList.innerHTML = '';
            data.forEach(movie => {
                const button = document.createElement("button");
                button.textContent = 'DELETE';
                button.addEventListener('click', function () {
                    deleteFilm(movie.id);
                    removeFilmFromList(movie.id);
                });
                const li = document.createElement("li");
                li.className = "film item";
                li.setAttribute('data-id', movie.id); // Set data-id attribute
                li.innerHTML = movie.title;
                li.addEventListener('click', function () {
                    changePoster(movie.poster);
                    changeFilmTitle(movie.title);
                    changeFilmDescription(movie.description);
                    changeFilmShowtime(movie.showtime);
                    changeFilmRuntime(movie.runtime);
                    updateRemainingTickets(movie.capacity - movie.tickets_sold);
                });
                filmsList.appendChild(li);
                filmsList.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching or parsing data:', error);
        });
}

function deleteFilm(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to delete film');
        }
        console.log('Film deleted successfully');
    })
    .catch(error => {
        console.error('Error deleting film:', error);
    });
}

function removeFilmFromList(id) {
    const filmToRemove = document.querySelector(`li[data-id="${id}"]`);
    if (filmToRemove) {
        filmToRemove.remove();
    }
}

function changePoster(posterUrl) {
    const posterImg = document.getElementById("poster");
    posterImg.src = posterUrl;
}

function changeFilmTitle(title) {
    const titleElement = document.getElementById("title");
    titleElement.textContent = title;
}

function changeFilmDescription(description) {
    const filmInfoElement = document.getElementById("film-info");
    filmInfoElement.textContent = description;
}

function changeFilmShowtime(showtime) {
    const showtimeElement = document.getElementById("showtime");
    showtimeElement.textContent = showtime;
}

function changeFilmRuntime(runtime) {
    const runtimeElement = document.getElementById("runtime");
    runtimeElement.textContent = `${runtime} minutes`;
}

function updateRemainingTickets(remTickets) {
    const buyTicketButton = document.getElementById("buy-ticket");
    const remainingTickets = document.getElementById("ticket-num");

    remainingTickets.innerHTML = `There are: ${remTickets }`
    buyTicketButton.addEventListener("click", function () {
        if (remTickets >= 0) {
            remainingTickets.textContent = `There are: ${remTickets --}`
        } else {
            alert("Sorry, all the tickets are sold out!");
        }
    })
}