const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
               const newUser = req.body;
               const result = await UsersCollection.insertOne(newUser)
               res.send(result)
          })

          app.get('/users', async(req, res)=>{
               const query = {};
               const result = await UsersCollection.find(query).toArray();
               res.send(result)
          })

          app.delete("/users/:id", async (req, res) => {
               const id = req.params.id;
               const filter = { _id: ObjectId(id) };
               const result = await UsersCollection.deleteOne(filter);
               res.send(result);
          });

          app.put("/users/:id", async (req, res) => {
               const id = req.params.id;
               const updatedUser = req.body;
               const filter = { _id: ObjectId(id) };
               const options = { upsert: true };
               const updatedDoc = {
                 $set: {
                    name: updatedUser?.name,
                    email: updatedUser?.email,
                 },
               };
               const result = await UsersCollection.updateOne(filter,updatedDoc,options);
               res.send(result);
          });
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