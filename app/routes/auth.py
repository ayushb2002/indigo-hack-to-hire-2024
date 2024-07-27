from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta
import jwt
from models import create_user, find_user_by_username, verify_password

auth_bp = Blueprint('auth', __name__)

def token_required(f):
    def decorator(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing!'}), 403
        try:
            data = jwt.decode(token.split(" ")[1], current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = find_user_by_username(current_app.db, data['username'])
        except Exception as e:
            return jsonify({'message': 'Token is invalid!', 'error': str(e)}), 403
        return f(current_user, *args, **kwargs)
    return decorator

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    db = current_app.db
    if find_user_by_username(db, data['username']):
        return jsonify({'message': 'Username already exists', 'status': 'failed'}), 409

    create_user(db, data['username'], data['password'], data['role'], data['email'], data['name'])
    token = jwt.encode({
            'username': data['username'],
            'exp': datetime.utcnow() + timedelta(hours=1)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")

    return jsonify({'token': token, 'status': 'success', 'username': data['username'], 'email': data['email'], 'name': data['name'], 'role': data['role']}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    db = current_app.db
    user = find_user_by_username(db, data['username'])

    if user and verify_password(user, data['password']):
        token = jwt.encode({
            'username': user['username'],
            'exp': datetime.utcnow() + timedelta(hours=1)
        }, current_app.config['SECRET_KEY'], algorithm="HS256")
        return jsonify({'token': token, 'username': user['username'], 'name': user['name'], 'email': user['email'], 'role': user['role'], 'status': 'success'}), 200

    return jsonify({'message': 'Invalid credentials', 'status': 'failed'}), 401
