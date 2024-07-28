from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId

def get_user_collection(db):
    return db['users']

def create_user(db, username, password, role, email, name):
    users = get_user_collection(db)
    password_hash = generate_password_hash(password)
    user = {
        'username': username,
        'password_hash': password_hash,
        'role': role,
        'email': email,
        'name': name
    }
    users.insert_one(user)

def find_user_by_username(db, username):
    users = get_user_collection(db)
    return users.find_one({'username': username})

def find_user_by_id(db, user_id):
    users = get_user_collection(db)
    return users.find_one({'_id': ObjectId(user_id)})

def verify_password(user, password):
    return check_password_hash(user['password_hash'], password)

def get_flight_collection(db):
    return db['flights']

def create_flight(db, flight_number, departure, destination, departure_time, arrival_time):
    flights = get_flight_collection(db)
    flight = {
        'flight_number': flight_number,
        'departure': departure,
        'destination': destination,
        'departure_time': departure_time,
        'arrival_time': arrival_time,
        'active': True
    }
    flights.insert_one(flight)

def deactivate_flight(db, flight_number):
    flights = get_flight_collection(db)
    result = flights.update_one(
        {'flight_number': flight_number},
        {'$set': {'active': False}}
    )
    return result.matched_count > 0

def find_flight_by_id(db, flight_id):
    flights = get_flight_collection(db)
    return flights.find_one({'_id': ObjectId(flight_id)})

def find_flight_by_number(db, flight_number):
    flights = get_flight_collection(db)
    return flights.find_one({'flight_number': flight_number})

def find_flights_by_departure(db, departure):
    flights = get_flight_collection(db)
    return list(flights.find({'departure': departure}))

def find_flights_by_arrival(db, arrival):
    flights = get_flight_collection(db)
    return list(flights.find({'destination': arrival}))

def get_booking_collection(db):
    return db['bookings']

def create_booking(db, username, flight_number, seat_number, booking_status):
    bookings = get_booking_collection(db)
    user = find_user_by_username(db, username)
    flight = find_flight_by_number(db, flight_number)
    
    if not user:
        raise ValueError("User not found")

    if not flight:
        raise ValueError("Flight not found")

    if not flight['active']:
        raise ValueError("Flight is not active")

    booking = {
        'username': user['_id'],
        'flight_id': flight['_id'],
        'seat_number': seat_number,
        'booking_status': booking_status
    }
    bookings.insert_one(booking)

def find_bookings_by_flight_id(db, flight_id):
    bookings = get_booking_collection(db)
    return bookings.find({'flight_id': ObjectId(flight_id)})

def is_seat_booked(db, flight_number, seat_number):
    # Get the collections
    bookings = get_booking_collection(db)
    flights = get_flight_collection(db)

    # Find the flight by flight number
    flight = flights.find_one({'flight_number': flight_number})
    if not flight:
        raise ValueError('Flight not found')

    flight_id = flight['_id']

    # Check if there is a booking with the given seat number for this flight
    booking = bookings.find_one({'flight_id': flight_id, 'seat_number': seat_number})
    return booking is not None

def search_by_flight_number(db, flight_number, option):
    if option == 'all':
        bookings = list(db.bookings.find({'flight_number': flight_number}))
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
    else:
        bookings = list(db.bookings.find({'flight_number': flight_number, 'booking_status': {'$ne': 'boarded'}}))
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
        
    return bookings

def search_by_username(db, username, option):
    if option == 'all':
        bookings = list(db.bookings.find({'username': username}))
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
    else:
        bookings = list(db.bookings.find({'username': username, 'booking_status': {'$ne': 'boarded'}}))
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
    
    return bookings

def update_booking_status(db, booking_id):
    result = db.bookings.update_one(
        {'_id': ObjectId(booking_id)},
        {'$set': {'booking_status': 'boarded'}}
    )
    
    return result