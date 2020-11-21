# Biz-Wiz Community Board

> _Note:_ This document is intended to be relatively short. Be concise and precise. Assume the reader has no prior knowledge of your application and is non-technical. 

## Description 
 * Provide a high-level description of your application and it's value from an end-user's perspective
 * What is the problem you're trying to solve?
 * Is there any context required to understand **why** the application solves this problem?
 
 The application our team has created is a website aimed at small businesses or individuals and allows them to post job opportunities or to apply to these opportunities. Users will be able to create an account and connect to other users by emailing them, posting job listings, and also responding to these listings. The problem this platform aims to solve is to assist vulnerable businesses and individuals by giving them the ability to search for job opportunities or create job requests to ensure they are able to survive through this difficult time of a pandemic. Even after the pandemic, this application still aims to be a useful tool for small businesses and individuals to make ends meet. 

## Key Features
 * Described the key features in the application that the user can access
 * Provide a breakdown or detail for each feature that is most appropriate for your application
 * This section will be used to assess the value of the features built
 
 In this second deliverable, the features currently available are: signing up for an account, creating and posting a job listing that can be edited and reviewed, a map feature that can search for job listings and their locations, and a backend with administrator access that can be used to manage the data and settings. 
 
Feature 1 - Signup:
This feature is an obvious given for any platform that requires you to save data to your account or modify settings specific to a user. This signup feature allows the user to create an account and then grants them access to the website, where they will be able to modify and save their personal settings, along with accessing the website’s main purpose - to create and respond to job postings. There are two types of signups for a user, one for an individual and one for a business owner. Each will have different features available to them in the future.
 
Feature 2 - Create job posting:
The second feature in the application is one of the main ones and allows users to create and edit job postings. Users will be able to create a job posting and will be required to fill out a form asking for details of the posting. Details will include the location the request is taking place, the type of request (i.e. work, volunteering, online service), a description of the request, contact information, and other details required for interested parties. The created posting will be able to be viewed and edited by the user who created it. This posting will also be able to be viewed by individuals or other businesses interested.
 
Feature 3 - Map Search:
The third and also one of the main features is the map search. This map search allows users to search and view job listings on a map. A user will be able to search based on the city, job type, industry, and type in a keyword to search for listings that satisfy the categories. Once the user searches for the listing, they will be able to see popup markers on the map and click on them to view a small blurb regarding the details of the listing as well as see the business the listing was created by. The popup will also include a link that directs the user to a full detailed view of the listing as described in the second feature.
 
Feature 4 - Administrator Access/Database Backend:
The final feature is an administrator account that is used to access the backend of the entire platform. The administrator can view the database and make changes by adding data, such as the range of cities that can have job postings in or remove data, such as inappropriate job listings.


## Instructions
 * Clear instructions for how to use the application from the end-user's perspective
 * How do you access it? Are accounts pre-created or does a user register? Where do you start? etc. 
 * Provide clear steps for using each feature described above
 * This section is critical to testing your application and must be done carefully and thoughtfully
 
Access to main page:
To begin, the user navigates to the main page to start using the website URL. Currently, before officially publishing the website, once backend and frontend are running, navigate to “localhost:3000” to access the main page. 

Sign Up and Sign In:
Temporarily: Navigate to “localhost:8000” and there are the buttons to the SignIn/SignUp page where specific details are entered to create the account. 
Eventually: Once in the main page, there is a “SIGN IN” button on the top right. Upon click, the user will be prompted with options to sign in as a “business owner”, a “individual”, or a “guest user”. If the user selects the first 2 options, he/she will be directed to a SignIn/SignUp page where specific details are entered to create the account. If the user selects “guest user”, he/she will directly access the home page of our website.

Access to features:
There is a sidebar once the user reaches the home page, which the user can click to use the features. Right now, features include: Profile, Edit Profile, Search for opportunities on the map, and View/Create Postings.

Profile:
The user can click “profile” on the sidebar, and then import username to view that person/company’s profile. The profile includes person/company’s information, as well as a list of postings that they have created.

Edit Profile:
The user can click “edit profile” on the sidebar to modify his/her information.

