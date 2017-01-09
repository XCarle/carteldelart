module.exports = function(app, pg, aws, AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET_CREATION, S3_BUCKET_AVATAR, S3_BUCKET_GALLERY, S3_BUCKET_EXHIBITION){

    conf = require('./../conf.json');
    
    /*
    *   ADMIN API
    */
    
    
    /*
    *   PRO API
    */
    //
    // S3 //
    //
    // AWS S3 - GET
    app.get('/sign_s3', isProLoggedIn, function(req, res){
        aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
        var s3 = new aws.S3({signatureVersion:'v4', region:'eu-central-1'});
        var s3_params = {
            Bucket: S3_BUCKET_CREATION,
            Key: req.query.file_name,
            Expires: 60,
            ContentType: req.query.file_type,
            ACL: 'public-read'
        };
        
        s3.getSignedUrl('putObject', s3_params, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                var return_data = {
                    signed_request: data,
                    url: 'https://'+S3_BUCKET_CREATION+'.s3.amazonaws.com/'+req.query.file_name
                };
                res.write(JSON.stringify(return_data));
                res.end();
            }
        });
    });

    // AWS S3 AVATAR - GET
    app.get('/sign_s3_avatar', isProLoggedIn, function(req, res){
        console.log("sign s3 avatar");
        aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
        var s3 = new aws.S3({signatureVersion:'v4', region:'eu-central-1'});
        var s3_params = {
            Bucket: S3_BUCKET_AVATAR,
            Key: req.query.file_name,
            Expires: 60,
            ContentType: req.query.file_type,
            ACL: 'public-read'
        };
        
        s3.getSignedUrl('putObject', s3_params, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                var return_data = {
                    signed_request: data,
                    url: 'https://'+S3_BUCKET_AVATAR+'.s3.amazonaws.com/'+req.query.file_name
                };
                res.write(JSON.stringify(return_data));
                res.end();
            }
        });
    });

    // AWS S3 GALLERY - GET
    app.get('/sign_s3_gallery', isProLoggedIn, function(req, res){
        console.log("sign s3 gallery");
        aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
        var s3 = new aws.S3({signatureVersion:'v4', region:'eu-central-1'});
        var s3_params = {
            Bucket: S3_BUCKET_GALLERY,
            Key: req.query.file_name,
            Expires: 60,
            ContentType: req.query.file_type,
            ACL: 'public-read'
        };
        
        s3.getSignedUrl('putObject', s3_params, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                var return_data = {
                    signed_request: data,
                    url: 'https://'+S3_BUCKET_GALLERY+'.s3.amazonaws.com/'+req.query.file_name
                };
                res.write(JSON.stringify(return_data));
                res.end();
            }
        });
    });

    // AWS S3 GALLERY - GET
    app.get('/sign_s3_exhibition', isProLoggedIn, function(req, res){
        console.log("sign s3 exhibition");
        aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
        var s3 = new aws.S3({signatureVersion:'v4', region:'eu-central-1'});
        var s3_params = {
            Bucket: S3_BUCKET_EXHIBITION,
            Key: req.query.file_name,
            Expires: 60,
            ContentType: req.query.file_type,
            ACL: 'public-read'
        };
        
        s3.getSignedUrl('putObject', s3_params, function(err, data){
            if(err){
                console.log(err);
            }
            else{
                var return_data = {
                    signed_request: data,
                    url: 'https://'+S3_BUCKET_EXHIBITION+'.s3.amazonaws.com/'+req.query.file_name
                };
                res.write(JSON.stringify(return_data));
                res.end();
            }
        });
    });

    // CONSTANTS 
    // GET _ CONSTANTS
    app.get('/constants.json', isProLoggedIn, function (request, response) {
    
        if (request.query.id && r(equest.user.dataValues.id != request.query.id)){
            return;
        }
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
            client.query('select row_to_json(row) as constants from(select * from constants)row', function(err, result) {
            done();
        
            if (err){ 
                console.error(err); response.send("Error " + err); 
            }
            response.send(result.rows); 
            });
      });
    });

    //  PUT CREATORS
    app.put('/creators', isLoggedIn, function(request, response){
        console.log("POST CREATION");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        //var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            var updateCreatorType = "update creators set type='"+request.query.type
                    +"' where id="+request.query.id;
            client.query(updateCreatorType, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });									

    // GET CREATOR CREATIONS
    app.get('/creator_creations.json', isProLoggedIn, function(request, response){        
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        console.log("GET Creator_creations.json");
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var creatorQuery = "select row_to_json(row) as creator from("+
                    // CREATOR DETAILS
                    "select id, localemail, ("+
                        " select max(id_creation) as id_creation_next"+
                        " from creations),"+
                        ' (select array_to_json(array_agg(row_to_json(e))) '+
                        ' from ('+
                            // ARTISTE DETAILS
                            ' select fname, lname, bio'+
                            ' from artiste_details'+
                            ' where id_creator = '+request.query.id+
                            ')'+
                        ' e) as artiste_details, '+
                        " (select array_to_json(array_agg(row_to_json(d)))"+
                        " from ("+
                            " select id_creation, id_artiste, url,isvalid,id_godfather,width, height, p_x, p_y, d_x, d_y, t_p_x, t_p_y, t_d_x, "+
                                " (select array_to_json(array_agg(row_to_json(c)))"+
                                " from ("+
                                    " select title,cartel,creation_date, url_video,medium, s_h, s_w, s_l"+
                                    " from creation_detail"+
                                    " where id_creation = creations.id_creation)c) as properties,"+
                                " (select array_to_json(array_agg(row_to_json(e)))"+
                                " from ("+
                                    " select latitude, longitude, adresse"+
                                    " from creation_location"+
                                    " where id_creation = creations.id_creation)e) as locations"+
                            " from creations"+
                            " where id_creator = creators.id"+
                            " and isDeleted=false"+
                            " order by id asc)d)as creations"+
                        " from creators where id="+
                    request.query.id
                    +" )row";
        
            client.query(creatorQuery, function(err, result) {
                done();
                if (err){
                    console.error(err);
                    response.send("Error"+err);
                }else{
                    
                    for (var i = 0; i < result.length;i++){
                        console.log(JSON.stringify(rows[i]));
                    }
                    response.send(result.rows);
                }
            });
        });
    });

    // GET GALLERY CREATIONS
    app.get('/gallery_creations.json', isProLoggedIn, function(request, response){
        
         if (request.user.dataValues.id != request.query.id){
            return;
        }
    
        console.log("GET Creator_creations.json");
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var creatorQuery = "select row_to_json(row) as creator from("+
                    "select id, localemail, ("+
                        " select max(id_creation) as id_creation_next"+
                        " from creations),"+
                        ' (select array_to_json(array_agg(row_to_json(e))) '+
                        ' from ('+
                            ' select fname, lname, bio, id_artiste_gallery'+
                            ' from artiste_details'+
                            ' where id_creator = '+request.query.id+
                            ')'+
                        ' e) as artiste_details, '+
                        " (select array_to_json(array_agg(row_to_json(d)))"+
                        " from ("+
                            " select id_creation, url,isvalid,id_godfather,width, height, p_x, p_y, d_x, d_y, t_p_x, t_p_y, t_d_x, id_artiste, "+
                                " (select array_to_json(array_agg(row_to_json(c)))"+
                                " from ("+
                                    " select title,cartel,creation_date, url_video,medium, s_h, s_w, s_l"+
                                    " from creation_detail"+
                                    " where id_creation = creations.id_creation)c) as properties,"+
                                " (select array_to_json(array_agg(row_to_json(e)))"+
                                " from ("+
                                    " select latitude, longitude, adresse"+
                                    " from creation_location"+
                                    " where id_creation = creations.id_creation)e) as locations"+
                            " from creations"+
                            " where id_creator = creators.id"+
                            " and isDeleted=false"+
                            " order by id asc)d)as creations"+
                        " from creators where id="+
                    request.query.id
                    +" )row";
        
            client.query(creatorQuery, function(err, result) {
                done();
                if (err){
                    console.error(err);
                    response.send("Error"+err);
                }else{
                    
                    for (var i = 0; i < result.length;i++){
                        console.log(JSON.stringify(rows[i]));
                    }
                    response.send(result.rows);
                }
            });
        });
    });

    // GET GALLERY ARTISTS
    app.post('/gallery_artist', isProLoggedIn, function(request, response){
        console.log("POST GALLERY ARTIST");
        
         if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        //var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            var insertGalleryArtist = "insert into artiste_details(id_creator, fname, lname, bio, id_artiste_gallery)"+
                                " values ("
                                +request.query.id
                                +",'"+request.query.fName
                                +"','"+request.query.lName
                                +"','"+request.query.bio
                                +"',"+request.query.id_artiste
                                +")";
            console.log("insert gallery artist : ", insertGalleryArtist);
            client.query(insertGalleryArtist, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });
    
    // PUT CREATION ARTIST
    app.put('/creation_artist', isProLoggedIn, function(request, response){
        console.log("POST GALLERY CREATION AUTHOR");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            var updateCreationArtistGallery = "update creations set id_artiste = "+request.query.id_artiste
                                +" where id_creator = "+request.query.id
                                +" and id_creation = "+request.query.id_creation;
            console.log("update creation artist : ", updateCreationArtistGallery);
            client.query(updateCreationArtistGallery, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // GET CREATOR CREATIONS
    /*
    app.get('/gallery_creations.json', function(request, response){
        console.log("GET Gallery_creations.json");
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var creatorQuery = "select row_to_json(row) as creator from("+
                    "select id, localemail, ("+
                        " select count(*) as id_creation_next"+
                        " from creations),"+
                        //"where c.id_creator = creators.id and ga.id_gallery = creators.id and c.id_artiste = ga.id_creator),"+
                        " (select array_to_json(array_agg(row_to_json(d)))"+
                        " from ("+
                            " select id_creation, url,isvalid,id_godfather,width, height, p_x, p_y, d_x, d_y, t_p_x, t_p_y, t_d_x, "+
                            " (select array_to_json(array_agg(row_to_json(c)))"+
                            " from ("+
                                " select title,cartel,creation_date, url_video,medium, s_h, s_w, s_l"+
                                " from creation_detail"+
                                " where id_creation = creations.id_creation)c) as properties,"+
                            " (select array_to_json(array_agg(row_to_json(e)))"+
                            " from ("+
                                " select latitude, longitude, adresse"+
                                " from creation_location"+
                                " where id_creation = creations.id_creation)e) as locations"+
                            " from creations c, gallery_artiste ga"+
                            " where ga.id_gallery = creators.id and c.id_creator = creators.id and c.id_artiste = ga.id_creator"+
                                " and isDeleted=false"+
                                " order by id asc)d)as creations"+
                        " from creators where id="+
                    request.query.id
                    +" )row";
        
            client.query(creatorQuery, function(err, result) {
                done();
                if (err){
                    console.error(err);
                    response.send("Error"+err);
                }else{
                    
                    for (var i = 0; i < result.length;i++){
                        console.log(JSON.stringify(rows[i]));
                    }
                    response.send(result.rows);
                }
            });
        });
    });
    */

    // CREATIONS
    // ajout d'une creation
    app.post('/creations', isProLoggedIn, function(request, response){
        console.log("POST CREATION");
        
         if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var creationDate = new Date().toUTCString();
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            var insertCreation = "insert into creations(id_creator, id_creation, url, isvalid, id_godfather, creation_date, width, height, p_x, p_y, d_x, d_y, t_p_x, t_p_y, t_d_x, isDeleted)"+
                                " values ("
                                +request.query.id
                                +","+request.query.id_creation
                                +",'"+request.query.url
                                +"','"+request.query.isValid
                                +"',"+request.query.idGodfather
                                +",'"+creationDate
                                +"',"+request.query.width
                                +","+request.query.height
                                +","+request.query.p_x
                                +","+request.query.p_y
                                +","+request.query.d_x
                                +","+request.query.d_y
                                +","+request.query.t_p_x
                                +","+request.query.t_p_y
                                +","+request.query.t_d_x
                                +",'"+request.query.isDeleted
                                +"')";
            console.log("insert creation : ", insertCreation);
            client.query(insertCreation, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // CREATIONS
    // ajout d'une creation
    app.put('/creations',  isProLoggedIn, function(request, response){
        
         if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            //console.log("query : ", request.query);
            var updateCreation = "update creations set p_x = "+request.query.p_x
                                +", p_y = "+request.query.p_y
                                +", d_x ="+request.query.d_x
                                +", d_y ="+request.query.d_y
                                +", t_p_x = "+request.query.t_p_x
                                +", t_p_y = "+request.query.t_p_y
                                +", t_d_x = "+request.query.t_d_x
                                +" where id_creator = "+request.query.id
                                +" and id_creation = "+request.query.id_creation;
            console.log("update Query : ", updateCreation);
            client.query(updateCreation, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // CREATIONS
    // ajout d'une creation
    app.delete('/creations', isProLoggedIn, function(request, response){
        
         if (request.user.dataValues.id != request.query.id){
            return;
        }
        //var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            //console.log("query : ", request.query);
            var deleteCreation = "update creations set isdeleted ='true'"
                                +" where id_creator = "+request.query.id
                                +" and id_creation = "+request.query.id_creation;
            console.log("delete Query : ", deleteCreation);
            client.query(deleteCreation, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // CREATION_DETAIL
    // ajout des détail d'une creation
    app.post('/creation_details', isProLoggedIn, function(request, response){
        
         if (request.user.dataValues.id != request.query.id_creator){
            return;
        }
        
        console.log("POST CREATION DETAILS");
        var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            console.log("query : ", request.query);
            var insertCreation = "insert into creation_detail(id_creator, id_creation, title, cartel, creation_date, medium, s_h, s_w, s_l) values ("
                                +request.query.id_creator
                                +","+request.query.id_creation
                                +",'"+request.query.title
                                +"','"+request.query.cartel
                                +"','"+request.query.creationDate
                                +"','"+request.query.medium
                                +"',"+request.query.s_h
                                +","+request.query.s_w
                                +","+request.query.s_l
                                +")";
            console.log("insert creation detail: ", insertCreation);
            client.query(insertCreation, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // CREATION DETAIL
    // modification des détail d'une creation
    app.put('/creation_details', isProLoggedIn, function(request, response){
        console.log("POST CREATION");
        
         if (request.user.dataValues.id != request.query.id_creator){
            return;
        }
        
        var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            console.log("query : ", request.query);
            var updateCreationDetail = "update creation_detail set title = '"+ request.query.title
                                +"', cartel = '"+request.query.cartel
                                +"', creation_date = '"+request.query.creationDate
                                +"', medium = '"+request.query.medium
                                +"', s_h = "+ request.query.s_h
                                +", s_w = "+request.query.s_w 
                                +", s_l ="+request.query.s_l
                                +" where id_creation = "+request.query.id_creation
                                +" and id_creator = "+request.query.id_creator;
            console.log("update creation detail: ", updateCreationDetail);
            client.query(updateCreationDetail, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on update : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // CREATION LOCATION
    // ajout d'une geolocation d'une creation
    app.post('/creation_location', isProLoggedIn, function(request, response){
        console.log("POST CREATION");
        
         if (request.user.dataValues.id != request.query.id_creator){
            return;
        }
        
        var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            console.log("query : ", request.query);
            var insertCreation = "insert into creation_location(id_creator, id_creation, type, adresse, latitude, longitude, creation_date) values ("
                                +request.query.id_creator
                                +","+request.query.id_creation
                                +",'"+request.query.type
                                +"','"+request.query.adresse
                                +"',"+request.query.latitude
                                +","+request.query.longitude
                                +",'"+creationDate
                                +"')";
            console.log("insert creation location : ", insertCreation);
            client.query(insertCreation, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // CREATION LOCATION
    // modification de la location d'une création
    app.put('/creation_location',isProLoggedIn,  function(request, response){
        console.log("POST CREATION");
        
        if (request.user.dataValues.id != request.query.id_creator){
            return;
        }
        
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            console.log("query : ", request.query);
            var updateCreationLocation = "update creation_location set type = "+request.query.type
                                +", adresse = "+ request.query.adresse
                                +", latitude = "+ request.query.latitude
                                +", longitude = "+ request.query.longitude
                                +" where id_creation = "+ request.query.id_creation
                                +" and id_creator = "+request.query.id_creator;
            console.log("update creation location : ", updateCreationLocation);
            client.query(updateCreationLocation, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // ARTISTE DETAILS
    // GET
    app.get('/artiste_details.json', function(request, response){
        console.log("GET artiste_details.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            // TO CHANGE
            var creatorQuery = 'select row_to_json(row) as creator '+
                ' from('+
                    ' select id, localemail, type, url, a_x, a_y, a_d_x, '+
                        ' (select array_to_json(array_agg(row_to_json(e))) '+
                        ' from ('+
                            ' select id_right, is_accepted'+
                            ' from creator_rights'+
                            ' where id_creator = creators.id'+
                            ' order by id asc)'+
                        ' e) as creator_rights, '+
                    ' (select array_to_json(array_agg(row_to_json(d))) '+
                        ' from ('+
                            ' select fname, lname, bio, mail, tel, site'+
                            ' from artiste_details'+
                            ' where id_creator = creators.id'+
                            ' order by id asc)'+
                        ' d) as creator_detail, '+
                    ' (select array_to_json(array_agg(row_to_json(f))) '+
                        ' from ('+
                            ' select id, id_creator, url, t_p_x, t_p_y, t_d_x'+
                            ' from creations'+
                            ' where id_creator = creators.id and isDeleted=false'+
                            ' order by id asc)'+
                        ' f) as creator_creations '+
                    /*', (select array_to_json(array_agg(row_to_json(g))) '+
                        ' from ('+
                            ' select id, id_creator, date_debut, date_fin'+
                            ' from expositions'+
                            ' where id_creator = creators.id'+
                            ' order by id asc)'+
                        ' g) as creator_exhibitions'+
                    */
                    ' from creators'+
                    ' where id='+
                        request.query.id
                        +')row';
        
            console.log("the query : ", creatorQuery);
            client.query(creatorQuery, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });

    // GALLERY DETAILS
    // GET
    app.get('/gallery_details.json', function(request, response){
        console.log("GET gallery_details.json");
        var results = [];
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        pg.connect(app.get('dbUrl'), function(err, client, done){
            // TO CHANGE
            var creatorQuery = 'select row_to_json(row) as gallery '+
                'from('+
                    'select id, localemail, type, url, a_x, a_y, a_d_x, '+
                    '(select array_to_json(array_agg(row_to_json(d))) '+
                        'from ('+
                            'select gr.id_right, gr.is_accepted '+
                            'from gallery_rights gr '+
                            'where id_gallery = creators.id '+
                            'order by id_right asc)'+
                        'd) as gallery_rights,'+
                    '(select array_to_json(array_agg(row_to_json(e))) '+
                        'from ('+
                            'select gname, g_rcs, g_adresse, g_tel, g_mail, g_site, visites '+
                            'from gallery_details '+
                            'where id_gallery = creators.id '+
                            'order by id asc)'+
                        'e) as gallery_detail,'+
                    '(select array_to_json(array_agg(row_to_json(f))) '+
                        'from ('+
                           'select id_creator '+
                            'from gallery_artists '+
                            'where id_gallery = creators.id '+
                            'order by id asc)'+
                        'f) as gallery_artists,'+
                        // GALLERY ARTIST CREATIONS
                    '(select array_to_json(array_agg(row_to_json(i))) '+
                        'from ('+
                           'select ga.id_creator, c.url, c.isvalid, c.id_godfather, c.width, c.height, c.p_x, c.p_y, c.d_x, c.d_y, c.t_p_x, c.t_p_y, c.t_d_x '+ 
                            'from gallery_artists ga, creations c '+
                            'where ga.id_gallery = creators.id and c.id_creator = creators.id '+
                            'order by id asc)'+
                        'i) as gallery_creations,'+
                    '(select array_to_json(array_agg(row_to_json(h))) '+
                        'from ('+
                            'select exp.id_exposition, exp.e_name, exp.date_debut, exp.date_fin, exp.url, exp.t_p_x, exp.t_p_y, exp.t_d_x '+
                            'from expositions exp '+
                            'where exp.id_gallery = creators.id '+
                            'order by id asc)'+
                        'h) as gallery_exhibitions '+
                    'from creators '+
                    'where id='+
                        request.query.id
                        +" and type='galerie')row";
        
            console.log(creatorQuery);
            client.query(creatorQuery, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    app.get('/incrcreationview.json', function(request, response){
        console.log("GET incrcreationview.json ");
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            
            var upsertCreationView =
                'select row_to_json(row) as nb_view_creation '+
                    'from('+
                        "select id_creation, nb_view "+
                        "from nb_view_creation "+
                        "where id_creation="+request.query.id_creation+
                    ')row';
                    
            console.log("upsertCreationView : ",upsertCreationView);
            client.query(upsertCreationView, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    app.put('/incrcreationview.json', function(request, response){
        console.log("PUT incrcreationview.json");
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            
            var upsertCreationView =
                "WITH new_values (id_creation, nb_view) as ("+
                  "values "+
                     "("+request.query.id_creation+", coalesce((select nb_view from nb_view_creation where id_creation="+request.query.id_creation+"), 0)) "+
                "), "+
                "upsert as "+
                "( "+
                    "update nb_view_creation nvc "+
                        "set nb_view = nv.nb_view+1 "+
                    "FROM new_values nv "+
                    "WHERE nvc.id_creation = nv.id_creation "+
                    "RETURNING nvc.* "+
                ")"+
                "INSERT INTO nb_view_creation (id_creation, nb_view) "+
                "SELECT id_creation, nb_view "+
                "FROM new_values "+
                "WHERE NOT EXISTS (SELECT 1 "+
                                  "FROM upsert up "+
                                  "WHERE up.id_creation = new_values.id_creation)";
            
            console.log(upsertCreationView);
            client.query(upsertCreationView, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    app.get('/increxpositionview.json', function(request, response){
        console.log("GET increxpositionview.json ");
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            
            var upsertExpositionView =
                'select row_to_json(row) as nb_view_exposition '+
                    'from('+
                        "select id_exposition, nb_view "+
                        "from nb_view_exposition "+
                        "where id_exposition="+request.query.id_exposition+
                    ')row';
                    
            console.log("upsertExpositionView : ",upsertExpositionView);
            
            client.query(upsertExpositionView, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    app.put('/increxpositionview.json', function(request, response){
        console.log("PUT incrcreationview.json");
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            
            var upsertExpositionView =
                "WITH new_values (id_exposition, nb_view) as ("+
                  "values "+
                     "("+request.query.id_exposition+", coalesce((select nb_view from nb_view_exposition where id_exposition="+request.query.id_exposition+"), 0))"+
                "), "+
                "upsert as "+
                "( "+
                    "update nb_view_exposition nvc "+
                        "set nb_view = nv.nb_view+1 "+
                    "FROM new_values nv "+
                    "WHERE nvc.id_exposition = nv.id_exposition "+
                    "RETURNING nvc.* "+
                ")"+
                "INSERT INTO nb_view_exposition (id_exposition, nb_view) "+
                "SELECT id_exposition, nb_view "+
                "FROM new_values "+
                "WHERE NOT EXISTS (SELECT 1 "+
                                  "FROM upsert up "+
                                  "WHERE up.id_exposition = new_values.id_exposition)";
            
            console.log(upsertExpositionView);
            client.query(upsertExpositionView, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    app.put('/unlikeFromCollection.json', isVisitorLoggedIn, function(request, response){
        console.log("PUT unlikeFromCollection.json id : ", request.user.dataValues.id);
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            
            var updateOpinions = "update opinions set collected='false' where id_visitor="+request.query.id+
                                    " and id_creation="+request.query.id_creation;
            
            console.log(updateOpinions);
            client.query(updateOpinions, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    app.get('/collection.json', isVisitorLoggedIn, function(request, response){
        console.log("GET collection.json id : ", request.user.dataValues.id);
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            
            var collectionQuery = 'select row_to_json(row) as collection '+
                'from('+
                    'select id, '+
                        '(select array_to_json(array_agg(row_to_json(a))) '+
                        'from ('+
                            // creations
                            'select c.id_creation, c.url, c.t_p_x, c.t_p_y, c.t_d_x, o.collected, '+
                                '(select array_to_json(array_agg(row_to_json(h))) '+
                                'from ('+
                                    // artiste details
                                    'select cd.title, cd.medium, c.creation_date '+
                                    'from creation_detail cd '+
                                    'where cd.id_creation = c.id_creation '+
                                    ')'+
                                'h) as details, '+
                                '(select array_to_json(array_agg(row_to_json(b))) '+
                                'from ('+
                                    // artiste details
                                    'select ad.fname, ad.lname '+
                                    'from artiste_details ad '+
                                    'where ad.id_creator = c.id_creator '+
                                        ' and ad.id_artiste_gallery = c.id_artiste '+
                                    ')'+
                                'b) as author, '+
                                '(select array_to_json(array_agg(row_to_json(e))) '+
                                'from ('+
                                    // exposition
                                    'select e.e_name, e.adresse, e.latitude, e.longitude, e.date_debut, e.date_fin, '+
                                    '(select array_to_json(array_agg(row_to_json(d))) '+
                                        'from ('+
                                            // gallery
                                            'select distinct gd.gname, gd.g_adresse, gd.visites '+
                                            'from gallery_details gd '+
                                            'where gd.id_gallery = e.id_gallery '+
                                            ')'+
                                        'd) as gallery '+
                                    'from expositions e, exposition_creations ec '+
                                    'where ec.id_creation = c.id_creation '+
                                        ' and e.id_exposition = ec.id_exposition '+
                                    ')'+
                                'e) as expositions '+
                            'from opinions o, creations c '+
                            'where o.id_visitor = creators.id '+
                                "and o.collected='true' "+
                                'and c.id_creation = o.id_creation '+
                                "and c.isdeleted='false') "+
                        'a) as creations '+
                    'from creators '+
                    'where id = '+ request.query.id+
                    ')row';
        
            console.log(collectionQuery);
            client.query(collectionQuery, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
        
    
    // GALLERY DETAILS
    // GET
    app.get('/exposition_details.json', isProLoggedIn, function(request, response){
        console.log("GET Creator.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            // TO CHANGE
            var creatorQuery = 'select row_to_json(row) as gallery '+
                'from('+
                    'select id, localemail, type, url, a_x, a_y, a_d_x, (select max(id_exposition) as id_exposition_next from expositions), '+
                    '(select array_to_json(array_agg(row_to_json(e))) '+
                        'from ('+
                            'select gname, g_rcs, g_adresse, g_tel, g_mail, g_site '+
                            'from gallery_details '+
                            'where id_gallery = creators.id '+
                            'order by id asc)'+
                        'e) as gallery_detail,'+
                    '(select array_to_json(array_agg(row_to_json(f))) '+
                        'from ('+
                           'select id_creator '+
                            'from gallery_artists '+
                            'where id_gallery = creators.id '+
                            'order by id asc)'+
                        'f) as gallery_artists,'+
                        // GALLERY ARTIST CREATIONS
                    '(select array_to_json(array_agg(row_to_json(i))) '+
                        'from ('+
                           'select c.id_artiste, c.id_creation, c.url, c.isvalid, c.id_godfather, c.width, c.height, c.p_x, c.p_y, c.d_x, c.d_y, c.t_p_x, c.t_p_y, c.t_d_x '+ 
                            'from creations c '+
                            'where c.id_creator = creators.id '+
                            'order by id asc)'+
                        'i) as gallery_creations,'+
                    '(select array_to_json(array_agg(row_to_json(h))) '+
                        'from ('+
                            'select id_exposition, e_name, e_description, adresse, latitude, longitude, url, width, height, t_p_x, t_p_y, t_d_x, id_exposition, date_debut, date_fin, isvalid, '+
                                '(select array_to_json(array_agg(row_to_json(m))) '+
                                    'from ('+
                                        'select id_exposition, id_creation '+
                                        'from exposition_creations ec '+
                                        'where ec.id_exposition = exp.id_exposition '+
                                        'order by id asc)'+
                                    'm) as exposition_creations '+
                            'from expositions exp '+
                            'where exp.id_gallery = creators.id '+
                            'order by id asc)'+
                        'h) as gallery_exhibitions '+
                    'from creators '+
                    'where id='+
                        request.query.id
                        +" and type='galerie')row";
        
            console.log(creatorQuery);
            client.query(creatorQuery, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });

    
    app.post('/exposition_details.json', isProLoggedIn, function(request, response){
        console.log("post exposition_details.json");
        
        if (request.user.dataValues.id != request.query.id_gallery){
            return;
        }
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
            // test exist
            console.log("exposition detail date debut	: ",request.query.e_debut);
            console.log("exposition detail date fin	 : ",request.query.e_fin);
            console.log("id expo : ", request.query.id_exposition);
            console.log("valid date format : ", new Date(request.query.e_debut).toUTCString());
            var addCreationToExhibition = "insert into expositions (id_gallery, id_exposition, e_name, url, height, width, t_p_x, t_p_y, t_d_x, date_debut, date_fin, e_description, adresse, latitude, longitude, isvalid) values ("+
                                request.query.id_gallery
                                +","+request.query.id_exposition
                                +",'"+request.query.e_name
                                +"','"+request.query.url
                                +"',"+request.query.height
                                +","+request.query.width
                                +","+request.query.e_p_x
                                +","+request.query.e_p_y
                                +","+request.query.e_d_x
                                +",'"+new Date(request.query.e_debut).toUTCString()
                                +"','"+new Date(request.query.e_fin).toUTCString()
                                +"','"+request.query.e_description
                                +"','"+request.query.e_adresse
                                +"',"+request.query.e_latitude
                                +","+request.query.e_longitude
                                +", false"
                                +")";
                            
            console.log("insert event Query : ", addCreationToExhibition);
            client.query(addCreationToExhibition, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    app.post('/exposition_creations.json', isProLoggedIn,  function(request, response){
        console.log("post exposition_creations.json");
        
        //if (request.user.dataValues.id != request.query.id){
        //    return;
        //}
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            console.log("id exposition : ", request.query.id_exposition);
            var addCreationToExhibition = "insert into exposition_creations (id_exposition, id_creation) values ("+
                                +request.query.id_exposition
                                +","+request.query.id_creation
                                +")";
            console.log("update Query : ", addCreationToExhibition);
            client.query(addCreationToExhibition, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });

    // CREATIONS
    // ajout d'une creation
    app.delete('/exposition_creations.json', isProLoggedIn, function(request, response){
        console.log("delete exposition_creations.json");
        
        //if (request.user.dataValues.id != request.query.id){
        //    return;
        //}
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
            var deleteCreationFromExhibition = "delete from exposition_creations where id_exposition = "+request.query.id_exposition
                                +" and id_creation = "+request.query.id_creation;
            client.query(deleteCreationFromExhibition, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on select : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });
    
    // PUT CREATOR AVATAR
    app.put('/creator_avatar.json',  isProLoggedIn, function(request, response){
        console.log("POST Avatar details");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
        // test exist
            var resultString;
            console.log("query : ", request.query);
            var updateCreatorAvatar = "update creators set url = '"+ request.query.url
                                +"', a_x = "+request.query.a_x
                                +", a_y = "+request.query.a_y
                                +", a_d_x = "+request.query.a_d_x
                                +" where id = "+request.query.id;
            console.log("update creator avatar : ", updateCreatorAvatar);
            client.query(updateCreatorAvatar, function(err, result) {
                done();
                if (err){
                    console.error(err); 
                    response.send("Creation Mgmt - Error on update : " + err);
                }else {
                    count = result.rows.length;
                    console.log("count : ", count);
                    if (count == 0){
                        resultString = "NOK";					
                    }
                    else{
                        resultString = "OK";
                        console.log("OK");
                    }
                    response.send("OK");
                }	
            });
        });
    });
    
    // POST ARTISTE RIGHTS
    app.post('/artiste_rights.json', isProLoggedIn, function(request, response){
        console.log("POST artiste_details.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var artisteDroitInsert = 'insert into creator_rights(id_creator, id_right, is_accepted) values ('+
                request.query.id+
                ",'"+request.query.id_right+
                "','"+request.query.is_accepted+"')";
        
            client.query(artisteDroitInsert, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // PUT ARTISTE RIGHTS
    app.put('/artiste_rights.json', isProLoggedIn, function(request, response){
        console.log("PUT artiste_details.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var artisteDroitUpdate = "update creator_rights set id_creator="+request.query.id
                    +", id_right="+request.query.id_right
                    +", is_accepted='"+request.query.isAccepted+"'";
            client.query(artisteDroitUpdate, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // POST GALLERY RIGHTS
    app.post('/gallery_rights.json', isProLoggedIn, function(request, response){
        console.log("POST gallery_rights.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var galleryDroitInsert = 'insert into gallery_rights(id_gallery, id_right, is_accepted) values ('+
                request.query.id+
                ",'"+request.query.id_right+
                "','"+request.query.is_accepted+"')";
        
            client.query(galleryDroitInsert, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // PUT GALLERY RIGHTS
    app.put('/gallery_rights.json', isProLoggedIn, function(request, response){
        console.log("PUT gallery_rights.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var galleryDroitUpdate = "update gallery_rights set is_accepted='"+request.query.is_accepted
                    +"' where id_right="+request.query.id_right
                    +" and id_gallery="+request.query.id;
                    
            console.log("galleryDroitUpdate : ", galleryDroitUpdate);
            client.query(galleryDroitUpdate, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // POST ARTIST DETAILS (insert) 
    app.post('/artiste_details.json', isProLoggedIn, function(request, response){
        console.log("POST artiste_details.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var artisteDetailInsert = 'insert into artiste_details(id_creator, fname, lname, bio, mail, tel, site) values ('+
                request.query.id+
                ",'"+request.query.fname+
                "','"+request.query.lname+
                "','"+request.query.bio+
                "','"+request.query.mail+
                "','"+request.query.tel+
                "','"+request.query.site+"')";
            console.log("artiste detail insert : ", artisteDetailInsert);
            client.query(artisteDetailInsert, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // PUT ARTISTE DETAILS (update)
    app.put('/artiste_details.json', isProLoggedIn, function(request, response){
        console.log("PUT artiste_details.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var updateArtistDetails = "update artiste_details set fname = '"+request.query.fname
                                                    +"', lname = '"+request.query.lname
                                                    +"', bio = '"+request.query.bio
                                                    +"', mail = '"+request.query.mail
                                                    +"', tel = '"+request.query.tel
                                                    +"', site = '"+request.query.site
                                                    +"' where id_creator = "
                                                    +request.query.id;
        
            client.query(updateArtistDetails, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // POST GALLERY DETAILS (insert)
    app.post('/gallery_details.json', isProLoggedIn, function(request, response){
        console.log("POST gallery_details.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var galleryDetailInsert = 'insert into gallery_details(id_gallery, gname, g_rcs, g_adresse, g_tel, g_mail, g_site, visites) values ('+
                request.query.id+
                ",'"+request.query.gName+
                "','"+request.query.gRcs+
                "','"+request.query.gAdresse+
                "','"+request.query.gTel+
                "','"+request.query.gMail+
                "','"+request.query.gSite+
                "','"+request.query.gVisites+"')";
                
            client.query(galleryDetailInsert , function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // PUT GALLEY DETAILS
    app.put('/gallery_details.json', isProLoggedIn, function(request, response){
        console.log("PUT gallery_details.json blabla bla");
        
        console.log("acqui id : ", request.user.dataValues.id);
        console.log("acqui query id : ", request.query.id);
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }

        var results = [];
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var updateGalleryDetails = "update gallery_details set gname = '"+request.query.gName
                                                    +"', g_rcs = '"+request.query.gRcs
                                                    +"', g_adresse = '"+request.query.gAdresse
                                                    +"', g_tel = '"+request.query.gTel
                                                    +"', g_mail = '"+request.query.gMail
                                                    +"', g_site = '"+request.query.gSite
                                                    +"', visites = '"+request.query.gVisites
                                                    +"' where id_gallery = "
                                                    +request.query.id;
            
            console.log("updateGalleryDetails", updateGalleryDetails);
            
            client.query(updateGalleryDetails, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // PUT EXPOSITION DETAILS (update);
    /// WTF??? To BE changed.
    app.put('/exposition_details.json', isProLoggedIn, function(request, response){
        console.log("PUT exposition_details.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        var results = [];
        
        // expoition details
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var updateArtistDetails = "update gallery_details set e_name = '"+request.query.eName
                                                    +"', e_description = '"+request.query.gRcs
                                                    +"', url = '"+request.query.gAdresse
                                                    +"', t_p_x = '"+request.query.e_x
                                                    +"', t_p_y = '"+request.query.e_y
                                                    +"', t_d_x = '"+request.query.e_d_x
                                                    +"', width = '"+request.query.eWidth
                                                    +"', height = '"+request.query.eHeight
                                                    +"', adresse = '"+request.query.e_adresse
                                                    +"', latitude = '"+request.query.e_latitude
                                                    +"', longitude = '"+request.query.e_longitude
                                                    +"', url = '"+request.query.eUrl
                                                    +"', date_debut = '"+request.query.date_debut
                                                    +"', date_fin = '"+request.query.e_t_d_x
                                                    +"' where id_gallery = "+request.query.id
                                                    +"and id_exposition ="+ request.query.id_exposition;
        
            client.query(updateArtistDetails, function(err, result) {
            done();
            if (err){
                console.error("eror on put exposition details : ", err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
            });
        });
    });
    
    // TO DO 
    // DELETE CREATOR CREATIONS
    app.delete('/creator_creations.json', isProLoggedIn, function(request, response){
        console.log("GET Creator.json");
        
        if (request.user.dataValues.id != request.query.id){
            return;
        }
        
        pg.connect(app.get('dbUrl'), function(err, client, done){
            //var creatorQuery = 'select row_to_json(row) as creator from(select id, localemail, (select count(*) as id_creation_next from creations where id_creator = creators.id),(select array_to_json(array_agg(row_to_json(d))) from (select id_creation, url,isvalid,id_godfather,width, height, p_x, p_y, d_x, d_y, t_p_x, t_p_y, t_d_x, (select array_to_json(array_agg(row_to_json(c)))from (select title,cartel,creation_date, url_video,medium, s_h, s_w, s_l from creation_detail where id_creation = creations.id_creation)c) as properties, (select array_to_json(array_agg(row_to_json(e))) from (select latitude, longitude, adresse from creation_location where id_creation = creations.id_creation)e) as locations from creations where id_creator = creators.id and isDeleted=false order by id asc)d)as creations from creators where id='+
            request.query.id
            +')row';
        
            console.log(creatorQuery);
            client.query(creatorQuery, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
        });
        });
    });

    /************************
    *   VISITOR API
    *************************/
    // POST OPINION
    app.post('/opinion.json', isVisitorLoggedIn, function(request, response){
        console.log("POST Opinion.json");
        
        var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var postOpinion = "insert into opinions (id_visitor, id_creation, latitude, longitude, collected, registered, creation_date) values ("+
                                                    request.query.id_visitor+","+
                                                    request.query.id_creation+","+
                                                    request.query.latitude+","+
                                                    request.query.longitude+",'"+
                                                    request.query.collected+"','"+
                                                    request.query.registered+"','"+
                                                    creationDate+"')";
            console.log(postOpinion);
            client.query(postOpinion, function(err, result) {
            done();
            if (err){
                console.error(err);
                response.send("Error"+err);
            }else{
                
                for (var i = 0; i < result.length;i++){
                    console.log(JSON.stringify(rows[i]));
                }
                response.send(result.rows);
            }
        });
        });
    });

    // CONSTANTS 
    // GET LAST OPINION
    app.get('/lastopinion.json', isVisitorLoggedIn, function (request, response) {
        console.log("get lastopinions.json");
        
        if (request.user.dataValues.id != request.query.id_visitor){
            return;
        }
        
        pg.connect(app.get('dbUrl'), function(err, client, done) {
            var loastOpinionQuery = "select row_to_json(row) as lastopinion from(select * from opinions where id_visitor = "+request.query.id_visitor+
                            " and creation_date = (select max(creation_date) from opinions where id_visitor = "+request.query.id_visitor+
                            "))row";
        
            console.log("lastopinion.json : ", loastOpinionQuery);
            client.query(loastOpinionQuery, function(err, result) {
            done();
        
            if (err){ 
                console.error(err); response.send("Error " + err); 
            }
            response.send(result.rows); 
            });
      });
    });

    // GET CREATION FROM GEOLOC
	app.get('/creationsFromGeolocation.json', isVisitorLoggedIn, function (request, response) {
		console.log("get creationsFromGeolocation.json");
		
		if (request.user.dataValues.id != request.query.id_visitor){
            return;
        }
		
		var today = new Date();
		//var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			
			var getCreationFromGeolocation = "select row_to_json(row) as creationIds from("+
				"select * from ("+
                    "select cl.id_creation, cl.adresse, "+
                        "(select exp_case from ("+
                            "select e.id_exposition, case "+
                                "when (e.date_debut < now()"+
                                    " and e.date_fin > now()"+
                                    ") then 0 "+
                                "when (e.date_debut > now()"+
                                    ") then 1 "+
                                "else 2 end as exp_case "+
                            "from exposition_creations ec, expositions e "+
                            "where id_creation = c.id_creation "+
                            "and e.id_exposition = ec.id_exposition "+
                        ") ei ) exp_priority, "+
                        "round(( point(cl.latitude, cl.longitude) <@> point("+request.query.latitude
                                                                            +','+request.query.longitude+"))::numeric, 4) as miles "+
                    "from creation_location cl, creations c"+
                    " where ("+
                        "cl.id_creation = c.id_creation "+
                        "and c.isvalid = 'true' "+
                        "and cl.id_creation NOT IN (select o.id_creation from opinions o where o.id_visitor="+request.query.id_visitor+
                    ")) "+
				") ss "+
				"where miles < ("+
				    "select mycase from ("+
                        "select count(*), case "+
                            "when count(*)=0 then ("+
                                "select value "+
                                "from public_preferences "+
                                "where v_desc='DISTANCE')"+
                            "else ("+
                                "select value from visitor_preferences "+
                                    "where id_visitor="+request.query.id_visitor+
                                        " and id_preference = 0 "+
                            ") end as mycase "+
                        "from visitor_preferences "+
                        "where id_visitor="+request.query.id_visitor+
                            " and id_preference = 0) st"+
                    ") "+
				"order by exp_priority asc, miles asc limit 10"+
			")row";
			
			console.log("getCreationFromGeolocation : ", getCreationFromGeolocation);
			
			client.query(getCreationFromGeolocation,function(err, result) {
				done();
		
				if (err){
				 console.error(err); response.send("Error " + err); }
				else{
				for (var i=0; i<result.length;i++){
					console.log(JSON.stringify(rows[i]));
				}
				response.send(result.rows); 
		   }
	   
		});
	  });
	});
	
	// GET CREATION FROM GEOLOC
	app.get('/urlFromGeolocation.json', function (request, response) {
		console.log("get creationsFromGeolocation.json");
		
		var today = new Date();
		//var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			
			var getUrlFromGeolocation = "select row_to_json(row) as url from("+
				"select * from ("+
                    "select cl.id_creation, cl.adresse, "+
                        "(select exp_case from ("+
                            "select e.id_exposition, case "+
                                "when (e.date_debut < now()"+
                                    " and e.date_fin > now()"+
                                    ") then 0 "+
                                "when (e.date_debut > now()"+
                                    ") then 1 "+
                                "else 2 end as exp_case "+
                            "from exposition_creations ec, expositions e "+
                            "where id_creation = c.id_creation "+
                            "and e.id_exposition = ec.id_exposition"+
                        ") ei ) exp_priority, "+
                        "round(( point(cl.latitude, cl.longitude) <@> point("+request.query.latitude
                                                                            +','+request.query.longitude+"))::numeric, 4) as miles "+
                    "from creation_location cl, creations c"+
                    " where ("+
                        "cl.id_creation = c.id_creation "+
                        "and c.isvalid = 'true' and c.isdeleted = 'false'"+
                    ") "+
				") ss "+
				"where miles < 5 "+
				"order by exp_priority asc, miles asc limit 10"+
			")row";
			
			console.log("getUrlFromGeolocation : ", getUrlFromGeolocation);
			
			client.query(getUrlFromGeolocation,function(err, result) {
				done();
		
				if (err){
				 console.error(err); response.send("Error " + err); }
				else{
				for (var i=0; i<result.length;i++){
					console.log(JSON.stringify(rows[i]));
				}
				response.send(result.rows); 
		   }
	   
		});
	  });
	});
	
	// IMPORTANT.
	// GET CREATION WITH ID
	app.get('/creationDetails.json', function (request, response) {
		console.log("get creationsWithId.json");
		var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {
		
			var creationDetails = "select row_to_json(row) as creationDetails from("+
			"select id_creation, url, isvalid, id_godfather, width, height, p_x, p_y, d_x, d_y, t_p_x, t_p_y, t_d_x, "+
			" (select array_to_json(array_agg(row_to_json(c)))"+
				" from ("+
					" select title,cartel,creation_date, url_video,medium, s_h, s_w, s_l"+
					" from creation_detail"+
					" where id_creation = creations.id_creation)c) as properties, "+
			' (select array_to_json(array_agg(row_to_json(e))) '+
			' from ('+
				' select fname, lname, bio'+
				' from artiste_details'+
				' where id_creator = creations.id_creator and id_artiste_gallery = id_artiste'+
				')'+
			' e) as author_details, '+
			' (select array_to_json(array_agg(row_to_json(f))) '+
			' from ('+
				' select distinct c.url, c.a_x, c.a_y, c.a_d_x, gd.gname, gd.g_adresse'+
				' from creators c, gallery_details gd '+
				' where c.id = creations.id_creator and gd.id_gallery=c.id'+
				')'+
			' f) as gallery_details '+
			" from creations where id_creation = "+request.query.id_creation+
			" limit 1)row";
			
			console.log("creationDetails : ", creationDetails);
			
			client.query(creationDetails,function(err, result) {
				done();
		
				if (err){
				 console.error(err); response.send("Error " + err); }
				else{
				for (var i=0; i<result.length;i++){
					console.log(JSON.stringify(rows[i]));
				}
				response.send(result.rows); 
		   }
		});
	  });
	});
	
	
	
	// IMPORTANT.
	// GET CREATION WITH ID
	app.get('/creationsWithId.json', isVisitorLoggedIn, function (request, response) {
		console.log("get creationsWithId.json");
		var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {
		
			var getCreationWithId = "select row_to_json(row) as creationDetails from("+
			"select id_creation, url, isvalid, id_godfather, width, height, p_x, p_y, d_x, d_y, t_p_x, t_p_y, t_d_x, "+
			" (select array_to_json(array_agg(row_to_json(c)))"+
				" from ("+
					" select title,cartel,creation_date, url_video,medium, s_h, s_w, s_l"+
					" from creation_detail"+
					" where id_creation = creations.id_creation)c) as properties, "+
			' (select array_to_json(array_agg(row_to_json(e))) '+
			' from ('+
				' select fname, lname, bio'+
				' from artiste_details'+
				' where id_creator = creations.id_creator and id_artiste_gallery = id_artiste'+
				')'+
			' e) as author_details, '+
			' (select array_to_json(array_agg(row_to_json(f))) '+
			' from ('+
				' select distinct c.url, c.a_x, c.a_y, c.a_d_x, gd.gname, gd.g_adresse'+
				' from creators c, gallery_details gd '+
				' where c.id = creations.id_creator and gd.id_gallery=c.id'+
				')'+
			' f) as gallery_details '+
			" from creations where id_creation = "+request.query.id_creation+
			" limit 1)row";
			
			console.log("getCreationWithId : ", getCreationWithId);
			
			client.query(getCreationWithId,function(err, result) {
				done();
		
				if (err){
				 console.error(err); response.send("Error " + err); }
				else{
				for (var i=0; i<result.length;i++){
					console.log(JSON.stringify(rows[i]));
				}
				response.send(result.rows); 
		   }
		});
	  });
	});
	
	// GET VIEW COUNT
	app.get('/nbViewWithId.json', isVisitorLoggedIn, function (request, response) {
		console.log("get nbViewWithId.json");
		var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {
		
			var getCreationCount = "select row_to_json(row) as creationDetails from("+
			"select count(*) "+
			"from opinions where id_creation = "+request.query.id_creation+
			")row";
			
			console.log("getCreationCount : ", getCreationCount);
			
			client.query(getCreationCount,function(err, result) {
				done();
		
				if (err){
				 console.error(err); response.send("Error " + err); }
				else{
				for (var i=0; i<result.length;i++){
					console.log(JSON.stringify(rows[i]));
				}
				response.send(result.rows); 
		   }
		});
	  });
	});
  
  
    // POST OPINION
    app.post('/record_directions.json', isVisitorLoggedIn, function(request, response){
        console.log("POST record_directions.json");
        
        var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var postDirections = "insert into directions (id_visitor, id_creation, d_lat, d_lon, a_lat, a_lon, creation_date, is_visited) values ("+
                                                    request.query.id_visitor+","+
                                                    request.query.id_creation+","+
                                                    request.query.d_lat+","+
                                                    request.query.d_lon+","+
                                                    "(select latitude from creation_location where id_creation = "+request.query.id_creation+'),'+
                                                    "(select longitude from creation_location where id_creation = "+request.query.id_creation+"),'"
                                                    +creationDate+"','false')";
            console.log(postDirections);
            client.query(postDirections, function(err, result) {
                done();
                if (err){
                    console.error(err);
                    response.send("Error"+err);
                }else{
                    console.log("record_directions.json query works ");
                    for (var i = 0; i < result.length;i++){
                        console.log(JSON.stringify(rows[i]));
                    }
                    response.send(result.rows);
                }
            });
        });
    });
    
    // POST OPINION
    app.post('/record_directions_from_collection.json', isVisitorLoggedIn, function(request, response){
        console.log("POST record_directions_from_collection.json");
        
        var creationDate = new Date().toUTCString();
    
        pg.connect(app.get('dbUrl'), function(err, client, done){
            var postDirections = "insert into directions (id_visitor, id_creation, d_lat, d_lon, a_lat, a_lon, creation_date, is_visited) values ("+
                                                    request.query.id_visitor+","+
                                                    request.query.id_creation+","+
                                                    // on recupère les dernières positions d'opinions
                                                    // d_lat, d_lon
                                                    "0,0,"+
                                                    // a_lat
                                                    "(select latitude from creation_location where id_creation = "+request.query.id_creation+'),'+
                                                    // a_long
                                                    "(select longitude from creation_location where id_creation = "+request.query.id_creation+"),'"
                                                    +creationDate+"','false')";
            console.log(postDirections);
            client.query(postDirections, function(err, result) {
                done();
                if (err){
                    console.error(err);
                    response.send("Error"+err);
                }else{
                    console.log("record_directions.json query works ");
                    for (var i = 0; i < result.length;i++){
                        console.log(JSON.stringify(rows[i]));
                    }
                    response.send(result.rows);
                }
            });
        });
    });
   
    // GET DIRECTIONS
	app.get('/directions.json', isVisitorLoggedIn, function (request, response) {
		console.log("get directions.json");
		
		if (request.user.dataValues.id != request.query.id_visitor){
            return;
        }
		
		var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			
			var getDirections = "select row_to_json(row) as directions from("+
				"select id_creation, d_lat, d_lon, a_lat, a_lon "+
				"from directions d"+
				" where ("+
				    "d.id_visitor = "+request.query.id_visitor+
					"and creation_date IN (select max(creation_date) from directions where id_visitor = "+request.query.id_visitor+")"+
				")"+
			") row";
			
			console.log("getDirections : ", getDirections);
			
			client.query(getDirections,function(err, result) {
				done();
		
				if (err){
				 console.error(err); response.send("Error " + err); }
				else{
				for (var i=0; i<result.length;i++){
					console.log(JSON.stringify(rows[i]));
				}
				response.send(result.rows); 
		   }
	   
		});
	  });
	});
   // END OF GLOBAL DECLARATION
};

// route middleware to make sure a user is logged in
    function isProLoggedIn(req, res, next) {
        console.log("route-api - isProLoggedIn");
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated() && (req.user.dataValues.type=='galerie' || req.user.dataValues.type=='artiste'))
            return next();
        else
            res.redirect('/login');
    };
    
    function isLoggedIn(req, res, next) {
        console.log("route-api - isLoggedIn");
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
        else
            res.redirect('/login');
    };
    
    // route middleware to make sure a user is logged in
    function isVisitorLoggedIn(req, res, next) {
        console.log("route-api - isVisitorLoggedIn");
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();
        else
            res.redirect('/parcours/login');
    }