from flask import Flask, render_template, redirect, Markup, url_for, jsonify
from flask_pymongo import PyMongo
from bson import json_util
import json
import re
from datetime import datetime as dt

app = Flask(__name__)


# Use flask_pymongo to set up mongo connection
app.config["MONGO_URI"] = "mongodb://localhost:27017/social_blade"
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

    db_response = mongo.db.social_blade_asmr_data.find_one({}, {'_id': False})
    asmr_data = []
    for channel, data in db_response.items():
        asmr_data.append(data)
    for datum in asmr_data:
        datum['date_created'] = re.sub(r'th,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'st,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'nd,', '', datum['date_created'])
        datum['date_created'] = re.sub(r'rd,', '', datum['date_created']).strip()
        datum['date_created'] = dt.strptime(datum['date_created'], '%b %d %Y').isoformat()
        
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

