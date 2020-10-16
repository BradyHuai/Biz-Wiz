# Biz-Wiz Forum
> _Note:_ This document is meant to evolve throughout the planning phase of your project.   That is, it makes sense for you commit regularly to this file while working on the project (especially edits/additions/deletions to the _Highlights_ section). Most importantly, it is a reflection of all the planning you work you've done in the first iteration. 
 > **This document will serve as a master plan between your team, your partner and your TA.**

## Product Details
 
#### Q1: What are you planning to build?

 > Short (1 - 2 min' read)
 * Start with a single sentence, high-level description of the product.
 * Be clear - Describe the problem you are solving in simple terms.
 * Be concrete. For example:
    * What are you planning to build? Is it a website, mobile app,
   browser extension, command-line app, etc.?      
    * When describing the problem/need, give concrete examples of common use cases.
    * Assume your the reader knows nothing about the problem domain and provide the necessary context. 
 * Focus on *what* your product does, and avoid discussing *how* you're going to implement it.      
   For example: This is not the time or the place to talk about which programming language and/or framework you are planning to use.
 * **Feel free (and very much encouraged) to include useful diagrams, mock-ups and/or links**.
 
   We are planning to build a website aimed at small businesses and individuals who are looking for workers/work that allows users to post job opportunities or apply to job postings. During this time of Covid-19 and quarantine, many businesses are losing revenue and individuals are losing their jobs. What Biz-Wiz aims to solve is to assist those vulnerable businesses and individuals by providing them with a platform in the form of a website, to search for job opportunities or create job listings to ensure they are able to survive through this tough time of economic contraction. Even after this situation, Biz-Wiz will still be a useful tool for businesses and individuals to search for work opportunities as a means of living. The project partner gave us an example of what the project should be similar to: https://app.gigitmarketplace.com/. 

   A common use-case would be a business looking to create a company website for their business, would like to hire an individual with the skills and experience to create a visually appealing and functional website. The business would post a listing on the Biz-Wiz website searching for such individuals and can also specify details and needs of the job (e.g. an experienced website developer with 4+ years of skills in python). Then a website developer could be looking for work within 5km of where they live, would be able to view this posting on the website, and respond to it. Additionally, a business would be able to have a profile, showcasing their products, services and goals to the public, along with individuals being able to showcase their talents and skills to potential employers.


#### Q2: Who are your target users?

  > Short (1 - 2 min' read max)
 * Be specific (e.g. a 'a third-year university student studying Computer Science' and not 'a student')
 * **Feel free (but not obligated) to use personas.         
   You can create your personas as part of this Markdown file, or add a link to an external site (for example, [Xtensio](https://xtensio.com/user-persona/)).**
   
-Targeting small businesses in the Greater Toronto Area looking for new hires, those especially vulnerable to effects of COVID-19 . (1 - 4 employees)
-Targeting small businesses in the Greater Toronto Area looking for collaboration with other small businesses. e.g.  Joe the company event manager hosting a public meet and greet event is looking for catering services that can offer special deals for big scale consumers like him.
-Investors interested in local opportunities from startup and small businesses.
-People who want to start a small business and don’t know how (ex. interested in starting a business to supplement income due to COVID impacts regarding job losses)
-A startup entrepreneur looking for business partners.
-Full-time students who are searching for a part time job to cover living expenses amidst covid. e.g  Bob the third year social science student is looking for an event organisation part-time job locally.
-Recent graduates looking for local employment opportunities to enrich their experiences in the industry and build up a solid resume.
-High School senior students looking to fulfill volunteer hour requirements before graduation, and also to gain experience who feels lost searching for such opportunities. e.g Mary the high school senior who needs 30 more volunteer hours urgently, but all opportunities she knows require extensive registration and profiling.


#### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

> Short (1 - 2 min' read max)
 * We want you to "connect the dots" for us - Why does your product (as described in your answer to Q1) fits the needs of your users (as described in your answer to Q2)?
 * Explain the benefits of your product explicitly & clearly. For example:
    * Save users time (how much?)
    * Allow users to discover new information (which information? And, why couldn't they discover it before?)
    * Provide users with more accurate and/or informative data (what kind of data? Why is it useful to them?)
    * Does this application exist in another form? If so, how does your differ and provide value to the users?
    * How does this align with your partner's organization's values/mission/mandate?

-Since our product is mainly aimed at small businesses and individuals that have been affected by Covid-19, users will be able to discover niche job requests that they wouldn’t be able to find easily on similar websites.
-The website’s target users are in the GTA, so there will be more information available to those that live in the GTA than similar websites 
-The website will be able to provide users with accurate information and
-The government provides support for small businesses impacted by covid. However, there are strict limitations, one of which being making over 20k in revenues. Our product aims to act as a bridge to connect those in need to available resources, including a financial support currently being developed by a marketing team working with Biz-Wiz.

#### Q4: How will you build it?

> Short (1-2 min' read max)
 * What is the technology stack? Specify any and all languages, frameworks, libraries, PaaS products or tools. 
 * How will you deploy the application?
 * Describe the architecture - what are the high level components or patterns you will use? Diagrams are useful here. 
 * Will you be using third party applications or APIs? If so, what are they?
 * What is your testing strategy?
As the backend framework we have chosen to use the modern, Python based Django.

We have chosen to use PostgreSQL, a relational database that is very popular in the Django community. 

We will be using the JavaScript libraries React.js, jQuery and Redux for the design and client of our front-end development. 

We will deploy the final product through Google’s Firebase.

We will be using the Model-View-Controller software design pattern as it is supported by Django. The MVC programming paradigm allows programmers to keep a web application’s user interface (UI) and business logic layers separated which is appealing to us.

As the testing strategy we have decided that we will make use of the Continuous Integration and Continuous Delivery principles. We will be setting up a CI/CD pipeline through GitHub actions. Although small bugs in code will be inevitable, this approach will confirm that our new features are compatible with already existing code.

#### Q5: What are the user stories that make up the MVP?

 * At least 5 user stories concerning the main features of the application - note that this can broken down further
 * You must follow proper user story format (as taught in lecture) ```As a <user of the app>, I want to <do something in the app> in order to <accomplish some goal>```
 * If you have a partner, these must be reviewed and accepted by them
 * The user stories should be written in Github and each one must have clear acceptance criteria.
 
As an individual Biz-Wiz user, I want to be able to navigate to and find a local job to provide a means of living amidst the pandemic and beyond its recovery. 

As a company using Biz-Wiz, I want to post job openings with required skills needed in order to connect to potential workers who are in my geographic area to fill these openings.

As a small business owner, I want to use Biz-Wiz to provide me with an opportunity to connect with other small businesses for potential collaborations or special deals.

As an individual Biz-Wiz user, I want to connect with other like minded individuals interested in entrepreneurship, so that I can find partners to begin a small business.

As a company using Biz-Wiz, I want to showcase my company’s work, services, goals and accomplishments, so that I may garner interest from potential investors and the general public.

As an angel investor, I want to search for and vet promising startups and small businesses, in geographic regions in an attempt to guarantee the highest return on my investments.

----

## Process Details

#### Q6: What are the roles & responsibilities on the team?

Describe the different roles on the team and the responsibilities associated with each role. 
 * Roles should reflect the structure of your team and be appropriate for your project. Not necessarily one role to one team member.

List each team member and:
 * A description of their role(s) and responsibilities including the components they'll work on and non-software related work
 * 3 technical strengths and weaknesses each (e.g. languages, frameworks, libraries, development methodologies, etc.)
 
Tian Yue Liu: 
setting up and organizing meetings 
front end developer
Strength: familiar with Java, familiar with Python, knows basics of web development from 309 (html, css, react)
Weaknesses: no industry experience, haven’t learnt database, not very interested in running time complexity analysis

Artur Kuramshin: 
Roles: Represent the team and communicate with the partner to exchange ideas.
Database
Strengths: proficient in Python, Java, basic SQL. Has worked with Python based back-end frameworks like Flaska and Django.
Weaknesses: Not good at front-end design. Knows only basic html and css. No experience with current web development technologies.

Scott Price: 
Roles: Backend developer, timetable manager.
Strengths: Familiar with Java and Python, can write tests, has well formatted code
Weaknesses: Not familiar with databases, not familiar with Javascript, has little to no experience in web development before this project

Guo Qing Huai:
Roles: Front-end development, database, Team-whip, make announcements regarding project process and team meeting.
Strengths: familiar with Java and Python, knows basic Javascript knowledge: front end development (frameworks: React) and back end (NodeJS), Knows basic database knowledge (SQL).
Weakness: Not good at client server interaction. Not much coding experience, I need to practice using all things mentioned above.

Ethan Ku: 
Roles: Note taker for meetings (secretary); front end developer 
Strengths: proficient in programming with Java, Python and C; writes clear and well documented code; has some knowledge about front end development for websites
Weaknesses: limited experience in software development; unfamiliar with tech stacks and frameworks; no industry work experiences
 
Jun Yan Ren: 
Roles: Database, team time management
Strengths: familiar with languages such as Python and Java, willing to learn new frameworks and languages, decent work ethic
Weaknesses: not familiar with frontend frameworks such as React, not familiar with database languages, limited work experience

#### Q7: What operational events will you have as a team?

Describe meetings (and other events) you are planning to have. 
 * When and where? Recurring or ad hoc? In-person or online?
 * What's the purpose of each meeting?
 * Other events could be coding sessions, code reviews, quick weekly sync meeting online, etc.
 * You must have at least 2 meetings with your project partner (if you have one) before D1 is due. Describe them here:
   * What did you discuss during the meetings?
   * What were the outcomes of each meeting?
   * You must provide meeting minutes.
   * You must have a regular meeting schedule established by the second meeting.  
   
  Our team will have weekly meetings online through zoom. These meetings will occur Saturdays at 3:30 PM. The purpose of each meeting is to go through what has been done for the project, and what else needs to be done along with code reviews. We will also discuss any problems/setbacks or changes regarding progress and have multiple members fix the issue together if required. 

First meeting with partner: Oct 8th
During this first meeting, we discussed the project proposal and went over specific details regarding target users, functionalities, and partner’s expectations. We clarified some parts of the project our group was uncertain of such as the technology that our partner expects us to develop with. We also suggested some improvements and ideas that can be added to benefit the project further. The outcome of the meeting was that both parties were up to date with how the project will be accomplished and the features and functionalities it will have. 

Second meeting with partner: Oct 13th
During this second meeting, we had a discussion with the project partner where she explained her business in detail. Our group answered some questions she had regarding the process of creating the project and also agreed to hold weekly meetings for Tuesdays at 3:30 Pm est. We also showed the partner some parts of this deliverable such as the user stories to see if we had correctly interpreted the idea and goals of the project and also had the partner make corrections to parts that were inaccurate.

#### Q8: What artifacts will you use to self-organize?

List/describe the artifacts you will produce in order to organize your team.       

 * Artifacts can be To-Do lists, Task boards, schedule(s), meeting minutes, etc.
 * We want to understand:
   * How do you keep track of what needs to get done?
   * How do you prioritize tasks?
   * How do tasks get assigned to team members?
   * How do you determine the status of work from inception to completion?
   
Meeting minutes will be kept track of in a google document, which will record all details, questions, answers and clarifications that occur in the meeting. Meetings via zoom will also be recorded so that members who could not make it can be informed about any updates.

We will use a Google Sheet to keep track of all meetings and the due dates of the deliverables. We can post mini-deadlines to the Google Sheet for when group members are to complete specific parts of the project. We will highlight important tasks in the spreadsheet. Group members will be assigned tasks in the weekly meetings.

Updates (whether you can attend a meeting, late on a deadline, early) can be communicated via Facebook Messenger.

To upkeep task management, created tasks will be added to a separate page in the Google Sheet. This page of the Google Sheet will contain the group tasks as well as tasks for each individual member and will include the group’s expected due date for the task in addition to a rough estimate for how finished the task is. 

#### Q9: What are the rules regarding how your team works?

Describe your team's working culture.

**Communications:**
 * What is the expected frequency? What methods/channels are appropriate? 
 * If you have a partner project, what is your process (in detail) for communicating with your partner?
 
**Meetings:**
 * How are people held accountable for attending meetings, completing action items? Is there a moderator or process?
 
**Conflict Resolution:**
 * List at least three team scenarios/conflicts you discussed in lecture and how you decided you will resolve them. Indecisions? Non-responsive team members? Any other scenarios you can think of?


Communications:
We meet as an entire group weekly via Zoom. Upon need, we may also communicate individually via facebook messenger. We expect each group member to check the group chat at least once every twenty four hours.
With our partner, we also have scheduled weekly meetings via zoom. Upon need, we may also contact/be contacted through email, which we are expected to be viewed and responded to within forty eight hours.

Meetings:
We have a group member dedicated to ensure that all members attend meetings according to our agreed schedule and complete their assigned tasks. That person is currently Guo Qing Huai.

Conflict Resolution:
If we have an indecision between members, we bring the issue to the group for collective discussion. At which point, if there is still a split decision, we consult with our project TA for his professional inputs. If we can still not agree after discussing with the TA we will hold a vote.

In case of an unresponsive team member, we first ask the dedicated person to try to reach him. If there is still no response, our entire team will try to contact him using various methods of communication. If the issue still does not get resolved and escalates, we ask the TA/Prof to step in as a last resort.

Pull request conflict:
We first consult another team member outside of the conflict to give his insights. Then, we may ask our team lead, Artur, who is more experienced to give his professional judgement. In rare cases, would we then ask the TA for help.

Meeting time conflict
Solution 1: To begin, we decide on meeting times together based on availability of our members; we try to schedule for maximum availability. In case there cannot be a common free time for the entirety of the team, it is the absentee’s responsibility to find another member to help him convey his ideas and share any points brought up in the discussion.

Solution 2: If it is more suitable, we can split one meeting into two sections, and have at least one member attending both to share the ideas.

----
### Highlights

Specify 3 - 5 key decisions and/or insights that came up during your meetings
and/or collaborative process.

 * Short (5 min' read max)
 * Decisions can be related to the product and/or the team process.
    * Mention which alternatives you were considering.
    * Present the arguments for each alternative.
    * Explain why the option you decided on makes the most sense for your team/product/users.
 * Essentially, we want to understand how (and why) you ended up with your current product and process plan.
 * This section is useful for important information regarding your decision making process that may not necessarily fit in other sections. 
 
 Product:
Website from ground up vs wordpress plugin:

Initially, our partner wanted us to develop a website for her company using wordpress. The reasons behind it was that their company’s website is already built using that platform and she expects better compatibility that way. Through our discussion, we were able to convince her that using frameworks to build front end development from ground up is beneficial in numerous ways, including cost, customizability, and ease to configure details.

Addition of two user types, employer accounts and employee accounts:

When a new user first signs up for an account, they can either choose to create a business account or a regular user account. Which provides different functionalities after login. The main functionality for a regular user account is to search for job postings, while the main functionalities for business accounts is to post job postings and advertise to investors. Our partner thinks this is a great idea because it creates privacy and security. 

Different levels of access for employer accounts.

	Different levels of access could allow the sharing of responsibilities for managing an account for a business without requiring every employee who works on the account to have full access to the entire account. This would prevent an intern who was recently hired to manage certain aspects of the company’s Biz-Wiz account without giving them the only password and full control of the entire account. This would however make managing the account more difficult for a small business as it would require tracking who in the company has which level of access.
 
Addition of a business profile (Facebook + LinkedIn like):

We have suggested our partner have a user profile (especially for employers) that keeps all the information regarding the business, such as location, company goals and company values and also a list that keeps track of all the postings. This information will be present on the company’s profile page but also available to be found through individual user searches.

Admins:

Our partner thinks it would be a good idea for her and other business administrators to have exclusive access to verify the legitimacy of a business account listed in number 2. This manual review process creates a safer and more trust-worthy environment for all users of the platform, including those looking for employment opportunities and those seeking collaborations.

