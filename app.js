const express = require('express')
const app = express()
const port = 3000

const api = require('mikronode');
let passwords = require('./config/password')

app.get('/', async  (req, res) => {
   var device=new api(/* Host */'138.118.87.76' , '1420'/*, Timeout */);

   var data = await connect(device,res);

   res.json(data); //here I don't have data

   
})

async function connect(device,res){

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
            console.log('1')
            //res.json(data.data)  //if I return here, it's all right
            resolve(data.data)            
         }); 
      }) 
   })
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})