const express = require('express')

const app = express()

const port = 3000



const api = require('mikronode');

var device=new api(/* Host */'138.118.87.76' , '1420'/*, Timeout */);



let passwords = require('./config/password')



app.get('/', (req, res) => {



    let address = {

       ip: '5',

       ip_equipamento: '138.118.87.76'

    };



    device.connect()

.then(([login])=>login(passwords.mikrotikEquipamentUser,passwords.mikrotikEquipament))

.then(async function(conn) {

   var c1=conn.openChannel();
   c1.closeOnDone(true);
   c1.write('/ip/address/print');

   await c1.data // get only data here
      .subscribe(function(data) { // feeds in one result line at a time.
         if(data.data[1].field == 'address'){
            localData = {
               'ip' : data.data[1].value,
               'ip_equipamento': '138.118.87.76'
            }    
         }      
       });

   res.json(localData);

    
})

.catch(function(err) {

 // console.log("Error during processing:",err);

});



})



app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})