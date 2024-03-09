from flask import Blueprint, request
from app.controllers.setting import get_setting, update_setting, get_streak

setting = Blueprint('setting', __name__)


@setting.route("/setting", methods=['GET'])
def get_setting_route():
    response = get_setting(request)
    return response

@setting.route("/update/setting", methods=['POST'])
def update_setting_route():
    response = update_setting(request)
    return response

@setting.route("/get/streak", methods=['GET'])
def get_streak_route():
    response = get_streak(request)
    return response
