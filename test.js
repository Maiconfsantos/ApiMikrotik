// Example function that returns a Promise that will resolve after 2 seconds
var getGenres = function() {
  return new Promise(function(resolve) {
    setTimeout(function(){
      resolve(['comedy', 'drama', 'action'])
    }, 2000);
  });
}

main()

// We start an 'async' function to use the 'await' keyword
async function main(){
  var result = await getGenres()
  console.log('Woo done!', result)


}