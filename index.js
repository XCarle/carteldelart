var express = require('express');

var pg = require('pg').native;
var aws = require('aws-sdk');
var flash = require('connect-flash');
conf = require('./conf.json');

var morgan       	= require('morgan'); // logger
var passport 		= require('passport');
var cookieParser 	= require('cookie-parser');
var bodyParser   	= require('body-parser');
var session 		= require('express-session');
var compress 		= require('compression');
var nodemailer 		= require('nodemailer');

async = require('async');
crypto = require('crypto');

url = require('url');
fs = require('fs');

var app = express();

app.use(compress());

app.set('port', (process.env.PORT || 5000));
app.set('dbUrl', (process.env.DATABASE_URL));

var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET_CREATION = process.env.S3_BUCKET_CREATION;
var S3_BUCKET_AVATAR = process.env.S3_BUCKET_AVATAR;
var S3_BUCKET_GALLERY = process.env.S3_BUCKET_GALLERY;
var S3_BUCKET_EXHIBITION = process.env.S3_BUCKET_EXHIBITION;

var Sequelize = require('sequelize');
sequelize = new Sequelize(process.env.DATABASE_URL);

pghstore = require('pg-hstore');

require('./config/passport')(passport); // pass passport for configuration

var cacheTime = 86400000*7; 
//app.use(express.static(__dirname + '/public'),{ maxAge: cacheTime });
app.use(express.static(__dirname + '/public'));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); // set up ejs for templating

