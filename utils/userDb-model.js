const db = require("./db-config.js");
const bcrypt = require("bcryptjs");

function find() {
  return db("users").select("id", "username", "department");
}

function findByCredentials(credentials) {
  // console.log("findByCredentials: ", credentials);
  return db("users")
    .where(credentials)
    .select("id", "username", "password", "department");
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  // console.log("userDB-model>add(user):", user);
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  // console.log("userDB-model>findById:", id);
  return db("users")
    .select("id", "username", "department")
    .where({ id })
    .first();
}

module.exports = {
  add,
  findById,
  find,
  findByCredentials
};
