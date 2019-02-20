from flask import Flask, render_template, redirect, Markup, url_for, jsonify
from flask_pymongo import PyMongo
from bson import json_util
import json
import re
from datetime import datetime as dt

app = Flask(__name__)


# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/asmr_youtube_test"
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

    sb_db_response = mongo.db.asmr_data_test.find_one({}, {'_id': False})
    asmr_data = []
    for channel, data in sb_db_response.items():
        asmr_data.append(data)
    for datum in asmr_data:
        datum['uploads'] = int(datum['uploads'])
        datum['views'] = int(datum['views'])
        datum['views_(millions)'] = round(datum['views']/1000000, 2)
        datum['subs'] = int(datum['subs'])
        datum['subs_(100k)'] =  round(datum['subs']/100000, 2)
        datum['date_created'] = re.sub(r'th,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'st,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'nd,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'rd,', '', datum['date_created']).strip()
        datum['date_created'] = dt.strptime(datum['date_created'], '%b %d %Y')
        datum['channel_age'] = round((dt.now() - datum['date_created']).total_seconds()/3600/24)
        datum['days_btw_uploads'] = round(datum['channel_age']/datum['uploads'], 2)
        datum['avg_100k_views_video'] = round(datum['views']/datum['uploads']/100000, 2)
        datum['avg_100k_views_subscriber'] = round(datum['views']/datum['subs_(100k)']/100000, 2)
        datum['date_created'] = datum['date_created'].isoformat()
        # durList = []
        # commList = []
        # likeList = []
        # dislikeList = []
        # pubList = []
        # for video in datum['videos']:
        #     video['published_at'] = ' ' + video['published_at'][0:10]
        #     pubList.append(video['published_at'])
        #     durList.append(float(video['duration']))
        #     commList.append(float(video['comment_count']))
        #     likeList.append(float(video['like_count']))
        #     dislikeList.append(float(video['dislike_count']))
        # datum['time_series']['pubs'] = pubList
        # datum['total_duration'] = sum(durList)
        # datum['total_comments'] = sum(commList)
        # datum['total_likes'] = sum(likeList)
        # datum['total_dislikes'] = sum(dislikeList)
        # datum['average_duration'] = datum['total_duration'] / datum['uploads']
        # datum['average_comments'] = datum['total_comments'] / datum['uploads']
        # datum['average_likes'] = datum['total_likes'] / datum['uploads']
        # datum['average_dislikes'] = datum['total_dislikes'] / datum['uploads']
        # datum['like_ratio'] = datum['total_likes'] / datum['total_dislikes']

    return jsonify(asmr_data)

@app.route("/table")
def table():
    return render_template("table.html")

@app.route("/youtube250")
def youtube250():
    return render_template("Top250Index.html")

@app.route("/line")
def line():
    return render_template("line.html")

@app.route("/bar")
def bar():
    return render_template("bar.html")

@app.route("/c3")
def c3():
    return render_template("c3.html")  

# @app.route("/status_spirit.html#recient")
# def redir1():
#     return redirect(url_for("https://mars.nasa.gov/mer/mission/status_spirit.html#recient"))

if __name__ == "__main__":
    app.run(host='127.0.0.1', port='5000', debug=True)

