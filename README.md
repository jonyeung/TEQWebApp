# C01 Bird Course Project

Welcome to our project page! Please see Documents/Deliverable_1_v01.pdf for an introduction to the team.

The document for Devliverable 4 (*Verification and Code Review*) can be found in Documents/Deliverable_4_v00.pdf, which includes our sprint reports and our code review for this deliverable.

The video about our code review is [here](https://drive.google.com/open?id=1kRGLnqUvsUH7xK6t5qBPXJMZz7t62NSz)

# Navigating the Repo
The src is divided into two sub-directories: backend and frontend. The frontend contains all our HTML pages along with the jQuery scripts and styling sheets.
The backend contains all our backend APIs powered by Node.js.

#Product Demo
Our product demo can be found at https://youtu.be/-At0rUuQEo8.

# Project Planning
Please see the backlogs directory for information regarding the direction of the project. Under product-backlogs you can find our personas and user stories we have created for this project. Under the sprint-backlogs directory you can find the corresponding sprint plan, execution, and burndown chart filed under each sprint's corresponding folder.
## Code Review
During Sprint 4, our team did a code review, evaluating the code written from Sprints 1-3. Under backlogs/sprint-backlogs/Sprint 4 there is a file that outlines the strategy we employed for the code review, as well as the individual comments that each team member wrote following the code review. See above for a video where we summarized the changes and improvements we made to the code going forward.

# Executing the Project
Navigate through Team2/src/frontend/ . You can run the HTML files locally on a browser of your choice. Currently we have
the following pages and features:
```
- index: login page, user can sign in with their credentials
- dashboard: home page shown after the user has logged in, different options are available to the user depending on their user level
- userlist: page that displays a list of all existing users in the system
- registration: page to register a new user with password and access levels
- upload_data: page that allows users to upload iCARE templates into the database
- query: page that allows user to filter through and search through the data
- change_password: page that allows user to change their account password
- log: page for the UTSC staff to view changes to preset queries
```
# Testing
Unit tests and acceptance tests have been written for the user stories up to the end of Sprint 3. The tests can be found under src/testing .
