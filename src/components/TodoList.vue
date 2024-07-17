<template>
    <div>
        <ul>
            <li v-for="(todo, index) in todoItems" :key="index" class="shadow">
                <i class="fas fa-check checkBtn" :class="{ checkBtnCompleted: todo.completed }"
                    @click="toggleComplete(todo, index)">
                </i>
                {{ todo.item }}
                <span class="removeBtn" @click="removeTodo(todo, index)">
                    <i class="fas fa-trash-alt"></i>
                </span>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { onBeforeMount, reactive } from 'vue'

const todoItems = reactive([])

onBeforeMount(() => {
    console.log('mounted in the composition api!')
    if (localStorage.length > 0) {
        for (var i = 0; i < localStorage.length; i++) {
            if (!localStorage.key(i).startsWith("__vue-devtools-")
                && !localStorage.key(i).startsWith("__VUE_DEVTOOLS_")) {
                const itemJson = localStorage.getItem(localStorage.key(i));
                todoItems.push(JSON.parse(itemJson));
            }
        }
    }
})

const removeTodo = (todo, index) => {
    localStorage.removeItem(todo.item)
    todoItems.splice(index, 1)
}

const toggleComplete = (todo, index) => {
    const { completed, item } = todo
    todoItems[index].completed = !completed;
    localStorage.removeItem(item);
    localStorage.setItem(item, JSON.stringify(todoItems[index]));
}


</script>

<style scoped>
ul {
    list-style-type: none;
    padding-left: 0px;
    margin-top: 0;
    text-align: left;
}

li {
    display: flex;
    min-height: 50px;
    height: 50px;
    line-height: 50px;
    margin: 0.5rem 0;
    padding: 0 0.9rem;
    background: white;
    border-radius: 5px;
}

.removeBtn {
    margin-left: auto;
    color: #de4343;
}

.checkBtn {
    line-height: 45px;
    color: #62acde;
    margin-right: 5px;
}

.checkBtnCompleted {
    color: #b3adad;
}

.textCompleted {
    text-decoration: line-through;
    color: #b3adad;
}
</style>