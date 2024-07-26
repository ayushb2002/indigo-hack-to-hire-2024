from flask import Flask
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from config import Config
from dotenv import load_dotenv
import os

load_dotenv()

client = None

def create_app():
    global client
    app = Flask(__name__)
    config = Config(os.getenv('MONGO_UID'), os.getenv('MONGO_PWD'), os.getenv('SECRET_KEY'))
    app.config.from_object(config)

    client = MongoClient(app.config['MONGODB_URL'], server_api=ServerApi('1'))
    app.db = client['data-server']

    from routes.auth import auth_bp
    from routes.flights import flights_bp
    from routes.bookings import bookings_bp
    from routes.notifications import notifications_bp

    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(flights_bp, url_prefix='/flights')
    app.register_blueprint(bookings_bp, url_prefix='/bookings')
    app.register_blueprint(notifications_bp, url_prefix='/notifications')

    return app

app = create_app()

@app.route('/')
def index():
    return "Up and running!"

if __name__ == '__main__':
    app.run(debug=True)
