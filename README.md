# team-project-16-biz-wiz
team-project-16-biz-wiz created by GitHub Classroom

# Instructions on running application

This application will require installing different packages, dependencies, and other applications.

First, clone this repository onto your computer.

# Database
We have chosen PostgreSQL as our database. You can download the PostgreSQL server from https://www.postgresql.org/download/. We also use the pgAdmin 4 tool to help manage the databases: https://www.pgadmin.org/download/.

Once both are installed, running pgAdmin 4 will open up a tab in your web browser. Under the browser along the left side, you will see a 'Servers' tab which you should be able to drop down which should reveal the PostgreSQL 13 tab. Access to the PostgreSQL tab will require that you create an USER, leave the username as 'postgres' and set the password to be 'bizwiz123'. Dropping down the PostgreSQL 13 tab should reveal the 'Databases' tab. Right click on 'Databases' and navigate to 'Create' -> 'Databse...', name it bizwiz and make sure the owner is set to 'postgres', click save.


# Back end
To get the back end server running locally on your machine, you have to have the latest version of python, which can be downlaoded from https://www.python.org/downloads/.

After downloading the latest version of python, navigate to the 'BizWiz' folder from the path /BizWiz-Project/BizWiz. Once inside the folder, you need to create a virtual environment using the command `python3 -m venv env` in the terminal. Once this has finished, navigate into the 'env' folder you have just created and run the command `source bin/activate` inside the 'env' folder. After that has finished you need to install a few dependencies into the virtual environment. The commands needed required to be run are:

`pip3 install asgiref`

`pip3 install cffi`

`pip3 install cryptography`

`pip3 install django`

`pip3 install django-address`

`pip3 install django-cors-headers`

`pip3 install django-crispy-forms`

`pip3 install django-rest-knox`

`pip3 install djangorestframework`

`pip3 install numpy`

`pip3 install pillow`

`pip3 install protobuf`

`pip3 install psycopg2`

`pip3 install pycparser`

`pip3 install python-dateutil`

`pip3 install pytz`

`pip3 install six`

`pip3 install sqlparse`

`pip3 install requests`

There may be other modules missing from this list, but if anything is missed, running the server will notify you of what is missing so you can follow the same procedure for that missing module. Additionally, make sure all the installations are up to date.

After installing the modules, move out of the 'env' folder you created into the parent folder 'BizWiz' and run the two commands in order: `python3 manage.py makemigrations` then `python3 manage.py migrate`. If any required modules are missing, these two commands will fail and notify you if a certain module is missing.

After running these two commands, the final step is to run `python3 manage.py runserver` which should activate the server locally. Anytime you want to start up the server again you can go into the 'env' folder and run the command `source bin/activate` and then move to the parent folder and run `python3 manage.py runserver`. You can then follow the link given in the terminal to access the backend of the server.

# Front end
In order to get the front end website working, you must have install the latest version of node.js from https://nodejs.org/en/.

After you have installed nodejs, navigate to the 'bizwizfrontend' folder from the path /BizWiz-Project/bizwizfrontend. Once you are in the folder, you must run the command `npm install` from your terminal. After that has finished, you can start the website by running `npm start`. A browser window should pop up automatically when running `npm start` and if not, simply follow the link given in the terminal.

Note: In order for the website features to function, the backend server and database must be running.

# Google maps API

This project has been using a temporary free trial Google API key that allows the map to function. The key will be removed upon transfer of this repository. You can create an API key for this project from https://developers.google.com/maps/documentation/javascript/get-api-key. Once you have created/logged into your Google account, follow the steps to create and get an API key. The API key must have the following enabled: Geocoding API, Maps JavaScript API, and Places API. Once you have created an API key and enabled the proper services, you must put the key into two code files in this project. The two files can be traced from the paths: 

'/BizWiz-Project/bizwizfrontend/src/components/MapSearch.jsx' and 

'/BizWiz-Project/BizWiz/main/views/api.py'.

Once you locate these two files, the lines of code that must be changed are line 76 for 'MapSearch.jsx' and line 169 for 'api.py'. Simply replace the placeholder text YOUR_API_KEY_HERE with your own personal API key; do not modify any quotations. 

To the future software developers working on this project, this key should not be kept visible in the locations they are coded in. They should be kept as a secret environment variable on GitHub. The reason why they are where they are is because of the specific local circumstances of this course.

