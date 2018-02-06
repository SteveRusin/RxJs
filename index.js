//https://jsonplaceholder.typicode.com/posts
let interval;
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');

const myObservable = new Rx.Subject();

myObservable.subscribe(post => console.log(post.title))

function startFetching() {
    let i = 1;
    interval = Rx.Observable.interval(2000).subscribe(
        v => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${i}`)
                .then(response => response.json())
                .then(post => {
                    i++;
                    myObservable.next(post);
                })
        }
    );
}

function stopFetching() {
    interval.complete();
}

start.addEventListener('click', startFetching);
stop.addEventListener('click', stopFetching);