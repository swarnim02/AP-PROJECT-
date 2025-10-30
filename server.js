let { PrismaClient } = require("@prisma/client");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let app = express();
app.use(express.json());
let prisma = new PrismaClient();

app.post("/signup", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  if (username && email && password) {
    let a = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });
    if (a) {
      res.status(400).send("this user already exists");
    } else {
      let b = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: await bcrypt.hash(password, 10),
        },
      });
      res.status(200).json(b);
    }
  } else {
    res.status(400).send("we need everything for details");
  }
});

app.post('/login', async(req, res) => {
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password 
    if ((username && password) || (email && password)){
        let user = await prisma.user.findFirst({
            where : {
                OR : [
                    {username : username},
                    {email : email}
                ]
            }
        })

        if (!user){
            res.status(400).json({message : "Signup First!"})
        }
        else{
            let validate = await bcrypt.compare(password, user.password)
            if (validate){
                let token = jwt.sign({username : user.username, role : user.role}, "Rps@220068", {expiresIn : "5h"})
                res.status(200).json({"token" : token})
            }
            else{
                res.status(400).json({message : "Invalid Password"})
            }
        }
    }else {
        res.status(400).json({message : "All Fields Required!"})
    }
})
