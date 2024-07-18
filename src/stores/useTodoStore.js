import { defineStore } from "pinia";
import http from "@/common/http-common"
import axios from "axios"

export const useTodoStore = defineStore("todoItems", {
    state: () => ({
        todoItems: []
    }),
    actions: {
        async loadTodoItems() {
            try {
                const res = await http.get('/todos')
                const data = await res.data
                this.todoItems = data
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.log(error?.response?.status + ' : ' + error.message)
                } else {
                    console.error(error);
                }
            }
        },
    }
});