import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../database/model/user.model.js";
import { where } from "sequelize";

class LoginController {

  renderLogin(req, res) {
    res.render("login");
  }

  renderRegister(req, res) {
    res.render("register");
  }

  async login(req, res) {
    const result = validationResult(req);
    if(result.isEmpty()){
    const Email = req.body.email;
    const Password = req.body.password;
    User.findOne( {where:{email:Email}}).then(user =>{
      if(!user){
        
        res.redirect("/login")
      }
      bcrypt.compare(Password,user.password,(err,data)=>{
        if(err){
          res.redirect("/login")
          
        }if(data){
          res.redirect("/entries")
        }else{
          res.redirect("/login")
        }
      })
    } )
  }else{
    res.redirect("/login");
  }


}

async register(req, res) {
  const SALT_ROUNDS = 10;
  const result = validationResult(req);
  if (result.isEmpty) {
    const name = req.body.nome;
    const email = req.body.email;
    const password = req.body.password;

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({ name, email, password: hash });
    console.log(user);
    return res.redirect("/login");
  }
  res.render("/register");
}
}


export default LoginController;
