//==================================================================
//               Logstash and local files
//==================================================================
// Install logstash:
//      apt-get install logstash
// Download access_log file
// Create configuration file with input = access_log
//       vim /etc/logstash/conf.d/logstash.conf
//Then run logstash with given config and wait until it imports all the data
//       sudo /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash.conf
//
//Check the catalog of created indices
GET /_cat/indices


GET /logstash/_search


//==================================================================
//               Logstash and Mysql
//==================================================================
// Instal mysql-server on your machine:
//      sudo apt-get install mysql-server
// Download mysql connector and unzip it:
//      wget https://dev.mysql.com/get/Downloads/Connector-J/mysql-connector-java-8.0.15.zip
// Download and unzip datasets:
//      wget http://files.grouplens.org/datasets/movielens/ml-100k.zip
// Setup Mysql (root pass is password):
//      sudo mysql -u root -p
// Create db and tables, import dataset:
//      create database movielens;
//      create table movielens.movies (movieID int primary key not null, title text, releaseDate date);
//      load data local infile 'ml-100k/u.item' into table movielens.movies fields terminated by '|' (movieId, title, @var3) set releaseDate = str_to_date(@var3, '%d-%M-%Y');
//      create user 'student'@'localhost' identified by 'password';
//      grant all privileges on *.* to 'student'@'localhost';
//      flush privileges;
// Create file /etc/logstash/conf.d/logstash_mysql.conf with config
// Run logstash with logstash_mysql.conf file:
//      sudo /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash_mysql.conf

GET /movielens-sql/_search


//==================================================================
//               Logstash and Kafka
//==================================================================
// Install Zookeeper, Kafka
//      sudo apt-get install zookeeperd
//      wget https://archive.apache.org/dist/kafka/2.2.0/kafka_2.12-2.2.0.tgz
// Unzip kafaka, run and create topic in different terminal:
//      ./kafka_2.12-2.2.0/bin/kafka-server-start.sh kafka_2.12-2.2.0/config/server.properties
//      ./kafka_2.12-2.2.0/bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic kafka-logs
// Create file /etc/logstash/conf.d/logstash_kafka.conf with config
// Run logstash with logstash_mysql.conf file:
//      sudo /usr/share/logstash/bin/logstash -f /etc/logstash/conf.d/logstash_kafka.conf
// Feed kafka with some data:
//      sudo kafka_2.12-2.2.0/bin/kafka-console-producer.sh --broker-list localhost:9092 --topic kafka-logs < access_log

GET /kafka-logs/_search?size=3