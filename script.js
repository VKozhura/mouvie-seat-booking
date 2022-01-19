const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); //nodeList
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = parseInt(movieSelect.value);

//update total and count
function updateSelectedCount() {
	const selectedSeats = document.querySelectorAll(".row .seat.selected"); //nodeList

	const selectedSeatsArr = [...selectedSeats]; //copy nodeList into new array
	const seatsIndex = selectedSeatsArr.map((seat) => [...seats].indexOf(seat)); //get index of selected seats in all seats

	localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

	const selectedSeatsCount = selectedSeats.length;
	count.textContent = selectedSeatsCount;
	total.textContent = selectedSeatsCount * ticketPrice;
}

//save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem("selectedMovieIndex", movieIndex);
	localStorage.setItem("selectedMoviePrice", moviePrice);
}

//get data from localStorage and populate UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
	console.log(selectedSeats);
	if (selectedSeats !== null && selectedSeats.length > 0) {
		seats.forEach((seat, index) => {
			if (selectedSeats.indexOf(index) > -1) {
				seat.classList.add("selected");
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
	console.log(selectedMovieIndex);
	if (selectedMovieIndex !== null) {
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

container.addEventListener("click", (e) => {
	if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
		e.target.classList.toggle("selected");
		updateSelectedCount();
	}
});

movieSelect.addEventListener("change", (e) => {
	ticketPrice = parseInt(e.target.value);
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCount();
});

updateSelectedCount();
