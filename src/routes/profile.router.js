import express from "express"
const routes = new express.Router()




routes.get('/profile', (req, res)=> {
    res.send('Seu Perfil aqui!')
  })
  

routes.post('/profile', (req, res)=> {
    res.send('Pedido de post profile realizado!')
  })

export default routes  