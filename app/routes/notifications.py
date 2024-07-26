from flask import Blueprint, request, jsonify, current_app
from kafka import KafkaProducer
import json
from decorators import token_required, admin_or_staff_required

notifications_bp = Blueprint('notifications', __name__)

# Initialize Kafka producer (ensure your Kafka server is running)
producer = KafkaProducer(
    bootstrap_servers='localhost:9092', # Update with your Kafka server address
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

@notifications_bp.route('/send', methods=['POST'])
@token_required
@admin_or_staff_required
def send_notification(current_user):
    data = request.get_json()
    
    if 'flight_number' not in data or 'message' not in data:
        return jsonify({'message': 'Invalid request'}), 400

    flight_number = data['flight_number']
    message = data['message']

    # Publish the message to a Kafka topic
    producer.send('notifications', {'flight_number': flight_number, 'message': message})
    
    return jsonify({'message': 'Notification sent successfully'}), 200

@notifications_bp.route('/broadcast', methods=['POST'])
@token_required
@admin_or_staff_required
def broadcast_notification(current_user):
    data = request.get_json()
    
    if 'message' not in data:
        return jsonify({'message': 'Invalid request'}), 400

    message = data['message']

    # Broadcast the message to all users (or to a specific topic)
    producer.send('broadcasts', {'message': message})
    
    return jsonify({'message': 'Broadcast sent successfully'}), 200
