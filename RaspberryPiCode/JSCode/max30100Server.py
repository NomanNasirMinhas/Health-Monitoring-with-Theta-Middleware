from flask import Flask
import time
import max30100
import json
import random

mx30 = max30100.MAX30100()
mx30.enable_spo2()

app = Flask(__name__)

@app.route("/")
def max30100():
    #while 1:
    mx30.read_sensor()
    mx30.ir, mx30.red
    hb = round(float (mx30.ir / 100), 2)
    spo2 = float (mx30.red / 100)
    if (spo2 > 99):
        spo2 = round(random.uniform(96.0, 99.5), 2)
    data = {"HR":hb,"SPo2": spo2}
    return(json.dumps(data))

app.run(host='localhost', port=5000)