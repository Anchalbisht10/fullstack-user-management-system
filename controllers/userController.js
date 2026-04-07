const db = require("../db");

exports.getUsers = async (req, res, next) => {
  try {
    const [rows] = await db.query(
      "SELECT id,name,email,age FROM users"
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  const { name, email, age } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO users (name,email,age) VALUES (?,?,?)",
      [name, email, age]
    );

    res.json({
      message: "User created",
      id: result.insertId,
    });

  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  try {
    await db.query(
      "UPDATE users SET name=?,email=?,age=? WHERE id=?",
      [name, email, age, id]
    );

    res.json({ message: `User ${id} updated` });

  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await db.query(
      "DELETE FROM users WHERE id=?",
      [id]
    );

    res.json({ message: `User ${id} deleted` });

  } catch (err) {
    next(err);
  }
};