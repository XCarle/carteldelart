module.exports = function(app){

    conf = require('./../conf.json');
    
    // ARTICLE
    app.get('/article/fleury', function (request, response) {
        var pathname = conf.http.fleury;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    // ARTICLE
    app.get('/article/parr', function (request, response) {
        var pathname = conf.http.parr;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/hatoum', function (request, response) {
        var pathname = conf.http.hatoum;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/graham', function (request, response) {
        var pathname = conf.http.graham;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/veilhan', function (request, response) {
        var pathname = conf.http.veilhan;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/jaar', function (request, response) {
        var pathname = conf.http.jaar;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/goldin', function (request, response) {
        var pathname = conf.http.goldin;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/tatah', function (request, response) {
        var pathname = conf.http.tatah;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/hyman', function (request, response) {
        var pathname = conf.http.hyman;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/parreno', function (request, response) {
        var pathname = conf.http.parreno;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // QUESTIONNAIRE
    app.get('/questionnaire', function (request, response) {
        var pathname = conf.http.questionnaire;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/messager', function (request, response) {
        var pathname = conf.http.messager;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // ARTICLE
    app.get('/article/pignon-ernest', function (request, response) {
        var pathname = conf.http.pignonErnest;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/boltanski', function (request, response) {
        var pathname = conf.http.boltanski;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });



    // CARTEL
    app.get('/cartel/fleury', function (request, response) {
        var pathname = conf.http.fleury;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/parr', function (request, response) {
        var pathname = conf.http.parr;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/hatoum', function (request, response) {
        var pathname = conf.http.hatoum;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/graham', function (request, response) {
        var pathname = conf.http.graham;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/veilhan', function (request, response) {
        var pathname = conf.http.veilhan;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/jaar', function (request, response) {
        var pathname = conf.http.jaar;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/goldin', function (request, response) {
        var pathname = conf.http.goldin;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/tatah', function (request, response) {
        var pathname = conf.http.tatah;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/hyman', function (request, response) {
        var pathname = conf.http.hyman;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/parreno', function (request, response) {
        var pathname = conf.http.parreno;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/messager', function (request, response) {
        var pathname = conf.http.messager;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/dormino-glass', function (request, response) {
        var pathname = conf.http.dorminoGlass;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/pignon-ernest', function (request, response) {
        var pathname = conf.http.pignonErnest;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/sherman', function (request, response) {
        var pathname = conf.http.sherman;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/weiwei-forever-bicycles', function (request, response) {
        var pathname = conf.http.weiwei.foreverbicycles;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/calle-prenez-soin-de-vous', function (request, response) {
        var pathname = conf.http.calle.prenezsoindevous;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/gursky-pyongyang-I', function (request, response) {
        var pathname = conf.http.gursky.pyongyangI;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/rama', function (request, response) {
        var pathname = conf.http.rama;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/balincourt', function (request, response) {
        var pathname = conf.http.balincourt;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    // CARTEL
    app.get('/cartel/becher', function (request, response) {
        var pathname = conf.http.becher;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/cartel/prouvost', function (request, response) {
        var pathname = conf.http.prouvost;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/cartel/rondinone', function (request, response) {
        var pathname = conf.http.rondinone;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/cartel/shiota', function (request, response) {
        var pathname = conf.http.shiota;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/cartel/pistoletto', function (request, response) {
        var pathname = conf.http.pistoletto;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/cartel/richard-long', function (request, response) {
        var pathname = conf.http.long;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/cartel/francois-morellet', function (request, response) {
        var pathname = conf.http.morellet;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
     app.get('/cartel/cheri-samba', function (request, response) {
        var pathname = conf.http.cherisamba;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/cartel/felix-gonzalez-torres', function (request, response) {
        var pathname = conf.http.felixgonzaleztorres;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/evenement/la-nuit-des-idees', function (request, response) {
        var pathname = conf.http.lanuitdesidees;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/festival/icart-media-festival-2016', function (request, response) {
        var pathname = conf.http.icartmediafastival2016;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/chronique/salon-de-montrouge-2016', function (request, response) {
        var pathname = conf.http.salondemontrouge2016;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/foire/artgeneve-2016', function (request, response) {
        var pathname = conf.http.artgeneve2016;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/cartel/laurent-grasso', function (request, response) {
        var pathname = conf.http.laurentgrasso;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/cartel/jean-michel-alberola', function (request, response) {
        var pathname = conf.http.alberola;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    
    /**
    * FOIRES
    */
    app.get('/foire/hors-les-murs-fiac-2015', function (request, response) {
        var pathname = conf.http.hlmfiac;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/foire/paris-photo-2015', function (request, response) {
        var pathname = conf.http.parisphoto2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/foire/fotofever-2015', function (request, response) {
        var pathname = conf.http.fotofever2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/foire/slick-2015', function (request, response) {
        var pathname = conf.http.slick;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/foire/yia-art-fair-2015', function (request, response) {
        var pathname = conf.http.yia2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/foire/officielle-2015', function (request, response) {
        var pathname = conf.http.officielle2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/biennale/venise-2015', function (request, response) {
        var pathname = conf.http.venise2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/biennale/lyon-2015', function (request, response) {
        var pathname = conf.http.lyon2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/exposition/climats-artificiels', function (request, response) {
        var pathname = conf.http.climatsartificiels;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/exposition/foam-talent-2015', function (request, response) {
        var pathname = conf.http.foam2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/exposition/frontieres-palais-de-la-porte-doree', function (request, response) {
        var pathname = conf.http.immigration2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });

    app.get('/exposition/centre-pompidou-anselm-kiefer-au-coeur-d-une-nation', function (request, response) {
        var pathname = conf.http.kiefferbeaubourg2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/exposition/prosopopee-le-centquatre-destabilise-notre-vision-des-choses', function (request, response) {
        var pathname = conf.http.prosopopee;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    app.get('/guide/parcours-architecture-fevrier-2016', function (request, response) {
        var pathname = conf.http.parcoursarchitecturefevrier2015;
            response.writeHead(200, {"Pragma": "public",
                      "Cache-Control": "max-age=604800",
                      "Expires": new Date(Date.now() + 604800000).toUTCString(),
                      'Content-Type': 'text/html'});
        try{
            response.end(fs.readFileSync(conf.http.www + pathname));
        }catch(e){
            //response.writeHead(404, {'Content-Type': 'text/html'});
            response.end(e+fs.readFileSync(conf.http.error['404']));
        }
    });
    
    
    
}