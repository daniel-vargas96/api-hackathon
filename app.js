let tbody = document.getElementById("tableBody");
let search = document.getElementById("search");
const buttonParent = document.getElementById("btns");
const mapView = document.querySelector(".hidden");
search.addEventListener("click", start);


//LOADS TABLE FOR BEERS TO PAIR WITH PIZZA
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
        if (data[i].image_url === null) {
          beerImage.textContent = "N/A";
        }

        row.append(beerName, beerAbv, beerIbu, beerDescription, beerImage);
        tbody.append(row);
      }
      search.removeEventListener('click', start);
      resetButton.addEventListener("click", resetPage);
    },
    error: error => {
      console.error(error);
    }
  })
}

//LOADS MAP WITH MARKERS OF BREWERIES IN CALIFORNIA
function initMap() {
  $.ajax({
    method: "GET",
    url: "https://api.openbrewerydb.org/breweries?by_state=california&per_page=50",
    success: data => {
      //remove hidden map
      mapView.classList.remove("hidden");
      //location
      const options = {
        zoom: 5.5,
        center: { lat: 37.2551, lng: -119.61752 }
      };
      // The map, centered at California
      const map = new google.maps.Map(document.getElementById('map'), options);
      //ADD MARKER FUNCTION


      // Initialize and add the map
      let cityArray = [];
      for (let i = 0; i < data.length; i++) {
        const latitude = data[i].latitude;
        const longitude = data[i].longitude;
        const cityCoords = [latitude, longitude];
        cityArray.push(cityCoords);
      }
      for (let i = 0; i < cityArray.length; i++) {
        var singleCity = cityArray[i];
        var marker = new google.maps.Marker({
          position: {lat: Number(singleCity[0]), lng: Number(singleCity[1])},
          map: map,
          icon: "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Ball-Pink-icon.png"
        });
      }
      return cityArray;
    },
    error: error => {
      console.error(error);
    }
  })
}

//RESETS MAP AND TABLE
function resetPage() {
  tbody.textContent = '';
  let resetButton = document.querySelector('.btn-danger');
  resetButton.remove();
  search.addEventListener('click', start);

  //ADD HIDDEN CLASS BACK TO MAP
  mapView.classList.add("hidden");
}

//CALLBACK FUNCTION FOR THE SEARCH BUTTON EVENT LISTENER
function start() {
  getBeers();
  initMap();
}
