from flask import jsonify, session
import bcrypt
from app.models.auth import User
from app import mongo
import random
from flask_mail import Mail, Message
from app import app
import json


# Initialize Flask-Mail
mail = Mail(app)




############################# LOGIN FUNCTION ###########################################
def login(request):
    # WE WILL GET THE DATA FROM THE JSON FILE
    email = request.json.get('email')
    password = request.json.get('password')

    try:
        if not email or not password:
            return {"message": "Email and password are required"}, 400

        # Check if email is present in the database
        user = mongo.db.user.find_one({"email": email})

        if not user:
            return {"message": "Email is not registered"}, 400

        # Check if password is correct
        if not bcrypt.checkpw(password.encode('utf-8'), user['password']):
            return {"message": "Invalid password"}, 400

        # If all good, give response
        return {"message": "Login successful"}, 200

    except Exception as e:
        print(e)
        return {"message": "Something went wrong"}, 500


######################## Function to send OTP to user's email #################################
def send_otp_to_user(email, message_body=None):
    try:
        otp = str(random.randint(100000, 999999))

        msg = Message('OTP Verification', sender='amcsevk@gmail.com', recipients=[email])

        if message_body is not None:
            msg.body = f"{message_body} : {otp}"
        else:
            msg.body = f'Your OTP for Bhasa Buddy app is: {otp}'

        print("I am inside the message")
        mail.send(msg)

        # Store OTP Session
        session[f'{email}_otp'] = otp

        print(f'OTP sent to {email}: {otp}')

        stored_otp = session.get(f'{email}_otp')
        print("Stored otp for now is : ", stored_otp)

        return 1

    except Exception as e:
        print('Error sending OTP:', e)
        raise e


############################# REQUEST OTP AND SEND EMAIL ###########################################
def request_otp_and_send_email(request):
    data = request.json

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    try:
        if not all([name, email, password, confirm_password]):
            return jsonify({'message': 'All fields are required'}), 400

        # Check if the email is already registered
        existing_user = mongo.db.user.find_one({'email': email})
        if existing_user:
            return jsonify({'message': 'User is already registered'}), 400

        if password != confirm_password:
            return jsonify({'message': 'Password and confirm password do not match'}), 400

        # Check if email is already present in the database
        # Example: existing_user = User.query.filter_by(email=email).first()
        # if existing_user:
        #     return jsonify({'message': 'Email is already registered'}), 400

        # Storing data in the session
        user_data = {
            'name': name,
            'email': email,
            'password': password,
        }

        # Save user data to session
        session[f"{email}_userData"] = user_data

        # Call functions to send OTP to user's email
        send_otp_to_user(email)

        # If all good, give response
        return jsonify({'message': 'OTP sent successfully'}), 200

    except Exception as e:
        print(e)
        return jsonify({'message': 'Something went wrong'}), 500


################################ VERIFY OTP ######################################
def verify_otp(email, otp):
    print("\n Email is ", email)

    # Get otp from the
    stored_otp = session.get(f'{email}_otp')

    print("stored OTP is : ", stored_otp)

    if stored_otp is None:
        print("\n" + "OTP is not found in the stored" + "\n")
        return 0

    is_otp_valid = otp == int(stored_otp)

    if not is_otp_valid:
        return 0
    else:
        return 1


################################ verify_otp_and_signup ####################################
def verify_otp_and_signup(request):
    data = request.json

    otp = data.get('otp')
    email = data.get('email')

    if None in (otp, email):
        return jsonify({'error': 'All fields are required: regionalLanguage, email'}), 400

    verified_otp = verify_otp(email, otp)

    if not verified_otp:
        return jsonify({'message': 'Invalid OTP'}), 400

    del session[f'{email}_otp']

    # FOR CHECKING IF USER ALREADY SIGNUP AND THIS OTP VERIFICATION FOR FORGOT PASSWORD
    user = mongo.db.user.find_one({'email': email})

    if user:
        return jsonify({'message': 'OTP verified successfully'}), 200

    try:
        user_data = session.get(f'{email}_userData')

        if user_data is None:
            return jsonify({'message': 'User data not found in session'}), 500

        hashed_password = bcrypt.hashpw(user_data['password'].encode('utf-8'), bcrypt.gensalt())

        # Save user data to MongoDB
        mongo.db.user.insert_one({
            'name': user_data['name'],
            'email': user_data['email'],
            'password': hashed_password,
        })

        #  DELETE FROM SESSION
        del session[f'{email}_userData']

        return jsonify({'message': 'Sign Up successful'}), 200

    except Exception as e:
        print('Error verifying OTP and signing up:', e)
        return jsonify({'message': 'Something went wrong'}), 500


