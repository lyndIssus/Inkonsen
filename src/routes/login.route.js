import express from "express"
const routes = new express.Router()

import { body }  from "express-validator";
import loginController from "../controller/login.controller.js";
const Controller = new loginController()



routes.get('/login',Controller.renderLogin)

routes.get('/register',Controller.renderRegister)

routes.post('/login', Controller.login)

routes.get("/entries/:id/delete", function (req, res) {
    const id = req.params.id;
    console.log(id);
    res.render("task_delete", { id });
  });
routes.get("/entries/:current/delete")  

routes.post('/register', body("nome").notEmpty().trim(),
body("email").notEmpty().isEmail().trim(),
body("password").notEmpty().trim(), Controller.register)    
export default routes