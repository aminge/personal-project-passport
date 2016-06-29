# Express/Passport Lecture Starting File
Download and run 'npm install' before the lecture as prep. In this lecture, we will build out a user registration page and allow our users to log into our application. Once they are logged in, we will see information returned to us, specific to the user.

# SQL Strategy Branch
The main difference is it now uses ```/strategies/user_sql.js```. See ```/modules/connection.js``` to set your Database connection string. You will find a basic ```CREATE TABLE``` query commented out in the strategy file.

You'll need the ```pg``` module as well (just run ```npm install```)

```/models/user.js``` is no longer needed at all.

## Branch Breakdown
* ```master:``` Original lecture code with jQuery, alt static file serving, Grunt, Mongoose/Mongo
* ```angular-complete:``` Angular and MongoDB version as shown to Iota cohort.
* ```sql_strategy:``` Replaces MongoDB with PostGRES for storage of user data. Maintains bcrypt functionality.
