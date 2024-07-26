from flask import Blueprint, request, jsonify, current_app
from models import create_booking, is_seat_booked
from decorators import token_required

bookings_bp = Blueprint('bookings', __name__)

@token_required
@bookings_bp.route('/create', methods=['POST'])
def create():
    data = request.get_json()
    db = current_app.db
    if is_seat_booked(db, data['flight_number'], data['seat_number']):
        return jsonify({"error": "Seat is already booked!"}), 401
    create_booking(db, data['username'], data['flight_number'], data['seat_number'], 'confirmed')
    return jsonify({'message': 'Booking created successfully'}), 201
