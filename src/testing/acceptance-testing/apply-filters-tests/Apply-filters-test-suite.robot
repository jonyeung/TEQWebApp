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
${applyFilterButton}    //*[@id="applyFilterButton"]
${sleepDelay}     2
${filterU}        //*[@id="filterU"]
${filterD}        //*[@id="filterD"]
${filterUniqueIdentifierValue}    //div[@id="filterByLetterOptions"]//*[@id="client_validation_id"]
${filterDateOfBirth}    //div[@id="filterByLetterOptions"]//*[@id="client_birth_dt"]
${queryName2}     AcceptanceTest
${presetQuery}    //*[@id="savedQuerySelect"]

*** Test Cases ***
EmptyFilterTest
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
    Click Button    ${applyFilterButton}
    ${message}=    Handle Alert
    Should Be Equal As Strings    ${message}    Please select at least 1 filter.
    [Teardown]    Close Browser

NonEmptyFilterTest
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
    Click Button    ${applyFilterButton}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${dataTable}    2    9367839
    [Teardown]    Close Browser

PresetQueryTest
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
    Select From List By Label    ${presetQuery}    ${queryName2}
    Sleep    ${delay1s}
    Click Button    ${applyFilterButton}
    Sleep    ${sleepDelay}
    Table Row Should Contain    ${dataTable}    2    9367839
    Table Row Should Contain    ${dataTable}    2    1987-09-13T00:00:00.000Z
    [Teardown]    Close Browser
