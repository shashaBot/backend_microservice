# Microservice
Dockerized Node.js microservice with JWT auth and protected routes for API.

## Installation
installation steps

## Docker Hub Image
link here

## Documentation
Docs directory

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
Coverage folder
