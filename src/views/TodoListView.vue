<template>
  <div class="todo-container">
    <header class="todo-header">
      <h1>TODO LIST</h1>
    </header>
    <!-- Komponen Form untuk menambahkan todo -->
    <div v-if="showAddTodoForm" class="add-todo-form">
      <input v-model="newTodo" placeholder="Masukkan Kegiatan" class="todo-input">
      <button @click="addTodo" class="add-btn">Tambah Kegiatan</button>
    </div>
    
    <br>
    <div class="col">
      <select class="form-control form-control-lg" v-model="currentFilter">
        <option value="all">All</option>
        <option value="undone">Undone</option>
        <option value="done">Done</option>
      </select>
    </div>
    
    <ul>
      <li v-for="(todo, index) in filteredTodos" :key="todo.id" class="todo-item">
        <span :class="{ completed: todo.completed }" @click="toggleComplete(todo)" v-if="editingIndex !== index">{{ todo.text }}</span>
        <template v-if="editingIndex === index">
          <input
            v-model="editedTaskTitle"
            @keyup.enter="saveTask(index)"
            @keyup.esc="cancelEdit"
            class="form-control edit-input"
          />
          <button @click="saveTask(index)" class="btn btn-sm btn-success mx-2">Simpan</button>
          <button @click="cancelEdit" class="btn btn-sm btn-secondary">Batal</button>
        </template>
        <div class="action-buttons" v-if="editingIndex !== index">
          <button v-if="!todo.completed" @click="completeTodo(todo.id)" class="complete-btn">Selesai</button>
          <button v-if="todo.completed" @click="unCompleteTodo(todo.id)" class="incomplete-btn">Belum Selesai</button>
          <button @click="editTask(index)" class="btn btn-sm btn-primary mx-2">Edit</button>
          <button @click="removeTodo(todo.id)" class="delete-btn">Hapus</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data() {
    return {
      newTodo: '',
      hideCompleted: false,
      editingIndex: null,
      editedTaskTitle: '',
      todos: JSON.parse(localStorage.getItem('todos')) || [], // Load todos from Local Storage
      showAddTodoForm: true, // Show form to add todo
      currentFilter: 'all' // Default filter value
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === '') return;
      this.todos.push({ id: Date.now(), text: this.newTodo, completed: false });
      this.newTodo = '';
      this.saveTodos();
    },
    toggleComplete(todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    },
    completeTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = true;
        this.saveTodos();
      }
    },
    unCompleteTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = false;
        this.saveTodos();
      }
    },
    editTask(index) {
      this.editingIndex = index;
      this.editedTaskTitle = this.todos[index].text;
    },
    saveTask(index) {
      if (this.editedTaskTitle.trim() === '') return;
      this.todos[index].text = this.editedTaskTitle;
      this.cancelEdit();
      this.saveTodos();
    },
    cancelEdit() {
      this.editingIndex = null;
      this.editedTaskTitle = '';
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.saveTodos();
    },
    saveTodos() {
      localStorage.setItem('todos', JSON.stringify(this.todos));
    }
  },
  computed: {
    filteredTodos() {
      if (this.currentFilter === 'undone') {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.currentFilter === 'done') {
        return this.todos.filter(todo => todo.completed);
      } else {
        return this.todos;
      }
    }
  }
}
</script>

<style>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% auto; 
  width: 100%;
  max-width: 600px; 
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(135deg, #5526ff, #432222);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.todo-header {
  margin-bottom: 20px;
  text-align: center;
}

.todo-header h1 {
  font-size: 2.5em;
  font-weight: bold;
  color: #ffffff; /* White text color */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow */
}

.add-todo-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.todo-input {
  width: 300px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
}

.add-btn, .toggle-btn, .complete-btn, .incomplete-btn, .delete-btn, .btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
}

.add-btn {
  background-color: #058919da; /* Warna hijau */
  color: white;
}

.toggle-btn {
  background-color: #00af8f8a; /* Warna oranye */
  color: white;
}

.complete-btn {
  background-color: #4CAF50; /* Warna hijau */
  color: white;
}

.incomplete-btn {
  background-color: #f44336; /* Warna merah */
  color: white;
}

.delete-btn {
  background-color: hsl(0, 100%, 30%); /* Warna abu-abu */
  color: rgb(255, 255, 255);
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 500px; /* Maksimal lebar ul */
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: rgb(108, 81, 81);
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: #ccc; /* Warna abu-abu untuk teks yang selesai */
}

.action-buttons {
  display: flex;
}

.action-buttons button {
  margin-left: 5px;
}

.edit-input {
  flex-grow: 1;
  margin-right: 10px;
}
</style>
