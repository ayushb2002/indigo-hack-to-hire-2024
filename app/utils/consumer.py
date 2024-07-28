from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'notifications',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    group_id='notification-group',
    value_deserializer=lambda x: json.loads(x.decode('utf-8'))
)

print("Listening for messages on 'notifications' topic...")

for message in consumer:
    notification = message.value
    flight_number = notification['flight_number']
    message_content = notification['message']
    subject_content = notification['subject']
    print(f"Received notification for flight {flight_number}, {subject_content} : {message_content}")
