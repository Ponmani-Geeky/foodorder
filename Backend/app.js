const express= require('express');
const mongoose= require('mongoose');
require('dotenv/config');
const app=express();
var cors=require('cors');
var bodyparser=require('body-parser');
const { request, response } = require('express');
var router=express.Router();
const Food=require('./dbmodel')
// app.use(express.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());
app.use('/foodapi',router);

//middleware
router.use((request,response,next)=>{
  console.log('middleware connectedd');
  next();
})
//DB CONNECTION
mongoose.connect(
    process.env.DB_CONNECTION_STRING,
    {useUnifiedTopology:true ,useNewUrlParser:true},
    (request,response)=>{
      console.log('connected to mongodb happppy!')
    }
);
//port
var port =process.env.PORT || 3000
app.listen(port,()=>{
  console.log('server listening to port 3000');
})

// app.get('/',(req,res)=>{
//   console.log('first request called');
//   res.send('maiden request called......');
// })

// app.post('/foodsorder',async (request,response)=>{
  router.route('/foodsorder').post(async(request,response)=>{
     try{
        console.log('post order fooddddd')
        const myfood=new Food(request.body);
        await myfood.save();
        response.send(myfood);
     }
     catch(err){
      response.send({message:err})
     }
}).then(()=>{
  sendSms();
})

async function sendSms(order){
  try{
  console.log("send message started")
  var accountSid = process.env.YOUR_API_KEY; // Your Account SID from www.twilio.com/console
  var authToken = process.env.YOUR_TOKEN; // Your Auth Token from www.twilio.com/console

  var twilio = require("twilio");
  var client = new twilio(accountSid, authToken);

 await client.messages.create({
      body: `New order from ${order.name},MoblieNo is ${order.mobileno}`,
      to: process.env.YOUR_MOBILE_NO, // Text this number
      from: "+16055196149", // From a valid Twilio number
    }).then((message) => console.log('successfully message send'))
  }
  catch(err){
      console.log("error in sending sms",err);
  }
}
