const express =require('express');
const app = express();
const mongoose = require('mongoose');
const PORT=process.env.PORT || 5000;

const {MONGOURI}=require('./config/Keys');




mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting to mongo db",err);
});


require('./models/user');
require('./models/Post');



app.use(express.json());

app.use(require('./routes/auth'));
app.use(require('./routes/post.js'));
app.use(require('./routes/user'));






if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendfile(path.resolve(__dirname,'client','build','index.html'))
    })
}




app.listen(PORT,()=>{
    console.log("server is running on ", PORT);
})



