*** Settings ***
Library           Selenium2Library

*** Variables ***
${usernameField}    //*[@id="loginUsername"]
${passwordField}    //*[@id="loginPassword"]
${userNameHighLevel}    donaldtrump
${passwordHighLevel}    americaisgreat
${logInButton}    //*[@id="loginBtn"]
${loginStatus}    //*[@id="loggedInAccessLevel"]
${server}         localhost:8000/src/frontend/
${dashboard URL}    http://${server}dashboard.html
${login URL}      http://${server}index.html
${delay}          5
${userlistButton}    //*[@id="changeUserBtn"]
${userTable}      //*[@id="userList"]
${userlist URL}    http://${server}userlist.html
${saveAccessButton}    //*[@id="saveButton"]
${select1}        //div[@id="userListDiv"]//select[@id="1"]
${user1}          testuser
${user1Row}       2
${sleepDelay}     2

*** Test Cases ***
SupportAgencyTest
    Open Browser    ${login URL}    ff
    Wait Until Element Is Visible    ${usernameField}    ${delay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${userlistButton}
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Select From List By Index    ${select1}    1
    Click Button    ${saveAccessButton}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    Updated user id: 1 to access level: support_agency.
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Table Row Should Contain    ${userTable}    ${user1Row}    support_agency
    [Teardown]    Close Browser

TEQLowLevelTest
    Open Browser    ${login URL}    ff
    Wait Until Element Is Visible    ${usernameField}    ${delay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${userlistButton}
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Select From List By Index    ${select1}    2
    Click Button    ${saveAccessButton}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    Updated user id: 1 to access level: TEQ_low_level.
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Table Row Should Contain    ${userTable}    ${user1Row}    TEQ_low_level
    [Teardown]    Close Browser

TEQMidLevelTest
    Open Browser    ${login URL}    ff
    Wait Until Element Is Visible    ${usernameField}    ${delay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${userlistButton}
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Select From List By Index    ${select1}    3
    Click Button    ${saveAccessButton}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    Updated user id: 1 to access level: TEQ_mid_level.
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Table Row Should Contain    ${userTable}    ${user1Row}    TEQ_mid_level
    [Teardown]    Close Browser

TEQHighLevelTest
    Open Browser    ${login URL}    ff
    Wait Until Element Is Visible    ${usernameField}    ${delay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${userlistButton}
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Select From List By Index    ${select1}    4
    Click Button    ${saveAccessButton}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    Updated user id: 1 to access level: TEQ_high_level.
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Table Row Should Contain    ${userTable}    ${user1Row}    TEQ_high_level
    [Teardown]    Close Browser

UTSCProjectStaffTest
    Open Browser    ${login URL}    ff
    Wait Until Element Is Visible    ${usernameField}    ${delay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${userlistButton}
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Select From List By Index    ${select1}    5
    Click Button    ${saveAccessButton}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    Updated user id: 1 to access level: UTSC_staff.
    Location Should Be    ${userlist URL}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    Table Row Should Contain    ${userTable}    ${user1Row}    UTSC_staff
    [Teardown]    Close Browser
