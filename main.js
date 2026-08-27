let trilho = document.getElementById('trilho')
let body = document.querySelector('body')

trilho.addEventListener('click', ()=>{
	trilho.classList.toggle('dark')
	body.classList.toggle('dark')
})

const form = document.querySelector("form");
const container = document.querySelector("#tarefas");

let tarefas = localStorage.getItem("tarefas") 
	?JSON.parse(localStorage.getItem("tarefas"))
	:[];

const mostrarTarefas = () =>{
	container.innerHTML="";
	tarefas.forEach(e => {
		container.innerHTML += `
		<li id="${e.id}">
			<div>
			<input type="checkbox" class="check" ${e.check ? "checked": ""} />
			<span>${e.nome}</span>
			</div>
			<span class="material-symbols-outlined delete">delete</span>
		</li>
		`
	});
	tarefa();
};
const tarefa = ()=>{
	document.querySelectorAll("li").forEach(e =>{
		e.addEventListener("click", (a)=>{
			if(a.target.classList.value.includes("delete")){
				tarefas = tarefas.filter(b => b.id !== +e.id);
				save();
				mostrarTarefas();
			}
			if(a.target.classList.value.includes("check")){
				const index = tarefas.findIndex((i) => i.id === +e.id);
				tarefas[index].check = !tarefas[index].check;
				save();
			}
		});
	});
};

const save = () => {
	localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	if(e.target[0].value.length > 0){
		tarefas.push({nome: e.target[0].value, id:Math.random(),check:false});
		save();
		mostrarTarefas();
		e.target.reset();
	}
});


window.addEventListener("load", mostrarTarefas);