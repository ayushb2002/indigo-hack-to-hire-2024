from kafka import KafkaConsumer
import json

# Initialize Kafka consumer (ensure your Kafka server is running)
consumer = KafkaConsumer(
    'broadcasts',
    bootstrap_servers='localhost:9092', # Update with your Kafka server address
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='broadcast-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

print("Listening for messages on 'broadcasts' topic...")

for message in consumer:
    broadcast_message = message.value
    print(f"{broadcast_message['subject']} : {broadcast_message['message']}.\n")
