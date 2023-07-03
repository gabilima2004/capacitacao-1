class Cliente {
    constructor(id, nome, pets, fidelizado){
        this.id = id;
        this.nome = nome;
        this.pets = pets;
        this.fidelizado = fidelizado;
    }
}

class Funcionario {
    constructor(id, usuario, senha){
        this.id = id;
        this.usuario = usuario;
        this.senha = senha;
    }
}

class Animal {
    constructor(id, nomepet, nomedono, consultas){
        this.id = id;
        this.nomepet = nomepet;
        this.nomedono = nomedono;
        this.consultas = consultas;
    }
}

class Consulta {
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


function cadastrarcliente() {
    //fazer o id
    const nome = prompt('Digite o nome do cliente: ');
    const pets = prompt('Digite os pets do cliente (separados por vírgula): ').split(',');
    const fidelizado = prompt('O cliente é fidelizado? (s/n)').toLowerCase() === 's';  
    const cliente = new Cliente(id, nome, pets, fidelizado);
    listaClientes.push(cliente);
    console.log('Novo cliente inserido:', cliente);
    return listaClientes;
}

function cadastrarFuncionario (listaFuncionarios){
    //verificar se o id ja existe
    const id = prompt('Digite o seu ID: ');
    //verificar se o usuario ja existe
    const usuario = prompt('Digite o seu nome de usuário: ');
    const senha = prompt('Digite a sua senha: ');
    const funcionario = new Funcionario(id, usuario, senha);
    listaFuncionarios.push(funcionario)
    console.log('Novo funcionário inserido:', funcionario);
    return listaFuncionarios;
}

function inserirlogin (listaFuncionarios){
    //const id = prompt('Digite o seu ID: ');
    let condicao = false
    //verificar se o usuario existe
    for (let i = 0; i < listaFuncionarios.length; i++) {
        if (listaFuncionarios.length == 0) {
            console.log('Não há funcionários cadastrados.');
            break;
        }
        if (i[0] == id) {
            const usuario = prompt('Digite o seu nome de usuário: ');
            condicao = true;
        }
    }
    //verificar se a senha bate com a cadastrada
    let condicao1 = false;
    if (condicao = true){
        const senha = prompt('Digite a sua senha: ');
        for (let i = 0; i < listaFuncionarios.length; i++) {
            if (i[2] == senha) {
                const funcionarioon = listaFuncionarios[i];
                condicao1 = true;
                return funcionarioon;
            }
        }
        if (condicao1== false) {
            console.log('Senha inválida. Realize o login novamente.');
        }
    } else{
        console.log('O usuário não foi encontrado. Realize cadastro:');
    }      
}

function cadastraranimal() {
    // fazer id
    //const id = prompt('Digite o ID do pet: ');
    const nomepet = prompt('Digite o nome do pet: ');
    const nomecliente = prompt('Digite o nome do cliente: ');
    const consultas = prompt('Digite as consultas realizadas: ');
    const pet = new Animal(id, nomepet, nomecliente, consultas);
    listaPets.push(pet);
    console.log('Novo pet inserido:', pet);
    return listaPets;
}

function inserirconsulta() {
    // fazer id
    //const id = prompt('Digite o ID da consulta: ');
    const nomecliente = prompt('Digite o nome do cliente: ');
    const nomepet = prompt('Digite o nome do pet: ');
    const status = prompt('Digite o status da consulta: ');
    const funcionario = prompt('Digite o nome do funcionário que está realizando o agendamento: ');
    const data = prompt('Digite a data da consulta: ')
    const consulta = new Consulta(id, nomecliente, nomepet, status, funcionario, data);
    listaConsultas.push(consulta);
    console.log('Nova consulta agendada:', consulta);
    return listaConsultas;
}

function menunaologado(){
    console.log('Seja bem-vindx ao sistema de gerenciamento da veterinária!');
    console.log('1 - Realizar login');
    console.log('2 - Realizar cadastro');
    console.log('3 - Sair');
    while (true) {
        try {
          let opcao = prompt('Digite uma opção: ');
    
          if (opcao === '1' || opcao === '2' || opcao === '3') {
            return opcao;
          } else {
            throw new Error('Resposta inválida.');
          }
        } catch (error) {
          console.error('Ocorreu um erro:', error.message);
        }
    }
}

function menulogado(funcionarioon){
    //let id = funcionarioon[0];
    let nome = funcionarioon[1];
    // senha = funcionarioon[2];
    console.log('Olá ${nome}!');
    console.log('1 - Ver meus dados');
    console.log('2 - Modificar meus dados');
    console.log('3 - Ver lista de clientes');
    console.log('4 - Ver lista de pets');
    console.log('5 - Ver lista de consultas');
    console.log('6 - Ver lista de funcionários');
    console.log('7 - Marcar consulta');
    console.log('8 - Mudar status de consulta');
    console.log('9 - Remover cliente');
    console.log('10 - Remover pet');
    console.log('11 - Cancelar consulta');
    console.log('12 - Remover funcionário');
    console.log('13 - Fazer logout');
    while (true) {
        try {
          let opcao = prompt('Digite uma opção: ');
    
          if (opcao === '1' || opcao === '2' || opcao === '3' || opcao === '4' || opcao === '5' || opcao === '6' || opcao === '7' || opcao === '8' || opcao === '9' || opcao === '10' || opcao === '11' || opcao === '12'|| opcao === '13') {
            return opcao;
          } else {
            throw new Error('Resposta inválida.');
          }
        } catch (error) {
          console.error('Ocorreu um erro:', error.message);
        }
    }
}

function verdadosfuncionario(funcionarioon){
    console.log('Opção: 1 - Ver meus dados');
    //const id = funcionarioon[0]
    const usuario = funcionarioon[1];
    const senha = funcionarioon[2];
    console.log('Seu usuário é ${usuario} e sua senha é ${senha}.');
}

function mudardadosfuncionario(funcionarioon){
    console.log('Opção: 2 - Modificar meus dados');
    console.log('1 - Usuário');
    console.log('2 - Senha');
    //let id = funcionarioon[0];
    let usuario = funcionarioon[1];
    let senha = funcionarioon[2];
    while (true) {
        try {
          let opcao = prompt('Digite uma opção: ');
    
          if (opcao === '1' || opcao === '2') {
            break;
          } else {
            throw new Error('Resposta inválida.');
          }
        } catch (error) {
          console.error('Ocorreu um erro:', error.message);
        }
    }
    if (opcao == '1'){
        console.log('O seu usuário é ${usuario}.');
        usuario = prompt('Insira o novo usuário.');
    } else if (opcao == '2'){
        console.log('A sua senha é ${senha}.');
        usuario = prompt('Insira a nova senha.');
    }
    funcionarioon = [id, usuario, senha];
    return funcionarioon
}

function verlistaclientes(listaClientes){
    console.log('Opção: 3 - Ver lista de clientes');
    //COLOCAR A LISTA EM ORDEM ALFABETICA
    listaClientes.sort(function(a, b) {
        const nomeA = a[1].toUpperCase();
        const nomeB = b[1].toUpperCase();
        if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });

    console.log(listaClientes);
    return listaClientes
}
function main (){
    let listaClientes = [];
    let listaFuncionarios = [];
    let listaPets = [];
    let listaConsultas = [];
    let funcionarioon = null;
    // funcionario nao logado
    while (true){
        let opcaonlogin = menunaologado();
        if (opcaonlogin == '1'){
            funcionarioon = inserirlogin(listaFuncionarios);
            //funcionario logado:
            while (true){
                let opcaonlogado = menulogado(funcionarioon);
                if (opcaonlogado == '1'){
                    verdadosfuncionario(funcionarioon)
                }else if (opcaonlogado == '2'){
                    funcionarioon = mudardadosfuncionario(funcionarioon)
                }else if (opcaonlogado == '3'){
                    listaClientes = verlistaclientes(listaClientes)
                }else if (opcaonlogado == '4'){
                    
                }else if (opcaonlogado == '5'){
                    
                }else if (opcaonlogado == '6'){
                
                }else if (opcaonlogado == '7'){
                    
                }else if (opcaonlogado == '8'){
                    
                }else if (opcaonlogado == '9'){
                    
                }else if (opcaonlogado == '10'){
                    
                }else if (opcaonlogado == '11'){
                    
                }else if (opcaonlogado == '12'){
                    
                }else if (opcaonlogado == '13'){
                    
                }
            }
        }else if (opcaonlogin == '2'){
            listaFuncionarios = cadastrarFuncionario (listaFuncionarios);
        }else {
            break
        }    
    } 
}

console.log(main())


