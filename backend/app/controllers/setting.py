from app import mongo
from flask import jsonify



def get_setting(request):
    data = request.json
    email = data.get('email')

    try:
        user = mongo.db.user.find_one({'email': email})
        if user:
            user_setting = {
                    'days_like_to_learn': user['days_like_to_learn'],
                    'preferTime': user['preferTime'],
                    'Notification': user['Notification'],
                    'target_time_to_study': user['target_time_to_study'],
                    'regional_language': user['regional_language']}
            return jsonify({'user_setting': user_setting,  'status': 200}), 200
        else:
            return jsonify({'status': 404}), 404
    except:
        return jsonify({'status': 500}), 500



def update_setting(request):
    data = request.json
    email = data.get('email')
    days_like_to_learn = data.get('days_like_to_learn')
    preferTime = data.get('preferTime')
    Notification = data.get('Notification')
    target_time_to_study = data.get('target_time_to_study')
    regional_language = data.get('regional_language')


    if email is None:
        return jsonify({'error': 'Email is required', 'status': 404}), 404

    try:
        user = mongo.db.user.find_one({'email': email})
        if user:
            if days_like_to_learn:
                mongo.db.user.update_one({'email': email}, {'$set': {'days_like_to_learn': days_like_to_learn}})
            if preferTime:
                mongo.db.user.update_one({'email': email}, {'$set': {'preferTime': preferTime}})
            if Notification:
                mongo.db.user.update_one({'email': email}, {'$set': {'Notification': Notification}})
            if target_time_to_study:
                mongo.db.user.update_one({'email': email}, {'$set': {'target_time_to_study': target_time_to_study}})
            if regional_language:
                mongo.db.user.update_one({'email': email}, {'$set': {'regional_language': regional_language}})

            return jsonify({'message': 'Updated successfully', 'status': 200}), 200

        else:
            return jsonify({'error': 'User not found', 'status': 404}), 404

    except:
        return jsonify({'error': 'Something went wrong', 'status': 500}), 500


def get_streak(request):
    data = request.json
    email = data.get('email')

    if email is None:
        return jsonify({'error': 'Email is required', 'status': 404}), 404

    try:
        user = mongo.db.user.find_one({'email': email})
        if user:
            seven_day_streak = user.get("seven_day_streak")
            streak = user.get("streak")
            max_streak = user.get("max_streak")

            response = {
                'seven_day_streak': seven_day_streak,
                'current_streak': streak,
                'max_streak': max_streak,
                'status': 200
            }
            return jsonify({"streak": response, 'status': 200}), 200
        else:
            return jsonify({'error': 'User not found', 'status': 404}), 404
    except:
        return jsonify({'error': 'Something went wrong', 'status': 500}), 500



