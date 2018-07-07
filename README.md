# Multi-tenant-Application

Multi-Tenant-SaaS-Application
It is a Software as a Service application which provides UML parser as a backend and a web portal through which java source can be submitted to the UML parser hosted in cloud and can be graded.

Table of contents
Objective
Getting Started
Architecure Diagram
Technology Stack
Features
Demo Video
Future Enhancements
Objective
Objective was to develop a Multi-Tenant, Cloud Scalable, Multi-AZ SaaS App using Amazon Web Services.

Getting Started
Download all the tenant servers and web application express server.
Run app.py from tenant 1 server and all remaining servers.
Run app.js from web application express server.
Goto localhost:3000 in your browser.
Architecure Diagram


Technology Stack
AWS (Deployment of servers, load balancing using ELB and EC2 Auto Scaling)
Python Flask (Writing web services)
Angular (Front End)
HTML5 (Markup)
CSS3 (UI/UX)
Features
Grader can submit java source code as a zip file
Web server will unzip the java source code
UML parser will generate class diagram from the submitted java source code
Grader will be able to see the class diagram in web application
Grader can then grade the class diagram with tenant specific grading fields
Servers are configured to auto scale and load balance in using Application Gateway in AWS.

Future Enhancements
Application can have student login page so that each student will be able to submit their assignments.
There can be a dashboard for grader where he will see all the pinned submissions.
Application should accomodate other types of submission apart from java source code.
