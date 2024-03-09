from ..controllers.community import get_all_community_posts, post_to_community, like_post, dislike_post
from flask import Blueprint, request

community = Blueprint('community', __name__)


@community.route('/community/posts', methods=['GET'])
def communityPostsRoute():
    response = get_all_community_posts(request)
    return response


@community.route('/community/post', methods=['POST'])
def communityPostRoute():
    response = post_to_community(request)
    return response

@community.route('/community/like', methods=['POST'])
def communityLikeRoute():
    response = like_post(request)
    return response

@community.route('/community/dislike', methods=['POST'])    
def communityDislikeRoute():
    response = dislike_post(request)
    return response