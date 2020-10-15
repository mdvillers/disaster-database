## Disaster Database

> Use `yarn develop` to start server

> Install `mysql` before using it.

### Instructions for first use

1. Open connectdb.js
2. Comment database for first use
3. Fill your credentials for mysql
4. Create database sending GET request to `localhost:5000/create/database`
5. Create table sending GET request to `localhost:5000/create/tables`

### Tables in database

| Table               | End Point         |
| ------------------- | ----------------- |
| Incident            | /incident         |
| DisasterType        | /disastertype     |
| DisasterGroup       | /disastergroup    |
| DisasterSubGroup    | /disastersubgroup |
| DataSource          | /datasource       |
| District            | /district         |
| VDC_or_Municipality | /vm               |

#### Attach these with

| End point | Request Type |
| --------- | ------------ |
| /insert   | POST         |
| /view     | GET          |
| /delete   | DELETE       |

##### Examples

```sql
https://localhost:5000/incident/view for viewing incident table
https://localhost:5000/incident/insert for inserting into incident table
```
