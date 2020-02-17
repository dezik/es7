# Elasticsearch installation

1. Log into your virtual Ubuntu server with credentials `username:password`
2. Get Elasticsearch: 
  `wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -`
  `sudo apt-get install apt-transport-https`
  `echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" |`
  `sudo tee -a /etc/apt/sources.list.d/elastic-7.x.list`
  `sudo apt-get update && sudo apt-get install elasticsearch`
3. Next, edit the Elasticsearch configuration using vim:
  `sudo vim /etc/elasticsearch/elasticsearch.yml`
4. Uncomment the node.name: node-1, change network.host to 0.0.0.0, discovery.seed.hosts to [“127.0.0.1”], and cluster.initial_master_nodes to [“node-1”]
5. Start elasticsearch service:
  `sudo /bin/systemctl daemon-reload`
  `sudo /bin/systemctl enable elasticsearch.service`
  `sudo /bin/systemctl start elasticsearch.service`