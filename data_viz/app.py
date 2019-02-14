from flask import Flask, render_template, redirect, Markup, url_for, jsonify
from flask_pymongo import PyMongo
from bson import json_util
import json

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
    return jsonify(asmr_data)

@app.route("/table")
def table():
    return render_template("table.html")

# @app.route("/status_spirit.html#recient")
# def redir1():
#     return redirect(url_for("https://mars.nasa.gov/mer/mission/status_spirit.html#recient"))

if __name__ == "__main__":
    app.run(host='127.0.0.1', port='5000', debug=True)

