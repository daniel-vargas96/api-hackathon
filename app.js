class App {
  constructor(beersMap, beerTable) {
    this.beersMap = beersMap;
    this.beerTable = beerTable;
    this.getBeers = this.getBeers.bind(this);
    this.getBreweries = this.getBreweries.bind(this);
  }
  getBeers() {
    $.ajax({
      method: "GET",
      url: "https://api.punkapi.com/v2/beers?food=pizza",
      success: data => {
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    })
  }
  getBreweries() {
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
  start() {
    this.getBeers();
    this.getBreweries();
  }
}
