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
${sleepDelay}     2
${register URL Button}    //*[@id="registerUserBtn"]
${registration URL}    http://${server}registration.html
${registerUsername}    //*[@id="regUsername"]
${registerPassword}    //*[@id="regPassword"]
${registerTypeSelect}    //*[@id="userTypeSelect"]
${registerButton}    //*[@id="registerBtn"]
${header}         css:header
${logoutButton}    //*[@id="logoutBtn"]
${SupportUsername}    RegisterSupport
${TestingPassword}    password
${LowUsername}    RegisterLow
${MidUsername}    RegisterMid
${HighUsername}    RegisterHigh
${UTSCUsername}    RegisterUTSC

*** Test Cases ***
RegisterSupportAgencyTest
    Open Browser    ${login URL}    ff
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${register URL Button}
    Location Should Be    ${registration URL}
    Wait Until Element Is Visible    ${registerUsername}    ${delay}
    Input Text    ${registerUsername}    ${SupportUsername}
    Input Text    ${registerPassword}    ${TestingPassword}
    Select From List By Index    ${registerTypeSelect}    1
    Click Button    ${registerButton}
    Handle Alert
    Sleep    ${sleepDelay}
    Click Element    ${header}
    Location Should Be    ${dashboard URL}
    Sleep    ${sleepDelay}
    Click Button    ${logoutButton}
    Sleep    ${sleepDelay}
    Location Should Be    ${login URL}
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${SupportUsername}
    Input Text    ${passwordField}    ${TestingPassword}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: Support Agency
    Location Should Be    ${dashboard URL}
    [Teardown]    Close Browser

RegisterTEQLowLevelTest
    Open Browser    ${login URL}    ff
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${register URL Button}
    Location Should Be    ${registration URL}
    Wait Until Element Is Visible    ${registerUsername}    ${delay}
    Input Text    ${registerUsername}    ${LowUsername}
    Input Text    ${registerPassword}    ${TestingPassword}
    Select From List By Index    ${registerTypeSelect}    2
    Click Button    ${registerButton}
    Handle Alert
    Sleep    ${sleepDelay}
    Click Element    ${header}
    Location Should Be    ${dashboard URL}
    Sleep    ${sleepDelay}
    Click Button    ${logoutButton}
    Sleep    ${sleepDelay}
    Location Should Be    ${login URL}
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${LowUsername}
    Input Text    ${passwordField}    ${TestingPassword}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ Low Level
    Location Should Be    ${dashboard URL}
    [Teardown]    Close Browser

RegisterTEQMidLevelTest
    Open Browser    ${login URL}    ff
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${register URL Button}
    Location Should Be    ${registration URL}
    Wait Until Element Is Visible    ${registerUsername}    ${delay}
    Input Text    ${registerUsername}    ${MidUsername}
    Input Text    ${registerPassword}    ${TestingPassword}
    Select From List By Index    ${registerTypeSelect}    3
    Click Button    ${registerButton}
    Handle Alert
    Sleep    ${sleepDelay}
    Click Element    ${header}
    Location Should Be    ${dashboard URL}
    Sleep    ${sleepDelay}
    Click Button    ${logoutButton}
    Sleep    ${sleepDelay}
    Location Should Be    ${login URL}
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${MidUsername}
    Input Text    ${passwordField}    ${TestingPassword}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ Mid Level
    Location Should Be    ${dashboard URL}
    [Teardown]    Close Browser

RegisterTEQHighLevelTest
    Open Browser    ${login URL}    ff
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${register URL Button}
    Location Should Be    ${registration URL}
    Wait Until Element Is Visible    ${registerUsername}    ${delay}
    Input Text    ${registerUsername}    ${HighUsername}
    Input Text    ${registerPassword}    ${TestingPassword}
    Select From List By Index    ${registerTypeSelect}    4
    Click Button    ${registerButton}
    Handle Alert
    Sleep    ${sleepDelay}
    Click Element    ${header}
    Location Should Be    ${dashboard URL}
    Sleep    ${sleepDelay}
    Click Button    ${logoutButton}
    Sleep    ${sleepDelay}
    Location Should Be    ${login URL}
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${HighUsername}
    Input Text    ${passwordField}    ${TestingPassword}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    [Teardown]    Close Browser

RegisterUTSCProjectStaffTest
    Open Browser    ${login URL}    ff
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${register URL Button}
    Location Should Be    ${registration URL}
    Wait Until Element Is Visible    ${registerUsername}    ${delay}
    Input Text    ${registerUsername}    ${UTSCUsername}
    Input Text    ${registerPassword}    ${TestingPassword}
    Select From List By Index    ${registerTypeSelect}    5
    Click Button    ${registerButton}
    Handle Alert
    Sleep    ${sleepDelay}
    Click Element    ${header}
    Location Should Be    ${dashboard URL}
    Sleep    ${sleepDelay}
    Click Button    ${logoutButton}
    Sleep    ${sleepDelay}
    Location Should Be    ${login URL}
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${UTSCUsername}
    Input Text    ${passwordField}    ${TestingPassword}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: UTSC Project Staff
    Location Should Be    ${dashboard URL}
    [Teardown]    Close Browser
