# WORKHEALTH README #
### Start server and db
* set env variables to .env file
	* DB_PASSWORD - database password
	* DB_USER - database user
	* LDAP_URI - url to ldap server (unnecessary if deploying via docker-compose-ldap)
	* LDAP_BASE - ldap base for searching
	* LDAP_ADMIN_CN - ldap admin
	* LDAP_PASSWORD - ldap admin password
	* LDAP_DOMAIN - domain component parts
* run `env $(cat .env) docker-compose -f docker-compose-ldap.yml up -d` (for deployment without ldap server image)
* or run `env $(cat .env) docker-compose up -d` (for deployment without ldap serverimage)
* now server is available on {baseUrl}:3000


### API
1) **GET /auth/login (get user's role)**

response example:
```json
            {
              "userRole": "user",
              "username": "Luke Skywalker",
			  "personalId": "3958028"
            }
```
2) **GET /questionnaire/ (get all questions from the the questionnaire)**
	
response example:
```json
             {
			   "questionnaires": [{
					"id": 1,
					"question": "Question 1?",
					"answer": false,
					"imageUrl": "https://someurl/image.jpg",
					"createdAt": "2020-04-03T18:40:08.000Z",
					"updatedAt": "2020-04-03T18:40:08.000Z"
				}]
             }
```
3) **POST /questionnaire/ (check answers for the questionnaire)**

request body example: 
```json
            {
              "1": "false",
              "2": "true",
              "3": "false"
            }
```

response example for passed test: 
```json
            {
				"id": 4,
				"status": "passed",
				"pass": "12345"
            }
```

response example for failed test: 
```json
            {
				"id": 4,
				"status": "failed"
            }
```
4) **GET /screeningHistory?pass=<HISTORY_PASS>&userId=<USER_ID> (get screening pistory by int's pass, available only for admin)**

response example:
```json
            {
				"screeningHistory": [{
					"id": 1,
					"pass": "123",
					"userId": 1,
					"status": "passed",
					"createdAt": "2020-04-04T11:32:57.000Z",
					"updatedAt": "2020-04-04T11:32:59.000Z",
					"User": {
						"id": 1,
						"username": "John Doe",
						"personalId": "3958028",
						"role": "user",
						"createdAt": "2020-04-04T08:32:39.000Z",
						"updatedAt": "2020-04-04T08:32:39.000Z"
					}
				}],
			}
```

5) **GET /screeningHistory/current (get screening histories for current user)**

response example: 
```json
            {
				"screeningHistories": [{
					"id": 3,
					"pass": "1234",
					"userId": 4,
					"status": "passed",
					"createdAt": "2020-04-04T11:32:57.000Z",
					"updatedAt": "2020-04-04T11:32:59.000Z"
				},],
			}
```

6) **GET /user?username=<USER_NAME> (get users by username,  available only for admin)**

response example
```json
			{
				"users": [{
					"id": 1,
					"username": "John Doe",
					"role": "user",
					"personalId": "3958028",
					"createdAt": "2020-04-04T08:32:39.000Z",
					"updatedAt": "2020-04-04T08:32:39.000Z"
				}],
			}
```

7) **GET /screeningHistory/answers/:id (get the screening results by id)**

response example
```json
			{
				"id": 7,
				"pass": null,
				"status": "failed",
				"createdAt": "2020-04-03T09:08:40.000Z",
				"questionnaire": [
					{
						"id": 1,
						"question": "Question 1?",
						"expectedAnswer": false,
						"answer": false
					},
					{
						"id": 2,
						"question": "Question 2?",
						"expectedAnswer": true,
						"answer": true
					}],
			}
```

### User roles
* user
* admin

### Screening history statuses
* passed
* failed
