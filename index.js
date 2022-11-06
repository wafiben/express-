const express = require("express");
const app = express();
const port = 5000;
app.listen(port, (err) => {
  err
    ? console.log("server failed")
    : console.log(`server is running on port ${port}`);
});
app.use(express.json());
const users = [
  { id: 1, name: "yosra" },
  { id: 2, name: "amin" },
];

app.get("/users", (req, res) => {
  res.status(200).json({ users: users });
});
app.post("/users", (req, res) => {
  const user = req.body;
  const newTable = [...users, user];

  res
    .status(200)
    .json({ message: "your user is sucessfully added", users: newTable });
});
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const foundUser = users.find((elt) => elt.id == userId);
  if (!foundUser) {
    res.status(401).json({ msg: "not found" });
  } else {
    res.status(200).json({ foundUser: foundUser });
  }
});
app.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const { id, name } = updatedUser;
  const newUsers = users.map((elt) => {
    if (elt.id == userId) {
      return { ...elt, name };
    } else {
      return elt;
    }
  });
  res.status(200).json({ newUsers: newUsers });
});
