const placeholderData = [
    {
      "id": 0,
      "name": "In Coda",
      "tasks": [
        {
          "id": 0,
          "name": "Rispondere alle email"
        },
        {
          "id": 1,
          "name": "Allena gambe"
        },
        {
          "id": 2,
          "name": "Ricaricare credito telefono"
        },
        {
          "id": 3,
          "name": "Prenotare visita dentista"
        }
      ]
    },
    {
      "id": 1,
      "name": "Aperto",
      "tasks": []
    },
    {
      "id": 2,
      "name": "In Revisione",
      "tasks": []
    },
    {
      "id": 3,
      "name": "Completato",
      "tasks": []
    }
  ]
  
let data = localStorage.getItem("data") ? JSON.parse(localStorage.getItem("data")) : placeholderData

generateTask();

const tasks = document.querySelectorAll(".task")
const colonne = document.querySelectorAll(".colonna")
let dragItem = null;
let dragData = null;

tasks.forEach(task => {
    task.addEventListener("dragstart", dragStart)
    task.addEventListener("dragend", dragEnd)
})

colonne.forEach(colonna => {
    colonna.addEventListener("dragover", dragOver)
    colonna.addEventListener("dragenter", dragEnter)
    colonna.addEventListener("dragleave", dragLeave)
    colonna.addEventListener("drop", dragDrop)
})

function dragStart(){
    console.log("drag iniziato")
    setTimeout(() => this.classList.add("d-none"), 0)
    dragItem = this

    const indexColonna = data.findIndex(colonna => {
        return colonna.id == this.parentElement.getAttribute("data-column")
    })

    const indexTask = data[indexColonna].tasks.findIndex(task => {
        return task.id == this.getAttribute("data-task")
    })
    dragData = data[indexColonna].tasks.splice(indexTask, 1)[0]
    localStorage.setItem("data", JSON.stringify(data))
}

function dragEnd(){
    this.classList.remove("d-none")
    console.log("drag finito")
    dragItem = null

    data[this.parentElement.getAttribute("data-column")].tasks.push(dragData)
    localStorage.setItem("data", JSON.stringify(data))

}
function dragOver(e){
    e.preventDefault()
    console.log("drag sopra")
}
function dragEnter(){
    console.log("drag entrato")
}
function dragLeave(){
    console.log("drag uscito")
}
function dragDrop(){
    console.log("drag droppato")
    this.append(dragItem)
    dragItem.classList.remove("d-none");
}

function generateTask(){
    data.forEach((colonna) => {
        const targetColumn = document.querySelector(`[data-column = '${colonna.id}']`)

        colonna.tasks.forEach(task => {
            const element = document.createElement("div")
            element.className = "task p-4 rounder bg-secondary"
            element.setAttribute("draggable", true)
            element.setAttribute("data-task", task.id)
            const text = document.createTextNode(task.name)
            element.appendChild(text)
            targetColumn.appendChild(element)
        })
    })
    
}