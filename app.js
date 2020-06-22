let tbody = document.getElementById("tableBody");
let search = document.getElementById("search");
const buttonParent = document.getElementById("btns");

search.addEventListener("click", getBeers);

function getBeers(e) {

  $.ajax({
    method: "GET",
    url: "https://api.punkapi.com/v2/beers?food=pizza",
    success: data => {
      let resetButton = document.createElement('button');
      resetButton.textContent = "Reset";
      resetButton.className = "btn btn-danger";
      buttonParent.append(resetButton);
      for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        let beerName = document.createElement('td');
        let beerAbv = document.createElement('td');
        let beerIbu = document.createElement('td');
        let beerDescription = document.createElement('td');


        beerName.textContent = data[i].name;
        beerAbv.textContent = data[i].abv;
        beerIbu.textContent = data[i].ibu;
        beerDescription.textContent = data[i].description;

        row.append(beerName, beerAbv, beerIbu, beerDescription);
        tbody.append(row);
      }
      search.removeEventListener('click', getBeers);
      resetButton.addEventListener("click", resetPage);
    },
    error: error => {
      console.error(error);
    }
  })
}

function resetPage() {
  tbody.textContent = '';
  let resetButton = document.querySelector('.btn-danger');
  resetButton.remove();
  search.addEventListener('click', getBeers);
}

function getBreweries(e) {
  $.ajax({
    method: "GET",
    url: "https://api.openbrewerydb.org/breweries?by_state=california&per_page=50",
    success: data => {
      console.log(data)
    },
    error: error => {
      console.error(error);
    }
  })
}
