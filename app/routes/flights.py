from flask import Blueprint, request, jsonify, current_app
from models import create_flight, find_flights_by_departure, find_flights_by_arrival, find_flight_by_number
from decorators import token_required, admin_or_staff_required

flights_bp = Blueprint('flights', __name__)

@flights_bp.route('/create', methods=['POST'])
@token_required
@admin_or_staff_required
def create(current_user):
    data = request.get_json()
    db = current_app.db
    check_existing = find_flight_by_number(db, data['flight_number'])
    if check_existing:
        return jsonify({"error": "Flight number already exists!"}), 400
    create_flight(db, data['flight_number'], data['departure'], data['destination'], data['departure_time'], data['arrival_time'])
    return jsonify({'message': 'Flight created successfully'}), 201

@flights_bp.route('/search_by_departure', methods=['GET'])
def search_by_departure():
    departure = request.args.get('departure')
    db = current_app.db
    flights = find_flights_by_departure(db, departure)
    return jsonify({'flights': flights}), 200

@flights_bp.route('/search_by_arrival', methods=['GET'])
def search_by_arrival():
    arrival = request.args.get('arrival')
    db = current_app.db
    flights = find_flights_by_arrival(db, arrival)
    return jsonify({'flights': flights}), 200

@flights_bp.route('/search_by_number', methods=['GET'])
def search_by_number():
    flight_number = request.args.get('flight_number')
    db = current_app.db
    flight = find_flight_by_number(db, flight_number)
    if flight:
        return jsonify({'flight': flight}), 200
    else:
        return jsonify({'message': 'Flight not found'}), 404
