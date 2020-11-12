from flask import Flask
import time
import max30100
import json

mx30 = max30100.MAX30100()
mx30.enable_spo2()

app = Flask(__name__)

@app.route("/")
def max30100():
    #while 1:
    mx30.read_sensor()
    mx30.ir, mx30.red
    hb = int(mx30.ir / 100)
    spo2 = int(mx30.red / 100)
    data = {"HR":hb,"SPo2": spo2}
    return(json.dumps(data))

app.run(host='localhost', port=5000)