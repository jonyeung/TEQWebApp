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

GET `/user`

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
➜  backend git:(backend) ✗ curl 'localhost:8080/user?username=donaldtrump&password=americaisgreat'
{"success":true,"result":{"authenticated":true,"user":{"ID":9,"currently_logged_in":0,"access_level":"TEQ_mid_level"}}}
```
