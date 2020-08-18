var api = require('mikronode');

var device=new api(/* Host */'138.118.87.76' , '1420'/*, Timeout */);
let datas = [];
let json = {};

// connect: user, password.
device.connect()
.then(([login])=>login('n0c1nb',''))
.then(function(conn) {
    var c1=conn.openChannel();
    c1.closeOnDone(true);


    console.log('Getting IP Adresses');
    c1.write('/ip/address/print');


    c1.data // get only data here
      .subscribe(function(data) { // feeds in one result line at a time.
        console.log(api.resultsToObj(data))
       })

})

.catch(function(err) {
 // console.log("Error during processing:",err);
})


