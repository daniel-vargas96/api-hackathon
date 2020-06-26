# **BrewMaps**
 **BrewMaps** is a project built during a hackathon that utlizes the data from three public APIs to create an application that locates 50 breweries in the state of California, and displays a list of beers that pair well with pizza. The three api's used during this project consisted of: *Punk API*, *OpenBrewery DB*, and *Goggle Maps*.

## Live Demo: https://daniel-vargas96.github.io/api-hackathon/
![Live Demo](/images/API-HACKATHON.gif)

## Current Feature list:
* User can press the search button to initiate the search for breweries and list of beers to pair with pizza
* User can view a map of 50 breweries in the state of California
  * Each brewery is marked on the map with a custom marker.
  * Each marker can be clicked and an information window will appear that displays the brewery address, phone number and website link.
* User Can View A List Of Beers
  * Each beer is listed in a table with headers for "Beer Name", "ABV", "IBU", "Description", and "Image".
  * For users who do not have prior knowledge of what the "ABV" and "IBU" stats are, there is a help button placed at the top of the page in which can be clicked and a small window will appear that provides information what those two stats mean, and what they measure.
* User can reset the page by clicking the reset button once the page has finished loading the map

## Planned Additions:
* Add additional states to search
* Create a search bar in which instructs users to type in their current zipcode
  * This will then initiate a map search that locates local breweries with in that zipcode.
* Create a second search bar that instructs users to type in a food dish and returns a table of different beers that pair well with the food dish that was entered
* Make images that appear on the table of each beer clickable to enlarge the image

## Takeaways From This Project:
Throughout the development of **BrewMap**, I was able to takeaway a great deal of knowledge and information. While working with **BrewMaps** I was challenged with sharpening my skills on working with multiple AJAX calls and organizing my code in a way that would allow for the calls to properly function as well allows others to easily read and understand my codebase. In addition, BrewMaps was my first time utilizing the *Google Maps API* which was an incredible challenge that I overcame. I learned how to extract certain information from one api call (the latitudes and longitudes of each brewery from *Open BreweryDB*), and insert them as markers onto the map when the map is instantiated. Overall, BrewMaps tested my ability to work with a *Google* API and has greatly strengthened my skills as a Software Developer as I continue to grow as a developer and pursue a professional career within the industry.
