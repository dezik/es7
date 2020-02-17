//=========================================================================
//Simple search in one line using query lite
GET /movies/_search?q=title:star

GET /movies/_search?q=+year:2010+title:trek


//=================================================================================
//Find with query in body
GET /movies/_search
{
    "query": {
        "bool": {
            "must": {
                "term": {
                    "title": "trek"
                }
            },
            "filter": {
                "range": {
                    "year": {
                        "gte": 2016
                    }
                }
            }
        }
    }
}


//Find exact value
GET /movies/_search
{
    "query": {
        "term": {
            "title": "trek"
        }
    }
}

//Find by any of values
GET /movies/_search
{
    "query": {
        "terms": {
            "title": ["trek", "interstellar"]
        }
    }
}

//Find in range
GET /movies/_search
{
    "query": {
        "range": {
            "year": {
                "lte": 2016
            }
        }
    }
}

//Find by match
GET /movies/_search
{
    "query": {
        "match": {
            "title": "star"
        }
    }
}


//=======================================================================
//Match phrase tries to find the full phrase match
GET /movies/_search
{
    "query": {
        "match_phrase": {
            "title": "star wars"
        }
    }
}


//Slop means possible distace between matching words
GET /movies/_search
{
    "query": {
        "match_phrase": {
            "title": {
                "query": "star beyond",
                "slop": 1
            }
        }
    }
}


GET /movies/_search
{
    "query": {
        "match_phrase": {
            "title": {
                "query": "star force",
                "slop": 4
            }
        }
    }
}


GET /movies/_search
{
    "query": {
        "bool": {
            "must": {
                "match_phrase": {
                    "title": "star wars"
                }
            },
            "filter": {
                "range": {
                    "year": {
                        "gte": 1980
                    }
                }
            }
        }
    }
}


//===========================================================================
//Pagination with from and size
GET /movies/_search?size=2

GET /movies/_search?size=2&from=2

GET /movies/_search
{
    "from": 2,
    "size": 2,
    "query": {
        "match": {
            "genre": "Sci-Fi"
        }
    }
}


//==========================================================================
//Sorting
GET /movies/_search?sort=title

PUT /movies
{
    "mappings": {
        "properties": {
            "title": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                }
            }
        }
    }
}

GET /movies/_search?sort=title.raw


//==========================================================================
GET /movies/_search
{
    "query": {
        "bool": {
            "must": {
                "match": {
                    "genre": "Sci-Fi"
                }
            },
            "must_not": {
                "match": {
                    "title": "trek"
                }
            },
            "filter": {
                "range": {
                    "year": {
                        "gte": 2010,
                        "lt": 2015
                    }
                }
            }
        }
    }
}


GET /movies/_search?sort=title.raw
{
    "query": {
        "bool": {
            "must": {
                "match": {
                    "genre": "Sci-Fi"
                }
            },
            "filter": {
                "range": {
                    "year": {
                        "lt": 1960
                    }
                }
            }
        }
    }
}



//==========================================================================
// Fuzzines tolerance allow to search for string with misspellings. fuzziness set possible quantity of mistakes
GET /movies/_search
{
    "query": {
        "fuzzy": {
            "title": {
                "value": "intarsteller",
                "fuzziness": 2
            }
        }
    }
}


//============================================================================
//Partial matching
GET /movies/_search
{
    "query": {
        "prefix": {
            "title": "sta"
        }
    }
}

GET /movies/_search
{
    "query": {
        "wildcard": {
            "title": "st*"
        }
    }
}

GET /movies/_search
{
    "query": {
        "regexp": {
            "title": ".+ar.+"
        }
    }
}


//============================================================================
//Query-time search as you type
GET /movies/_search
{
    "query": {
        "match_phrase_prefix": {
            "title": {
                "query": "star t",
                "slop": 10
            }
        }
    }
}



//===========================================================================
//N-Grams with custom analyzer

//Create custom analyzer
PUT /movies
{
    "settings": {
        "analysis": {
            "filter": {
                "autocomplete_filter": {
                    "type": "edge_ngram",
                    "min_gram": 1,
                    "max_gram": 20
                }
            },
            "analyzer": {
                "autocomplete": {
                    "type": "custom",
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "autocomplete_filter"
                    ]
                }
            }
        }
    }
}

//Run analyzer agains some word
GET /movies/_analyze
{
    "analyzer": "autocomplete",
    "text": "Star tr"
}

PUT /movies/_mapping
{
    "properties": {
        "title": {
            "type": "text",
            "analyzer": "autocomplete"
        }
    }
}

GET /movies/_search
{
    "query": {
        "match": {
            "title": {
                "query": "star tr",
                "analyzer": "standard"
            }
        }
    }
}