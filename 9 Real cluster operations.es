// ================================================
//      Configure scalling strategy
// ================================================

// Check how many shards do you have
GET /shakespeare/_settings

// Create new index with 3 shards and 1 replica per each
PUT /testindex
{
  "settings": {
    "number_of_shards": 3,
    "number_of_replicas": 1
  }
}

GET /testindex/_settings



// ================================================
//      Index alias rotation
// ================================================
POST /_aliases
{
    "actions": [
        {
            "add": {
                "index": "logs_2020-02-17",
                "alias": "current_logs"
            }
        },
        {
            "remove": {
                "index": "logs_2020-02-16",
                "alias": "current_logs"
            }
        },
        {
            "add": {
                "index": "logs_2020-02-17",
                "alias": "last_month_logs"
            }
        },
        {
            "remove": {
                "index": "logs_2020-01-17",
                "alias": "last_month_logs"
            }
        }
    ]
}


// ================================================
//      Index lifecycle polisies
// ================================================
// Can be managed in Kibana->Management->Elasticsearch->Index lifecycle policies
// Create new ILM policy
PUT _ilm/policy/new-ilm-policy
{
  "policy": {
    "phases": {
      "hot": {
        "min_age": "0ms",
        "actions": {
          "rollover": {
            "max_age": "30d",
            "max_size": "50gb"
          }
        }
      },
      "delete": {
        "min_age": "90d",
        "actions": {
          "delete": {}
        }
      }
    }
  }
}


// Apply your policy to specific index
PUT _template/new_template
{
  "index_patterns": ["datastream-*"],
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1,
    "index.lifecycle.name": "new-ilm-policy",
    "index.lifecycle.rollover_alias": "datastream"
  }
}




// ================================================
//      Monitoring
// ================================================
//
// Open Kibana -> Stack Monitoring Tab and turn self monitoring on


// ================================================
//      Elastic SQL
// ================================================
//
// You can use es sql client or rest client for querying SQL
// To run sql client:
//      cd /usr/share/elasticsearch
//      sudo bin/elasticsearch-sql-client
POST /_sql?format=txt
{
  "query": "describe movies"
}

POST /_sql
{
  "query": "select title from movies limit 10"
}
POST /_sql?format=txt
{
  "query": "select title, year from movies where year<1920 order by year"
}

// To translate SQL query to elastic DSL:
POST /_sql/translate
{
  "query": "select title, year from movies where year<1920 order by year limit 10"
}


// ================================================
//     !!!!!! How to create failover local ES cluster !!!!!!
// ================================================

// Setup 3 ES nodes on your local machine
// Edit es settings:
//      sudo vim /etc/elasticsearch/elasticsearch.yml
//          Add/edit lines:
//              cluster.name = elastic
//              node.max_local_storage_nodes: 3
//              cluster.initial_master_nodes: ["node-1", "node-2", "node-3"]
// Copy this configuration 2 times to have separate config per each node and change settings according to node name:
//      cd /etc
//      sudo cp -rp elasticsearch elasticsearch-node2
//      sudo vim elasticsearch-node2/elasticsearch.yml
//          Update config:
//              node.name: node-2   or node-3
//              http.port: 9201     or 9202
// Create 2 another ES services(elasticsearch-node2.service, elasticsearch-node3.service) and configure each accordingly:
//      cd /usr/lib/systemd/system
//      sudo cp elasticsearch.service elasticsearch-node2.service
//      sudo vim elasticsearch-node2.service
//          Change next line:
//              Environment=ES_PATH_CONF=/etc/elasticsearch-node2
// Restart elasticsearch and start all nodes:
//      sudo systemctl daemon-reload
//      sudo systemctl stop elasticsearch
//      sudo systemctl start elasticsearch
//      sudo systemctl start elasticsearch-node2
//      sudo systemctl start elasticsearch-node3
// Check cluster health:
GET /_cluster/health