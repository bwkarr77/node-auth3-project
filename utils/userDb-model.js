const db = require("./db-config.js");
const bcrypt = require("bcryptjs");

function find() {
  return db("users").select("id", "username", "department");
}

function findBy(filter) {
  // console.log("findByfilter: ", filter);
  return db("users")
    .where(filter)
    .select("id", "username", "password", "department")
    .first();
}

async function findAllBy(filter) {
  return await db("users")
    .select("id", "username", "department")
    .where(filter);
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);
  console.log("userDB-model>add(user):", user);
  const [id] = await db("users").insert(user);
  return findById(id);
}

function findById(id) {
  console.log("userDB-model>findById:", id);
  return db("users")
    .select("id", "username", "department")
    .where({ id })
    .first();
}

// async function remove(userId) {
//   const deleteUser = await
// }

module.exports = {
  add,
  findById,
  find,
  findBy,
  findAllBy
};
