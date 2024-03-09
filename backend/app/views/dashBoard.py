from flask import Blueprint, request
from ..controllers.dashBoard import collectiveFunction


dashBoard = Blueprint('dashBoard', __name__)


######################### LOGIN ROUTE ###########################3
@dashBoard.route('/user/dashBoard', methods=['GET', 'POST'])
def loginRoute():
    response = collectiveFunction(request)
    return response
