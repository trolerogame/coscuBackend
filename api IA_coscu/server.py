from flask import Flask
app = Flask(__name__)


@app.route("/", method=["POST"])
def index():
    return "<h1>holaa</h1>"
