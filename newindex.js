const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/bye', (req, res) => {
    res.send('bye bye World!')
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

//app.use(express.json())
app.post('/',(req, res)=>{
    let data =req.body
    //res.send('Post request'+data.name)


});


app.post('/login',(req,res)=>{
    let data =req.body;
    res.send(
      login(
        data.username,
        data.password
      )
    )
});


  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

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
});