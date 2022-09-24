const express = require('express')
const app = express()


const csrf = require('csrf')
 

const bodyParser = require('body-parser')

const admin = require('firebase-admin')

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://investmemt-d2a29-default-rtdb.firebaseio.com"
});
app.engine("html", require('ejs').renderFile)



app.get('/', (req,res) => {
    res.render('login.html')
})


app.get('/profile', (req,res) => {
    res.render("portfoilo.html")
})
app.listen(5000, () =>{
    console.table("Listening on port")
})