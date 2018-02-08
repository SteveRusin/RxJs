const { fromPromise } = Rx.Observable;

const subscription = fromPromise(fetch('https://jsonplaceholder.typicode.com/users'))
    .flatMap(res => res.json())
    .flatMap(res => Rx.Observable.from(res.map(user => user.name)))




subscription.subscribe(
    (users) => {
        console.log(users)
    },
    (err) => console.error(err)
)