// required for passport
app.use(session({ 
	secret: process.env.CRYPT_ACCESS, 
   	resave: true,
   	saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


require('./app/routes.js')(app, passport);
require('./app/routes-api.js')(app, pg, aws, AWS_ACCESS_KEY, AWS_SECRET_KEY, S3_BUCKET_CREATION, S3_BUCKET_AVATAR, S3_BUCKET_GALLERY, S3_BUCKET_EXHIBITION);
require('./app/routes-articles.js')(app);



var Latinise={};
Latinise.latin_map={"Á":"A","Ă":"A","Ắ":"A","Ặ":"A","Ằ":"A","Ẳ":"A","Ẵ":"A","Ǎ":"A","Â":"A","Ấ":"A","Ậ":"A","Ầ":"A","Ẩ":"A","Ẫ":"A","Ä":"A","Ǟ":"A","Ȧ":"A","Ǡ":"A","Ạ":"A","Ȁ":"A","À":"A","Ả":"A","Ȃ":"A","Ā":"A","Ą":"A","Å":"A","Ǻ":"A","Ḁ":"A","Ⱥ":"A","Ã":"A","Ꜳ":"AA","Æ":"AE","Ǽ":"AE","Ǣ":"AE","Ꜵ":"AO","Ꜷ":"AU","Ꜹ":"AV","Ꜻ":"AV","Ꜽ":"AY",
										"Ḃ":"B","Ḅ":"B","Ɓ":"B","Ḇ":"B","Ƀ":"B","Ƃ":"B",
										"Ć":"C","Č":"C","Ç":"C","Ḉ":"C","Ĉ":"C","Ċ":"C","Ƈ":"C","Ȼ":"C",
										"Ď":"D","Ḑ":"D","Ḓ":"D","Ḋ":"D","Ḍ":"D","Ɗ":"D","Ḏ":"D","ǲ":"D","ǅ":"D","Đ":"D","Ƌ":"D","Ǳ":"DZ","Ǆ":"DZ",
										"É":"E","Ĕ":"E","Ě":"E","Ȩ":"E","Ḝ":"E","Ê":"E","Ế":"E","Ệ":"E","Ề":"E","Ể":"E","Ễ":"E","Ḙ":"E","Ë":"E","Ė":"E","Ẹ":"E","Ȅ":"E","È":"E","Ẻ":"E","Ȇ":"E","Ē":"E","Ḗ":"E","Ḕ":"E","Ę":"E","Ɇ":"E","Ẽ":"E","Ḛ":"E","Ꝫ":"ET",
										"Ḟ":"F","Ƒ":"F",
										"Ǵ":"G","Ğ":"G","Ǧ":"G","Ģ":"G","Ĝ":"G","Ġ":"G","Ɠ":"G","Ḡ":"G","Ǥ":"G",
										"Ḫ":"H","Ȟ":"H","Ḩ":"H","Ĥ":"H","Ⱨ":"H","Ḧ":"H","Ḣ":"H","Ḥ":"H","Ħ":"H",
										"Í":"I","Ĭ":"I","Ǐ":"I","Î":"I","Ï":"I","Ḯ":"I","İ":"I","Ị":"I","Ȉ":"I","Ì":"I","Ỉ":"I","Ȋ":"I","Ī":"I","Į":"I","Ɨ":"I","Ĩ":"I","Ḭ":"I","Ꝺ":"D","Ꝼ":"F","Ᵹ":"G","Ꞃ":"R","Ꞅ":"S","Ꞇ":"T","Ꝭ":"IS",
										"Ĵ":"J","Ɉ":"J",
										"Ḱ":"K","Ǩ":"K","Ķ":"K","Ⱪ":"K","Ꝃ":"K","Ḳ":"K","Ƙ":"K","Ḵ":"K","Ꝁ":"K","Ꝅ":"K",
										"Ĺ":"L","Ƚ":"L","Ľ":"L","Ļ":"L","Ḽ":"L","Ḷ":"L","Ḹ":"L","Ⱡ":"L","Ꝉ":"L","Ḻ":"L","Ŀ":"L","Ɫ":"L","ǈ":"L","Ł":"L","Ǉ":"LJ",
										"Ḿ":"M","Ṁ":"M","Ṃ":"M","Ɱ":"M",
										"Ń":"N","Ň":"N","Ņ":"N","Ṋ":"N","Ṅ":"N","Ṇ":"N","Ǹ":"N","Ɲ":"N","Ṉ":"N","Ƞ":"N","ǋ":"N","Ñ":"N","Ǌ":"NJ",
										"Ó":"O","Ŏ":"O","Ǒ":"O","Ô":"O","Ố":"O","Ộ":"O","Ồ":"O","Ổ":"O","Ỗ":"O","Ö":"O","Ȫ":"O","Ȯ":"O","Ȱ":"O","Ọ":"O","Ő":"O","Ȍ":"O","Ò":"O","Ỏ":"O","Ơ":"O","Ớ":"O","Ợ":"O","Ờ":"O","Ở":"O","Ỡ":"O","Ȏ":"O","Ꝋ":"O","Ꝍ":"O","Ō":"O","Ṓ":"O","Ṑ":"O","Ɵ":"O","Ǫ":"O","Ǭ":"O","Ø":"O","Ǿ":"O","Õ":"O","Ṍ":"O","Ṏ":"O","Ȭ":"O","Ƣ":"OI","Ꝏ":"OO","Ɛ":"E","Ɔ":"O","Ȣ":"OU",
										"Ṕ":"P","Ṗ":"P","Ꝓ":"P","Ƥ":"P","Ꝕ":"P","Ᵽ":"P","Ꝑ":"P",
										"Ꝙ":"Q","Ꝗ":"Q",
										"Ŕ":"R","Ř":"R","Ŗ":"R","Ṙ":"R","Ṛ":"R","Ṝ":"R","Ȑ":"R","Ȓ":"R","Ṟ":"R","Ɍ":"R","Ɽ":"R","Ꜿ":"C","Ǝ":"E",
										"Ś":"S","Ṥ":"S","Š":"S","Ṧ":"S","Ş":"S","Ŝ":"S","Ș":"S","Ṡ":"S","Ṣ":"S","Ṩ":"S",
										"Ť":"T","Ţ":"T","Ṱ":"T","Ț":"T","Ⱦ":"T","Ṫ":"T","Ṭ":"T","Ƭ":"T","Ṯ":"T","Ʈ":"T","Ŧ":"T","Ɐ":"A","Ꞁ":"L","Ɯ":"M","Ʌ":"V","Ꜩ":"TZ",
										"Ú":"U","Ŭ":"U","Ǔ":"U","Û":"U","Ṷ":"U","Ü":"U","Ǘ":"U","Ǚ":"U","Ǜ":"U","Ǖ":"U","Ṳ":"U","Ụ":"U","Ű":"U","Ȕ":"U","Ù":"U","Ủ":"U","Ư":"U","Ứ":"U","Ự":"U","Ừ":"U","Ử":"U","Ữ":"U","Ȗ":"U","Ū":"U","Ṻ":"U","Ų":"U","Ů":"U","Ũ":"U","Ṹ":"U","Ṵ":"U",
										"Ꝟ":"V","Ṿ":"V","Ʋ":"V","Ṽ":"V",
										"Ꝡ":"VY","Ẃ":"W","Ŵ":"W","Ẅ":"W","Ẇ":"W","Ẉ":"W","Ẁ":"W","Ⱳ":"W",
										"Ẍ":"X","Ẋ":"X",
										"Ý":"Y","Ŷ":"Y","Ÿ":"Y","Ẏ":"Y","Ỵ":"Y","Ỳ":"Y","Ƴ":"Y","Ỷ":"Y","Ỿ":"Y","Ȳ":"Y","Ɏ":"Y","Ỹ":"Y",
										"Ź":"Z","Ž":"Z","Ẑ":"Z","Ⱬ":"Z","Ż":"Z","Ẓ":"Z","Ȥ":"Z","Ẕ":"Z","Ƶ":"Z",
										"Ĳ":"IJ","Œ":"OE",
										"ᴀ":"A","ᴁ":"AE","ʙ":"B","ᴃ":"B","ᴄ":"C","ᴅ":"D","ᴇ":"E","ꜰ":"F","ɢ":"G","ʛ":"G","ʜ":"H","ɪ":"I","ʁ":"R","ᴊ":"J","ᴋ":"K","ʟ":"L","ᴌ":"L","ᴍ":"M","ɴ":"N","ᴏ":"O","ɶ":"OE","ᴐ":"O","ᴕ":"OU","ᴘ":"P","ʀ":"R","ᴎ":"N","ᴙ":"R","ꜱ":"S","ᴛ":"T","ⱻ":"E","ᴚ":"R","ᴜ":"U","ᴠ":"V","ᴡ":"W","ʏ":"Y","ᴢ":"Z",
										"á":"a","ă":"a","ắ":"a","ặ":"a","ằ":"a","ẳ":"a","ẵ":"a","ǎ":"a","â":"a","ấ":"a","ậ":"a","ầ":"a","ẩ":"a","ẫ":"a","ä":"a","ǟ":"a","ȧ":"a","ǡ":"a","ạ":"a","ȁ":"a","à":"a","ả":"a","ȃ":"a","ā":"a","ą":"a","ᶏ":"a","ẚ":"a","å":"a","ǻ":"a","ḁ":"a","ⱥ":"a","ã":"a","ꜳ":"aa","æ":"ae","ǽ":"ae","ǣ":"ae","ꜵ":"ao","ꜷ":"au","ꜹ":"av","ꜻ":"av","ꜽ":"ay",
										"ḃ":"b","ḅ":"b","ɓ":"b","ḇ":"b","ᵬ":"b","ᶀ":"b","ƀ":"b","ƃ":"b","ɵ":"o","ć":"c","č":"c","ç":"c","ḉ":"c","ĉ":"c","ɕ":"c","ċ":"c","ƈ":"c","ȼ":"c",
										"ď":"d","ḑ":"d","ḓ":"d","ȡ":"d","ḋ":"d","ḍ":"d","ɗ":"d","ᶑ":"d","ḏ":"d","ᵭ":"d","ᶁ":"d","đ":"d","ɖ":"d","ƌ":"d",
										"ı":"i","ȷ":"j","ɟ":"j","ʄ":"j","ǳ":"dz","ǆ":"dz",
										"é":"e","ĕ":"e","ě":"e","ȩ":"e","ḝ":"e","ê":"e","ế":"e","ệ":"e","ề":"e","ể":"e","ễ":"e","ḙ":"e","ë":"e","ė":"e","ẹ":"e","ȅ":"e","è":"e","ẻ":"e","ȇ":"e","ē":"e","ḗ":"e","ḕ":"e","ⱸ":"e","ę":"e","ᶒ":"e","ɇ":"e","ẽ":"e","ḛ":"e","ꝫ":"et",
										"ḟ":"f","ƒ":"f","ᵮ":"f","ᶂ":"f",
										"ǵ":"g","ğ":"g","ǧ":"g","ģ":"g","ĝ":"g","ġ":"g","ɠ":"g","ḡ":"g","ᶃ":"g","ǥ":"g",
										"ḫ":"h","ȟ":"h","ḩ":"h","ĥ":"h","ⱨ":"h","ḧ":"h","ḣ":"h","ḥ":"h","ɦ":"h","ẖ":"h","ħ":"h","ƕ":"hv",
										"í":"i","ĭ":"i","ǐ":"i","î":"i","ï":"i","ḯ":"i","ị":"i","ȉ":"i","ì":"i","ỉ":"i","ȋ":"i","ī":"i","į":"i","ᶖ":"i","ɨ":"i","ĩ":"i","ḭ":"i","ꝺ":"d",
										"ꝼ":"f","ᵹ":"g","ꞃ":"r","ꞅ":"s","ꞇ":"t","ꝭ":"is","ǰ":"j","ĵ":"j","ʝ":"j","ɉ":"j",
										"ḱ":"k","ǩ":"k","ķ":"k","ⱪ":"k","ꝃ":"k","ḳ":"k","ƙ":"k","ḵ":"k","ᶄ":"k","ꝁ":"k","ꝅ":"k",
										"ĺ":"l","ƚ":"l","ɬ":"l","ľ":"l","ļ":"l","ḽ":"l","ȴ":"l","ḷ":"l","ḹ":"l","ⱡ":"l","ꝉ":"l","ḻ":"l","ŀ":"l","ɫ":"l","ᶅ":"l","ɭ":"l","ł":"l","ǉ":"lj","ſ":"s","ẜ":"s","ẛ":"s","ẝ":"s",
										"ḿ":"m","ṁ":"m","ṃ":"m","ɱ":"m","ᵯ":"m","ᶆ":"m",
										"ń":"n","ň":"n","ņ":"n","ṋ":"n","ȵ":"n","ṅ":"n","ṇ":"n","ǹ":"n","ɲ":"n","ṉ":"n","ƞ":"n","ᵰ":"n","ᶇ":"n","ɳ":"n","ñ":"n","ǌ":"nj",
										"ó":"o","ŏ":"o","ǒ":"o","ô":"o","ố":"o","ộ":"o","ồ":"o","ổ":"o","ỗ":"o","ö":"o","ȫ":"o","ȯ":"o","ȱ":"o","ọ":"o","ő":"o","ȍ":"o","ò":"o","ỏ":"o","ơ":"o","ớ":"o","ợ":"o","ờ":"o","ở":"o","ỡ":"o","ȏ":"o","ꝋ":"o","ꝍ":"o","ⱺ":"o","ō":"o","ṓ":"o","ṑ":"o","ǫ":"o","ǭ":"o","ø":"o","ǿ":"o","õ":"o","ṍ":"o","ṏ":"o","ȭ":"o","ƣ":"oi","ꝏ":"oo","ɛ":"e","ᶓ":"e","ɔ":"o","ᶗ":"o","ȣ":"ou",
										"ṕ":"p","ṗ":"p","ꝓ":"p","ƥ":"p","ᵱ":"p","ᶈ":"p","ꝕ":"p","ᵽ":"p","ꝑ":"p",
										"ꝙ":"q","ʠ":"q","ɋ":"q","ꝗ":"q",
										"ŕ":"r","ř":"r","ŗ":"r","ṙ":"r","ṛ":"r","ṝ":"r","ȑ":"r","ɾ":"r","ᵳ":"r","ȓ":"r","ṟ":"r","ɼ":"r","ᵲ":"r","ᶉ":"r","ɍ":"r","ɽ":"r","ↄ":"c","ꜿ":"c","ɘ":"e","ɿ":"r",
										"ś":"s","ṥ":"s","š":"s","ṧ":"s","ş":"s","ŝ":"s","ș":"s","ṡ":"s","ṣ":"s","ṩ":"s","ʂ":"s","ᵴ":"s","ᶊ":"s","ȿ":"s","ɡ":"g","ᴑ":"o","ᴓ":"o","ᴝ":"u",
										"ť":"t","ţ":"t","ṱ":"t","ț":"t","ȶ":"t","ẗ":"t","ⱦ":"t","ṫ":"t","ṭ":"t","ƭ":"t","ṯ":"t","ᵵ":"t","ƫ":"t","ʈ":"t","ŧ":"t","ᵺ":"th","ɐ":"a","ᴂ":"ae","ǝ":"e","ᵷ":"g","ɥ":"h","ʮ":"h","ʯ":"h","ᴉ":"i","ʞ":"k","ꞁ":"l",
										"ɯ":"m","ɰ":"m","ᴔ":"oe","ɹ":"r","ɻ":"r","ɺ":"r","ⱹ":"r","ʇ":"t","ʌ":"v","ʍ":"w","ʎ":"y","ꜩ":"tz","ú":"u","ŭ":"u","ǔ":"u","û":"u","ṷ":"u","ü":"u","ǘ":"u","ǚ":"u","ǜ":"u","ǖ":"u","ṳ":"u","ụ":"u","ű":"u","ȕ":"u","ù":"u","ủ":"u","ư":"u","ứ":"u","ự":"u","ừ":"u","ử":"u","ữ":"u","ȗ":"u","ū":"u","ṻ":"u","ų":"u","ᶙ":"u","ů":"u","ũ":"u","ṹ":"u","ṵ":"u","ᵫ":"ue","ꝸ":"um",
										"ⱴ":"v","ꝟ":"v","ṿ":"v","ʋ":"v","ᶌ":"v","ⱱ":"v","ṽ":"v","ꝡ":"vy","ẃ":"w","ŵ":"w","ẅ":"w","ẇ":"w","ẉ":"w","ẁ":"w","ⱳ":"w","ẘ":"w","ẍ":"x","ẋ":"x","ᶍ":"x","ý":"y","ŷ":"y","ÿ":"y","ẏ":"y","ỵ":"y","ỳ":"y","ƴ":"y","ỷ":"y","ỿ":"y","ȳ":"y","ẙ":"y","ɏ":"y","ỹ":"y",
										"ź":"z","ž":"z","ẑ":"z","ʑ":"z","ⱬ":"z","ż":"z","ẓ":"z","ȥ":"z","ẕ":"z","ᵶ":"z","ᶎ":"z","ʐ":"z","ƶ":"z","ɀ":"z","ﬀ":"ff","ﬃ":"ffi","ﬄ":"ffl","ﬁ":"fi","ﬂ":"fl","ĳ":"ij","œ":"oe","ﬆ":"st",
										"ₐ":"a","ₑ":"e","ᵢ":"i","ⱼ":"j","ₒ":"o","ᵣ":"r","ᵤ":"u","ᵥ":"v","ₓ":"x"};
String.prototype.latinise=function(){
	return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){
		return Latinise.latin_map[a]||a;
	})
};

app.get('/oeuvre/:artiste/:id_creation', function (req, res) {
	
	var reg = new RegExp('[0-9]');
	if (!reg.test(req.params.id_creation)){
		return;
	} else {
		var id_creation = req.params.id_creation;
	
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
				' where gd.id_gallery = creations.id_creator and c.id = gd.id_gallery'+
				')'+
			' f) as gallery_details, '+
			' (select array_to_json(array_agg(row_to_json(h))) '+
			' from ('+
				' select e.id_exposition, e.date_debut, e.date_fin, e.adresse, e.url, e.t_p_x, e.t_p_y, e.t_d_x, e.e_name'+
				' from exposition_creations ec, expositions e '+
				' where ec.id_creation = '+req.params.id_creation+
				' and e.id_exposition = ec.id_exposition'+
				')'+
			' h) as creation_expositions '+
			"from creations where id_creation = "+req.params.id_creation+
			" and isvalid=true and isdeleted=false"+
			" limit 1)row";
			
			console.log("getCreationWithId : ", getCreationWithId);
		
			client.query(getCreationWithId,function(err, result) {
				done();
	
				if (err){
						console.error(err); 
						if (req.params.artiste.toLowerCase() != (result.rows[0].creationdetails.author_details[0].fname.toLowerCase()+"-"+result.rows[0].creationdetails.author_details[0].lname.toLowerCase()).latinise()){
							console.log("nocreationfound - 1");
							res.render('nocreationfound.html', { title: "Cartel - Erreur - L'oeuvre que vous cherchez n'existe pas", 
														url: req.params.artist
													});
						}
				}
				else{
					console.log("creationdetails",result);
					if (result.rows[0]){
						var mystr = (result.rows[0].creationdetails.author_details[0].fname.toLowerCase()+"-"+result.rows[0].creationdetails.author_details[0].lname.toLowerCase()).latinise();
						mystr = mystr.replace(/\s/g, '-');
						console.log("my str = ", mystr);
						console.log("req.params.artiste.toLowerCase()", req.params.artiste.toLowerCase());
						// on verifie que le nom de l'artiste est bon
						if (req.params.artiste.toLowerCase() != mystr){
							res.render('nocreationfound.html', { title: "Cartel - Erreur - L'oeuvre que vous cherchez n'existe pas", 
														url: req.params.artist
													});
						}else {
							// on met en forme les données a transmettre
							var url_creation = "https://s3.eu-central-1.amazonaws.com/cartelcreation/"+result.rows[0].creationdetails.url;
							var localdescription = "";
					
							for (var j = 0; j < Math.min(120 , result.rows[0].creationdetails.properties[0].cartel.length);j++){
								localdescription += result.rows[0].creationdetails.properties[0].cartel[j];
							}
							
							console.log("result.rows[0].creationdetails : ", result.rows[0].creationdetails);
							// on envoie les donées pour génération
							res.render('oeuvre.html', { title: 'Cartel - '+result.rows[0].creationdetails.author_details[0].fname+" "+result.rows[0].creationdetails.author_details[0].lname+' - '+result.rows[0].creationdetails.properties[0].title+' - '+result.rows[0].creationdetails.gallery_details[0].gname, 
														url: url_creation, 
														uri: '/oeuvre/'+req.params.artiste+"/"+req.params.id_creation,
														creation:result.rows[0].creationdetails,
														description:localdescription
													});
						}
					}
					else{
						console.log("nocreationfound - 3");
						res.render('nocreationfound.html', { 
							title: "Cartel - Erreur - L'oeuvre que vous cherchez n'existe pas", 
							url: req.params.artiste
						});
					}
				}
			});
  		});
  	}
});

