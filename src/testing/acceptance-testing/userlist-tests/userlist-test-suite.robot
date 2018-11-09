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
${delay}          10
${userlist}       //*[@id="changeUserBtn"]
${userTable}      //*[@id="userList"]
${userlist URL}    http://${server}userlist.html

*** Test Cases ***
UserListTest
    Open Browser    ${login URL}    ff
    Wait Until Element Is Visible    ${usernameField}    ${delay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Wait Until Element Is Visible    ${loginStatus}    ${delay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${userlist}
    Location Should Be    ${userlist URL}
    Set Selenium Speed    ${delay}
    Table Row Should Contain    ${userTable}    2    1
    Table Row Should Contain    ${userTable}    2    testuser
