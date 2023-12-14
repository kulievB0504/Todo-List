let form = document.forms.todo
let inp = form.querySelector('input')
let container = document.querySelector('.container')
let todos = []

form.onsubmit = (e) => {
    e.preventDefault()

    let todo = {
        id: Math.random(),
        title: inp.value,
        time: new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
        isDone: false
    }
    console.log(todo)
    todos.push(todo)
    reload(todos)
}

function reload(arr) {
    container.innerHTML = ""

    for (let item of arr) {

        let mainDiv = document.createElement('div')
        let topDiv = document.createElement('div')
        let title = document.createElement('span')
        let removeBtn = document.createElement('button')
        let timeSpan = document.createElement('span')

        title.classList.toggle('done')
        mainDiv.classList.add('item')
        topDiv.classList.add('top')
        timeSpan.classList.add('time')

        title.innerHTML = item.title
        removeBtn.innerHTML = "x"
        timeSpan.innerHTML = item.time

        mainDiv.append(topDiv, timeSpan)
        topDiv.append(title, removeBtn)
        container.append(mainDiv)

        removeBtn.onclick = () => {
            mainDiv.remove()
        }
        
    }
}