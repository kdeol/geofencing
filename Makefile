run: 
	supervisor app.js

install:
	npm install

db:
	mongo geofencing --eval "db.dropDatabase()"
	./bin/migrate
	./scripts/dataLoader.sh