app.get('/exposition/:galerie/:id', function (req, res) {
	
	var id_exposition =  req.params.id;
	var reg = new RegExp('[0-9]');
	if (!reg.test(req.params.id)){
		console.log("not the good uri :", req.params);
		return;
	} else {
	
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			
			try {
			var getExpositionWithId = 'select row_to_json(row) as expositionDetails from('+
                	// exposition details
                    'select id_exposition, e_name, adresse, e_description, date_debut, date_fin, url, t_p_x, t_p_y, t_d_x, height, width, '+
                    // galerie details
                    '(select array_to_json(array_agg(row_to_json(e))) '+
                        'from ('+
                            'select gname, g_adresse, g_tel, g_mail, g_site '+
                            'from gallery_details '+
                            'where id_gallery = expositions.id_gallery '+
                            ')'+
                        'e) as gallery_detail,'+
                    // exposition creations
                    '(select array_to_json(array_agg(row_to_json(i))) '+
                        'from ('+
                           	'select c.id_artiste, c.id_creation, c.url, c.isvalid, c.id_godfather, c.width, c.height, c.p_x, c.p_y, c.d_x, c.d_y, c.t_p_x, c.t_p_y, c.t_d_x, '+
                           		// galerie artistes
								'(select array_to_json(array_agg(row_to_json(f))) '+
									'from ('+
									   'select fname, lname, bio '+
										'from artiste_details '+
										'where id_creator = c.id_creator and id_artiste_gallery = c.id_artiste '+
										')'+
									'f) as gallery_artists '+					
                            'from creations c, exposition_creations ec '+
                            'where ec.id_exposition = expositions.id_exposition and c.id_creation = ec.id_creation '+ // set isvalid to true?
                            ')'+
                        'i) as exposition_creations '+
                    'from expositions '+
                    "where id_exposition = "+id_exposition+
                    " and isvalid=true "+
                ' limit 1)row';
        	} catch (err){
        		console.log(err);
        	}
			console.log("getExpositionWithId : ", getExpositionWithId);
			
			client.query(getExpositionWithId,function(err, result) {
				done();
				console.log("coucou", result.rows);
				if (err){
					console.log("err 1 : ", err);
					// afficher page d'erreur
					return;
				} else {
					if (result.rows[0]){
						// on vérifie que le format d'url est bon
						var myGalerieStr = result.rows[0].expositiondetails.gallery_detail[0].gname.toLowerCase();
						myGalerieStr = myGalerieStr.replace(/\s/g, '-');
						console.log("myGalerieStr, ", myGalerieStr);
						if (req.params.galerie.toLowerCase() == myGalerieStr){
							console.log("exposition",result.rows[0].expositiondetails);
							
							res.render('exposition.html', { title: 'Exposition - '+result.rows[0].expositiondetails.gallery_detail[0].gname +' - '+ result.rows[0].expositiondetails.e_name,  
															description: result.rows[0].expositiondetails.e_description,
															exposition:result.rows[0].expositiondetails, 
															url:'https://s3.eu-central-1.amazonaws.com/cartelexposition/'+result.rows[0].expositiondetails.url,
															uri:'/exposition/'+req.params.galerie+'/'+req.params.id
														});
						} else {
							// sinon on affiche la page d'erreur
							console.log("error 2");
						}
					}else{
						
						console.log("nocreationfound - 3");
						res.render('nocreationfound.html', { 
							title: "Cartel - Erreur - L'oeuvre que vous cherchez n'existe pas", 
							url: req.params.artiste
						});
					}
				}
			});
		});
	}
	
	
});

