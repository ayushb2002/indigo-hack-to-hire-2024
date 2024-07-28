from flask import Blueprint, request, jsonify, current_app
from models import create_booking, is_seat_booked, search_by_flight_number, search_by_username, handle_update_booking_status, handle_cancel_booking
from decorators import token_required, admin_or_staff_required
from bson import json_util
import json

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

@token_required
@admin_or_staff_required
@bookings_bp.route('/by-flight-all/<flight_number>', methods=['GET'])
def get_bookings_by_flight_all(flight_number):
    db = current_app.db
    bookings = search_by_flight_number(db, flight_number, 'all')
    return jsonify(bookings), 200

@token_required
@admin_or_staff_required
@bookings_bp.route('/by-flight-pending/<flight_number>', methods=['GET'])
def get_bookings_by_flight_pending(flight_number):
    db = current_app.db
    bookings = search_by_flight_number(db, flight_number, 'confirmed')
    return json.loads(json_util.dumps(bookings)), 200

@token_required
@admin_or_staff_required
@bookings_bp.route('/by-flight-boarded/<flight_number>', methods=['GET'])
def get_bookings_by_flight_boarded(flight_number):
    db = current_app.db
    bookings = search_by_flight_number(db, flight_number, 'boarded')
    return jsonify(bookings), 200

@token_required
@bookings_bp.route('/by-username-all/<username>', methods=['GET'])
def get_bookings_by_username_all(username):
    db = current_app.db
    bookings = search_by_username(db, username, 'all')
    return jsonify(bookings), 200

@token_required
@bookings_bp.route('/by-username-pending/<username>', methods=['GET'])
def get_bookings_by_username_pending(username):
    db = current_app.db
    bookings = search_by_username(db, username, 'pending')
    return jsonify(bookings), 200

@token_required
@bookings_bp.route('/by-username-boarded/<username>', methods=['GET'])
def get_bookings_by_username_boarded(username):
    db = current_app.db
    bookings = search_by_username(db, username, 'boarded')
    return jsonify(bookings), 200


@bookings_bp.route('/update-status', methods=['POST'])
@token_required
@admin_or_staff_required
def update_booking_status(current_user):
    data = request.get_json()
    db = current_app.db
    result = handle_update_booking_status(db, data['booking_id'])
    if result.matched_count == 0:
        return jsonify({"error": "Booking not found"}), 404
    return jsonify({'message': 'Booking status updated to boarded'}), 200

@bookings_bp.route('/cancel-booking', methods=['POST'])
@token_required
@admin_or_staff_required
def cancel_booking(current_user):
    data = request.get_json()
    db = current_app.db
    result = handle_cancel_booking(db, data['booking_id'])
    if result.matched_count == 0:
        return jsonify({"error": "Booking not found"}), 404
    return jsonify({'message': 'Booking status updated to cancelled'}), 200