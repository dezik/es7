## Import with Python script
1. Download MoviesToJson.py and apply it on ml/movies.csv, save output to moremovies.json:
  `python3 MoviestToJson.py > moremovies.json`
2. Bulk import movies index
  `curl -XPUT 127.0.0.1:9200/_bulk?pretty --data-binary @moremovies.json`
3. Check if movies were imported
  `GET /movies/_search?q=mary`

## Import with client
1. Install elasticsearch python client:
  `pip3 install elasticsearch`
2. Copy file IndexRatings.py and run it
  `python3 IndexRatings.py`
3. Check ratings index
  `GET /ratings/_search`

## Bulk import data:
1. Copy required json and bulk import it:
  `curl -XPUT 127.0.0.1:9200/_bulk?pretty --data-binary @movies.json`