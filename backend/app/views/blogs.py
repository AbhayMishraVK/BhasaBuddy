from flask import Blueprint, request
from ..controllers.blogs import create_blog, get_blogs, get_one_blog

blogs = Blueprint('blogs', __name__)

################## CREATE BLOG #########################
@blogs.route('/create/blogs', methods=['POST'])
def create_blogs_route():
    # print(f"\n {request.json} \n")
    response =  create_blog(request)
    return response

################## GET BLOG #########################
@blogs.route('/blogs', methods=['GET', 'POST'])
def get_blogs_route():
    print(f"\n {request.json} \b")
    response = get_blogs(request)
    return response

################## GET ONE BLOG #########################
@blogs.route('/oneBlog', methods=['GET'])
def one_blog_route():
    # print(f"\n {request.json} \n")
    response = get_one_blog(request)
    return response
