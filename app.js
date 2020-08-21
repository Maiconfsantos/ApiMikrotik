const express = require('express')
const app = express()
const port = 3000

const api = require('mikronode');
let passwords = require('./config/password')
let dbConn = require('./config/database/mysql')

let info = [];

let info2 = [];

app.get('/', async  (req, res) => {


   data = getDevices();

   await data.then( async (data) => {
      var device;

      data.forEach(async element => {
         device=new api(element.IPv4 , '1420', 10000);
         await connect(device);

         info2 = [...info2,{
            localname: element.name,
            localIP: element.IPv4,
            IPaddress: info
         }];    
      });
 
   })

   res.json(info2)

     

     
})

async function getDevices(){
   return new Promise(async function(resolve, reject){
      await dbConn.query('select * from devices', function (err, rows) {
         resolve(rows);
      });

   })
   
}

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
            info =data.data
            resolve(data.data)            
         }); 
      }) 
   }, (reject) =>{
      console.log('error:', reject)
   })
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})