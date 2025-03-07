
import { Op } from "sequelize";
import credito from "../database/model/credito.model.js";
import sequelize from "../database/db.js";

class TaskController {

renderSearchForm(req,res){
  res.render("search.ejs",{})
}
renderNewForm(req, res){
  res.render("new_entry.ejs", {isUpdate: false,message: "Nova entrada" });
}

 async renderEditForm(req, res) {
  const id = req.params.id;
  const task = await credito.findByPk(id);
  res.render("new_entry.ejs", { isUpdate: true, task,message: "Atualizar entrada" });
 }

  async createCredito(req, res) {

    const value = req.body.value
    const description = req.body.description
    const date = req.body.date

    const task = await credito.create({date: date, description, value:value})
    console.log(task)

    res.redirect("/entries");
  }

  async updateCredito(req, res) {
    const id = req.body.id
    const value = req.body.value
    const description = req.body.description
    const date = req.body.date

    await credito.update({value:value, description, date:date}, { where: { id } })

    res.redirect("/entries");
  }

  async listentries(req, res) {
    const creditos = await credito.findAll()
    res.render("entries.ejs", { creditos });
  }
  async listCredits(req, res) {
    const creditos = await credito.findAll({where: {value:{
      [Op.gt]:0
    }}
    })
    res.render("entries.ejs", { creditos });
  }
  async listDebits(req, res) {
    const creditos = await credito.findAll({where: {value:{
      [Op.lt]:0
    }}
    })
    res.render("entries.ejs", { creditos });
  }
  
  async deleteTask(req,res){
    const Id = req.params.id;
    credito.destroy({where : {id:Id}})
    const creditos = await credito.findAll()
    res.render("entries.ejs", { creditos });
  }

  async listCreditAsc(req,res){
    const creditos = await credito.findAll({order: [['value','DESC']],where: {value:{
      [Op.gt]:0
    }}
    })
    res.render("entries.ejs", { creditos });
  }
  async listCreditDesc(req,res){
    const creditos = await credito.findAll({order: [['value','ASC']],where: {value:{
      [Op.gt]:0
    }}
    })
    res.render("entries.ejs", { creditos });
  }
  async listDebitAsc(req,res){
    const creditos = await credito.findAll({where: {value:{
      [Op.lt]:0
    }},order: [['value', 'ASC']]
    })
    res.render("entries.ejs", { creditos });
  }
  async listDebitDEsc(req,res){
    const creditos = await credito.findAll({where: {value:{
      [Op.lt]:0
    }},order: [['value', 'DESC']]
    })
    res.render("entries.ejs", { creditos });
  }
  
  async searchTransactions(req, res) {
    const mes = req.body.mes;
    const tipo = req.body.tipo;
    let creditos = await credito.findAll();
    if(mes!= -1){
    const mesInicio = new Date(2024, mes, 1);
    const mesFim = new Date(2024, mes, 30);
    if(tipo == 1){
        creditos = await credito.findAll({ where:{date: {[Op.between]: [mesInicio,mesFim]}, value:{
          [Op.gt]:0
        } }});
        
      }if(tipo == 2){
        creditos = await credito.findAll({ where:{date: {[Op.between]: [mesInicio,mesFim]}, value:{
          [Op.lt]:0
        } }});
      }
      
    }else{
      const dataInicio = req.body.dataInicio;
      const dataFim = req.body.dataFim;
      if(tipo == 1){
        creditos = await credito.findAll({ where:{date: {[Op.between]: [dataInicio,dataFim]}, value:{
          [Op.gt]:0
        } }});
        
      }if(tipo == 2){
        creditos = await credito.findAll({ where:{date: {[Op.between]: [dataInicio,dataFim]}, value:{
          [Op.lt]:0
        } }});
      }
    }
    res.render("entries.ejs", { creditos });
  }
  
  async buildGraph(req,res){
    const mes = req.params.month;
    const mesInicio = new Date(2024, mes-1, 1);
    const mesFim = new Date(2024, mes-1, 30);
    
    const creditos = await credito.findAll({ where:{date: {[Op.between]: [mesInicio,mesFim]}, value:{
          [Op.gt]:0
        } }});
        
      
    const debitos = await credito.findAll({ where:{date: {[Op.between]: [mesInicio,mesFim]}, value:{
          [Op.lt]:0
        } }});
    const totalReceitas = creditos.reduce((acc, credito) => acc + parseFloat(credito.value), 0);
    const totalDespesas = debitos.reduce((acc, debito) => acc + parseFloat(debito.value), 0);
      
      
    
    res.render("graph.ejs", { totalReceitas,totalDespesas,mes });
  }
}
  


  

export default TaskController;