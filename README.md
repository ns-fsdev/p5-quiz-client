#  Express Server API - Questions APP
#

##  Project 05 - Capstone


##


##  by  Nigel Sampath
    Florida Atlantic University
    Full-Stack Web Developer.


##  Description
    Questions App.
    this is an app to record questions
    and answers by a user.
    This app can hold data for many
    users.
    Users authenticate to use the app.





##  Content:
    This app is in two separate parts Server and Client
    and function independently.

    The code in this repo is for the Question App Client, 
    see below:  

    Server -       ExpressJS app that can route
                   API requests to read and write
                   questions to a MySQL database.

                   Access to the server is handled by
                   PassportJS authentication.



    Client -       Front End client that provides the user
                   interface to add questions and answers
                   and delete questions and answers.
                   The user has to login and data is stored
                   by user.
                   API endpoint calls are made to the server.

                   This is written in ReactJS,
                   Javascript.



    Repo -         Server at : https://github.com/ns-fsdev/p5-quiz-server
         -         Client at : https://github.com/ns-fsdev/p5-quiz-client



##  Install:
    Prerequisites :
    MySQL server will need to be installed, and create a
    database called "quiz_db".

    NodeJS will need to be installed.

    App Install :
    Server and Client should be installed in separate directories.
    Download necessary files to a directory,

    then 'npm install' to install dependency modules.

    to start server app 'npm start'
    to start client app 'npm start'  


##  Technology used:
    Server :  NodeJS,  ExpressJS,  to handle API requests
              Sequelize as the command interface to the database.
              PassportJS for authentication.


    Client  : HTML , ReactJS for UI and single page application
              Antdesign for ReactJS styling and positioning.
              Javascript to make client API requests to the server.





##
##
[END]
