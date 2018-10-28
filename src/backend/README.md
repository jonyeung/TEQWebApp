# backend API
Restful API powered by Node.js

A live API endpoint is up and running at https://c01.mechanus.io

## usage

### user
#### create user
POST `/user`

body:
- username: string
- password: string
- access_level: string

return value:
- success: boolean
- result: object (only if the operation is successful)
  - id: int
- error: object (only if the operation has failed)

exmaple:
```
➜  backend git:(backend) ✗ curl -d 'username=donaldtrump&password=americaisgreat&access_level=TEQ_mid_level' -X POST localhost:8080/user
{"success":true,"result":{"id":15}}
```

#### authenticate user

GET `/authenticate`

query:
- username: string
- password: string

return value:
- success: boolean
- result: object (only if the operation is successful)
  - authenticated: boolean
  - user: object (only if the user is authenticated)
    - ID: int
    - currently_logged_in:int
    - access_level: string

example:
```
➜  backend git:(backend) ✗ curl 'localhost:8080/authenticate?username=donaldtrump&password=americaisgreat'
{"success":true,"result":{"authenticated":true,"user":{"ID":9,"currently_logged_in":0,"access_level":"TEQ_mid_level"}}}
```

#### get users
GET `/user`

return value:
- success: boolean
- result: object (only if the operation is successful)
  - users: array of objects
    - ID: int
    - currently_logged_in:int
    - access_level: string

example:
```
➜  backend git:(master) ✗ curl localhost:8080/user
{"success":true,"result":{"users":[{"ID":1,"username":"testuser","currently_logged_in":0,"access_level":"TEQ_high_level"},{"ID":2,"username":"user2","currently_logged_in":0,"access_level":"TEQ_low_level"},{"ID":3,"username":"user3","currently_logged_in":0,"access_level":"TEQ_low_level"},{"ID":6,"username":"randomuser","currently_logged_in":0,"access_level":"TEQ_mid_level"},{"ID":9,"username":"donaldtrump","currently_logged_in":0,"access_level":"TEQ_mid_level"},{"ID":11,"username":"donaldtrump2","currently_logged_in":0,"access_level":"TEQ_mid_level"},{"ID":12,"username":"donaldtrump3","currently_logged_in":0,"access_level":"TEQ_mid_level"},{"ID":13,"username":"donaldtrump4","currently_logged_in":0,"access_level":"TEQ_mid_level"},{"ID":15,"username":"donaldtrump5","currently_logged_in":0,"access_level":"TEQ_mid_level"}]}}
```

#### change user access level
POST `/changeAccess`

query:
-access_level: string
-id: int

return value:
-success: boolean
-result: object (only if the operation is successful)
  -ID: int
  -access_level: string

example:
```
➜  
```



#### insert row
POST `/insertRow`

body: {
    "row": {
        "fieldname": value,
        "fieldname2": value
    }
}

__fieldname need to be exactly the same as in database__

return value:
- success: boolean
- result: object (only if the operation is successful)
- error: object (only if the operation is unsuccessful)

example:
```
➜  backend git:(backend) ✗ curl -d '{"row": { "Processing_Details": "[BUID:305939,RID:,ORP:4/5,DTS:2018-08-07 10:05:04][1] (Client) Unable to validate against database. / (Client) Impossible de valider dans la base de données.", "Unique_Identifier": "FOSS/GCMS Client ID", "Unique_Identifier_Value": 12345678, "Date_of_Birth": "1978-05-20", "Phone_Number": "902-628-1285", "Does_the_Client_Have_an_Email_Address":1, "Email_Address": "hnestor@cathcrosscultural.org", "Street_Number": 1256, "Street_Name": "College", "Street_Type": "Abbey", "Street_Direction": "E - East", "Unit/Suite/Apt": "205", "City": "Toronto", "Province": "Ontario", "Postal_Code": "M6G3A4", "Official_Language_of_Preference": "English", "Consent_for_Future_Research/Consultation": 1 } }' -H "Content-Type: application/json" localhost:8080/insertRow
{"success":true,"result":{"result":{"fieldCount":0,"affectedRows":1,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}}}%
```