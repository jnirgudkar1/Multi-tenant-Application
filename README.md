# Multi-tenant-Application

It is a Software as a Service application which provides UML parser as a backend and a web portal through which java source can be submitted to the UML parser hosted in cloud and can be graded.

# Technology Stack
AWS (Deployment of servers, load balancing using ELB and EC2 Auto Scaling)
Node (Back End)
Angular (Front End)
HTML5 (Markup)
CSS3 (UI/UX)

# Features
Grader can submit java source code as a zip file
Web server will unzip the java source code
UML parser will generate class diagram from the submitted java source code
Grader will be able to see the class diagram in web application
Grader can then grade the class diagram with tenant specific grading fields
Servers are configured to auto scale and load balance in using Application Gateway in AWS.

# Future Enhancements
Application can have student login page so that each student will be able to submit their assignments.
There can be a dashboard for grader where he will see all the pinned submissions.
Application should accomodate other types of submission apart from java source code.
