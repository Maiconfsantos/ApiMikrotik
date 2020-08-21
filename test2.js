
const { Observable } =  require('rxjs');
 
const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
  subscriber.next(100);
  
  setTimeout(() => {
    subscriber.next(200); // happens asynchronously
    subscriber.complete();
  }, 1000);
  subscriber.next(300);
  
});


main();

async function main(){

    console.log('before');
    const promisse  = (new Promise())
    .then(foo.subscribe(x => {
        console.log(x);
    }))

    const promisseB = promisse.then(resolve('oi'))

}
