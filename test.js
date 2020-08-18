var api = require('mikronode');

var device=new api(/* Host */'138.118.87.76' , '1420'/*, Timeout */);
let datas = [];
let json = {};


main()


async function main() {
    let data = await get_data();

}



async function get_data() {

    await device.connect()
    .then(([login])=>login('n0c1nb',''))
    .then(function(conn) {
 
        var c1=conn.openChannel();
        c1.closeOnDone(true);


        console.log('Getting IP Adresses');
        c1.write('/ip/address/print', function (){
            c1(function (data) {
                var parsed = api.parseItems(data);

                console.log(parsed)
            })
        });

    })

    

}

