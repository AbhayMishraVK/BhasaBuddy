# from flask import Blueprint
from apscheduler.schedulers.background import BackgroundScheduler
from ..controllers.notification import send_message_to_all_users

# notification = Blueprint('notification', __name__)

def init_scheduler(app):
    scheduler = BackgroundScheduler(timezone="UTC") # Initialize APScheduler with the Flask app
    scheduler.add_job(send_message_to_all_users, 'interval', minutes=5, args=[app])
    scheduler.start()
    # return app