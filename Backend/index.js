const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRETKEY = "@4dsdfefefertnimvp%$";

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "umeshmysql(05)",
  database: "test",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.post("/newuser", async (req, resp) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);
  console.log("hashpass  ", hashPass);
  const query =
    "insert into usersdata (name, email, password) values (?, ?, ?)";
  connection.query(query, [name, email, hashPass], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err); // Log any errors
      return resp.status(400).send({ sucess: false, error: err });
    }
    console.log("result... ", result);
    resp.status(201).send({ success: true });
  });
});

app.post("/login", (req, resp) => {
  const { email, password } = req.body;
  const query = "select * from usersdata where email = ?";

  connection.query(query, [email], async (err, result) => {
    if (err) {
      console.log("err ", err);
    } else {
      console.log("query data... ", result);
      const securePassword = result[0].password;
      const passMatched = await bcrypt.compare(password, securePassword);
      if (!passMatched) {
        return resp
          .status(400)
          .send({ success: false, error: "password not matched" });
      }
      const data = {
        user: {
          id: result.id,
        },
      };
      const authToken = jwt.sign(data, SECRETKEY, { expiresIn: "30s" });
      return resp
        .status(201)
        .send({ success: true, data: result, authToken: authToken });
    }
  });
});

app.post("/checkout", (req, resp) => {
  const cartItems = req.body;
  console.log(cartItems);
  const query =
    "insert into orders (user_emailId, item_id, item_name, price, quantity) values ?";
  const values = cartItems.map((item) => [
    item.user_emailId,
    item.id,
    item.name,
    item.price / 100,
    item.count,
  ]);
  connection.query(query, [values], (err, result) => {
    if (err) {
      console.log(err);
      resp.status(400).send({ success: false });
    } else {
      console.log(result);
      resp.status(201).send({ success: true });
    }
  });
});

app.get("/getOrders", (req, resp) => {
  const { email } = req.headers;
  const query = "select * from orders where user_emailId = ?";
  connection.query(query, [email], (err, result) => {
    if (err) {
      return resp.status(400).send({ sucess: false, error: err });
    }
    resp.status(201).send({ success: true, result });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
