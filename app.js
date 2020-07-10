var express = require("express");
var app = express()
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/event", {useNewUrlParser: true, useUnifiedTopology:true});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

var studentSchema = new mongoose.Schema({
	name: String,
	rrn: String,
	department: String,
	phone: String,
	emaill: String,
	event: String,
	about: String
})

var Student = mongoose.model("Student", studentSchema);

// Student.create({
// 	name: "stee",
// 	rrn: "171371601031",
// 	department: "bsc",
// 	phone: "9999999",
// 	email: "steestephen#@gmail.coom",
// 	event: "fashion",
// 	about: "good"
// },function(err,data){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log(data);
// 	}
// })


app.get("/",function(req,res){
	res.redirect("/home");
})
app.get("/home",function(req,res){
	res.render("index");
})
app.get("/home/contact",function(req,res){
	res.render("contactus")
})
app.get("/home/eventlist",function(req,res){
	res.render("eventlist");
})

app.get("/home/winner",function(req,res){
	res.render("winners");
})

app.get("/home/register",function(req,res){
	res.render("register");
})

app.post("/home",function(req,res){
	
	Student.create(req.body.student, function(err,data){
		if(err){
			res.redirect("/home/register")
		}else{
			console.log(data);
			res.redirect("/home")
		}
	})
})

app.get("/admin",function(req,res){
	Student.find({},function(err, student){
		if(err){
			res.redirect("back");
		}else{
			res.render("admin", {student: student})
		}
	})
})

app.listen(process.env.PORT || 3000, process.env.IP, function(){
	console.log("server starts");
})