app.get('/galerie/:galerie/:id', function (req, res) {
	
	var reg = new RegExp('^[0-9]$');
	if (!reg.test(req.params.id)){
  		console.log("not the good uri");
  		return;
  	}
  	
	res.render('galerie.html', { title: 'Hey', message: 'Hello there!', description: 'une description très intéressante', galerie:req.params.galerie, exposition:req.params.exposition});
});

// HOME
app.get('/', function(request, response) {
	var pathname = conf.http.tmpindex;
	response.writeHead(200, {"Pragma": "public",
				  'Content-Type': 'text/html'});
	try{
		response.end(fs.readFileSync(conf.http.www + pathname));
	}catch(e){
		//response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(e+fs.readFileSync(conf.http.error['404']));
	}
});

// HOME
app.get('/nav', function(request, response) {
	var pathname = conf.http.nav;
	response.writeHead(200, {"Pragma": "public",
				  'Content-Type': 'text/html'});
	try{
		response.end(fs.readFileSync(conf.http.www + pathname));
	}catch(e){
		//response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(e+fs.readFileSync(conf.http.error['404']));
	}
});

// HOME
app.get('/footer', function(request, response) {
	var pathname = conf.http.footer;
	response.writeHead(200, {"Pragma": "public",
				  'Content-Type': 'text/html'});
	try{
		response.end(fs.readFileSync(conf.http.www + pathname));
	}catch(e){
		//response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(e+fs.readFileSync(conf.http.error['404']));
	}
});


