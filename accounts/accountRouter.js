const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

//db helper start
const Accounts = {
    getAll(){
        //return db.select('id','title','contents').from ('posts')
        return db('accounts') //shorthand to do the same as above 
        //return db.select('*') from ('posts') also works! 
        //return db.select().from ('posts') also works! 
    },
    getById(id){
        return db('accounts').where({id})//.first()
    },
    createAccount(account){
        return db('accounts').insert(account)
    },

    //using async await on this one.
     updateAccount(id, account){
           return db('accounts').where({id}).update(account)
    },

    delete(id){
        return db('accounts').where ({id}).del()
    },
}

//dp helpers end 
//1
router.get('/', (req, res) => {
    Accounts.getAll()
    .then(data=>{
        res.json(data)
    })
    .catch(error=>{
        //res.json({message:'oops, something went wrong'})//production 
        res.json({error:error.message}) //development
    })
    });
    
    //2
    router.get('/:id', (req, res) => {
    Accounts.getById(req.params.id)
    .then(data=>{
        res.json(data[0])
        //res.json(data) if we do .first above
    })
    .catch(error=>{
        res.json({error:error.message}) //development
    })
    });
    
    //3
    router.post('/', (req, res) => {
        Accounts.createAccount (req.body)
        .then(([id])=>{
            return Accounts.getById(id).first() //uses knex to preform insertion using raw material which returns a promise that gives us an array of id, us taht to return another promise and then send back the full data
        })
        .then(data=>{
            res.json(data)
        })
        .catch(error=>{
            res.json({error:error.message}) 
        })
    });
    
    //4
    router.put('/:id', async (req, res) => {
        try{
            await Accounts.updateAccount(req.params.id, req.body)
            const updatedAccount = await Accounts.getById(req.params.id).first()
            res.json(updatedAccount)
        }catch(error){
            res.json({message:error.message})
        }
    });
    

    //5
    router.delete('/:id', async(req, res) => {
        try{
            const deletedRows = await Accounts.delete(req.params.id)
            if (!deletedRows){
                res.json({message: 'no post with given id'})
            }else{
                res.json({message:'post deleted successfully!'})
            }
        }catch(error){
            res.json({message:error.message})
        }
    });
    
    module.exports = router;