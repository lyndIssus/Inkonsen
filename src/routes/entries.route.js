import express from "express"
const router = new express.Router()
import taskController from '../controller/task.controller.js'
import { body } from "express-validator"
const Controller = new taskController()


router.get('/entries', Controller.listentries)
router.get('/entries/new', Controller.renderNewForm)
router.get("/entries/:id/update", Controller.renderEditForm);
router.get('/entries/credits',Controller.listCredits)
router.get('/entries/debits',Controller.listDebits)

router.get("/entries/:id/delete", function (req, res) {
    const id = req.params.id;
    console.log(id);
    res.render("entry_delete", { id });
  });

router.get("/entries/credits/highest",Controller.listCreditAsc)
router.get("/entries/debits/highest",Controller.listDebitAsc)
router.get("/entries/credits/lowest",Controller.listCreditDesc)
router.get("/entries/debits/lowest",Controller.listDebitDEsc)
router.get('/entries/search', Controller.renderSearchForm);
router.get('/entries/graph/:month',Controller.buildGraph)



router.post('/entries/new', body('date').trim().notEmpty(),body('description').trim().notEmpty(),body('value').notEmpty(),Controller.createCredito)
router.post('/entries/:id/update',Controller.updateCredito) 
router.post('/entries/:id/delete' , Controller.deleteTask)
router.post('/entries/search',Controller.searchTransactions);

router.get("/entries/graph/:month", Controller.buildGraph);   
export default router