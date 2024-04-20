from app import mongo
from flask import jsonify
import random 

def update_user_score(request):
    data = request.json
    email = data.get('email')
    score = data.get('score')

    print("\n\n", email, score, "\n\n")

    if None in (email, score):
        return jsonify({'error': 'All fields are required: email, score', 'status': 400}), 400

    try:
        user = mongo.db.game.find_one({"email": email})
        if user:
            new_score = user["total_score"] + score
            # Update the user's score
            mongo.db.game.update_one({"_id": user["_id"]}, {"$set": {"total_score": new_score}})
            return jsonify({'message': 'User score updated successfully.', 'status': 200}), 200
        else:
            return jsonify({'error': 'User not found.', 'status': 404}), 404
    except Exception as e:
        print(f"\n Error in updating user score: {e} \n")
        return jsonify({'message': 'Error in updating user score.', 'status': 500}), 500



def correct_answer_quiz():
    try:
        questions = mongo.db.games.find_one({"chhose.questions": {"$exists": True}})

        print("0")
        if questions is None:
            return jsonify({"error": "Questions not found", "status": 404}), 404

        print("1")

        q_len = len(questions["chhose"]["questions"])
        if q_len < 10:
            return jsonify({"error": "Questions length is less than 10", "status": 400}), 400

        random_ids = set()
        while len(random_ids) < 10:
            random_ids.add(random.randint(1, q_len))

        print("11")
        
        questions_list = []
        for q_id in random_ids:
            question = next((question for question in questions["chhose"]["questions"] if question["id"] == q_id), None)
            if question is None:
                return jsonify({"error": f"Question with id {q_id} not found", "status": 404}), 404

            questions_list.append(question)
        
        print("111")

        return jsonify({"questions": questions_list, "status": 200}), 200

    except Exception as e:
        print(f"\n Error in correct answer quiz: {e} \n")
        return jsonify({"message": "Error in correct answer quiz.", "status": 500}), 500


def get_words_for_game():
    try:
        game = mongo.db.games.find_one({"_id": {"$exists": True}})

        if game is None:
            return jsonify({"error": f"Game not found", "status": 404}), 404

        words = game["cardGame"]["words"]
        w_len = len(words)
        if w_len < 10:
            return jsonify({"error": f"Words length is less than 10", "status": 400}), 400

        random_ids = set()
        while len(random_ids) < 4:
            random_ids.add(random.randint(1, w_len))

        words_list = []
        for w_id in random_ids:
            word = next((word for word in words if word["id"] == w_id), None)
            if word is None:
                return jsonify({"error": f"Word with id {w_id} not found", "status": 404}), 404
            words_list.append(word)

        return jsonify({"words": words_list, "status": 200}), 200
    except Exception as e:
        print(f"\n Error in get words for game: {e} \n")
        return jsonify({"message": "Error in getting words for game.", "status": 500}), 500

