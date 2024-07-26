# Commands to start Kafka and Zookeeper on Windows
<br>
C:\kafka> .\bin\windows\zookeeper-server-start.bat .\config\zookeeper.properties <br>
C:\kafka> .\bin\windows\kafka-server-start.bat .\config\server.properties <br>

# Commands to create a topic on Kafka
<br>
C:\kafka\bin\windows> kafka-topics.bat --create --bootstrap-server localhost:9092 --replication-factor 1 --partition 1 --topic test <br>

# Command to delete a topic from Kafka
<br>
C:\kafka\bin\windows> kafka-topics.bat --bootstrap-server localhost:9092 --delete --topic test <br>

# To kick off kafka producer (allows sending JSON data over kafka)
<br>
C:\kafka\bin\windows> kafka-console-producer.bat --broker-list localhost:9092 --topic test <br>

# To kick off kafka consumer (allows receiving data over kafka)
<br>
C:\kafka\bin\windows> kafka-console-consumer.bat --topic test --bootstrap-server localhost:9092 --from-beginning <br>