const express = require('express')
const app = express()
const port = 3000

const api = require('mikronode');
let passwords = require('./config/password')

app.get('/', async  (req, res) => {
   var device=new api(/* Host */'138.118.87.76' , '1420'/*, Timeout */);

   const data = await connect(device);
   console.log('3');
   console.log(data)
   res.json(data)

})

async function connect(device){
   await device.connect()
   .then(([login])=>login(passwords.mikrotikEquipamentUser,passwords.mikrotikEquipament))
   .then(async function(conn) {
      var c1=conn.openChannel();
      c1.write('/ip/address/print');
      console.log(1);

      return new Promise((resolve, reject)=>{
         c1.data // get only data here
             .subscribe(function(data) { // feeds in one result line at a time.
                console.log('2');
                resolve(api.resultsToObj(data))
             })
         
    })

   })
   .catch(function(err) {
      console.log("Error during processing:",err);
   });

}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})