from flask import Flask, request, jsonify
from flask_cors import CORS
from ArmRobotPositioner import findStar

app = Flask(__name__)
CORS(app, resources={r"/*":{"origins":"*"}})


@app.route("/api/modify", methods=['POST'])
def modify():
    data = request.get_json()
    star=data.get('input',0)
    result=findStar(star)
    print(result)
    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


   