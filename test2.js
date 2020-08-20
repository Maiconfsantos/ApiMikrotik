
const { Observable } =  require('rxjs');

const tiredGreetingLady$ = new Observable(observer => {
    setTimeout(() => {
      observer.next('Hello! I am glad to get to know you.');
      observer.complete();
    }, 2000);
  });
  
  console.log('Before calling subscribe on Observable');
  
  tiredGreetingLady$.subscribe({
    next: console.log,
    complete: () => console.log('End of conversation with tired preety lady')
  });
  
  console.log('After calling subscribe on Observable (proof of being able to execute async)');