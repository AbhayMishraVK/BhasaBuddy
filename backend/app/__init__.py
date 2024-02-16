from flask import Flask, session
from flask_pymongo import PyMongo
from datetime import datetime, timedelta

app = Flask(__name__)
app.secret_key = 'your_secret_key_here'

# Create PyMongo instance
app.config["MONGO_URI"] = 'mongodb://localhost:27017/app'
mongo = PyMongo(app)

# FOR THE MAIL SETUP
app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 465
app.config["MAIL_USERNAME"] = "amcsevk@gmail.com"
app.config["MAIL_PASSWORD"] = ""
app.config["MAIL_USE_TLS"] = False
app.config["MAIL_USE_SSL"] = True


# Register the auth blueprint with the app
from app.views.auth import auth
app.register_blueprint(auth)

app.secret_key = 'your_secret_key'

# Configure session to expire after 5 minutes
app.permanent_session_lifetime = timedelta(minutes=5)

