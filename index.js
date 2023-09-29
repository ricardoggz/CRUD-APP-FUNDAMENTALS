//Elementos del DOM
const lista = document.getElementById("lista-tareas");
const formulario = document.getElementById("form-tareas");
const nueva_tarea = document.getElementById("nueva-tarea");

//Eventos del DOM
formulario.addEventListener("submit", Create);


//Create
function Create(evt) {
    if(localStorage.getItem('tareas') === null){
        let tareas = []
        tareas.push(nueva_tarea.value)
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }else{
        let tareas = JSON.parse(localStorage.getItem('tareas'))
        tareas.push(nueva_tarea.value)
        localStorage.setItem('tareas', JSON.stringify(tareas))
    }
    Read();
    evt.preventDefault()
    evt.target.reset()
}

//Read
function Read() {
  let tareas = JSON.parse(localStorage.getItem('tareas'))
  //console.log(tareas)
  lista.innerHTML='<h3>Mi lista:</h3>'
  tareas.map((elemento, indice) => {
    lista.innerHTML +=`
        <li>
            ${elemento}
            <i class="bi bi-trash3" onclick=Delete("${indice}")></i>
            <i class="bi bi-pencil" onclick=showUpdtaeForm("${elemento}","${indice}")></i>
        </li>
        `;
  });
}
Read()
//Update
function showUpdtaeForm(elemento, indice) {  
  document.getElementById('div_form').innerHTML=`
    <form id='new-form'>
      <label>Actualizar Tarea</label>
      <input type='text' id='nueva_tarea2'/>
      <button onClick=Update("${indice}")>Actualizar</button>
    </form>
  `
  document.getElementById('nueva_tarea2').value = elemento
}
function Update(indice){
  let tareas = JSON.parse(localStorage.getItem('tareas'))
  tareas.splice(indice, 1, document.getElementById('nueva_tarea2').value)
  localStorage.setItem('tareas',JSON.stringify(tareas))
  Read()
}
//Delete
function Delete(indice) {
  //Traemos la información del localStorge
  let tareas = JSON.parse(localStorage.getItem('tareas'))
  //Splice recibe un índice y la cantidad de elementos a eliminar
  tareas.splice(indice, 1)
  //Actualizar la lista en localStorage
  localStorage.setItem('tareas', JSON.stringify(tareas))
  //Reenderizr la lista del DOM
  Read()
}