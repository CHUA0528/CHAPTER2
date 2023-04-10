const express = require('express')
const app = express()
const port = 3000
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')




app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/bye', (req, res) => {
    res.send('bye bye World!')
  })

  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })

//Define

  let users = [
    {
        username: "soo",
        password:"password",
        name:"Ali",
        email:"ali@student.utem.edu.my"
    },
    {
        username:"CHUA",
        password:"123456",
        name:"CCF",
        email:"choo27283@student.utem.edu.my"
    }
]

function login(username,password){
  console.log("someone try to login with",username,password)
  /*users.find(element=>{
      console.log(element)

  })*/

  let matched=users.find(element=>element.username==username)
  if(matched)
  {
      if(matched.password==password)
      {
          return matched
      }
      else
      {
          return "Password not matched"
      }
  }
  else
  {
      return "Username not found"
  }
}


function register(newusername,newpassword,newname,newemail){
  //To do:Check
  let found=users.find(element=>element.username==newusername) 
  if (found)
  {
      return "username is exist"

  }

  /*bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(newpassword, salt, function(err, hash) {
      // Store hash in your password DB.
      //console.log(hash)
  });*/


  users.push({
      username:newusername,
      password:newpassword,
      name:newname,
      email:newemail
  })
}

function generateToken(userProfile){
  return jwt.sign(userProfile,'secret',{expiresIn:60*60});
}

function verifyToken(req,res,next){
  let header=req.headers.authorization
  console.log(header)
  let token=header.split(' ')[1]

  jwt.verify(token,'secret',function(err,decoded){
    if(err){
      res.send("Invalid Token")}
    console.log(decoded)
    req.user=decoded
    next()
  });
  
};


app.use(express.json())

app.post('/hello',(req, res)=>{
    let data =req.body
    res.send('Post request'+data.name)


});


app.post('/login',(req,res)=>{
    let data =req.body
   /* res.send(
      login(
        data.username,
        data.password
      )
    );*/
    const user=login(data.username,data.password)
    res.send(generateToken(user))
});


app.post('/register',(req,res)=>{
  let data =req.body

  res.send(
    register(
      data.username,
      data.password,
      data.name,
      data.email
    )
  );

/*bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(data.password, salt, function(err, hash) {
      // Store hash in your password DB.
      console.log(hash)
  });
})*/

});

app.get('/sheesh',verifyToken,(req,res)=>{console.log(req.user)
  res.send('Hello World!')})


