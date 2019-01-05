const express = require('express'),
      bodyParser = require('body-parser'),
      Sequelize = require('sequelize')

const sequelize = new Sequelize('quyzygy_db', 'root', '',{
  dialect : 'mysql',
  host: 'http://quyzygy.us/register',
  define : {
    timestamps : false
  }
})

const User = sequelize.define('users', {
  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
  firstName : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      len : [3,20]
    }
  },
  lastName : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      len : [3,20]
    }
  },
  email : {
    type : Sequelize.STRING,
    allowNull : false,
    validate : {
      isEmail : true
    }
  },
  passwordHash : {
      type : Sequelize.STRING,
      allowNull : false
  },
  userType : {
      type : Sequelize.STRING,
      allowNull : false,
    }
})

const app = express()
app.use(bodyParser.json())
app.use(express.static('../frontend/build'))

app.get('/create', async (req, res) => {
	try{
		await sequelize.sync({force : true})
		res.status(201).json({message : 'created'})
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/users', async (req, res) => {
	try{
		let pageSize = 10
		let params = {
			where : {},
			order : [['lastName', 'ASC'], ['firstName', 'ASC']]
		}
	    if (req.query){
	    	if (req.query.filter){
	    		params.where.lastName = {
                	[Op.like] : `%${req.query.filter}%`
                }
	    	}
	    	if (req.query.pageSize){
	    		pageSize = parseInt(req.query.pageSize)
	    	}
	    	if (req.query.pageNo){
	    		params.offset = parseInt(req.query.pageNo) * pageSize
	    		params.limit = pageSize
	    	}
	    }
		let users = await User.findAll(params)
		res.status(200).json(users)
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.post('/users', async (req, res) => {
	try{
		if (req.query.bulk && req.query.bulk == 'on'){
			await User.bulkCreate(req.body)
			res.status(201).json({message : 'created'})
		}
		else{
			await User.create(req.body)
			res.status(201).json({message : 'created'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.get('/users/:id', async (req, res) => {
	try{
		let User = await User.findById(req.params.id)
		if (User){
			res.status(200).json(User)
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.put('/users/:id', async (req, res) => {
	try{
		let User = await User.findById(req.params.id)
		if (User){
			await User.update(req.body)
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})

app.delete('/users/:id', async (req, res) => {
	try{
		let User = await User.findById(req.params.id)
		if (User){
			await User.destroy()
			res.status(202).json({message : 'accepted'})
		}
		else{
			res.status(404).json({message : 'not found'})
		}
	}
	catch(e){
		console.warn(e)
		res.status(500).json({message : 'server error'})
	}
})


app.listen(8080)