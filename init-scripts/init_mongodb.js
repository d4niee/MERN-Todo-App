db.createCollection("users");
db.createCollection("todos");

// add an initial user to the "users" collection
db.users.insertOne({
    username: "root",
    password: "$2a$10$MkIC0TtbhamEYo7GpQIuTO8ylIuN6ApauED1GIEYeiBrUY/9vg7PK",
    salt: "$2a$10$MkIC0TtbhamEYo7GpQIuTO",
});