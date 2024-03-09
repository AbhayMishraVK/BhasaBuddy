from flask import jsonify
from app import mongo


def update_total_time_spent(request):
    data = request.json
    email = data.get('email')
    total_time_spent = float(data.get('total_time_spent'))

    try:
        user = mongo.db.user.find_one({'email': email})
        if user:
            old_total_time_spent = float(user["total_time_spent"])
            new_total_time_spent = old_total_time_spent + total_time_spent
            mongo.db.user.update_one({"_id": user["_id"]}, {"$set": {"total_time_spent": new_total_time_spent}})
            return jsonify({'message': 'Total time spent updated successfully.', 'status': 200}), 200
        else:
            return jsonify({'error': 'User not found.', 'status': 404}), 404
    except Exception as e:
        print(f"\n Error in updating total time spent: {e} \n")
        return jsonify({'message': 'Error in updating total time spent.', 'status': 500}), 500
