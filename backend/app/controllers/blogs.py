from flask import jsonify
from app import mongo
import base64
import os 


######################## For getting the blog ##########################
def get_blogs(request):
    try:
        # Extract the user's email from the request JSON
        email = request.json.get('email', None)

        print(f"\n\n {email} \n\n")

        # Validate the email
        if not email:
            return jsonify({"error": "Email is required", "status": 400}), 400

        # Find the user in the MongoDB database
        user = mongo.db.user.find_one({"email": email})

        # Check if the user exists
        if not user:
            return jsonify({"error": "User not found", "status": 404}), 404

        # Retrieve the user's language preference
        user_language = user.get('regional_language', None)

        # Validate the user's language preference
        if not user_language:
            return jsonify({"error": "User language preference not found", "status": 400}), 400

        # Retrieve all blogs from the MongoDB database
        all_blogs = list(mongo.db.blogs.find())

        # Filter blogs based on the user's language preference
        filtered_blogs = [blog for blog in all_blogs if blog.get('language') == user_language]

        # Convert ObjectId to string for each blog and include the image path
        for blog in filtered_blogs:
            blog['_id'] = str(blog['_id'])
            blog['image'] = base64.b64encode(open(blog['image'], 'rb').read()).decode('utf-8') 
        
        # print(f"\n \n Blogs" , filtered_blogs, "\n\n")

        # Return the filtered blogs as JSON
        return jsonify({"blogs": filtered_blogs, "status": 200}), 200
    except Exception as e:
        print(f"Error retrieving blogs: {e}")
        return jsonify({"error": "Something went wrong", "status": 500}), 500

######################## For creatng  the blog  ##########################
def create_blog(request):
    try:
        # Extract blog details from the request JSON
        title = request.json.get('title', None)
        content = request.json.get('content', None)
        writer_name = request.json.get('writer_name', None)
        image = request.json.get('image', None)
        regional_language = request.json.get('language', None)
        email = request.json.get('email', None)

        # Validate the required fields
        if not all([title, content, writer_name, image, regional_language, email]):
            return jsonify({"error": "All fields are required", "status": 400}), 400

        # Check if a blog with the same title already exists
        existing_blog = mongo.db.blogs.find_one({'title': title})
        if existing_blog:
            return jsonify({"error": "Title should be unique", "status": 400}), 400

        # Decode the image from base64
        image_data = base64.b64decode(image)

        # Sanitize the title to use as a filename
        sanitized_title = title.replace(' ', '_').replace('/', '_')
        image_filename = f"{sanitized_title}.jpg"

        # Define the path where the image will be saved
        image_path = os.path.join('static', 'images', image_filename)

        # Create the directory if it does not exist
        os.makedirs(os.path.dirname(image_path), exist_ok=True)


        # Save the image to the server's file system
        with open(image_path, 'wb') as f:
            f.write(image_data)

        # Store the blog in the MongoDB database with the image path
        blog_id = mongo.db.blogs.insert_one({
            'title': title,
            'content': content,
            'writer_name': writer_name,
            'image': image_path, # Store the path to the image
            'language': regional_language,
            'email': email
        }).inserted_id

        # Return the success response
        return jsonify({"message": "Blog created successfully", "blog_id": str(blog_id), "status": 200}), 200
    except Exception as e:
        print(f"Error creating blog: {e}")
        return jsonify({"error": "Something went wrong", "status": 500}), 500
    

#################### GET ONE BLOG ############################## 
def get_one_blog(request):
    try:
        # Extract the blog title from the request JSON
        title = request.json.get('title', None)

        print()

        # Validate the title
        if not title:
            return jsonify({"error": "Title is required", "status": 400}), 400

        # Find the blog in the MongoDB database by title
        blog = mongo.db.blogs.find_one({"title": title})

        # Check if the blog exists
        if not blog:
            return jsonify({"error": "Blog not found", "status": 404}), 404

        # Convert ObjectId to string for the blog and include the image path
        blog['_id'] = str(blog['_id'])
        blog['image'] = blog['image'] # This is the path to the image

        # Return the blog details as JSON
        return jsonify({"blog": blog, "status": 200}), 200
    except Exception as e:
        print(f"Error retrieving blog: {e}")
        return jsonify({"error": "Something went wrong", "status": 500}), 500
    

