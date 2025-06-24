let lists = [];

function addList() {
  const nameInput = document.getElementById("new-list-name");
  const listName = nameInput.value.trim();
  if (!listName) return;
  
  const list = {
    id: Date.now(),
    name: listName,
    tasks: []
  };
  
  lists.push(list);
  nameInput.value = "";
  renderLists();
}

function renderLists() {
  const container = document.getElementById("lists");
  container.innerHTML = "";

  lists.forEach((list) => {
    const listDiv = document.createElement("div");
    listDiv.className = "list";
    
    const heading = document.createElement("h2");
    heading.textContent = list.name;
    
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "New task description";
    
    const dateTimeInput = document.createElement("input");
    dateTimeInput.type = "datetime-local";
    
    const addButton = document.createElement("button");
    addButton.textContent = "Add Task";
    addButton.onclick = () => {
      const desc = taskInput.value.trim();
      const datetime = dateTimeInput.value;
      if (!desc) return;
      list.tasks.push({
        id: Date.now(),
        description: desc,
        completed: false,
        datetime
      });
      renderLists();
    };

    listDiv.appendChild(heading);
    listDiv.appendChild(taskInput);
    listDiv.appendChild(dateTimeInput);
    listDiv.appendChild(addButton);
    
    list.tasks.forEach((task) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task" + (task.completed ? " completed" : "");

      const taskText = document.createElement("span");
      taskText.textContent = `${task.description} (${task.datetime})`;

      const toggleButton = document.createElement("button");
      toggleButton.textContent = task.completed ? "Undo" : "Complete";
      toggleButton.onclick = () => {
        task.completed = !task.completed;
        renderLists();
      };

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.onclick = () => {
        const newDesc = prompt("Edit task", task.description);
        if (newDesc !== null) task.description = newDesc;
        renderLists();
      };

      taskDiv.appendChild(taskText);
      taskDiv.appendChild(toggleButton);
      taskDiv.appendChild(editButton);
      listDiv.appendChild(taskDiv);
    });

    container.appendChild(listDiv);
  });
}
