const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)"); //nodeList
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

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
