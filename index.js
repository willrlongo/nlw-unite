//Objeto Java Script
const participante = {
    nome:"Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckin: new Date (2024, 2, 25, 22, 10)
}
//Array
let participantes = [
 {
    nome: "Mayk Brito",
    email: "mayk@gmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 20)
},
{
    nome: "Fernanda Silva",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: null
},
{
    nome: "Rafael Santos",
    email: "rafael@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 14, 15),
    dataCheckIn: new Date(2024, 2, 27, 18, 20)
},
{
    nome: "Carla Oliveira",
    email: "carla@gmail.com",
    dataInscricao: new Date(2024, 2, 25, 16, 40),
    dataCheckIn: null
},
{
    nome: "Lucas Souza",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2024, 2, 26, 8, 55),
    dataCheckIn: new Date(2024, 2, 29, 12, 30)
},
{
    nome: "Amanda Costa",
    email: "amanda@gmail.com",
    dataInscricao: new Date(2024, 2, 27, 11, 45),
    dataCheckIn: new Date(2024, 3, 1, 16, 20)
},
{
    nome: "Pedro Almeida",
    email: "pedro@gmail.com",
    dataInscricao: new Date(2024, 2, 28, 20, 10),
    dataCheckIn: null
},
{
    nome: "Beatriz Lima",
    email: "beatriz@gmail.com",
    dataInscricao: new Date(2024, 2, 29, 15, 20),
    dataCheckIn: new Date(2024, 3, 3, 19, 15)
},
{
    nome: "Rodrigo Martins",
    email: "rodrigo@gmail.com",
    dataInscricao: new Date(2024, 2, 30, 9, 30),
    dataCheckIn: new Date(2024, 3, 4, 13, 40)
},
{
    nome: "Juliana Pereira",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2024, 2, 31, 18, 20),
    dataCheckIn: null
},
{
    nome: "Gustavo Ferreira",
    email: "gustavo@gmail.com",
    dataInscricao: new Date(2024, 3, 1, 14, 55),
    dataCheckIn: new Date(2024, 3, 6, 19, 30)
}
];

const criarNovoParticipante = (participante) => {
const dataInscricao = dayjs(Date.now())
.to (participante.dataInscricao)

let dataCheckIn = dayjs(Date.now())
.to (participante.dataCheckIn)
//condicional
if(participante.dataCheckIn == null) {
dataCheckIn =`
    <button 
    data-email="${participante.email}"
    onclick="fazerCheckIn(event)">
    Confirmar check-in
    </button>    
`
}

return `
<tr>
<td>
  <strong>
      ${participante.nome}
  </strong>
<br>
  <small>
      ${participante.email}
  </small>
</td>
<td>${dataInscricao}</td>
<td>${dataCheckIn}</td>
</tr>
`
}

//arrow function
const atualizarLista = (participantes) => {   

let output ="" 

//estrutura de repetição - loop

for(let participante of participantes) {

output = output + criarNovoParticipante(participante)
}

//substituir informações do HTML
document.querySelector ('tbody')
.innerHTML = output

}    

atualizarLista (participantes)

const adcionarParticipante = (event) =>{
event.preventDefault()
const dadosDoFormulario = new FormData(event.target)

const participante = {
nome: dadosDoFormulario.get('nome'),
email: dadosDoFormulario.get('email'),
dataInscricao: new Date(),
dataCheckIn: null,
}

//Verificar se o participante ja existe
const participanteExistente = participantes.find((p) =>
p.email == participante.email
)

if(participanteExistente) {
alert('Email já cadastrado')
return
}

participantes = [participante, ...participantes]
atualizarLista(participantes)

//Limpar o formulario
event.target.querySelector('[name="nome"]').value =""
event.target.querySelector('[name="email"]').value =""
}

const fazerCheckIn = (event) => {

//Confirmar se realmente quer realizar o check-in
const msgConfirmacao = 'Tem certeza que deseja realizar o Check-in?'

if(confirm(msgConfirmacao) == false) {
return
}

//Encontrar o participante dentro da lista
const participante = participantes.find((p) => {
return p.email == event.target.dataset.email
})

//Atualizar o check-in do participante
participante.dataCheckIn = new Date()

//Atualizar a lista de participantes
atualizarLista(participantes)
}