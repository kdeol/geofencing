#!/bin/bash
	FILES=./transform_sample_data/*
	for f in $FILES
	do
		echo "Uploading $f"
		mongoimport -d geofencing -c trips --type json --file "$f" --jsonArray
 		echo "Finished uploading $f"
	done
