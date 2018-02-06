Rx.Observable.fromPromise(fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()))
    .subscribe(
        (users) => {
            console.log(users.map(user => user.name))

        },
        (err) => console.error(err)
    )