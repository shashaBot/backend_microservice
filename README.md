# Microservice
Dockerized Node.js microservice with JWT auth and protected routes for API.

## Installation
1. `git clone https://github.com/shashaBot/backend_microservice`
2. `npm run docker:image`. This will create an image called `hackerbay_ms`.
3. `npm run docker:container`. This will start a container using the image mapping the ports 8080:8080.
4. Start using the API on `http://localhost:8080`.


## Docker Hub Image
```docker pull shashabot/hackerbay```

## Development and Testing
1. `git clone https://github.com/shashaBot/backend_microservice`
2. `npm install`
3. `npm run test`
4. `npm run start` (or `npm run dev` if you have nodemon installed) to start the server on port 8080 of your machine.


## Documentation
See [docs](https://github.com/shashaBot/backend_microservice/tree/master/docs) directory.

## API Routes
### Public routes
```POST /login```

Request Object:
```
{
  username: "user",
  password: "pass"
}
```
Response Object:
```
{
  success: true,
  token: "...."
}
```
### Protected routes
```PATCH /api/apply-json-patch```

Request Object:
```
{
  doc: {field: "value"},
  patches: [{op: "add", path: "/anotherField", value: "addValue"}]
}
```
Response Object:
```
{
  success: true,
  patchedObj: {
    field: "value",
    anotherField: "addValue"
  }
}
```
```POST /api/create-thumbnail```

Request Object:
```
{
  imageUri: "https://placehold.it/100x100.jpg",
  filename: "testimage"
}
```
Response: A binary response with `content-type: image/*` in headers.

### Notes:
1. The protected routes must be accessed with an auth header containing token from login route response.
2. If the auth header is not present wherever required, 401 (Unauthorized) status is returned.
3. If the request object is malformed (missing fields, etc.), 400 (Bad request) response is returned.

## Test and coverage report
See Coverage folder after running ```npm run test```.
