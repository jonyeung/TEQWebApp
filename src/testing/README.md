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

Finally the IDE to run Robot Framework, RIDE, is installed.
`pip install robotframework-ride`
When this is done, RIDE is started by running `ride.py`

### Running a Test Suite
Use RIDE to open any of the .robot files and navigate to the Run tab to execute the test cases.