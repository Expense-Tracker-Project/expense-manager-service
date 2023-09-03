const express = require("express");
const { UserModel } = require("./models");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("./db");

const port = process.env.PORT || 8000;

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmail = await UserModel.findOne({ email: email });

    if (checkEmail) {
      if (password !== checkEmail.password) {
        res.json("incorrect password");
      } else res.json(checkEmail);
    } else {
      res.json("not exist");
    }
  } catch (e) {
    res.json("error");
  }
});

app.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;

  const data = {
    email,
    password,
    name,
  };

  try {
    const checkEmail = await UserModel.findOne({ email: email });

    if (checkEmail) {
      res.json("exist");
    } else {
      res.json("not exist");
      await UserModel.insertMany([data]);
    }
  } catch (e) {
    res.json("error");
  }
});

app.post("/api/submit-expense", async (req, res) => {
    const { email, date, reason, amount } = req.body;
    try {
      const user = await UserModel.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const newExpense = {
        date,
        reason,
        amount,
      };
  
      user.expenses.push(newExpense);
  
      await user.save();
  
      return res.status(200).json({ message: "Expense saved successfully" });
    } catch (error) {
      console.error("Error saving expense:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/get-expenses/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({ expenses: user.expenses });
    } catch (error) {
        console.error("Error getting expenses:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(port, () => {
    console.log("server is running at ", port);
})