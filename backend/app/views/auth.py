from flask import Blueprint, jsonify, request
from ..controllers.auth import login, request_otp_and_send_email, verify_otp_and_signup, forgotPassword, setNewPassword, \
    levelAndCommittedTime, regionalLanguage

print("JI haa ")

auth = Blueprint('auth', __name__)


######################### LOGIN ROUTE ###########################3
@auth.route('/user/login', methods=['POST'])
def loginRoute():
    response = login(request)

    # Return the response from the login function as JSON
    return jsonify(response)


########################## SIGN UP ROUTE ######################
@auth.route('/user/signup', methods=['POST'], endpoint="signupAndSendOtpRoute")
def signupAndSendOtpRoute():
    response = request_otp_and_send_email(request)
    return response


########################### VERIFY OTP AND SIGNUP #########################
@auth.route('/user/verify-otp', methods=['POST'])
def verifyOtpAndSignupRoute():
    response = verify_otp_and_signup(request)
    return response


############################ FORGOT PASSWORD  ############################
@auth.route('/user/forgotPassword', methods=['POST'])
def forgotPasswordRoute():
    response = forgotPassword(request)
    return response


###################### LEVEL & TIME COMMIT ######################
@auth.route('/user/level', methods=['POST'])
def levelAndCommittedTimeRoute():
    response = levelAndCommittedTime(request)
    return response


###################### LEVEL & TIME COMMIT ######################
@auth.route('/user/regionalLanguage', methods=['POST'])
def regionalLanguageRoute():
    response = regionalLanguage(request)
    return response


############################ Set New Password ############################
@auth.route('/user/setNewPassword', methods=['POST'])
def setNewPasswordRoute():
    response = setNewPassword(request)
    return response
