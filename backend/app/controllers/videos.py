from flask import jsonify, send_file
from app import mongo
import base64


# ###################### VIDEO COMPLETION ############################
def videoCompleted(request):
    email = request.json.get('email')
    video_id = request.json.get('video_id')

    if not email or not video_id:
        return jsonify({"error": "email and video_id are required", "status": 400}), 400

    try:
        user_video = mongo.db.courses.find_one({'email': email})

        if user_video is None:
            return jsonify({"error": "User not found", "status": 404}), 404

        if video_id in user_video['completed_videos_id']:
            return jsonify({"error": "Video is already completed", "status": 400}), 400

        completed_videos = user_video['completed_videos'] + 1

        result = mongo.db.courses.update_one(
            {"email": email},
            {"$push": {"completed_videos_id": video_id}, "$set": {"completed_videos": completed_videos}}
        )

        return jsonify({"message": "Video marked as completed", "status": 200}), 200

    except Exception as e:
        print(f"\n Error in marking video as completed: {e} \n")
        return jsonify({"error": "Error in updating user video", "status": 500}), 500

    

########################### GET ALL VIDEOS INFO ##################################
def get_All_Videos_Info(request):
    course_name = request.json.get('course_name')

    if not course_name:
        return jsonify({"error": "course_name is required", "status": 400}), 400

    videos = mongo.db.video.find({"course_name": course_name})

    all_videos_info = []
    for video in videos:
        all_videos_info.append({
            "video_id": video['video_id'],
            "title": video['video_title'], 
            "image": video['video_image'] 
        })

    return jsonify({"videos": all_videos_info, "status": 200}), 200
 
 
########################### GET VIDEO BY ID #####################
def get_Video_By_ID(request):

    video_id = request.json.get('video_id')

    if video_id is None:
        return jsonify({"error": "video_id is required", "status": 400}), 400

    video = mongo.db.video.find_one({"video_id": video_id})

    if video is None:
        return jsonify({"error": "Video not found", "status": 404}), 404

    # Get the link of the video to the local storage
    video_link = video['video_link']

    # Read the video data
    with open(video_link, 'rb') as f:
        video_data = f.read()

    # Encode the video data as base64
    video_base64 = base64.b64encode(video_data).decode('utf-8')

    print(f"\n {video_base64} \n")

    return jsonify({"video_data": video_base64})

