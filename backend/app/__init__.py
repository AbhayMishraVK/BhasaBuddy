from flask import Flask, request
from flask_pymongo import PyMongo
from datetime import timedelta
import os
from dotenv import load_dotenv
from flask_cors import CORS
from app.views.notification import init_scheduler

# from flask_cors import CORS

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)
CORS(app)

app.secret_key = 'your_secret_key_here'

# Create PyMongo instance
app.config["MONGO_URI"] = 'mongodb://localhost:27017/app'
mongo = PyMongo(app)
app.mongo = mongo # new code hai 

# FOR THE MAIL SETUP
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True

# Register the auth blueprint with the app
from app.views.auth import auth
app.register_blueprint(auth)

from app.views.dashBoard import dashBoard
app.register_blueprint(dashBoard)

from app.views.blogs import blogs
app.register_blueprint(blogs)

from app.views.videos import videos
app.register_blueprint(videos)

from app.views.games import games 
app.register_blueprint(games)

from app.views.community import community
app.register_blueprint(community)

from app.views.totalTime import totalTime
app.register_blueprint(totalTime)

from app.views.setting import setting
app.register_blueprint(setting)

from app.views.home import home
app.register_blueprint(home)

# For sending mail 
# init_scheduler(app)

app.secret_key = 'your_secret_key'

# Configure session to expire after 5 minutes
app.permanent_session_lifetime = timedelta(minutes=5)

