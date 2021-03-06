bundle:
	npm run watch &

run-only:
	npm start

run: bundle run-only

install:
	npm install

db:
	mongo geofencing --eval "db.dropDatabase()"
	./bin/migrate
	./scripts/dataLoader.sh
	mongo geofencing --eval "db.trips.createIndex({ loc : '2dsphere' }, {background: true})" &
	mongo geofencing --eval "db.trips.createIndex({ timestamp : 1 }, {background: true})" &
	echo "All done! Geospatial indices will build in the background...(it may take a several minutes)"
