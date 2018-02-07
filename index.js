const { fromEvent } = Rx.Observable;

const container = document.querySelector('.container-fluid');
const divs = Array.from(container.querySelectorAll('div'));


const mouseup = fromEvent(container, 'mouseup');
const mousemove = fromEvent(container, 'mousemove');

const targets = divs.map(div => fromEvent(div, 'mousedown'));

function getElementPosition(element) {
    return element.style.transform ? element.style.transform.match(/\d+/g) : [0, 0];
}

const drag = targets.map(mousedownObs => {
    return mousedownObs.flatMap(({ target, clientX, clientY }) => {
        target.classList.add('selected');
        const [elX, elY] = getElementPosition(target);
        clientX -= elX;
        clientY -= elY;
        return mousemove.map(mm => {
            return {
                target: target,
                x: mm.clientX - clientX + window.scrollX,
                y: mm.clientY - clientY + window.scrollY
            };
        }).takeUntil(mouseup);
    })
})

const subs = drag.map(sub => {
    sub.subscribe(({ target, x, y }) => {
        if (target !== container) {
            target.style.transform = `translate(${x}px, ${y}px)`;
        }
    })
})

const removeClassSub = mouseup.subscribe(() => {
    divs.forEach(div => {
        div.classList.remove('selected');
    })
})

