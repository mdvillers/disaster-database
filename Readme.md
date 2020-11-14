## Disaster Database

> Use `yarn develop` to start server

> Install `mysql` before using it.

### Instructions for first use

1. Get valid `nodemon.json`

### Tables in database

| Table               | Main Point    | Attachable                                                                                                                                                                        |
| ------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Incident            | /incident     | /view (GET) <br> /view/:type (GET) <br> `AUTHENTICATION REQUIRED` <br>/insert (POST: multipart/form-data) <br> /delete/:id (DELETE) <br> /update/:id (PATCH: multipart/form-data) |
| DisasterType        | /disastertype | /view (GET) <br> `AUTHENTICATION REQUIRED` <br>/insert (POST) <br> /delete/:name (DELETE)                                                                                         |
| DataSource          | /datasource   | /view (GET) <br> `AUTHENTICATION REQUIRED` <br>/insert (POST) <br> /delete/:id (DELETE)                                                                                           |
| District            | /district     | /view (GET) <br> `AUTHENTICATION REQUIRED` <br>/insert (POST) <br> /delete/:name (DELETE)                                                                                         |
| VDC_or_Municipality | /vm           | /view (GET) <br> /district/:name (GET)<br> `AUTHENTICATION REQUIRED` <br>/insert (POST) <br> /delete/:id (DELETE)                                                                 |
| Admin               | /admin        | /signin (POST) <br> `AUTHENTICATION REQUIRED`<br> /create (POST) <br> /getuser (GET)                                                                                              |

##### Examples

```py

https://localhost:5000/incident/view for viewing incident table
https://localhost:5000/incident/insert for inserting into incident table
```
