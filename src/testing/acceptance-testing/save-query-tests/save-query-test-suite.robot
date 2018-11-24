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
${delay1s}        1
${queryDataButton}    //*[@id="queryDataBtn"]
${dataTable}      //div[@id="generatedTable"]//*[@id="dataList"]
${query URL}      http://${server}query.html
${saveQueryButton}    //*[@id="savePopupButton"]
${sleepDelay}     2
${filterU}        //*[@id="filterU"]
${filterD}        //*[@id="filterD"]
${filterUniqueIdentifierValue}    //div[@id="filterByLetterOptions"]//*[@id="client_validation_id"]
${filterDateOfBirth}    //div[@id="filterByLetterOptions"]//*[@id="client_birth_dt"]
${saveQuerySubmit}    //div[@id="saveQueryPopup"]//*[@id="saveQueryButton"]
${queryNameField}    //*[@id="saveQueryName"]
${queryName1}     AcceptanceEmpty
${queryName2}     AcceptanceTest
${filterF}        //*[@id="filterF"]
${filterFindEmployment}    //div[@id="filterByLetterOptions"]//*[@id="find_employment_needs_ind"]
${filterFindEmployementPeriod}    //div[@id="filterByLetterOptions"]//*[@id="find_employment_period_id"]
${presetQuery}    //*[@id="savedQuerySelect"]

*** Test Cases ***
SaveEmptyNameTest
    Open Browser    ${login URL}    ff
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${queryDataButton}
    Location Should Be    ${query URL}
    Sleep    ${sleepDelay}
    Click Button    ${saveQueryButton}
    Sleep    ${delay1s}
    Click Button    ${saveQuerySubmit}
    Sleep    ${delay1s}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    Please enter a name for the query.
    [Teardown]    Close Browser

SaveEmptyFilterTest
    Open Browser    ${login URL}    ff
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${queryDataButton}
    Location Should Be    ${query URL}
    Sleep    ${sleepDelay}
    Click Button    ${saveQueryButton}
    Sleep    ${delay1s}
    Input Text    ${queryNameField}    ${queryName1}
    Sleep    ${delay1s}
    Click Button    ${saveQuerySubmit}
    Sleep    ${delay1s}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    Please select at least 1 column to query.
    [Teardown]    Close Browser

SaveNonEmptyFilterTest
    Open Browser    ${login URL}    ff
    Sleep    ${sleepDelay}
    Input Text    ${usernameField}    ${userNameHighLevel}
    Input Text    ${passwordField}    ${passwordHighLevel}
    Click Element    ${logInButton}
    Sleep    ${sleepDelay}
    ${response}    Get Text    ${loginStatus}
    Should Be Equal As Strings    ${response}    You are logged in as a: TEQ High Level
    Location Should Be    ${dashboard URL}
    Click Button    ${queryDataButton}
    Location Should Be    ${query URL}
    Sleep    ${sleepDelay}
    Click Button    ${filterU}
    Sleep    ${delay1s}
    Click Button    ${filterUniqueIdentifierValue}
    Sleep    ${delay1s}
    Click Button    ${filterD}
    Sleep    ${delay1s}
    Click Button    ${filterDateOfBirth}
    Sleep    ${delay1s}
    Click Button    ${filterF}
    Sleep    ${delay1s}
    Click Button    ${filterFindEmployment}
    Sleep    ${delay1s}
    Click Button    ${filterFindEmployementPeriod}
    Sleep    ${delay1s}
    Click Button    ${saveQueryButton}
    Sleep    ${delay1s}
    Input Text    ${queryNameField}    ${queryName2}
    Sleep    ${delay1s}
    Click Button    ${saveQuerySubmit}
    Sleep    ${delay1s}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    AcceptanceTest has sucessfully been saved.
    Sleep    ${sleepDelay}
    Reload Page
    Sleep    ${sleepDelay}
    Select From List By Label    ${presetQuery}    ${queryName2}
    [Teardown]    Close Browser
