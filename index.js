const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())

function userLogger(req, res, next) {    //auth1
  console.log("logger called")
  if (true) {
    res.json({ success: false })
  }
  next();
}

app.get("/", (req, res) => {
  res.send("welcome to auth session")
})

/*app.get('/user', userLogger, (req, res) => {       //auth 1
  res.json({ name: "Tanay", age: 32, pincode: "560102" })
});*/

/*function authVerify(req, res, next) {       //auth2
  const token = req.headers.authorization;
  if (token === "abcdefghi") {
    return next();
  } res.status(401).json({ message: "Unauthorised access, please add the token"}) 
}

app.get('/user', authVerify, (req, res) => {        //auth2
  res.json({ name: "Tanay", age: 31, pincode: "560102" })
});

app.get('/cart', authVerify, (req, res) => {      //auth2
  res.json({ cart: []})
})*/

function authVerify(req, res, next) {           //auth3
  const token = req.headers.authorization;
  if (token === "abcdefghi") {
    req.user = { id: '123', name: "Tanay"}
    return next();
  } res.status(401).json({ message: "Unauthorised access, please add the token"}) 
}


app.get('/orders', authVerify, (req, res) => {       //auth3
  console.log(req.user)
  res.json([{ item: "goggles"}])
});

app.get('/cart', authVerify, (req, res) => {       //auth3
  res.json({ cart: []})
})

app.post('/login', (req, res) => {               //auth2 and auth3
  // read username/password from the body
  // check in array/db if the username password pair is correct
  // if yes, then send them a token { token: "abcdefghi"}

  // if not, then send them a 401 response
})

app.listen(3000, () => {
  console.log('server started');
});