Map search:
In order to demo the map search, the user must create a job posting using the administrator account. After the user has created a posting, the user can click on the “Search Jobs” button on the sidebar to navigate to the map feature. In the feature, the user can input keywords describing the type of job posting and also input the different types or city locations of postings. After the user hits the submit button, results should show up on the map as markers and a list on the side should appear displaying all the job postings that match the search query. 

Posting:
In order to upload a new job posting, the user can click on the Add Job Posting on the left side bar, then the form that you have to fill out is being displayed on the page. After the filling is done, then click the POST button on the bottom of the page will upload the posting to the database. The post will be added to the database after refreshing the localhost:8000 page. Also, in the profile page, if the correct businessID is filled in, then the posting should be displayed in the posting section on that page.

 
 ## Development requirements
 * If a developer were to set this up on their machine or a remote server, what are the technical requirements (e.g. OS, libraries, etc.)?
 * Briefly describe instructions for setting up and running the application (think a true README).
 
 To install this on a machine, a developer must have already installed Python, PostgreSQL, and Node.js. Then the user must install the modules stated below in their python environment. To run the server, the user must first create a SQL database known as bizwiz on port 5432 with a owner “postgres” with password “bizwiz123”. This can be through PGAdmin4 which is installed when installing postgres from the link below. Alternatively, the user could update the values in the “DATABASES” dictionary at the key ‘default’ with their own SQL server information.  Then the user should navigate to the “BizWiz-Project/BizWiz” directory and run “python3 manage.py makemigrations” and subsequently “python3 manage.py runserver” to launch the backend server. Then the developer will need to navigate to the “BizWiz-Project/bizwizfrontend/” directory and run npm install followed by npm start. This will launch the frontend.
 
On any future launch of the project, the developer will only need to run “manage.py runserver” and “npm start” in the correct directories to launch the project.

Python Ver: 3.9

PostgreSQL: 13.1, Downloaded from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

This download will automatically create a server and install pgAdmin 4 to use for managing the database

Node.js: Latest

Python Modules Used and their versions:

asgiref==3.3.1
cffi==1.14.3
cryptography==3.2.1
Django==3.1.3
django-address==0.2.5
django-cors-headers==3.5.0
django-crispy-forms==1.9.2
django-rest-knox==4.1.0
djangorestframework==3.12.2
numpy==1.19.4
Pillow==8.0.1
protobuf==3.13.0
psycopg2==2.8.6
pycparser==2.20
python-dateutil==2.8.1
pytz==2020.4
six==1.15.0
sqlparse==0.4.1
requests==2.22.0

 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!
 
 Our GitHub workflow is split up into three different branches. The three different branches are the master branch, the frontend branch, and the connect branch. The frontend branch houses the react application which we use to develop the front end of the website. The master branch holds the backend code and also acts as the current usable product. The connect branch is used to connect the frontend to the backend and is there to ensure that no critical errors occur before combining the frontend to the master branch. If the connect branch successfully runs with no errors, it will be allowed to be merged into the master branch. 
Regarding pull requests, when a branch’s features are finally complete the team working on that branch will submit a pull request to merge the branch to master. The other team will review this request and approve it if it is acceptable. 
The naming conventions in the code that our team follows is to abide by the language’s standard conventions. Our project consists of a few languages such as javascript, python and other markup languages like html and css. Whenever we write code it will follow the standard conventions for that specific file.
At this time we are unable to deploy the application and thus are not currently using any deployment tools, though we intend on using deployment tools later, such as Heroku.
The reason why we chose this workflow is because it is not overly complex and works well for our project. It is simple and works well as we are able to complete the project without any major inconveniences or issues.


 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?
 
 After discussion with the partner, it was decided that the type of license we want for this project is no license https://choosealicense.com/no-permission/. The effects this license has is that the project is extremely restricted. The project will be under exclusive copyright, and no one else will be able to copy, distribute, or modify the project without the risk of takedowns. The reasoning for this is due to the wants and needs of the partner and the nature of the product. The project is meant to be a competitor to other similar platforms, such as indeed, glassdoor, and specifically, the Gigit MarketPlace: https://www.gigitmarketplace.com/. The project will be for commercial use strictly for the partner so placing these restrictions would keep this platform competitive and not risk any other competitors stealing any information.
