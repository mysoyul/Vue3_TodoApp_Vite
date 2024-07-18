<template>
  <div>
    <TodoHeader></TodoHeader>
    <TodoInput @add:todo="addTodo"></TodoInput>
    <TodoList :todo-list="todoItems" @remove:todo="removeTodo"></TodoList>
    <TodoFooter></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from '@/components/TodoHeader.vue'
import TodoInput from '@/components/TodoInput.vue'
import TodoList from '@/components/TodoList.vue'
import TodoFooter from '@/components/TodoFooter.vue'
import { onBeforeMount, reactive } from 'vue';

export default {
  components: {
    TodoHeader,
    TodoInput,
    TodoList,
    TodoFooter
  },

  setup() {
    const todoItems = reactive([])

    const addTodo = (todoItemStr) => {
      const todoItemObj = { completed: false, item: todoItemStr }
      localStorage.setItem(todoItemStr, JSON.stringify(todoItemObj))
      todoItems.push(todoItemObj)
    } //addTodo

    const removeTodo = (todo, index) => {
      const { item } = todo
      localStorage.removeItem(item)
      todoItems.splice(index, 1)
    } //removeTodo

    onBeforeMount(() => {
      if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i)
          if (
            !key.startsWith('__vue-devtools-') &&
            !key.startsWith('__VUE_DEVTOOLS_')
          ) {
            const itemJson = localStorage.getItem(key)
            todoItems.push(JSON.parse(itemJson))
          }
        }
      }
    }) //onBeforeMount 

    return {
      todoItems, addTodo, removeTodo
    }
  } //setup
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

body {
  text-align: center;
  background-color: #f6f6f6;
}

input {
  border-style: groove;
  width: 200px;
}

button {
  border-style: groove;
}

.shadow {
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
}

i,
span {
  cursor: pointer;
}
</style>
