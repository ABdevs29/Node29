import express from "express";
import { MongoClient } from "mongodb";

const app = express();

// CRUD

const users = [
  {
    "createdAt": "2021-08-23T05:57:51.816Z",
    "name": "Shaun Breitenbergs",
    "avatar" : "https://cdn.fakercloud.com/avatars/fjaguero_128.jpg",
    "id": "1"
  },
  {
    "createdAt": "2021-08-22T17:05:46.069Z",
    "name": "Elijah D'Amore III",
    "avatar": "https://cdn.fakercloud.com/avatars/kaysix_dizzy_128.jpg",
    "id": "2"
  },
  {
    "createdAt": "2021-08-22T21:26:00.130Z",
    "name": "Donna Hansen",
    "avatar": "https://cdn.fakercloud.com/avatars/bighanddesign_128.jpg",
    "id": "7"
  },
  {
    "createdAt": "2021-08-22T12:37:31.846Z",
    "name": "Jared Sanford Sr.",
    "avatar": "https://cdn.fakercloud.com/avatars/jacksonlatka_128.jpg",
    "id": "8"
  },
  {
    "createdAt": "2021-08-23T01:02:10.225Z",
    "name": "Angelo Keeling",
    "avatar": "https://cdn.fakercloud.com/avatars/superoutman_128.jpg",
    "id": "9"
  },
  {
    "createdAt": "2021-08-22T09:42:16.459Z",
    "name": "Marcella Abbott",
    "avatar": "https://cdn.fakercloud.com/avatars/gcmorley_128.jpg",
    "id": "10"
  },
];

//Connection to DB
// const MONGO_URL = "mongodb://localhost";

const MONGO_URL = "mongodb+srv://@cluster0.trmyw.mongodb.net"

async function createConnection() {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  return client;
}

// console.log(brands);

app.use(express.json()); //Middleware

app.get("/", (request, response) => {
  response.send("Hello Guvi");
});

app.get("/users", async (request, response) => {
  const client = await createConnection();
  const result = await client
    .db("test")
    .collection("users")
    .find({}).toArray();
  response.send(result);
});

app.get("/brands", async (request, response) => {
  const client = await createConnection();
  const result = await client
    .db("test")
    .collection("brands")
    .find({})
    .toArray();
  response.send(result);
});

app.post("/user", (request, response) => {
  console.log(request.body);
  response.send({ msg: "Created user" });
});

app.post("/users", async (request, response) => {
  const client = await createConnection();
  const result = await client
    .db("test")
    .collection("users")
    .insertMany(request.body);
  response.send(result);
});

app.get("/users/:id", async (request, response) => {
  const client = await createConnection();
  const { id } = request.params;
  const result = await client
    .db("test")
    .collection("users")
    .find({"id": id}).toArray();
  response.send(result);
});

// app.get("/users/:id", (request, response) => {
//   const { id } = request.params;
//   const notFound = { msg: "No user found" };
//   response.send(
//     users.filter((el) => el.id === id).length > 0
//       ? users.filter((el) => el.id === id)
//       : notFound.msg
//   );
// });
app.listen(4000, () => console.log("server has started"));
