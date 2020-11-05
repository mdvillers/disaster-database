## Disaster Database

> Use `yarn develop` to start server

> Install `mysql` before using it.

### Instructions for first use

1. Get valid `nodemon.json`

### Tables in database

| Table               | End Point     |
| ------------------- | ------------- |
| Incident            | /incident     |
| DisasterType        | /disastertype |
| DataSource          | /datasource   |
| District            | /district     |
| VDC_or_Municipality | /vm           |

#### Attach these with

| End point | Request Type |
| --------- | ------------ |
| /insert   | POST         |
| /view     | GET          |
| /delete   | DELETE       |

### for incident

| End point        | Request Type |
| ---------------- | ------------ |
| /earthquake/view | GET          |
| /flood/view      | GET          |
| /fire/view       | GET          |

##### Examples

```sql
https://localhost:5000/incident/view for viewing incident table
https://localhost:5000/incident/insert for inserting into incident table
```
