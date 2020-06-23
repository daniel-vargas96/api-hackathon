let tbody = document.getElementById("tableBody");
let search = document.getElementById("search");
const buttonParent = document.getElementById("btns");
let map = null;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
}

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
        let beerImage = document.createElement('td');


        beerName.textContent = data[i].name;
        beerAbv.textContent = data[i].abv;
        beerIbu.textContent = data[i].ibu;
        beerDescription.textContent = data[i].description;
        beerImage.style.backgroundImage = `url(${data[i].image_url})`;
        beerImage.style.backgroundPosition = "center";
        beerImage.style.backgroundSize = "25px 60px";
        beerImage.style.backgroundRepeat = "no-repeat";
        if(data[i].image_url === null) {
          beerImage.textContent = "N/A";
        }

        row.append(beerName, beerAbv, beerIbu, beerDescription, beerImage);
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
