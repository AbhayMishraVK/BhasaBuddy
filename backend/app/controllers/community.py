from flask import jsonify
from app import mongo
from datetime import datetime 


######################## GET ALL COMMUNITY ############################
def get_all_community_posts(request):
    try:
        # Query the 'community' collection for all documents
        posts = mongo.db.community.find({})

        # If no posts found , return a message
        if posts is None:
            return jsonify({'message': 'No posts found', 'status': 404}), 404

        # Prepare a list to hold the formatted post data
        formatted_posts = []

        # Iterate over each post document
        for post in posts:
            # Extract the required fields from the document
            post_id = post.get('post_id', '')
            likes = post.get('likes', 0)
            dislikes = post.get('dislikes', 0)
            content = post.get('content', '')
            poster_name = post.get('creator_name', '')
            post_time = post.get('post_time', '')
            # Format the post data as a dictionary
            formatted_post = {
                'post_id': post_id,
                'likes': likes,
                'dislikes': dislikes,
                'content': content,
                'creator_name': poster_name,
                'post_time': post_time
            }

            # Append the formatted post data to the list
            formatted_posts.append(formatted_post)

        # Return the formatted posts as a JSON response
        return jsonify({'posts': formatted_posts, 'status': 200}), 200
    except Exception as e:
        # Return a generic error message if there is an issue
        return jsonify({'error': 'Something went wrong', 'status': 500}), 500


######################## POST TO COMMUNITY ############################
def post_to_community(request):
    try:
        data = request.json
        email = data.get('email')
        content = data.get('content')

        user = mongo.db.user.find_one({'email': email})
        if user is None:
            return jsonify({'error': 'User not found', 'status': 404}), 404

        name = user.get('name')
        total_id = mongo.db.community.count_documents({})
        total_id += 1

        post = {
            'post_id': total_id,
            'likes': 0,
            'dislikes': 0,
            'content': content,
            'creator_name': name,
            'post_time': datetime.now()
        }

        mongo.db.community.insert_one(post)

        return jsonify({'message': 'Posted successfully', 'status': 201}), 201

    except Exception as e:
        print(e)
        return jsonify({'error': 'Something went wrong', 'status': 500}), 500



######################## LIKE POST ############################
def like_post(request):
    try:
        data = request.json
        post_id = data.get('post_id')

        post = mongo.db.community.find_one({'post_id': post_id})
        if post is None:
            return jsonify({'error': 'Post not found', 'status': 404}), 404

        mongo.db.community.update_one({'post_id': post_id}, {'$inc': {'likes': 1}})
          
        return jsonify({'message': 'Updated successfully', 'status': 200}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Something went wrong', 'status': 500}), 500



######################## DISLIKE POST ############################
def dislike_post(request):
    try:
        data = request.json
        post_id = data.get('post_id')

        post = mongo.db.community.find_one({'post_id': post_id})
        if post is None:
            return jsonify({'error': 'Post not found', 'status': 404}), 404

        mongo.db.community.update_one({'post_id': post_id}, {'$inc': {'dislikes': 1}})
          
        return jsonify({'message': 'Updated successfully', 'status': 200}), 200

    except Exception as e:
        print(e)
        return jsonify({'error': 'Something went wrong', 'status': 500}), 500


