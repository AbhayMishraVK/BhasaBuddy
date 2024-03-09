from flask import Blueprint, request
from app.controllers.games import update_user_score, correct_answer_quiz, get_words_for_game


games = Blueprint('games', __name__)

@games.route('/user/game_score_update', methods=['POST'])
def update_score_route():
    response = update_user_score(request)
    return response

@games.route('/correct_answer_quiz', methods=['GET'])
def correct_answer_quiz_route():
    print(f"\n\n Hiii \n\n")
    response = correct_answer_quiz()
    return response

@games.route("/card_game", methods=['GET'])
def get_words_for_game_route():
    response = get_words_for_game()
    return response
    