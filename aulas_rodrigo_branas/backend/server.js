var express 		= require('express'),
	bodyParser 		= require('body-parser'), 
	app				    = express();
	
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend: true}));

//CORS
app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.listen(3000, function(){
  console.log("Servidor no ar");
});

//Contatos
var contatos = [
	{ id: 1, nome: 'Paulo Barros', telefone: '8879-4512', cor: 'blue', data: new Date(1423706400000), serial: '845+%6*', operadora: {nome: 'Vivo', codigo: 1, categoria: 'Celular', preco: 10}},
	{ id: 2, nome: 'Amanda DA SILVA', telefone: '8879-7812', cor: 'green', data: new Date('2014-11-4'), serial: '+:505$ 55', operadora: {nome: 'Tim', codigo: 14, categoria: 'Celular', preco: 14}},
	{ id: 3, nome: 'MARIA aparecida DA CONCEIÇÃO', telefone: '8879-4566', cor: 'red', data: 1431388800000, serial: '&0!6&(:$2', operadora: {nome: 'Telefonica', codigo: 15, categoria: 'Fixo', preco: 10}},
  { id: 4, nome: 'Evelin Barros', telefone: '7845-4566', cor: 'pink', data: new Date(2015,2,23), serial: '&%!6&(:$4', operadora: {nome: 'Telefonica', codigo: 15, categoria: 'Fixo', preco: 10}},
  { id: 5, nome: 'João Pedro Dos Santos', telefone: '1279-4566', cor: 'black', data: new Date(2014,3,21), serial: '*0!6&(:$2', operadora: {nome: 'Tim', codigo: 14, categoria: 'Fixo', preco: 10}}
];

app.get('/contatos', function(req, res){
	res.status(200).json(contatos);
});

app.post('/contatos', function(req, res){
  var contato = req.body;
  contato.id = contatos.length + 1;
  contatos.push(contato);
  res.status(201).json(contato);  
});

app.delete('/contatos/:id', function(req, res){
	
	var id = req.params.id,
		index = contatos.recuperarIndex(id),
		contato = contatos[index];
		
	contatos.splice(index,1)
	res.status(200).json(contato);
	
});

app.get('/', function(req, res){
	res.redirect('/contatos');
});

//Operadoras
var operadoras = [
	{nome: 'Vivo', codigo: 1, categoria: 'Celular', preco: 1},
	{nome: 'Tim', codigo: 14, categoria: 'Celular', preco: 1.6},
	{nome: 'Claro', codigo: 13, categoria: 'Celular', preco: 0.99},
	{nome: 'Telefonica', codigo: 15, categoria: 'Fixo', preco: 0.78},
	{nome: 'Embratel', codigo: 21, categoria: 'Fixo', preco: 1},
];

app.get('/operadoras', function(req, res){
  res.status(200).json(operadoras);    
});

Array.prototype.recuperarIndex = function (id) {
    var index = -1,
        i = 0,
        l = this.length;
    for (; l--; i++) {
        var item = this[i];
        if (item.id === parseInt(id)) {
            return index = i;
        }
    }
    return index;
};