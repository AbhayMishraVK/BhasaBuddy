from flask import jsonify
from app import mongo
from datetime import datetime, timedelta
import random


######################### GET THE DETAILS OF THE USER #######################################
def get_user_details(email):
    user = mongo.db.user.find_one({'email': email})

    if user:
        name = user['name']
        regional_language = user['regional_language']
        streak = user['streak']
        max_streak = user['max_streak']
        joined = user['joined']
        age = user['age']
        email_to_send = user['email']

        if age == 'None':
            age = "Not Specified"

        return {
            'name': name,
            'email': email_to_send,
            'learning_language': regional_language,
            'joined': joined,
            'age': age
        }

    else:
        return {"message": "User not found"}


######################### GET THE USER PROGRESS OF THE COURSE #######################################
def get_user_progress(email):
    # Find the user's enrollment information
    try:
        user_video = mongo.db.courses.find_one({'email': email})
    except Exception as e:
        return {"error": "System error"}

    # VIDEO INFORMATION
    total_videos = user_video['total_videos']
    completed_lectures = user_video['completed_videos']
    course_name = user_video['course']

    # Calculate percentage completion
    if total_videos != 0:
        percentage_completed = (completed_lectures / total_videos) * 100
    else:
        percentage_completed = 0

    try:
        user_general_info = mongo.db.user.find_one({'email': email})
    except Exception as e:
        return {"error": "System error"}

    # TOTAL TIME SPENT
    total_time_spent = user_general_info['total_time_spent']

    try:
        user_game_info = mongo.db.game.find_one({'email': email})
    except Exception as e:
        return {"error": "System error"}

    total_vocabulory = user_game_info["total_score"]

    # Return user's progress
    return {
        'course_name': course_name,
        'total_lectures': total_videos,
        'completed_lectures': completed_lectures,
        'percentage_completed': percentage_completed,
        'total_time_spent': total_time_spent,
        'vocabulary': total_vocabulory
    }


########################### GET THE USER STREAK ###################
def user_streak_generator(email):
    # Get today's date
    today = datetime.now()

    # Calculate the start date (Sunday of the current week)
    start_date = today - timedelta(days=(today.weekday() + 1) % 7)

    # Generate random presence data for the last 7 days
    presence_data = {}

    # Loop until today's date
    for i in range((today - start_date).days):
        date = start_date + timedelta(days=i)
        presence = random.choice([0, 1])  # 0 for absent, 1 for present
        day_name = date.strftime("%A")  # Get the day name
        presence_data[day_name] = presence

    # CURRENT DATE ALWAYS 1
    presence_data[list(presence_data.keys())[-1]] = 1

    # Save presence string to the database
    try:
        mongo.db.user.update_one({'email': email}, {'$set': {'seven_day_streak': presence_data}}, upsert=True)
    except Exception as e:
        print(f"Error saving presence string to the database: {e}")

    # Calculate streak
    streak = 0
    for i in range(1, 8):
        day = (today - timedelta(days=i)).strftime("%A")
        if presence_data.get(day) == 1:
            streak += 1
        else:
            break

    # Save presence string to the database
    try:
        mongo.db.user.update_one({'email': email}, {'$set': {'streak': streak}, '$max': {'max_streak': streak}},
                                 upsert=True)
    except Exception as e:
        print(f"Error saving presence string to the database: {e}")


########################### DASHBOARD THIRD PART ###################
def dash_third_part(email):
    try:
        user = mongo.db.user.find_one({'email': email})
    except Exception as e:
        print(f"\n {e} \n")
        return {"error": "System error"}

    # GET SEVEN DAY STREAK
    seven_day_streak = user.get("seven_day_streak")

    # If "seven_day_streak" key is not present, generate random presence data
    if seven_day_streak is None:
        user_streak_generator(email)

    seven_day_streak = user.get("seven_day_streak")
    current_streak = user.get("streak")
    max_streak = user.get("max_streak")
    total_diamond = user.get("total_diamond")

    return {
        "seven_day_streak": seven_day_streak,
        "current_streak": current_streak,
        "max_streak": max_streak,
        "total_diamond": total_diamond
    }


######################## Collective all function and it will return #######################################
def collectiveFunction(request):
    data = request.json
    email = data.get('email')

    print(f"\n\n\n {data} \n\n\n")

    user_details = get_user_details(email)

    course_info_of_user = get_user_progress(email)

    streak_diamond = dash_third_part(email)

    print(f"\n\n Streak Diamon : {streak_diamond} \n\n")

    return jsonify(
        {"user_details": user_details, "user_course_info": course_info_of_user, "streak_diamond": streak_diamond,
         "Status": 200}), 200
