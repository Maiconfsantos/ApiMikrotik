const express = require('express')
const app = express()
const port = 3000

const api = require('mikronode');
let passwords = require('./config/password')

let info = [];

app.get('/', async  (req, res) => {
   var device=new api(/* Host */'138.118.87.76' , '1420'/*, Timeout */);
   await connect(device);
   console.log('1');

   var device=new api(/* Host */'138.118.87.76' , '1420'/*, Timeout */);
   await connect(device);
   console.log('2');


   console.log('3')
   res.json(info[0]); //here I don't have data

   
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
         chan.on('done',function(data) {
            chan.close();
            conn.close();
            info =[...info,data.data]
            console.log('data');
            resolve(data.data)            
         }); 
      }) 
   })
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})