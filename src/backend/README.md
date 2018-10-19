# backend API
Restful API powered by Node.js

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