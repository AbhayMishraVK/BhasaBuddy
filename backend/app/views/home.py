# home.py
from flask import Blueprint, request, jsonify
from app.controllers.home import home_info

home = Blueprint('home', __name__)
 

@home.route('/home-info', methods=['POST', 'GET'])
def home_info_route():
    response = home_info(request)
    return response