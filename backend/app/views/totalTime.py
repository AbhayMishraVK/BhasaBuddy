# totalTime.py
from flask import Blueprint, request, jsonify
from app.controllers.totalTime import update_total_time_spent

totalTime = Blueprint('totalTime', __name__)

@totalTime.route('/update-total-time', methods=['POST'])
def update_total_time_spent_route():
    response = update_total_time_spent(request)
    return response
