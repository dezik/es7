//===================================================================
// Create movies index
PUT /movies
{
    "mappings": {
        "properties": {
            "year": { 
                "type": "date"
            }
        }
    }
}



// Check its mapping
GET /movies/_mapping


// Put Interstellar in index
PUT /movies/_doc/109487
{
    "genre": [
        "IMAX",
        "Sci-Fi"
    ],
    "title": "Interstellar",
    "year": 2014
}


//Get all movies in index in pretty format
GET /movies/_search?pretty


//Partially update existing document by its id
POST /movies/_doc/109487/_update
{
    "doc": {
        "title": "Interstellar"
    }
}


//Search specific document
GET /movies/_search?q=Dark


// Delete specific document
DELETE /movies/_doc/58559


//Get document by id
GET /movies/_doc/109487


//=====================================================================
// Update document if cpecific sequence number
POST /movies/_doc/109487?if_seq_no=13&if_primary_term=1
{
    "doc": {
        "title": "Interstellar 2"
    }
}


//Retry update 5 times if conflict happen. Helps to avoid concurrency conflicts
POST /movies/_doc/109487/_update?retry_on_conflict=5
{
    "doc": {
        "title": "Interstellar 3"
    }
}


//====================================================================
// Search document having any of specified words in title
GET /movies/_search
{
    "query": {
        "match": {
            "title": "Star Trek"
        }
    }
}



// Since genre field is text, es will try apply text search rules
GET /movies/_search
{
    "query": {
        "match_phrase": {
            "genre": "sci"
        }
    }
}



// Delete the full index with all documents
DELETE /movies


// Create new index with genre type keyword
PUT /movies
{
    "mappings": {
        "properties": {
            "id": {
                "type": "integer"
            },
            "year": {
                "type": "date"
            },
            "genre": {
                "type": "keyword"
            },
            "title": {
                "type": "text",
                "analyzer": "english"
            }
        }
    }
}


// Bulk import data:
//      curl -XPUT 127.0.0.1:9200/_bulk?pretty --data-binary @movies.json


// Now ES can apply exact match to genre field
GET /movies/_search
{
    "query": {
        "match_phrase": {
            "genre": "Sci-Fi"
        }
    }
}


//=====================================================================
// Create new index with parent/child relationship
PUT /series
{
    "mappings": {
        "properties": {
            "film_to_franchise": {
                "type": "join",
                "relations": {
                    "franchise": "film"
                }
            }
        }
    }
}


//Bulk insert documents
//  curl -XPUT 127.0.0.1:9200/_bulk?pretty --data-binary @series.json


// Search all childs by parent
GET /series/_search
{
    "query": {
        "has_parent": {
            "parent_type": "franchise",
            "query": {
                "match": {
                    "title": "Star Wars"
                }
            }
        }
    }
}


// Search parent having particular child
GET /series/_search
{
    "query": {
        "has_child": {
            "type": "film",
            "query": {
                "match": {
                    "title": "The Force Awakens"
                }
            }
        }
    }
}

