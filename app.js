//jshint esversion:6
require('dotenv').config();// this is to securely store 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");// building a a user DATABASE
const app = express();
console.log(process.env.API_KEY);
app.use(express.static("public"));
app.set('view engine', 'ejs');
const encrypt=require("mongoose-encryption");
app.use(bodyParser.urlencoded({
extended: true}));
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser: true})// default port to connect to our Database
// here we set up user Database by creating first a simple user Schema check  commented  
/*const userSchema={
	//2FIELDS
	email: String,
	password:String
	
	
	};*/
	// for Database ENCRYPTION  ,userSchema.plugin(encrypt, { encryptionKey: encKey, signingKey: sigKey });
	const userSchema = new mongoose.Schema({
	//2FIELDS
	email: String,
	password:String
	
	
	});
	// this is a string to be Encrypted
	//Encrypted only password

	userSchema.plugin(encrypt, { secret: process.env.SECRET,encryptedFields:["password"]});
	//user model
	
	const User = new mongoose.model("User",userSchema);
	
	
/*home page*/
app.get("/",function(req, res){
	
	res.render("home");
	
	
	
	});
	
	// login page
	app.get("/login",function(req, res){
	
	res.render("login");
	
	
	
	});
	// register  page
	
	app.get("/register",function(req, res){
	
	res.render("register");
	
	
	
	});
	app.post("/register",function(req,res){
		
		// here we create user info via form name on ejs html register
		const newUser = new User({
			email:req.body.username,
			password: req.body.password
			
			});
		
		newUser.save(function(err){
			
			if(err){
				console.log(err)
				
				
				}else{
					res.render("secrets");
					
					}
			});
		
		});
	app.post("/login",function(req,res){
		const username = req.body.username;
		const password = req.body.password;
		
		User.findOne({email:username},function(err ,foundUser){
			
			
			if(err){
				
				console.log(err);
				
				}else{
					
					if(foundUser){
						
						if(foundUser.password===password){
							
							res.render("secrets");
							
							}
						
						}
					}
			
			});
		
		});
	
	app.listen(3000,function(){
		
		console.log("server started on port 3000");
		
		
		
		});