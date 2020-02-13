//======================================================================
//
// Import with Python script
//
//Download MoviesToJson.py and apply it on ml/movies.csv
//Save output to moremovies.json
//      python3 MoviestToJson.py > moremovies.json
//Bulk inser movies index
//Check if movies were imported
GET /movies/_search?q=mary

//=================================================================
//
// Import with client
//
// Install client
//      pip3 install elasticsearch
// Copy file IndexRatings.py and run it
// Check ratings index

GET /ratings/_search