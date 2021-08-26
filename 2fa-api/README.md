### Creating a DB Dump

```
docker exec 2fa-container sh -c 'exec mysqldump --port=3306 -h localhost -u user --password=password 2fa-db' > ./db_dump.sql
```

### Creating a twilio verification service

```
 twilioClient.verify.services
   .create({ friendlyName: "2FA Mini Project" })
   .then((service) => console.log(`Service ${service.sid} successfully created`))
   .catch((err) => console.log("Twilio Verification Error: ", err));

```
