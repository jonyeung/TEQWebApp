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
${user1}          testuser
${user1Row}       2
${sleepDelay}     2

*** Test Cases ***
UserListTest
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
    Table Row Should Contain    ${userTable}    ${user1Row}    1
    Table Row Should Contain    ${userTable}    ${user1Row}    ${user1}
    [Teardown]    Close Browser
