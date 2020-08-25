const express = require('express')
const app = express()
const port = 3000

const api = require('mikronode');
let passwords = require('./config/password')
let dbConn = require('./config/database/mysql')

let info = [];

let info2 = [];

app.get('/', async  (req, res) => {
   info2 = [];
   data = getDevices();

   await data.then( async (data) => {
      var device;

      let promise = new Promise ( async function (resolve, reject){
         Promise.all(data.map(async function (element)  {
            info=[];
            device=new api(element.IPv4 , '1420');
            await connect(device);
            info2 = [...info2,{
               localname: element.name,
               localIP: element.IPv4,
               IPaddress: info
            }];    
         })).then(() =>{

            resolve(info2); 
         })    
      })

      promise.then( (data) =>{
         res.json(data);
      })
   })
   
   
})

async function getDevices(){
   return new Promise(async function(resolve, reject){
      await dbConn.query("select * from devices where IPv4='10.255.2.254'", function (err, rows) {
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
     
      var chan=conn.openChannel();
      chan.write('/interface/print');

   
      return new Promise((resolve, reject)=>{
         if(!chan) reject('sem conexao');
         chan.on('done',async function(data) {
            chan.close();
            conn.close();
            data.data.map((port)=>{
                if (port[3].value == 'ether'){
                    info=[...info, port]
                }
            })
            resolve(data.data)            
         }); 
      }) 
   }, (reject) =>{
     // console.log('error:', reject)
   })
}


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})