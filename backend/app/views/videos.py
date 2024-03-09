from flask import Blueprint, request
from ..controllers.videos import videoCompleted, get_All_Videos_Info,get_Video_By_ID

videos = Blueprint('videos', __name__)


##################### MARK COMPLETE VIDEO ####################### 
@videos.route('/video/completed', methods=['POST'])
def videoCompletedRoute():
    print(f"\n {request.json} \n")
    response = videoCompleted(request)
    return response


##################### GET ALL THE VIDEOS ####################### 
@videos.route('/videos', methods=['GET'])
def get_All_Videos_Info_Route():
    print(f"\n {request.json} \n")
    response = get_All_Videos_Info(request)
    return response

##################### GET ONE VIDEO #######################
@videos.route('/getOne/video', methods=['GET'])
def get_one_video_info_route():
    print(f"\n {request.json} \n")
    response = get_Video_By_ID(request)
    return response


