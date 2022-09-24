const express = require('express')
const app = express()


const csrf = require('csrf')

const csrfMiddleware = csrf({cookie:true})
const bodyParser = require('body-parser')

const admin = require('firebase-admin')

var serviceAccount = require("./serviceAccountKey.json");
const cookieParser = require('cookie-parser')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://investmemt-d2a29-default-rtdb.firebaseio.com"
});

app.use(bodyParser.json())
app.use(cookieParser())
app.use(csrfMiddleware)

app.all("*", (req,res,next) => {
    res.cookie("XSRF-TOKEN", req.csrfToken)
    next()
})

app.post('/sessionLogin', (req,res) => {
    const idToken = req.body.idToken.toString()


    const expiresin = 60*60*24*5*1000

    admin
    .auth()
    .createSessionCookie(idToken, {expiresIn})
    .then(
        (sessionCookie) => {
            const options = {maxAge:expiresin, httpOnly: true}

            res.cookie("session", sessionCookie, options)

            res.end(JSON.stringify({status: "sucess"}))
        },
        (error) => {
            res.status(401).send("Unauthorized request")
            res.redirect('/home.html')
        }
    )
})






























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