var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contatos', ['contatos']);
var bodyParser = require('body-parser');



app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contatos', function (req, res){

	console.log('Pegando os contatos no mongodb')

	db.contatos.find(function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contatos', function (req, res){
	console.log(req.body);
	db.contatos.insert(req.body, function(err, doc){
		res.json(doc);
	})
});

app.delete('/contatos/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.contatos.remove({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})

});

app.get('/contatos/:id', function (req, res){
	var id = req.params.id;
	console.log(id);
	db.contatos.findOne({_id: mongojs.ObjectId(id)}, function (err, doc){
		res.json(doc);
	})
});

app.put('/contatos/:id', function (req, res){
	var id = req.params.id;
	console.log(req.body.nome);
	db.contatos.findAndModify({query: {_id: mongojs.ObjectId(id)},
			update: {$set: {nome: req.body.nome, email: req.body.email, 
				telefone: req.body.telefone}},new: true}, function (err, doc){
					res.json(doc);
				});
})

app.listen(3000);
console.log("Server running port 3000");