from app import mongo 
from flask import jsonify

def get_name_by_email(email):
    try:
        user = mongo.db.user.find_one({'email': email})
        if user:
            name = user.get('name')
            return name
        else:
            return {'error': 'User not found'}
    except Exception as e:
        print(f"Error retrieving name: {e}")
        return {'error': 'Something went wrong'}



def get_all_courses():

    try:
        courses = set()
        videos = mongo.db.video.find({})
        for video in videos:
            course = (video['course_name'],
                      video['course_image'],
                      video['course_language'],
                      video['course_teacher_name'],
                      video['course_rating'],
                      video['course_description'])
            existing_course = next((c for c in courses if c[0] == course[0]), None)
            if not existing_course:
                courses.add(course)

        all_courses = [{"course_name": course_name,
                        "course_image": course_image,
                        "language": language,
                        "teacher_name": teacher_name,
                        "rating": rating,
                        "description": description} for course_name, course_image, language, teacher_name, rating, description in courses]

        return {"courses" : all_courses}

    except Exception as e:
        print(f"Error in retrieving all courses: {e}")
        return {"error": "Error in retrieving all courses"}




def get_user_progress_by_email(email):
    try:
        user = mongo.db.courses.find_one({'email': email})
        if user:
            course_name = user['course']
            total_videos = user['total_videos']
            completed_videos = user['completed_videos']
            
            course_info = mongo.db.video.find_one({'course_name': {"$regex": course_name, "$options": "i"}}, limit=1)
            
            if course_info:
                course_image = course_info['course_image']
                teacher_name = course_info['course_teacher_name']
                print(f"\n\n {teacher_name} \n\n")
                percentage_completed = (completed_videos / total_videos) * 100
                return {
                    "title": course_name,
                    "course_image": course_image,
                    "teacher_name": teacher_name,
                    "percentage_completed": percentage_completed
                }
        else:
            return {'error': 'User not found'}
    except Exception as e:
        print(f"Error retrieving user progress: {e}")
        return {'error': 'Something went wrong'}



def home_info(request):
    data = request.json
    email = data.get('email')
    name = get_name_by_email(email)
    courses = get_all_courses()
    progress = get_user_progress_by_email(email)
    return jsonify({
        'name': name,
        'courses': courses,
        'continue_learning': progress
    })

