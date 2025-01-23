// const {add,sub,arr} = require("./operation");

// console.log(add(5,5));
// console.log(sub(7,5));

// console.log(arr([1,2,3,4,5,6]))

// const http = require('http')

// const server =http.createServer((req,res)=>{
//     res.end("good affternoon");
// })

// const PORT = 2654
// server.listen(PORT,()=>{
//     console.log(`my server is running at http:\\localhost:${PORT}`);
// })

const express = require("express");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const mongourl =
  "mongodb+srv://sachinv748:nUFYYPn5ytpaQsDR@cluster0.eyspk.mongodb.net/expense-tracker";
mongoose
  .connect(mongourl)
  .then(() => {
    console.log("db is connected");
    app.listen(PORT, () => {
      console.log("my server is running");
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
  });

const expenseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
});

const expenseModel = mongoose.model("expense-track", expenseSchema); //cln name , schema name

app.post("/api/expense", async (req, res) => {
  const { title, amount } = req.body;
  const newExpense = new expenseModel({
    id: uuidv4(),
    title: title,
    amount: amount,
  });
  const savedExpense = await newExpense.save();
  res.status(200).json(savedExpense);
});

//to get one data which is id from database
app.get("/api/:id", async (req, res) => {
  const { id } = req.params;
  const data = await expenseModel.findOne({ id });
  if (data) {
    console.log(data);
    res.json(data);
  }
});

//to retrive from the all data in database

// app.get("/api", async (req, res) => {
//   const data = await expenseModel.find({});
//   if (data) {
//     console.log(data);
//     res.json(data);
//   }
// });

// // to retrive the data based on the title

app.get("/ap", async (req, res) => {
  const { title } = req.body;
  const data = await expenseModel.findOne({ title });
  if (data) {
    console.log(data);
    res.json(data);
  }
});

// To update the database specific title

app.put("/update", async (req, res) => {
  const { title, newtitle } = req.body;
  const data = await expenseModel.updateOne(
    { title: title },
    { $set: { title: newtitle } }
  );
  if (data.matchedCount > 0) {
    console.log("data update succesfull");
    res.json(data);
  }
});


app.get("/api/some/:id",async (req , res)=>{
  
  const {id} = req.params;  // find by title
  //const user = await User.findOne({ email });
  await expenseModel.deleteOne({id});

  res.json("lkjkhj")
})


















const item = [
  { id: 1, name: "sachin" },
  { id: 2, name: "khalid" },
];

app.get("/student", (req, res) => {
  const student = [
    { id: 1, name: "sachin" },
    { id: 2, name: "khalid" },
  ];
  res.json(student);
});

app.get("/singledata/:id", (req, res) => {
  const { id } = req.params;

  if (id) {
    const result = item.find((item) => item.id === Number(id));

    return res.json(result);
  } else {
    res.json(student);
  }
});

const PORT = 8000;
// app.listen(PORT,() =>{
//     console.log(`my server is running at http://localhost:${8000}`)
// })

// console.log("sachin");
