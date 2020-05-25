const app =require('express')();
const bodyParser =require('body-parser');
const cors =require('cors');
const errorHandler =require('./middleware/error');
const db =require('./model');
const env =require('dotenv').config();
const routes =require('./routes');
console.log(process.env.aditya)
//=====#####======middleware
app.use(cors());
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("hello world")
})
app.use('/api',routes);
app.use(errorHandler.notFound);
app.use(errorHandler.error);



app.listen(5000,function(err){
    if(err) console.log(err);
    console.log("Server is running port ",5000);
})

