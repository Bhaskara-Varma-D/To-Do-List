//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
let items = [];
let workItems = [];
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.get("/", function(req,res){
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    let day = today.toLocaleDateString("en-US", options);
    res.render("list", {listTitle: day, newListItems: items});
});
app.post("/", function(req,res){
    if(req.body.list === "Work"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    items.push(req.body.newItem);
    res.redirect("/");
});
app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List", newListItems: workItems });
});
app.post("/work", function(req,res){
    workItems.push(req.body.newItem);
    res.redirect("/work");
})
app.listen(3000, function(){
    console.log("Server started on port 3000");
});