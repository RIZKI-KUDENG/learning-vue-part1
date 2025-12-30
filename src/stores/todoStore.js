import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useTodoStore = defineStore("todo", () => {

    const newTodo = ref("")
    const tasks = ref({
        todo: [],
        done: []
    })
    const priority = ref("Medium")
    const selectedDate = ref(new Date())
    const carouselStartDate = ref(new Date())

    const priorities = ["Low", "Medium", "High"]

    const formatDateKey = (date) => {
        return date.toISOString().split("T")[0]
    }

    const visibleDates = computed(() => {
        const dates = []
        for(let i = 0; i < 5; i++){
            const d = new Date(carouselStartDate.value)
            d.setDate(d.getDate() + i -2)
            dates.push(d)
        }
        return dates;
    })
    const filteredTodos = computed(() => {
        const key = formatDateKey(selectedDate.value)
        return tasks.value.todo.filter((t) => t.dateKey === key)
    })
    const filteredDone = computed(() => {
        const key = formatDateKey(selectedDate.value)
        return tasks.value.done.filter((t) => t.dateKey === key)
    })

    const saveToLocalStorage = () => {
        localStorage.setItem("tasks", JSON.stringify(tasks.value))
    }

    const loadFromLocalStorage = () => {
        const saved = localStorage.getItem("tasks")
        if(saved) tasks.value = JSON.parse(saved)
    }

    const addTodo = () => {
        if(!newTodo.value.trim()) return;

        const todoToAdd = {
            id: date.now(),
            text: newTodo.value.trim(),
            completed: false,
            dateKey: formatDateKey(selectedDate.value),
            createdAt: new Date().toLocaleString(),
            priority: priority.value
        }

        tasks.value.todo.push(todoToAdd)
        newTodo.value = ""
        saveToLocalStorage()
    }

    const toggleTask = (id) => {
        const todoIndex = tasks.value.todo.findIndex((t) => t.id === id)
        const doneIndex = tasks.value.done.findIndex((t) => t.id === id)

        if(todoIndex !== -1){
            const task = tasks.value.todo.splice(todoIndex, 1)[0]
            task.completed = true
            tasks.value.done.push(task)
        } else if(doneIndex !== -1){
            const task = tasks.value.done.splice(doneIndex, 1)[0]
            task.completed = false
            tasks.value.todo.push(task)
        }

        saveToLocalStorage()
    }

    const shiftDate = (days) => {
        const newDate = new Date(carouselStartDate.value)
        newDate.setDate(newDate.getDate() + days)
        carouselStartDate.value = newDate
    }
    
    const selectDate = (date) => {
        selectedDate.value = new Date(date)
    }

    const isSelectedDate = (date) => {
        return formatDateKey(date) === formatDateKey(selectedDate.value)
    }
    const getPriorityBtn = (level) => {
        return priority.value === level ? getPriorityColor(level) : "bg-white text-gray-700"
    }
    const getPriorityColor = (level) => {
        if(level === "Low") return "bg-green-500"
        if(level === "Medium") return "bg-yellow-500"
        if(level === "High") return "bg-red-500"
        return ""
    }

    return{
         // state
    newTodo,
    tasks,
    priority,
    priorities,
    selectedDate,
    carouselStartDate,


    // computed
    visibleDates,
    filteredTodos,
    filteredDone,

    // actions
    addTodo,
    toggleTask,
    shiftDate,
    selectDate,
    loadFromLocalStorage,
    isSelectedDate,
    getPriorityBtn,
    getPriorityColor
    }
})