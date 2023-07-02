class cliente {
    constructor(id, nome, pets, fidelizado){
        this.id = id;
        this.nome = nome;
        this.pets = pets;
        this.fidelizado = fidelizado;
    }
}
const prompt = require('prompt-sync')({sigint:true})
function cadastrarcliente() {
    const id = prompt('Digite o ID do cliente: ');
    const nome = prompt('Digite o nome do cliente: ');
    const pets = prompt('Digite os pets do cliente (separados por vírgula): ').split(',');
    const fidelizado = confirm('O cliente é fidelizado? ');
  
    const cliente = new Cliente(id, nome, pets, fidelizado);
    return cliente;
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
