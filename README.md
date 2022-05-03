# Auth Api

Homemade auth api.

## Usage

> Mongodb instance running is required

Default url is <mongodb://localhost:27017/>

Default db name is **mydb**

Default collection name is **users**

> Install & run

```sh
yarn
yarn dev
```

Default port is **8080**

## Routes

### **Auth**

POST -> /auth/signup (name, email, password) -> (user)

POST -> /auth/signin (email, password) -> (user, token)

### **Data**

GET -> /data/items (Authorization header)
