const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const uri = process.env.URI
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
     try{
          const UsersCollection = client.db("CRUD_Assignment").collection("users");

          app.put('/user', async (req, res) => {
               const newUSer = {name: 'Meraj', email: 'samirmeraj60@gmail.com'}
               const result = await UsersCollection.insertOne(newUSer)
               res.send(result)
          })
     }
     finally{}
}
run().catch(console.dir);


app.get('/', (req, res)=>{
     res.send('CRUD assignment server is running...');
})

app.listen(port,()=>{
     console.log(`Server is running on port ${port}`);
})