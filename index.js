const express=require('express');
const dbconnect=require('./mongodb');
const app=express();

app.use(express.json());

const ObjectId = require('mongodb').ObjectId; 
//get by id
app.get('/api/v3/app/events/',async(req,res)=>{
   let data=await dbconnect();
   let {id, limit, type, page} = req.query;
   console.log(req.query);
   console.log("YO");
   if(id)
   {
      let id=req.query.id;
      let good_id = new ObjectId(id);
      data= await data.find({"_id":good_id}).toArray();
      console.log(data)
      res.send(data);
   }
   else if(limit && type && page)
   {
      limit = Number(limit), page=Number(page);
      data = await data.find({}).toArray();
      let start = (page - 1)*limit, end = start + limit - 1;
      if(start >= data.length)
      {
         res.sendStatus(404);
      }
      const ans = data.slice(start, Math.min(end + 1, data.length));
      res.send(ans);
   }
   else
   {
      res.sendStatus(404);
   }
})



//post api
app.post('/api/v3/app/events',async(req,res)=>{
   console.log(req.body);
   let data=await dbconnect();
   data=await data.insert(req.body);
   res.send(req.body);
})

//put api
app.put('/api/v3/app/events/:id',async(req,res)=>{
   let data=await dbconnect();
   data=await data.updateOne({_id: new ObjectId(req.params.id)},{
      $set:req.body
   })
   console.log(data);
   res.send(data);
})

//delete api
app.delete('/api/v3/app/events/:id',async(req,res)=>{
   let data=await dbconnect();
   data=await data.deleteOne({_id:new ObjectId(req.params.id)});
   res.send(data);
})



app.listen(3000);