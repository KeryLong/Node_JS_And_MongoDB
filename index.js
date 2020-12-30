// const startupDebugger = require('debug')('app:startup');
// const dbDebugger = require('debug')('app:db');
const config = require('config');
 
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require ('joi');
const express = require('express');
const logger = require('./logger');
const app = express();

 console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //use this to find out what environment we are in
console.log(`app: ${app.get('env')}`); //This does the same as above but will always return development if env isn't defined.
//in terminal, use "export NNODE_ENV=environment" to set the current environment
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(helmet());

if (app.get('env') === 'development'){
app.use(morgan('tiny'));
// startupDebugger('morgan enabled');
app.use(logger);

//db work
// dbDebugger('connected to the database')

app.use(function(req,res,next){
    console.log('Authenticating...');
    next();
});

const courses = [
    {id: 1, name: 'course 1'},
    {id: 2, name: 'course 2'},
    {id: 3, name: 'course 3'}
];

app.get('/', (req,res) => {
    res.send('Well, hello there!');
});

app.get('/api/courses', (req,res)=> {
    res.send(courses);
})
app.post('/api/courses', (req,res) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    console.log(result);
    res.send(result)

    if (result.error){
 
     res.status(400).send(result.error);
   
     return;}
    })
    
 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}...`)
});}