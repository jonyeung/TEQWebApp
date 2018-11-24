# Testing


## Acceptance Testing

### Installation
In order to run the tests, users must install any version of Python 2.
Users can verify their Python version with
`python --version`

Users must then install Robot Framework. This can be done with the following command:
`pip install robotframework`
(pip is included in the install of Python, if it is not working make sure the location of .../Python27/Scripts is under your PATH environment variable)

If the user has successfully installed Robot Framework `pybot --version` should show the current installed version.
In order to run the tests,  further dependencies are also required. Users will need to install Selenium2Library also installed with pip.
`pip install robotframework-selenium2library`
`pip install -U selenium`
Following this, users must install wxPython to run Robot Framework. wxPython can be found at the following link:
https://sourceforge.net/projects/wxpython/files/wxPython/2.8.12.1/

User must then install geckodriver for the test to work with firefox.
Download from the following link: https://github.com/mozilla/geckodriver/releases

Finally the IDE to run Robot Framework, RIDE, is installed.
`pip install robotframework-ride`
When this is done, RIDE is started by running `ride.py`

### Running a Test Suite
Since the acceptance test runs on local server, user must go to team2\ directory in terminal and start the server there with
`python -m SimpleHTTPServer`
Then in another terminal use RIDE to open any of the .robot files and navigate to the Run tab to execute the test cases.

***NOTE***: Some feature tests such as register and save query makes a user/saved query in the database and the database will not accept duplicate usernames/query names which means you must either delete the specific user/saved query from the database, or more likely you must change the value of the variables in the test before you run the tests so that the database can actually accept the user/saved query. If you do not do this the acceptance test will fail.
Example of a value that must be changed before runnning is "AcceptanceTest" query name in the save query test. 

## Unit Testing

### Installation
To install qunit in node, run `npm install --save-dev qunit` in terminal.

The test files can be found in `src/testing/unit-testing`. 
`.js` files contains test suites written in Javascript under the QUnit framework
`.html` is used to display test results on the browser

More documentations about how to write unit tests for Javascript and JQuery can be found at:
https://qunitjs.com/

### Running a test suite
Use any JQuery supported browsers to run `qunit.html` and navigate to see test results.
