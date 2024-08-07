const express = require("express");
const app = express();
const port = 4040;
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

const Transaction = require('./models/Transaction.js');

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
	res.json("listening");
});

app.post("/api/transaction", async (req, res)=>{
	console.log(process.env.MONGO_URL);
	await mongoose.connect(process.env.MONGO_URL);
	const {name, price, description, datetime} = req.body;
	const transaction = await Transaction.create({name, price, description, datetime});
	res.json(transaction);
});

app.get("/api/transactions", async(req, res)=> {
	await mongoose.connect(process.env.MONGO_URL);
	const transactions = await Transaction.find();
	res.json(transactions);
})

app.listen(port, () => {
	console.log(`app is listening on ${port}`);
});
