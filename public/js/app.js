function storeTask() {
  let description = document.getElementById('taskDescription').value;
  let body = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: description })
  };
  fetch('/tasks', body)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      document.getElementById('taskDescription').value = '';
      addTask(task);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function doneTask(id){
  console.log("Task id: " + id);
  let body = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id })
  };
  fetch('/tasks/'+id+'/done', body)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        console.log(response);
        throw "Error en la llamada Ajax ";
      }
    })
    .then(task => {
      document.querySelector('.item-'+id).classList.add('bg-light');
      document.querySelector('.done-'+id).style.display = 'none';
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function deleteTask(id){
  console.log("Task id: " + id);
  let body = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id })
  };
  fetch('/tasks/'+id, body)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        console.log(response);
        throw "Error en la llamada Ajax ";
      }
    })
    .then(task => {
      console.log("Task deleted");
      var element = document.querySelector('.item-'+id);
      element.parentNode.removeChild(element);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function addTask(task) {
  let html =
  `
  <div class="card my-3 item-${task.id}">
    <div class="card-body">
      <p class="card-text">${task.description}
      <a onclick="deleteTask(${id});><img src="assets/icons8-delete-bin-48.png" style="float: right;"  "/></a>
      </p>
      <a href="javascript:;" onclick="doneTask(${task.id});" class="card-link done-${task.id}">Done</a>
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('tasksList').prepend(node);
}
