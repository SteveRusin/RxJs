//https://jsonplaceholder.typicode.com/posts
const { fromEvent, fromPromise, create, interval } = Rx.Observable;

const start = document.querySelector('.start');
const stop = document.querySelector('.stop');

const startFetching = fromEvent(start, 'click');
const stopFetching = fromEvent(stop, 'click');

function fetchPost(num) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${num + 1}`)
}


const posts = interval(1000)
    .flatMap(i => fetchPost(i))
    .flatMap(post => post.json())
    .takeUntil(stopFetching)

const postsStream = startFetching.flatMap(() => posts);




postsStream.subscribe(data => console.log(data))