################################ FORGOT PASSWORD ####################################
def forgotPassword(request):
    data = request.json

    email = data.get('email')

    if email is None:
        return jsonify({'error': 'Email is required'}), 400

    message_body = "Your OTP for the forgot password of Buddy App is"

    # Attempt to send OTP to user's email
    try:
        response = send_otp_to_user(email, message_body)

        if response == 1:
            return jsonify({"status": "success", "message": "OTP sent successfully"}), 200
        else:
            return jsonify({"status": "error", "message": "Failed to send OTP. Please try again later."}), 500

    except Exception as e:
        print("Error sending OTP:", e)
        return jsonify({"status": "error", "message": "Failed to send OTP. Please try again later."}), 500


################################ Set New Password ####################################
def setNewPassword(request):
    data = request.json

    # Extract new password, confirm password, and email from the request data
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')
    email = data.get('email')

    if None in (new_password, confirm_password, email):
        return jsonify({'error': 'All fields are required: new_password, confirm_password, email'}), 400

    # Check if new password matches the confirmation password
    if new_password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400

    # Find user by email in the database
    user = mongo.db.user.find_one({'email': email})

    # If user not found, return appropriate response
    if user is None:
        return jsonify({'message': 'User not found'}), 404

    # Hash the new password using bcrypt
    hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())

    # Update user's password in the database
    result = mongo.db.users.update_one({'email': email}, {'$set': {'password': hashed_password}})

    # Check if the update operation was successful
    if result.modified_count == 1:
        return jsonify({'message': 'Password updated successfully'}), 200
    else:
        return jsonify({'message': 'Failed to update password'}), 500


################################ Level and commited Time ####################################
def levelAndCommittedTime(request):
    data = request.json

    # Extract new password, confirm password, and email from the request data
    level = data.get('level')
    committedTime = data.get('committedTime')
    email = data.get('email')

    # Check if all required fields are present in the request data
    if None in (level, committedTime, email):
        return jsonify({'error': 'All fields are required: level, committedTime, email'}), 400

    # Find the user by email and update their level and committed time
    try:
        user = mongo.db.user.find_one({'email': email})
    except Exception as e:
        print("\n" + str(e) + "\n")
        return jsonify({'message': 'error in finding the user'}), 500

    if user:
        # Update user's level and committed time
        mongo.db.user.update_one({'_id': user['_id']}, {'$set': {'level': level, 'committedTime': committedTime}})
        return jsonify({'message': 'User level and committed time updated successfully'})
    else:
        return jsonify({'error': 'Error in updating level and committed time'})


################################ Regional Language ####################################
def regionalLanguage(request):
    data = request.json

    # Extract new password, confirm password, and email from the request data
    email = data.get('email')
    regionalLanguage = data.get('regionalLanguage')

    # Check if all required fields are present in the request data
    if None in (regionalLanguage, email):
        return jsonify({'error': 'All fields are required: regionalLanguage, email'}), 400

    # Find the user by email and update their level and committed time
    try:
        user = mongo.db.user.find_one({'email': email})
    except Exception as e:
        print("\n" + str(e) + "\n")
        return jsonify({'message': 'Error in finding the user'}), 500

    if user:
        # Update user's level and committed time
        mongo.db.user.update_one({'_id': user['_id']}, {'$set': {'regionalLanguage': regionalLanguage}})
        return jsonify({'message': 'User regional language updated successfully'})
    else:
        return jsonify({'error': 'Error in updating regional language'})
