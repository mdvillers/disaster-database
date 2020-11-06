## Disaster Database

> Use `yarn develop` to start server

> Install `mysql` before using it.

### Instructions for first use

1. Get valid `nodemon.json`

### Tables in database

| Table               | Main Point    | Attachable                                                                                |
| ------------------- | ------------- | ----------------------------------------------------------------------------------------- |
| Incident            | /incident     | /insert (POST), /view (GET), /view/:type (GET), /delete/:id (DELETE), /update/:id (PATCH) |
| DisasterType        | /disastertype | /insert (POST), /view (GET), /delete/:name (DELETE)                                       |
| DataSource          | /datasource   | /insert (POST), /view (GET), /delete/:id (DELETE)                                         |
| District            | /district     | /insert (POST), /view (GET), /delete/:name (DELETE)                                       |
| VDC_or_Municipality | /vm           | /insert (POST), /view (GET), /delete/:id (DELETE)                                         |

##### Examples

```py
https://localhost:5000/incident/view for viewing incident table
https://localhost:5000/incident/insert for inserting into incident table
```
