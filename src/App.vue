
    <template>
      <h1>Selamat Datang Di To Do List Zakia</h1>
      <div class="todo-container">
        <input v-model="newTodo" placeholder="Masukkan Kegiatan">
        <button @click="addTodo">Tambah Kegiatan</button>
        <br><br>
        <button @click="hideCompleted = !hideCompleted">{{ hideCompleted ? 'Tampilkan Semua' : 'Sembunyikan yang sudah selesai' }}</button>
        <ul>
          <li v-for="todo in visibleTodos" :key="todo.id" class="todo-item">
            <span :class="{ completed: todo.completed }" @click="toggleComplete(todo)">{{ todo.text }}</span>
            <div class="action-buttons">
              <button v-if="!todo.completed" @click="completeTodo(todo.id)" class="complete-btn">Selesai</button>
              <button v-if="todo.completed" @click="unCompleteTodo(todo.id)" class="incomplete-btn">Belum Selesai</button>
              <button @click="removeTodo(todo.id)" class="delete-btn">Hapus</button>
            </div>
          </li>
        </ul>
      </div>
    </template>
 


<script>
export default {
  name: 'App',
  data() {
    return {
      todos: [],
      newTodo: '',
      nextId: 1,
      hideCompleted: false
    }
  },
  computed: {
    visibleTodos() {
      if (this.hideCompleted) {
        return this.todos.filter(todo => !todo.completed);
      } else {
        return this.todos;
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({
          id: this.nextId++,
          text: this.newTodo,
          completed: false
        });
        this.newTodo = '';
      }
    },
    removeTodo(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    completeTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = true;
      }
    },
    unCompleteTodo(id) {
      const todo = this.todos.find(todo => todo.id === id);
      if (todo) {
        todo.completed = false;
      }
    },
    toggleComplete(todo) {
      todo.completed = !todo.completed;
    }
  }
}
</script>

<style>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #3ec6d8;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
  color: #333; /* Warna teks hitam */
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin: 5px;
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
  background-color: #cccccc; /* Warna abu-abu */
  color: black;
}

ul {
  list-style: none;
  padding: 0;
  width: 100%;
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
</style>