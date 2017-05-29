import json
from flask import Flask, render_template, request, session, flash, redirect, jsonify, json, Response
import zipfile
from flask_cors import CORS
from werkzeug import secure_filename
import os
import subprocess
from subprocess import *
import base64
from flask import send_file


application = Flask(__name__)
application.config['UPLOAD_FOLDER'] = 'uploads/'
application.config['UNZIP_FOLDER'] = 'parser/'

CORS(application)

@application.route("/ping", methods=['GET'])
def ping():
	print('ping me')
	return json.dumps({"hello":"world"})


@application.route("/tenant3", methods=['POST'])
def upload():
    print('upload file')
    file = request.files['file']
    filename = secure_filename(file.filename)
    print(filename)
    file.save(os.path.join(application.config['UPLOAD_FOLDER'], filename))
    unzipFile(filename)
    generateUML(application.config['UNZIP_FOLDER']+os.path.splitext(filename)[0])
    return getImage(application.config['UNZIP_FOLDER']+os.path.splitext(filename)[0],os.path.splitext(filename)[0])

def unzipFile(filename):
    print("Reporting from unzip---",filename)
    zip_ref = zipfile.ZipFile(application.config['UPLOAD_FOLDER']+filename, 'r')
    zip_ref.extractall(application.config['UNZIP_FOLDER'])
    zip_ref.close()
    return "Unzipped"

def generateUML(inputfilepath):
    print("generateUML")
    args = ["uml-Parser.jar", inputfilepath, "output"] 
    result = callParser(args,inputfilepath)
    print(result)

def callParser(args,inputfilepath):
    print(['java', '-jar']+list(args))

    arg_list = ["java", "-jar", "uml-Parser.jar","class",inputfilepath, "output"]
    application.config['OUTPUT_FOLDER'] = inputfilepath
   
    popen = subprocess.Popen(arg_list, stdout=subprocess.PIPE)
    popen.wait()
    output = popen.stdout.read()
    print (output)


def clean_dir():
    print("Cleaning Uploaded Directory")
    import os, shutil
    for the_file in os.listdir(application.config['UNZIP_FOLDER']):
        file_path = os.path.join(application.config['UNZIP_FOLDER'], the_file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
        except Exception as e:
            print(e)

def getImage(filename,extension):
    print("return image")
    print filename
    print extension
    with open(application.config['UNZIP_FOLDER']+extension+"\\"+"output.png", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        resp = jsonify({"result": encoded_string})
        resp.headers['Access-Control-Allow-Origin'] = '*'
        clean_dir()
        return resp
        

if __name__ == "__main__":
    print("running on 0.0.0.0")
    application.run(host='0.0.0.0')
