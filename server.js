var http = require("http");
var url = require("url");
var fs = require("fs");
var pug = require("pug");

var estilo = /w3\.css/;
var index = /index/;
var marchas = /marchas/;

http.createServer((req,res)=>{
    var purl = url.parse(req.url, true);
    
    if(index.test(purl.pathname)){
        res.writeHead(200, {"Content-Type": "text/html"})
        fs.readFile("data/index.json",(erro, dados)=>{
            if(!erro){
                var myObj = JSON.parse(dados);
                res.write(pug.renderFile("index.pug", {ind: myObj}));
            }
            else{
                res.write("<p><b>ERRO: </b>"+erro+"</p>");
            }
            res.end();
        })
    }
    else if(estilo.test(purl.pathname)){
        res.writeHead(200, {"Content-Type": "text/css"})
        fs.readFile("estilo/w3.css",(erro, dados)=>{
            if(!erro){
                res.write(dados);
            }
            else{
                res.write("<p><b>ERRO: </b>"+erro+"</p>");
            }
            res.end();
        })
    }
    else if(marchas.test(purl.pathname)){
        var ficheiro = purl.pathname.split("/")[2]+".json";
        console.log("Lendo o ficheiro: " + ficheiro);

        res.writeHead(200, {"Content-Type": "text/html"});
        fs.readFile("data/json/"+ficheiro, (erro,dados)=>{
            if(!erro){
                var myObj = JSON.parse(dados);
                res.write(pug.renderFile("template.pug", {marcha: myObj}));
            }
            else{
                res.write("<p><b>ERRO: </b>"+erro+"</p>");
            }
            res.end();
        })
    }
    else{
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("<p><b>ERRO: </b>"+purl.pathname+"</p>");
        res.write("Rota desconhecida");
        res.end();
    }
}).listen(5001, ()=>{
    console.log("Servidor à escuta na porta 5001");
})