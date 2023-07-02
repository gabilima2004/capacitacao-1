class cliente {
    constructor(id, nome, pets, fidelizado){
        this.id = id;
        this.nome = nome;
        this.pets = pets;
        this.fidelizado = fidelizado;
    }
}

class funcionario {
    constructor(id, usuario, senha){
        this.id = id;
        this.usuario = usuario;
        this.senha = senha;
    }
}

class animal {
    constructor(id, nomepet, nomedono, consultas){
        this.id = id;
        this.nomepet = nomepet;
        this.nomedono = nomedono;
        this.consultas = consultas;
    }
}

class consulta {
    constructor(id, nomecliente, nomepet, funcionario, status, data){
        this.id = id;
        this.nomecliente = nomecliente;
        this.nomepet = nomepet;
        this.funcionario = funcionario;
        this.status = status;
        this.data = data;
    }
}

const prompt = require('prompt-sync')({sigint:true})
const listaClientes = []

function cadastrarcliente() {
    const id = prompt('Digite o ID do cliente: ');
    const nome = prompt('Digite o nome do cliente: ');
    const pets = prompt('Digite os pets do cliente (separados por vírgula): ').split(',');
    const fidelizado = prompt('O cliente é fidelizado? (s/n)').toLowerCase() === 's';  
    const cliente = new Cliente(id, nome, pets, fidelizado);
    listaClientes.push(novoCliente);
    console.log('Novo cliente inserido:', novoCliente);
    return cliente;
}

function cadastrarfuncionario (){
    const id = prompt('Digite o seu ID: ');
    const usuario = prompt('Digite o seu nome de usuário: ');
    //verificar se o ja tem o usuario
    const senha = prompt('Digite a sua senha: ');
}

function inserirlogin (){
    const usuario = prompt('Digite o seu nome de usuário: ');
    //verificar se o usuario existe
    const senha = prompt('Digite a sua senha: ');
    //verificar se a senha bate com a cadastrada
}
function menu (){
    //login funcionario
    while (true){
        try{
            const resplogin = prompt('Você possui login?s/n ')
            if (resplogin === 's') {
                //funcao de login funcionario
                inserirlogin();
                break;
            } else if (resplogin === 'n') {
                //funcao de cadastrar funcionario
                cadastrarfuncionario();
                break;
            } else {
                throw new Error('Digite s ou n.');
            }
        } catch (error) {
            console.error(error.message);
        }  
    }       
    //aqui o funcionario ja vai ta logado e eu preciso associar o cadastro dele com as ações
}


console.log(menu())


