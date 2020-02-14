// Count haw many movieas are rated by each rating
GET /ratings/_search?size=0
{
    "aggs": {
        "ratings": {
            "terms": {
                "field": "rating"
            }
        }
    }
}


// Count how many are movies with 5 rating
GET /ratings/_search?size=0
{
    "query": {
        "match": {
            "rating": 5.0
        }
    },
    "aggs": {
        "ratings": {
            "terms": {
                "field": "rating"
            }
        }
    }
}


// Calculate avg rating for particular movie
GET /ratings/_search?size=0
{
    "query": {
        "match_phrase": {
            "title": "Star Wars Episode IV"
        }
    },
    "aggs": {
        "avg_rating": {
            "avg": {
                "field": "rating"
            }
        }
    }
}


//==================================================================
//      Histograms
//==================================================================

GET /ratings/_search?size=0
{
    "aggs": {
        "whole_ratings": {
            "histogram": {
                "field": "rating",
                "interval": 1
            }
        }
    }
}


GET /movies/_search?size=0
{
    "aggs": {
        "release": {
            "histogram": {
                "field": "year",
                "interval": 10
            }
        }
    }
}


//==================================================================
//          Time Series
//==================================================================

GET /kafka-logs/_search?size=0
{
    "aggs": {
        "timestamp": {
            "date_histogram": {
                "field": "@timestamp",
                "interval": "minute"
            }
        }
    }
}


GET /kafka-logs/_search?size=0
{
    "query": {
        "match": {
            "agent": "Googlebot"
        }
    },
    "aggs": {
        "timestamp": {
            "date_histogram": {
                "field": "@timestamp",
                "interval": "second"
            }
        }
    }
}



GET /kafka-logs/_search?size=0
{
    "query": {
        "bool": {
            "must_not": {
                "term": {
                    "response": "200"
                }
            }
        }
    },
    "aggs": {
        "timestamp": {
            "date_histogram": {
                "field": "@timestamp",
                "interval": "minute"
            }
        }
    }
}