// HOME
app.get('/home', function (request, response) {
	var pathname = conf.http.tmpindex;
		response.writeHead(200, {"Pragma": "public",
				  'Content-Type': 'text/html'});
	try{
		response.end(fs.readFileSync(conf.http.www + pathname));
	}catch(e){
		//response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(e+fs.readFileSync(conf.http.error['404']));
	}
});

// ARTICLE
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


app.get('/test', function (request, response) {
	var pathname = conf.http.test;
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


app.get('/guide', function (request, response) {
	var pathname = conf.http.guide;
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


app.get('/concept', function (request, response) {
	var pathname = conf.http.concept;
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

app.get('/chroniques', function (request, response) {
	var pathname = conf.http.chroniques;
		response.writeHead(200, {"Pragma": "public",
				  'Content-Type': 'text/html'});
	try{
		response.end(fs.readFileSync(conf.http.www + pathname));
	}catch(e){
		//response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(e+fs.readFileSync(conf.http.error['404']));
	}
});

app.get('/galeries', function (request, response) {
	var pathname = conf.http.galeries;
		response.writeHead(200, {"Pragma": "public",
				  'Content-Type': 'text/html'});
	try{
		response.end(fs.readFileSync(conf.http.www + pathname));
	}catch(e){
		//response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(e+fs.readFileSync(conf.http.error['404']));
	}
});

app.get('/oeuvres', function (request, response) {
	var pathname = conf.http.oeuvres;
		response.writeHead(200, {"Pragma": "public",
				  'Content-Type': 'text/html'});
	try{
		response.end(fs.readFileSync(conf.http.www + pathname));
	}catch(e){
		//response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(e+fs.readFileSync(conf.http.error['404']));
	}
});


app.get('/conditions/cgu', function (request, response) {
	var pathname = conf.http.cgu;
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



// MENTIONS LEGALES
app.get('/mentions-legales', function (request, response) {
	var pathname = conf.http.mentionsLegales;
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

app.get('/newsletter', function (request, response) {
	var pathname = conf.http.newsletter;
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

app.get('/agenda', function (request, response) {
	var pathname = conf.http.agenda;
	try{
		response.end(fs.readFileSync(conf.http.www + pathname));
	}catch(e){
		//response.writeHead(404, {'Content-Type': 'text/html'});
		response.end(e+fs.readFileSync(conf.http.error['404']));
	}
});

	app.post('/searchEvents.json', function (request, response) {
		console.log("post searchEvents.json");
		var results = [];
		
		var myDate = new Date();
		var today = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
		
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			var getAgenda = "select row_to_json(row) as evenement from("+
								" select id, nom, description, date_debut, date_fin, url, adresse, type, priority "+
								" from evenements where isdeleted='false' AND ("+
								" strpos(lower(nom), lower('"+request.query.str+"')) >0 OR"+
								" strpos(lower(nickname), lower('"+request.query.str+"')) >0 OR"+
								" strpos(lower(adresse), lower('"+request.query.str+"')) >0 OR"+
								" strpos(lower(type), lower('"+request.query.str+"')) >0) AND"+
								" date_fin >= '"+request.query.date_debut+
								"' order by date_fin > '"+today
								+"' desc, priority asc, date_fin asc, date_debut desc)row";
			console.log("getAgenda : ", getAgenda);
			client.query(getAgenda,function(err, result) {
				done();
		
				if (err){
				 console.error(err); response.send("Error " + err); }
				else{
				if (result){
					console.log("agenda search has result ");
					for (var i=0; i<result.length;i++){
						console.log(JSON.stringify(rows[i]));
					}
					response.send(result.rows); 
				}
		   }
	   
		});
	  });
	});
	
	
// AGENDA 
// GET FORM 
	app.get('/agenda.json', function (request, response) {
		console.log("get agenda.json");
		var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			
			var date_debut =  request.query.date_debut;
			var date_fin = request.query.date_fin;
			var myDate = new Date();
			var today = myDate.getFullYear()+"-"+(myDate.getMonth()+1)+"-"+myDate.getDate();
			var getAgenda = "select row_to_json(row) as evenement from("+
								" select id, nom, description, date_debut, date_fin, url, adresse, type, priority "+
								" from evenements where isdeleted='false' and "+
								" (date_debut >= '"+date_debut+
								"' and date_debut <= '"+date_fin+
								"') or (date_fin >= '"+date_debut+
								"' and date_fin <= '"+date_fin+
								"' ) or (date_debut <= '"+date_debut+
								"' and date_fin >= '"+date_fin+
								"' ) order by date_fin > '"+today
									+"' desc, priority, date_fin)row";
			
			console.log("getAgenda : ", getAgenda);
			
			client.query(getAgenda,function(err, result) {
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

// ROBOTS.TXT
app.get('/robots.txt', function(request, response) {
	var pathname = conf.http.robots;
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

// SITEMAP
app.get('/sitemap', function (request, response) {
	var pathname = conf.http.sitemap;
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

// 
// FORM //
//
// POST ANSWRERS
	app.post('/answer', function(request, response) {
		console.log("answer started : ");
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			var insertAnswer = "INSERT into user_answers(sessionid, id_question, id_answer, answer_time) VALUES('"+request.query.uid+"',"+request.query.qid+","+request.query.aid+",'"+new Date().toUTCString()+"')";
			client.query(insertAnswer,function(err, result) {
			done();
				if (err){
					console.error(err); 
					response.send("Error " + err); }
				else{
					response.send("OK");
				}
			});
		});
	});

	// POST USER
	app.post('/user', function(request, response) {
		var count;
		var creationDate = new Date().toUTCString();
	
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			// test exist
			var langId = (request.query.lang == "fr")?1:2;
			var resultString;
			var insertUser = "insert into users(mail, session, lang, useragent, creation_date, modification_date) select '"
								+request.query.mail+"'"
								+",'"+request.query.session
								+"',"+langId
								+",'"+request.query.ua
								+"','"+creationDate
								+"','"+creationDate
								+"' where not exists(select session,mail from users where session ='"
									+request.query.session
									+"'  and mail ='"
									+request.query.mail+ "')";
		
			client.query(insertUser, function(err, result) {
				done();
				if (err){
					console.error(err); 
					response.send("User Mgmt - Error on select : " + err);
				}else {
					count = result.rows.length;
					console.log("count : ", count);
					if (count == 0){
						resultString = "NOK";					
					}
					else{
						resultString = "OK";
					}
					response.send(insertUser);
				}	
			});
		});
	});

	// GET FORM 
	app.get('/form.json', function (request, response) {
		var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {

			client.query('select row_to_json(row) as question from (select id, 0 as isReadable, description, multiple, (select array_to_json(array_agg(row_to_json(d)))from (select id_answer, description, id_question_next from answers where id_question = questions.id order by id asc) d) as answers from questions order by id)row',function(err, result) {
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

	// REGIONS
	app.get('/regions.json', function (request, response) {
		console.log("get regions.json");
		var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {

			client.query('select row_to_json(row) as regions from(select code, name from french_region)row', function(err, result) {
			done();
		
			if (err){ 
				console.error(err); response.send("Error " + err); }
			response.send(result.rows); 
			});
		});
	});

	// COUNTRY
	app.get('/country.json', function (request, response) {
		console.log("get country.json");
		pg.connect(app.get('dbUrl'), function(err, client, done) {

			client.query('select row_to_json(row) as country from(select id, name from country order by name)row', function(err, result) {
			done();
		
			if (err){ 
				console.error(err); response.send("Error " + err);
			}
			response.send(result.rows); 
			});
		});
	});

	// QUESTIONS LEFT
	app.get('/questionsleft.json', function (request, response) {
		console.log("get questionsleft.json");
		var results = [];
		pg.connect(app.get('dbUrl'), function(err, client, done) {
			client.query('select row_to_json(row) as questionsleft from(select * from question_left order by id_question)row', function(err, result) {
			done();
		
			if (err){ 
				console.error(err); response.send("Error " + err); }
			response.send(result.rows); 
			});
		});
	});



app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// Handle 404
app.use(function(req, res) {
  	res.render('404', { status: 404, url: conf.http.error.AOA });
});

// Handle 500
//app.use(function(err, req, res, next) {
//    res.render('500',{
//      status: err.status || 500, error: err });
//});
