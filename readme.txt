Project's Title

   Jwt authentication in node js

Project Description

   Jwt-authentication-Node-js is a Node.js application built with the Express framework that demonstrates how to implement JWT (JSON Web Token) authentication.

   This is a restfull api with jwt user authentication to make sure the security integration of the user's data.JWT is a widely used method for securely transmitting information between parties as a JSON object.

   Several Key components used in this assingment

   1. User Registration and Login: The first step was to create a user registration and login system. Users could sign up with their credentials, which included a Name, Email, Gneder, Age and a password. The passwords were securely hashed and stored in the database to ensure data safety.

   2. JWT Generation: On successfull login of the user,the server generated a JSON Web Token (JWT) using a secret key provided to it.This token contained specific user information, such as the user ID and Email in the encrypted form.

   3. Handling Protected Routes: Specific routes which can only be used by some authenticated user to secure the data and services used by unauthorized are the protected routes.

   4. Token Expiration: To enhance more security, the Jwt is set witha an expiration time,After the token expired, users needed to log in again to obtain a new token.


How to Install and Run the Project

Step 1: Vist the Repository link (https://github.com/manas-153/Jwt-authentication-Node-js.git) and download the zip file from the code section or you can clone the repository by running the (git clone https://github.com/manas-153/Jwt-authentication-Node-js) comannd.

Step 2: After succesfull cloning of the project Run the command (npm install), this will install all the packages and modules to your system which is required to run the project.

Step3: Once all the pacakges will be successfully intsalled you will see the node_modules folder has been created.

Step 4: Create a .env file and set up the enviroment variables for PORT AND SECRET_KEY.you can choose your own PORT and SECRET_KEY.

Step 5: The final step is to run the project using (npm start) command, This will host your project locally on your system on the Defined POrt number.


Important Prerequisites:

1. You must have node js installed in your system, if not you can download it from the link 
(https://nodejs.org/en/download).

2. MongoDb must be installed in system and hosted in your system, if not you can dowanload the Mongodb from the link (https://www.mongodb.com/try/download/community).