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

# Consume messages from the topic
for message in consumer:
    broadcast_message = message.value
    print(f"Received broadcast message: {broadcast_message['message']}")
    # Here, you can add code to handle the broadcast message, such as sending it to all connected clients
