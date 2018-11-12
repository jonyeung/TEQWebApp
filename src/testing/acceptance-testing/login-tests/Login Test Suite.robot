*** Settings ***
Library           Selenium2Library

*** Variables ***
${usernameField}    //*[@id="loginUsername"]
${passwordField}    //*[@id="loginPassword"]
${userNameHighLevel}    donaldtrump
${passwordHighLevel}    americaisgreat
${logInButton}    //*[@id="loginBtn"]
${loginStatus}    //*[@id="loggedInAccessLevel"]
${userNameLowLevel}    gg
${passwordLowLevel}    password
${userNameSupportAgency}    nov8
${passwordSupportAgency}    password
${userNameUTSC}    utscstafftest1
${passwordUTSC}    password
${userNameMidLevel}    midleveltest1
${passwordMidLevel}    password

*** Test Cases ***
LoginTestHighLevelUser
    Open Browser    http://localhost:8000/src/frontend/    ff
    Wait Until Element Is Visible    ${usernameField}    15
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Wait Until Element Is Visible    ${loginStatus}    15
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level

LoginTestMidLevelUser
    Open Browser    http://localhost:8000/src/frontend/    ff
    Wait Until Element Is Visible    ${usernameField}    15
    Input Text    ${usernameField}    ${userNameMidLevel}
    Input Text    ${passwordField}    ${passwordMidLevel}
    Click Element    ${logInButton}
    Wait Until Element Is Visible    ${loginStatus}    15
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ Mid Level

LoginTestLowLevelUser
    Open Browser    http://localhost:8000/src/frontend/    ff
    Wait Until Element Is Visible    ${usernameField}    15
    Input Text    ${usernameField}    ${userNameLowLevel}
    Input Text    ${passwordField}    ${passwordLowLevel}
    Click Element    ${logInButton}
    Wait Until Element Is Visible    ${loginStatus}    15
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ Low Level

LoginTestSupportAgency
    Open Browser    http://localhost:8000/src/frontend/    ff
    Wait Until Element Is Visible    ${usernameField}    15
    Input Text    ${usernameField}    ${userNameSupportAgency}
    Input Text    ${passwordField}    ${passwordSupportAgency}
    Click Element    ${logInButton}
    Wait Until Element Is Visible    ${loginStatus}    15
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: Support Agency

LoginTestUTSC
    Open Browser    http://localhost:8000/src/frontend/    ff
    Wait Until Element Is Visible    ${usernameField}    15
    Input Text    ${usernameField}    ${userNameUTSC}
    Input Text    ${passwordField}    ${passwordUTSC}
    Click Element    ${logInButton}
    Wait Until Element Is Visible    ${loginStatus}    15
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: UTSC Project Staff
