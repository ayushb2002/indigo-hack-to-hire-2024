from flask import Blueprint, request, jsonify, current_app
from datetime import datetime, timedelta
import jwt
from models import create_user, find_user_by_username, verify_password
from decorators import token_required

auth_bp = Blueprint('auth', __name__)

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

@auth_bp.route('/update-role', methods=['POST'])
@token_required
def update_role(current_user):
    data = request.get_json()
    username = data.get('username')
    new_role = data.get('role')
    db = current_app.db
    
    if not username or not new_role:
        return jsonify({'message': 'Username and role are required', 'status': 'failed'}), 400

    user = db.users.find_one({'username': username})

    if not user:
        return jsonify({'message': 'User not found', 'status': 'failed'}), 404

    db.users.update_one({'username': username}, {'$set': {'role': new_role}})
    return jsonify({'message': f'User role updated to {new_role} successfully', 'status': 'success'}), 200