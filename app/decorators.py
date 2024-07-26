from functools import wraps
from flask import request, jsonify, current_app
import jwt
from models import find_user_by_username

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Extract token from Authorization header
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            if auth_header.startswith('Bearer '):
                token = auth_header.split(' ')[1]
        
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        
        try:
            # Decode the token
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            username = data.get('username')  # Safely get the user_id from the token
            if not username:
                raise ValueError('Username not found in token')
            
            # Fetch user from database
            current_user = find_user_by_username(current_app.db, username)
            if not current_user:
                raise ValueError('User not found')
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired!'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token!'}), 401
        except Exception as e:
            return jsonify({'message': str(e)}), 401

        return f(current_user, *args, **kwargs)
    
    return decorated

def admin_or_staff_required(f):
    @wraps(f)
    def decorated(current_user, *args, **kwargs):
        if current_user['role'] not in ['admin', 'staff']:
            return jsonify({'message': 'Admin or staff access required'}), 403
        return f(current_user, *args, **kwargs)
    
    return decorated
