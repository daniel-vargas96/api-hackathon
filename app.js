/*    BrewMaps Application Utilizing three API's.
      Code is displayed below.   */

const tbody = document.getElementById("tableBody");
const search = document.getElementById("search");
const buttonParent = document.getElementById("btns");
const map = document.getElementById("map");
const mapView = document.querySelector(".hidden");
const helpButton = document.getElementById("helpButton");
const helpPage = document.getElementById("helpPage");
const exit = document.getElementById("exitBtn");
const loadingIcon = document.getElementById('loading-icon');
const tableHeader = document.getElementById("table-header");
const tableTitle = document.getElementById("table-title");
let marker = null;
search.addEventListener("click", start);



//LOADS TABLE FOR BEERS TO PAIR WITH PIZZA
function handleBeersCall(e) {
  $.ajax({
    method: "GET",
    url: "https://api.punkapi.com/v2/beers?food=pizza",
    success: data => {
      getBeers(data);
    },
    error: error => {
      console.error(error);
    }
  })
}

//LOADS MAP WITH MARKERS OF BREWERIES IN CALIFORNIA
function handleBreweriesCall() {
  $.ajax({
    method: "GET",
    url: "https://api.openbrewerydb.org/breweries?by_state=california&per_page=50",
    success: data => {
      initMap(data);
    },
    error: error => {
      console.error(error);
    }
  });
}


//GETS BEER INFORMATION
function getBeers(data) {
  let resetButton = document.createElement('button');
  resetButton.textContent = "Reset";
  resetButton.className = "btn btn-danger";
  buttonParent.append(resetButton);

  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('tr');
    const beerName = document.createElement('td');
    const beerAbv = document.createElement('td');
    const beerIbu = document.createElement('td');
    const beerDescription = document.createElement('td');
    const beerImage = document.createElement('td');


    beerName.textContent = data[i].name;
    beerAbv.textContent = data[i].abv;
    beerIbu.textContent = data[i].ibu;
    beerDescription.textContent = data[i].description;
    beerImage.style.backgroundImage = `url(${data[i].image_url})`;
    beerImage.style.backgroundPosition = "center";
    beerImage.style.backgroundSize = "25px 60px";
    beerImage.style.backgroundRepeat = "no-repeat";

    //CONDITIONAL CHECKING IF NO IMAGES ARE PROVIDED
    if (data[i].image_url === null) {
      beerImage.textContent = "N/A";
    }
    //DISPLAY TABLE ON BROWSER
    row.append(beerName, beerAbv, beerIbu, beerDescription, beerImage);
    tbody.append(row);
  }
  //REMOVE CLICK EVENT FROM SEARCH BUTTON, AND ADD CLICK EVENT FOR RESET BUTTON
  search.removeEventListener('click', start);
  search.classList.add("hidden1");
  tableHeader.classList.remove("hidden1");
  tableTitle.classList.remove("hidden1");
  resetButton.addEventListener("click", resetPage);


}

//GET BREWERY INFORMATION AND LOADS ONTO MAP WITH MARKERS
function initMap(data) {
  //REMOVE HIDDEN MAP
  mapView.classList.remove("hidden");

  //LOCATION OF THE CENTER OF THE MAP
  const options = {
    zoom: 5.5,
    center: { lat: 37.2551, lng: -119.61752 }
  };

  //INITIALIZE AND ADD MAP
  const map = new google.maps.Map(document.getElementById('map'), options);

  //EXTRACT LAT/LONG COORIDINATES FROM BREWERY API AND INSERT
  //INTO GOOGLE MAPS AS MARKERS
  const cityArray = [];

  //FOR LOOP ITERATING THROUGH RECEIVED DATA
  for (let i = 0; i < data.length; i++) {
    const latitude = data[i].latitude;
    const longitude = data[i].longitude;
    const cityCoords = [latitude, longitude];
    cityArray.push(cityCoords);
  }
  //FOR LOOP ITERATING THROUGH RETURNED LATITUDE/LONGITUDE ARRAY
  for (let i = 0; i < cityArray.length; i++) {
    const singleCity = cityArray[i];
    marker = new google.maps.Marker({
      position: { lat: Number(singleCity[0]), lng: Number(singleCity[1]) },
      map: map,
      icon: "http://icons.iconarchive.com/icons/icons-land/vista-map-markers/32/Map-Marker-Ball-Pink-icon.png"
    });

    //INFO-WINDOW SENTENCE CONCATENATION
    const contentString = '<div id="content">' +
      `<h4 id="firstHeading" class="firstHeading">${data[i].name}</h4>` +
      '<div id="bodyContent">' +
      `<p><strong>Address: </strong><b>${data[i].street}, ${data[i].state}</b></p>` +
      `<p><strong>Phone #: </strong><b>${data[i].phone}</b></p>` +
      '</div>' +
      '</div>';

    //INFO WINDOW INSTANTIATION
    const infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    //CLICK EVENT LISTENER FOR EACH MARKER SHOWN ON MAP
    marker.addListener('click', function (event) {
      infowindow.open(map, this);
      setTimeout(function () { infowindow.close(); }, 5000);
    });

    //ONCE MAP IS FINISHED LOADING HIDE LOADING ICON
    loadingIcon.classList.add("hidden1");
  }
  return cityArray;
}




//RESETS MAP AND TABLE
function resetPage() {
  tbody.textContent = '';
  const resetButton = document.querySelector('.btn-danger');
  resetButton.remove();
  search.classList.remove("hidden1");
  tableHeader.classList.add("hidden1");
  tableTitle.classList.add("hidden1");
  search.addEventListener('click', start);

  //ADD HIDDEN CLASS BACK TO MAP
  mapView.classList.add("hidden");
}

//EVENT LISTENER FOR INFO BUTTON
helpButton.addEventListener('click', () => {
  helpPage.classList.remove("hidden1");
  exit.addEventListener('click', () => {
    helpPage.classList.add("hidden1");
  });
})



//CALLBACK FUNCTION FOR THE SEARCH BUTTON EVENT LISTENER
function start() {
  loadingIcon.classList.remove("hidden1");
  handleBeersCall();
  handleBreweriesCall();
}
