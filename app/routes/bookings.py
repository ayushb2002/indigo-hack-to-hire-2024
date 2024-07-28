from flask import Blueprint, request, jsonify, current_app
from models import create_booking, is_seat_booked, search_by_flight_number, search_by_username, update_booking_status
from decorators import token_required, admin_or_staff_required
from bson.objectid import ObjectId

bookings_bp = Blueprint('bookings', __name__)

@token_required
@bookings_bp.route('/create', methods=['POST'])
def create(current_user):
    data = request.get_json()
    db = current_app.db
    if is_seat_booked(db, data['flight_number'], data['seat_number']):
        return jsonify({"error": "Seat is already booked!"}), 401
    create_booking(db, data['username'], data['flight_number'], data['seat_number'], 'confirmed')
    return jsonify({'message': 'Booking created successfully'}), 201

@token_required
@admin_or_staff_required
@bookings_bp.route('/by-flight-all/<flight_number>', methods=['GET'])
def get_bookings_by_flight_all(current_user, flight_number):
    db = current_app.db
    bookings = search_by_flight_number(db, flight_number, 'all')
    return jsonify(bookings), 200

@token_required
@admin_or_staff_required
@bookings_bp.route('/by-flight-pending/<flight_number>', methods=['GET'])
def get_bookings_by_flight_pending(current_user, flight_number):
    db = current_app.db
    bookings = search_by_flight_number(db, flight_number, 'pending')
    return jsonify(bookings), 200

@token_required
@bookings_bp.route('/by-username-all/<username>', methods=['GET'])
def get_bookings_by_username_all(current_user, username):
    db = current_app.db
    bookings = search_by_username(db, username, 'all')
    return jsonify(bookings), 200

@token_required
@bookings_bp.route('/by-username-pending/<username>', methods=['GET'])
def get_bookings_by_username_pending(current_user, username):
    db = current_app.db
    bookings = search_by_username(db, username, 'pending')
    return jsonify(bookings), 200

@token_required
@admin_or_staff_required
@bookings_bp.route('/update-status', methods=['POST'])
def update_booking_status(current_user):
    data = request.get_json()
    db = current_app.db
    result = update_booking_status(db, data['booking_id'])
    if result.matched_count == 0:
        return jsonify({"error": "Booking not found"}), 404
    return jsonify({'message': 'Booking status updated to boarded'}), 200