from flask import Flask, render_template, redirect, Markup, url_for, jsonify
from flask_pymongo import PyMongo
from bson import json_util
import json
import re
from datetime import datetime as dt

app = Flask(__name__)


# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/asmr_youtube"
mongo = PyMongo(app)

# Or set inline
# mongo = PyMongo(app, uri="mongodb://localhost:27017/social_blade")



# Route to render index.html template using data from Mongo
@app.route("/")
def home():

    return render_template("index.html")

@app.route("/asmr_channels")
def asmr_channels():
    # for i in mongo.db.social_blade_asmr_data.find():
    #     asmr_data = json.dumps(i, indent=4, default=json_util.default)

    sb_db_response = mongo.db.asmr_data.find_one({}, {'_id': False})
    asmr_data = []
    for channel, data in sb_db_response.items():
        asmr_data.append(data)
    for datum in asmr_data:
        datum['uploads'] = int(datum['uploads'])
        datum['views'] = int(datum['views'])
        datum['subs'] = int(datum['subs'])
        datum['date_created'] = re.sub(r'th,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'st,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'nd,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'rd,', '', datum['date_created']).strip()
        datum['date_created'] = dt.strptime(datum['date_created'], '%b %d %Y')
        datum['channel_age'] = round((dt.now() - datum['date_created']).total_seconds()/3600/24)
        datum['upload_frequency'] = round(datum['channel_age']/datum['uploads'], 2)
        datum['avg_views_video'] = round(datum['views']/datum['uploads'])
        datum['avg_views_subscriber'] = round(datum['views']/datum['subs'])
        datum['date_created'] = datum['date_created'].isoformat()

        # video_stats_dict = {}
        # for channel in response:
        #     video_stats_dict[channel] = {}
        #     durlist = []
        #     for dur in channel['duration']:
        #         durlist.append(dur)
        #     video_stats_dict[channel]['total_duration'] = sum(durlist)
                


        # datum['total_duration'] = sum([video['duration'] for video in datum['videos']])
        # datum['total_comments'] = sum([video['comments'] for video in datum['videos']])
        # datum['total_likes'] = sum([video['likes'] for video in datum['videos']])
        # datum['total_dislikes'] = sum([video['dislikes'] for video in datum['videos']])
        # datum['average_duration'] = datum['total_duration'] / datum['uploads']
        # datum['average_comments'] = datum['total_comments'] / datum['uploads']
        # datum['average_likes'] = datum['total_likes'] / datum['uploads']
        # datum['average_dislikes'] = datum['total_dislikes'] / datum['uploads']
        # datum['like_ratio'] = datum['total_likes'] / datum['total_dislikes']
        # datum =  {
        #     'channel_name': datum['channel_name'], 'channel_type': datum['channel_type'],'uploads': datum['uploads'], 'subs': datum['subs'], 
        #     'views': datum['views'], 'date_created': datum['date_created'], 'channel_age': datum['channel_age'], 'upload_frequency': datum['upload_frequency'],
        #     'avg_views_video':  datum['avg_views_video'], 'avg_views_subscriber': datum['avg_views_subscriber'], 'country': datum['country'], 'gender': datum['gender'], 
        #     'birthyear': datum['birthyear'], 'twitter': datum['twitter'], 'instagram': datum['instagram'], 'twitch': datum['twitch'], 'facebook': datum['facebook'],  
        #     'channel_id': datum['channel_id'], 'time_series': datum['time_series']
        #           }
    return jsonify(asmr_data)

@app.route("/table")
def table():
    return render_template("table.html")

@app.route("/linedata")
def linedata():
    # return jsonify({'date':['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    #                 'miles':[10,7,15,17,12,14,15]})
    dates = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    miles = [10,7,15,17,12,14,15]
    data = []
    for i, _ in enumerate(dates):
        data.append({'date': dates[i], 'miles': miles[i]})
    return jsonify(data)
@app.route("/line")
def line():
    return render_template("line.html")

# @app.route("/status_spirit.html#recient")
# def redir1():
#     return redirect(url_for("https://mars.nasa.gov/mer/mission/status_spirit.html#recient"))

if __name__ == "__main__":
    app.run(host='127.0.0.1', port='5000', debug=True)

