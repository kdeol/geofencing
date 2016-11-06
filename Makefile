run: 
	supervisor app.js

install:
	npm install

db:
	mongo geofencing --eval "db.dropDatabase()"
	./bin/migrate
	./scripts/dataLoader.sh
	mongo geofencing --eval "db.trips.createIndex({ loc : '2dsphere' }, {background: true})" &
	mongo geofencing --eval "db.trips.createIndex({ timestamp : 1 }, {background: true})" &
	echo "All done! Press enter to finish. Geospatial indices will build in the background...(it may take a several minutes)"
