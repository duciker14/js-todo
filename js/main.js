class Task{
    constructor(id, title, desc, timeBegin, timeEnd, status){                
        this.__id = Number(id);
        this.__title = title;
        this.__desc = desc;
        this.__timeBegin = timeBegin;
        this.__timeEnd = timeEnd;
        this.__status = status;
    }

    set id(value)  { this.__id = value; }
    get id() { return this.__id; }

    set title(value)  { this.__title = value; }
    get title() { return this.__title; }

    set desc(value)  { this.__desc = value; }
    get desc() { return this.__desc; }

    set timeBegin(value)  { this.__timeBegin = value; }
    get timeBegin() { return this.__timeBegin; }

    set timeEnd(value)  { this.__timeEnd = value; }
    get timeEnd() { return this.__timeEnd; }

    set status(value)  { this.__status = value; }
    get status() { return this.__status; }
}  


/**
 * 
 */
taskList = Array();

function create(){
    btn = document.getElementById('btnAdd');
    btn.addEventListener('click', addTask);

    rootDom = document.getElementById('root');
    titleDom = document.getElementById('title');
    descDom = document.getElementById('desc');
    timeBeginDom = document.getElementById('timeBegin');
    timeEndDom = document.getElementById('timeEnd');

    editDom = document.getElementById('edit');
    editTitleDom = document.getElementById('edit_title');
    editDescDom = document.getElementById('edit_desc');
    editTimeBeginDom = document.getElementById('edit_timeBegin');
    editTimeEndDom = document.getElementById('edit_timeEnd');
}

function render(){
    rootDom.innerHTML = '';
    taskList.forEach(task => {
        rootDom.appendChild(createNodeTask(task));
    });
}

function createNodeTask(task){
    nodeRow = document.createElement('div');
    nodeRow.setAttribute('class', 'row');

    if(task.__status == 'complete')  nodeRow.setAttribute('style', 'text-decoration: line-through;');

    nodeId = document.createElement('div');
    nodeId.setAttribute('class', 'col-md-1 content');
    nodeId.innerHTML = task.id;
    nodeRow.appendChild(nodeId);

    nodeTitle = document.createElement('div');
    nodeTitle.setAttribute('class', 'col-md-2 content');
    nodeTitle.innerHTML = task.title;
    nodeRow.appendChild(nodeTitle);

    nodeDesc = document.createElement('div');
    nodeDesc.setAttribute('class', 'col-md-2 content');
    nodeDesc.innerHTML = task.desc;
    nodeRow.appendChild(nodeDesc);

    nodeTimeBegin = document.createElement('div');
    nodeTimeBegin.setAttribute('class', 'col-md-2 content');
    nodeTimeBegin.innerHTML = task.timeBegin;
    nodeRow.appendChild(nodeTimeBegin);

    nodeTimeEnd = document.createElement('div');
    nodeTimeEnd.setAttribute('class', 'col-md-2 content');
    nodeTimeEnd.innerHTML = task.timeEnd;
    nodeRow.appendChild(nodeTimeEnd);

    //Create button Edit
    nodeBtnEditWrap = document.createElement('div');
    nodeBtnEditWrap.setAttribute('class', 'col-md-1');
    nodeRow.appendChild(nodeBtnEditWrap);

    nodeButtonEdit = document.createElement('button');
    nodeButtonEdit.setAttribute('class','btn btn-info') //
    nodeButtonEdit.innerHTML = 'Edit';
    nodeButtonEdit.addEventListener('click', function(){
        editTask(task.id);
    });
    nodeBtnEditWrap.appendChild(nodeButtonEdit);

    //Create button delete
    nodeBtnDeleteWrap = document.createElement('div');
    nodeBtnDeleteWrap.setAttribute('class', 'col-md-1');
    nodeRow.appendChild(nodeBtnDeleteWrap);

    nodeBtnDelete = document.createElement('button'); //
    nodeBtnDelete.setAttribute('class','btn btn-warning')
    nodeBtnDelete.innerHTML = 'Delete';
    nodeBtnDelete.addEventListener('click', function(){
        deleteTask(task.id);
    });
    nodeBtnDeleteWrap.appendChild(nodeBtnDelete);
    
    //Create button Complete
    nodeBtnCompleteWrap = document.createElement('div');
    nodeBtnCompleteWrap.setAttribute('class', 'col-md-1');
    nodeRow.appendChild(nodeBtnCompleteWrap);

    nodeBtnComplete = document.createElement('button');
    nodeBtnComplete.setAttribute('class','btn btn-success')
    nodeBtnComplete.innerHTML = 'Complete';
    nodeBtnComplete.addEventListener('click', function(){
        completeTask(task.id);
    });
    nodeBtnCompleteWrap.appendChild(nodeBtnComplete);

    return nodeRow;
}

//create task
id = 0;
function addTask(){ 
    id++;
    task = new Task(
        id,
        titleDom.value,
        descDom.value,
        timeBeginDom.value,
        timeEndDom.value
    )
    taskList.push(task);
    render();
}

function deleteTask(id){
    i = 0;
    for(;i < taskList.length; i++){
        if(taskList[i].id == id) break;
    }
    taskList.splice(i, 1);
    render();
}
let index;
function editTask(id){
    taskList.forEach(task => {
        if(task.id == id){
            editTitleDom.value = task.title;
            editDescDom.value = task.desc;
            editTimeBeginDom.value = task.timeBegin;
            editTimeEndDom.value = task.timeEnd;
            editDom.style.display = 'block';
            index = id;
        }
    });
}


function updateTask(){
    id = index;
    taskList.forEach(task => {
        if(task.id == id){
            task.title = editTitleDom.value;
            task.desc = editDescDom.value;
            task.timeBegin = editTimeBeginDom.value;
            task.timeEnd = editTimeEndDom.value;
            editDom.style.display = 'none';
        }
    });
    render();
}
function completeTask(id) {
    taskList.forEach(task => {
        if (task.id == id) {
            task.__status = 'complete';
        }
    })
    render();
}
window.onload = function(e) {
    create();
    // render();
}