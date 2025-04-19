const todoInput = document.querySelector('.todo-input');
const addBtn = document.querySelector('.add-btn');
const empty = document.querySelector('.empty-state');
const listContainer = document.querySelector('.todo-list')

let local = JSON.parse(localStorage.getItem('list')) || [];

// accepting input
const receiveInput = function(e){
    e.preventDefault();
    let entered = todoInput.value.trim();
    todoInput.value = '';
    if(!entered) return;
    local.push({text:entered, isCompleted: false});
    localStorage.setItem('list', JSON.stringify(local));
    displayList(local);
    
}

// displaying the lists
const displayList = function(local){
    listContainer.innerHTML = '';
    if(local.length == 0) {
        empty.classList.remove('hidden');
        return;
    } else{
        empty.classList.add('hidden');
    }
    
    local.forEach((ele, index) => {
        const html = `<li class="todo-item ${ele.isCompleted ? 'completed': ''}" data-index=${index}>
                <input type="checkbox" class="todo-checkbox" ${ele.isCompleted ? 'checked' : ''}>
                <span class="todo-text ${ele.isCompleted ? 'completed': ''}">${ele.text}</span>
                <button class="delete-btn">Delete</button>
            </li>`
        
    listContainer.insertAdjacentHTML('afterbegin', html);
    });
     
}

const removeItem = function(e){
    if(e.target.classList.contains('todo-checkbox')) toggleComplete(e);
    if(!e.target.closest('.delete-btn')) return;
   const target = e.target.closest('.todo-item');
   local = JSON.parse(localStorage.getItem('list')) || [];
   local.splice(Number(target.dataset.index), 1);
   localStorage.setItem('list', JSON.stringify(local));
   displayList(local);
}


const toggleComplete = function(e){
    const target = e.target.closest('.todo-item');
    if (!target) return;

    const index = Number(target.dataset.index);
    local[index].isCompleted = !local[index].isCompleted;

    localStorage.setItem('list', JSON.stringify(local));
    displayList(local);
}



addBtn.addEventListener('click', receiveInput);
listContainer.addEventListener('click', removeItem);


displayList(local);
