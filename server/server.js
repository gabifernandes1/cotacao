const express = require('express');
const path = require('path');
const cors = require('cors');
const axios = require('axios');
const app = express();
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
require('dotenv/config');

var database = process.env.DATABASE;
var collection = process.env.COLLECTION;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());

// porta
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`App UI available http://localhost:${port}`);
});

//mongo
const url = process.env.URL;
// get dos clientes
app.get('/getClients', (req, res, err) => {
	try {
		MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
			if (err) throw err;
			var dbo = db.db('Captacao');
			dbo
				.collection('Captacao')
				.find({})
				.toArray(function (err, result) {
					if (err) throw 'err';
					res.header('Access-Control-Allow-Origin', '*');
					res.send(result);
					console.log(result, 'result');
				});
		});
	} catch (e) {
		console.log(e, 'erro');
	}
});

// post de adicionar cliente novo
app.post('/add', (req, res, err) => {
	try {
		console.log(req.body);
		let data = req.body;
		MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
			if (err) reject(err);
			const db = client.db(database);
			db.collection(collection)
				.insertOne(data)
				.then((response) => {
					client.close();
					res.send(response);
				});
		});
	} catch (e) {
		console.log(e, 'erro');
	}
});

// post de atualizar cliente anotado
app.post('/update', (req, res, err) => {
	try {
		let value = req.body.OK;
		let id = new ObjectId(req.body.id);
		MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
			if (err) {
				reject(err);
			} else {
				var dbo = db.db(database);
				dbo
					.collection(collection)
					.updateOne({ _id: id }, { $set: { OK: value } })
					.then(() => {
						db.close();
						res.send('Updated!');
					});
			}
		});
	} catch (e) {
		console.log(e, 'erro');
	}
});
