
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();
var cluster = require('cluster');

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Horizontes 2030'
  });
});

app.get('/EscenarioTerritorial', function(req, res){
  res.render('EscenarioTerritorial', {
    title: 'Escenario Territorial'
  });
});

app.get('/Resultados', function(req, res){
  res.render('Resultados', {
    title: 'Resultados'
  });
});

app.get('/Documentos', function(req, res){
  res.render('Documentos', {
    title: 'Documentos'
  });
});

app.get('/Fotografias', function(req, res){
  res.render('Fotografias', {
    title: 'Fotografías'
  });
});

app.get('/Mapas', function(req, res){
  res.render('Mapas', {
    title: 'Mapas'
  });
});

app.get('/Contactenos', function(req, res){
  res.render('Contactenos', {
    title: 'Contáctenos'
  });
});

app.get('/LineaTiempo', function(req, res){
  res.render('LineaTiempo', {
      title: 'Línea de tiempo de antecedentes en planificación',
      layout: false
  });
});

app.get('/LineaTiempo2', function(req, res){
  res.render('LineaTiempo2', {
      title: 'Línea de tiempo de antecedentes en planificación',
      layout: false
  });
});

app.get('/timelines', function(req,res) {
    res.send(require('./data/tldata'));
});


// Only listen on $ node app.js

cluster(app)
    .use(cluster.logger('logs'))
    .use(cluster.stats())
    .use(cluster.pidfiles('pids'))
    .use(cluster.cli())
    .use(cluster.repl(8889))
    .listen(9451);


// if (!module.parent) {
//   app.listen(9451);
//   console.log("Express server listening on port %d", app.address().port);
// }
