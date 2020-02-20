const db = require("./db-config.js");
const bcrypt = require("bcryptjs");

function find() {
  return db("users").select("id", "username", "department");
}

function findBy(filter) {
  console.log("model.findByfilter: ", filter);
  return db("users")
    .where(filter)
    .select("id", "username", "password", "department");
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

async function remove(userId) {
  const deletedUser = await findBy({ id: userId });
  return await db("users")
    .where("users.id", userId)
    .del()
    .then(res => {
      console.log("remove.res:", res);
    });
}

async function update(id, changes) {
  return db("users")
    .where("users.id", id)
    .update(changes)
    .then(res => {
      console.log("update.res:", res);
    });
}

module.exports = {
  add,
  findById,
  find,
  findBy,
  findAllBy,
  update,
  remove
};
