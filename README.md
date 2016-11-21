# geofencing

Demo at: http://

### Assumptions/Requirements
  - Searching within just NYC right now (so no need for a search box)
  - Can only draw closed polygons or rectangles
  - If running locally, then your local machine has the following requirements:
        - Node.js version 6 or above
        - MongoDB version 3.2 or above
        - ONLY the sample Uber 2014 trip data from [Here](https://github.com/fivethirtyeight/uber-tlc-foil-response/tree/master/uber-trip-data) has been downloaded to the `sample_data/` folder provided in this repo. Due to the size of these files I did not provide the files again in this repo but the files uber-raw-data-apr14.csv - uber-raw-data-sep14.csv can be included.
        
### Features
This is a geofencing app built on Uber's 2014 ride data with the following features:
  - Ability to draw an arbitrary area or a rectangular area on a map
  - Search for trips contained within the region (pickup and dropoff within the geofence)
  - Filter by a date range
  - See the total number of trips in that area
  - See the top 20 pickups in that area with the count of pickups in the selected area
  - See the top 20 dropoffs in that area with the count of dropoffs in the selected area
  - See the count of trips by hour of the day for the slected area
  - See a heatmap of pickups in the selected area
  - See a heatmap of dropoffs in the selected area

##### Controls
  - The Map Drawing tools for selecting an area are on the top center of the map. They provide buttons for an arbitrary polygon or a rectangle.
  
    ![controls](https://raw.githubusercontent.com/kdeol/geofencing/master/public/images/controls.png?raw=true)
  - The Heatmap checkboxes will be DISABLED until you click the "Search Area" button at which point you can toggle the heatmaps on and off
  - The "Top Pickups" and "Top Dropoffs" are always available
 
##### Search Results and Analysis
  - After selecting an area and date range and clicking "Search Area" we see the following:
  ![midtown analysis](https://raw.githubusercontent.com/kdeol/geofencing/master/public/images/midtown.png?raw=true)

This shows us some interesting things. The total number of trips for the selected date range gives us an idea of the volume of trips in this area and we see the vast majority of trips happen around the evening rush hour. This makes sense since the area selected is Midtown Manhattan which is a heavy commuter area and where most people work. (With the heatmap on you can see where exactly)

  - Let's look at another area with the heatmap enabled:
  ![downtown analysis](https://raw.githubusercontent.com/kdeol/geofencing/master/public/images/downtown.png?raw=true)

Now on this map we see some different behavior. The area of downtown Manhattan we selected includes neighborhoods with more bars, clubs, and nightlife. According to the heatmap, this especially includes the Meatpacking district in the top right of the shape, the area of East Village near 3rd and 4th st at Bowery, and then areas of the west village, SoHo, and the Lower East Side near Allen St. There are actually less trips in this selected area than the midtown area from earlier. Also, from the hour of day chart you can see there is some increase in activity during the morning rush hour and then a large spike at night when people go out. A day of the week activity chart could easily be added for this analysis as well.

  - Let's go back to our commuter analysis and see where the top pickups are. After clicking the "Top Pickups" button we can dive in to some analysis:
  ![top pickup analysis](https://raw.githubusercontent.com/kdeol/geofencing/master/public/images/top-pickups.png?raw=true)

Three of the top 10 pickups are on 5th ave within the two blocks between 42nd and 44th street. This makes sense given that there are many large companies and corporate buildings within the area around Bryant Park (for example Bank of America tower). Let's see where those pickups are going:
  ![top dropoff analysis](https://raw.githubusercontent.com/kdeol/geofencing/master/public/images/top-dropoffs.png?raw=true) 
   Six of the top 10 dropoffs are at Penn Station which is one of the busiest commuter hubs in New York City.
   
Using the data provided and the tools I have built here, we can see where and when Uber should be distributing drivers so that they are readily available and they are optimally utilized without driver supply being too high or too low.

### Implementation

##### Architecture/Tech Stack:

* *node.js* - The backend server is written with node.js
* *Express* - Express is the web server that will handle connections, routing, and serving pages/assets (this piece mostly just ferries requests between the front end and the database)
* *MongoDB* - The database used since it supports geospatial indices and querying (This does a lot of the heavy geospatial lifting)
* *React* - The client UI is written in React and handles all the different components (this would be considered a lot of the "app". Contained within the `ui/` folder and uses a container->component approach)
* *Google Maps API* - Provides the drawing tools and Heatmap/Marker tools
* *d3.js* - Provides SVG charts for hour of the day analysis
* *Bootstrap* - So that I don't have to write too much CSS and have a nice date picker...
* Other important libs are *babel* (for ES6+ support), *browserify* (to re-use dependencies on front and back end), *fetch* (for AJAX requests), *moment.js* (for time formatting/parsing), *lodash* (for iteration)

### Installation
1. `git clone https://github.com/kdeol/geofencing.git`
2. `cd geofencing`
3. Copy 2014 data files (at least one of them) from [Here](https://github.com/fivethirtyeight/uber-tlc-foil-response/tree/master/uber-trip-data) in to `sample_data/`
4. `make install` (This will install all dependencies)
5. `make db` (MongoDB must be running locally. This will import the data to MongoDB and build the geospatial indices. The indices will build in the background. THIS CAN TAKE SEVERAL MINUTES TO COMPLETE DEPENDING ON HOW MUCH DATA YOU ARE USING.)

### Running
1. `cd geofencing && make run`

### Future Development/Main Areas of Improvement
Given more time and resources I would tackle the following:
 - Desperately needs more testing. The testing has mostly been done manually.
 - Performance (see the performance section below for in-depth explanation)
 - More robust/fault tolerant CSV parser for the data upload and parallel processing of CSV files
 - Chart for trips by Day of the Week, and trips by month of the year (do people use Uber more on weekends or in cold months?)
 - Convert Longitude/Latitude in Top pickups/dropoffs to locations using Google Places API
 - Use Google Distance Matrix API to get distance and duration for trips (from which we can then get the average speed!)

### Performance
TO-DO
