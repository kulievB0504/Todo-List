const form = document.forms.todo
const cont = document.querySelector('.container')
const modal = document.querySelector('.modal')
const modalDialog = document.querySelector('.modal-dialog')
const newTitle = document.querySelector('h2')
const changeForm = document.forms.changeTodo
const changeTnpt = changeForm.querySelector('input')
const modalBtnClose = document.querySelector('[data-close]')
const todos = []

form.onsubmit = (e) => {
    e.preventDefault()

    let fm = new FormData(form)

    let todo = {
        id: Math.random(),
        title: fm.get('task'),
        isDone: false,
        time: new Date().toLocaleTimeString('uz-UZ', { hour12: false })
    };

    if (todo.title.trim() === '') {
        alert('Error🛑')
        return
    }

    todos.push(todo)
    reload(todos, cont)
}
console.log(todos)
reload(todos, cont)


function reload(arr, place) {
    place.innerHTML = '';

    for (let item of arr) {
        let mainDiv = document.createElement('div')
        let topDiv = document.createElement('div')
        let title = document.createElement('span')
        let removeBtn = document.createElement('button')
        let timeSpan = document.createElement('span')

        mainDiv.classList.add('item')
        topDiv.classList.add('top')
        timeSpan.classList.add('time')

        title.innerHTML = item.title;
        removeBtn.innerHTML = "x";
        timeSpan.innerHTML = item.time

        mainDiv.append(topDiv, timeSpan)
        topDiv.append(title, removeBtn)
        place.append(mainDiv)

        removeBtn.onclick = () => {
            let isSure = confirm('Are u sure?')

            if (isSure) {
                let idx = arr.indexOf(item)
                todos.splice(idx, 1)
                mainDiv.remove()
            }
        }

        title.ondblclick = () => {
            modal.classList.add('show', 'fade')
            changeTnpt.value = item.title;
            newTitle.innerHTML = `Заголовок: ${item.title}`;

            changeForm.onsubmit = (e) => {
                e.preventDefault();

                item.title = changeTnpt.value;
                title.innerHTML = changeTnpt.value;
                modal.classList.remove('show');
                changeForm.reset();
            };

            if (newTitle.length > 0) {
                item.title = newTitle;
                title.innerHTML = newTitle;
            }

            modalBtnClose.onclick = () => {
                modal.classList.remove("show")
            }

        }



        title.onclick = () => {
            item.isDone = !item.isDone
            title.classList.toggle('done', item.isDone)
        }
    }
}

