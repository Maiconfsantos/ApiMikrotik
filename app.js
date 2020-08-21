const express = require('express')
const app = express()
const port = 3000

const api = require('mikronode');
let passwords = require('./config/password')

let info = [];

app.get('/', async  (req, res) => {

   var device=new api('138.118.87.76' , '1420', 100);
   await connect(device);

   var device=new api('138.118.87.7645' , '1420', 100);
   await connect(device);


   res.json(info); 

   
})

async function connect(device){

   await device.connect()
   .then(([login])=>{
     return login(passwords.mikrotikEquipamentUser,passwords.mikrotikEquipament);
   })
   .then(function(conn) {
     
      var chan=conn.openChannel("addresses"); // open a named channel
      chan.write('/ip/address/print');

   
      return new Promise((resolve, reject)=>{
         if(!chan) reject('sem conexao');
         chan.on('done',function(data) {
            chan.close();
            conn.close();
            info =[...info, data.data]
            resolve(data.data)            
         }); 
      }) 
   }, (reject) =>{
      console.log('sem conexao')
   })
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})