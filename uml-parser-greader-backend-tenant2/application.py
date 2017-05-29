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


@application.route("/api/upload", methods=['POST'])
def upload():
    print('upload file')
    file = request.files['file']
    filename = secure_filename(file.filename)
    print(filename)
    # Move the file form the temporal folder to
    # the upload folder we setup
    file.save(os.path.join(application.config['UPLOAD_FOLDER'], filename))
    unzipFile(filename)
    generateUML(application.config['UNZIP_FOLDER']+os.path.splitext(filename)[0])
    return getImage()

def unzipFile(filename):
    print("Reporting from unzip---",filename)
    zip_ref = zipfile.ZipFile(application.config['UPLOAD_FOLDER']+filename, 'r')
    zip_ref.extractall(application.config['UNZIP_FOLDER'])
    zip_ref.close()
    return "Unzipped"

def generateUML(inputfilepath):
    print("generateUML")
    args = ["umlparser.jar", inputfilepath, "output.png"] # Any number of args to be passed to the jar file
    result = callParser(args,inputfilepath)
    print(result)
    #resp = jsonify({"Generate_UML_Status": "success"})
    #resp.headers['Access-Control-Allow-Origin'] = '*'
    #return resp

def callParser(args,inputfilepath):
    print(['java', '-jar']+list(args))
    #subprocess.call(['java', '-jar']+list(args))

    args= ["java", "-jar", "umlparser.jar" ,"parser/test1", "output.png"]
    arg_list = ["java", "-jar", "umlparser.jar" ,inputfilepath, "output.png"]
   
    popen = subprocess.Popen(arg_list, stdout=subprocess.PIPE)
    popen.wait()
    output = popen.stdout.read()
    print (output)


def clean_dir():
    print("Cleaning Uploaded Directory")
    import os, shutil
    for the_file in os.listdir(application.config['UNZIP_FOLDER']):
        file_path = os.path.join(folder, the_file)
        try:
            if os.path.isfile(file_path):
                os.unlink(file_path)
                # elif os.path.isdir(file_path): shutil.rmtree(file_path)
        except Exception as e:
            print(e)

def getImage():
    print("return image")
    with open("output.png", "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read())
        resp = jsonify({"result": encoded_string})
        resp.headers['Access-Control-Allow-Origin'] = '*'

        clean_dir()
    #return send_file("output.png", mimetype='image/png')
        return resp

if __name__ == "__main__":
    print("running on 0.0.0.0")
    application.run(host='0.0.0.0')
        