const express=require('express')
const bodyParser=require('body-parser');
const cors=require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kfttk.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;

const app=express();
app.use(bodyParser.json());
app.use(cors());


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("emaJohnStore").collection("product");
  const ordersCollection = client.db("emaJohnStore").collection("order");
  console.log('db connected successfully');

  app.post('/addProduct',(req,res)=>{
    const product=req.body;
    collection.insertOne(product)
    .then(result=>{
      // console.log(result);
      res.send(result.insertedCount);
    });
  })

app.get('/products',(req,res)=>{
  collection.find({})
.toArray((err,documents)=>{
  res.send(documents);
})
})


app.get('/product/:key',(req,res)=>{
  collection.find({key:req.params.key})
.toArray((err,documents)=>{
  res.send(documents[0]);
})
})

app.post('/addProductByKeys',(req,res)=>{
  const productKeys=req.body;
  collection.find({key:{$in:productKeys}})
  .toArray((err,documents)=>{
    res.send(documents);
  })
})

app.post('/order',(req,res)=>{
  const order=req.body;
  ordersCollection.insertOne(order)
  .then(result=>{
    res.send(result.insertedCount);
  });
})

});

app.post('/product',(req,res)=>{
    
})

app.get('/',(req,res)=>{
    res.send('Hi');
})
app.listen(5000);