let clienteId = 1;
let petId = 1;
let funcionarioId = 1;
let consultaId = 1;

class Cliente {
    constructor(nome, pets, fidelizado){
        this.id = `C${clienteId++}`;
        this.nome = nome;
        this.pets = pets;
        this.fidelizado = fidelizado;
    }
}

class Funcionario {
    constructor(usuario, senha){
        this.id = `P${funcionarioId++}`;
        this.usuario = usuario;
        this.senha = senha;
    }
}

class Animal {
    constructor(nomepet, nomedono, consultas){
        this.id = `F${petId++}`;
        this.nomepet = nomepet;
        this.nomedono = nomedono;
        this.consultas = consultas;
    }
}

class Consulta {
    constructor(nomecliente, nomepet, funcionario, status, data){
        this.id = `CO${consultaId++}`;
        this.nomecliente = nomecliente;
        this.nomepet = nomepet;
        this.funcionario = funcionario;
        this.status = status;
        this.data = data;
    }
}

const prompt = require('prompt-sync')({sigint:true})


function cadastrarcliente(listaClientes) {
    //aonde cadastra??
    const nome = prompt('Digite o nome do cliente: ');
    const pets = prompt('Digite os pets do cliente (separados por vírgula): ').split(',');
    const fidelizado = prompt('O cliente é fidelizado? (s/n)').toLowerCase() === 's';  
    const cliente = new Cliente(nome, pets, fidelizado);
    listaClientes.push(cliente);
    console.log('Novo cliente inserido:', cliente);
    return listaClientes;
}

function cadastrarFuncionario (listaFuncionarios){
    //verificar se o usuario ja existe
    const usuario = prompt('Digite o seu nome de usuário: ');
    const senha = prompt('Digite a sua senha: ');
    const funcionario = new Funcionario(usuario, senha);
    listaFuncionarios.push(funcionario)
    //console.log('Novo funcionário inserido:', funcionario);
    return listaFuncionarios;
}

function inserirlogin(listaFuncionarios) {
    if (listaFuncionarios.length === 0) {
        return 'Não há funcionários cadastrados.';
    }
    const usuario = prompt('Digite o seu nome de usuário: ');
    let funcionarioEncontrado = null;
    let condicao = false;
    for (let i = 0; i < listaFuncionarios.length; i++) {
        const funcionario = listaFuncionarios[i];
        if (funcionario.usuario === usuario) {
            condicao = true;
            const senha = prompt('Digite a sua senha: ');
            if (funcionario.senha === senha) {
                funcionarioEncontrado = funcionario;
                return funcionarioEncontrado;
            } else {
                console.log('Senha inválida.');
                break;
            }
        }
    }
    if (!condicao) {
        console.log('O usuário não foi encontrado.');
    }
    return 'Realize o login novamente.' 
}

function cadastraranimal() {
    const nomepet = prompt('Digite o nome do pet: ');
    const nomecliente = prompt('Digite o nome do cliente: ');
    const consultas = prompt('Digite as consultas realizadas: ');
    const pet = new Animal(nomepet, nomecliente, consultas);
    listaPets.push(pet);
    console.log('Novo pet inserido:', pet);
    return listaPets;
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
    let nome = funcionarioon[0];
    // senha = funcionarioon[2];
    console.log('Olá ${nome} !');
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
    const usuario = funcionarioon.usuario;
    const senha = funcionarioon.senha;
    console.log(`Seu usuário é ${usuario} e sua senha é ${senha}.`);
}

function mudardadosfuncionario(funcionarioon){
    console.log('Opção: 2 - Modificar meus dados');
    console.log('1 - Usuário');
    console.log('2 - Senha');
    let usuario = funcionarioon[0];
    let senha = funcionarioon[1];
    let opcao;
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
        console.log(`O seu usuário é ${usuario}.`);
        const novoUsuario = prompt('Insira o novo usuário:');
        funcionarioon.usuario = novoUsuario;
    } else if (opcao == '2'){
        console.log(`A sua senha é ${senha}.`);
        const novaSenha = prompt('Insira a nova senha:');
        funcionarioon.senha = novaSenha;
    }
    console.log('Os dados foram modificados com sucesso!');
    return funcionarioon;
}

function verlistaclientes(listaClientes){
    console.log('Opção: 3 - Ver lista de clientes');
    if (listaClientes.length === 0) {
        console.log('Não há clientes cadastrados.');
        return [];
    }
    //COLOCAR A LISTA EM ORDEM ALFABETICA
    listaClientes.sort(function(a, b) {
        const nomeA = a[0].toUpperCase();
        const nomeB = b[0].toUpperCase();
        if (nomeA < nomeB) {
            return -1;
          }
          if (nomeA > nomeB) {
            return 1;
          }
          return 0;
        });

    console.log(listaClientes);
    return listaClientes;
}

function verlistapets (listaPets){
    console.log('Opção: 4 - Ver lista de pets');
    //verificar se a lista ta vazia
    if (listaPets.length === 0) {
        console.log('Não há pets cadastrados.');
        return [];
    }
    //Ver lista de Pets (deve possuir seus donos também) 
    //COLOCAR A LISTA EM ORDEM ALFABETICA
    listaPets.sort(function(a, b) {
        const petA = a[0].toUpperCase();
        const petB = b[0].toUpperCase();
        if (petA < petB) {
            return -1;
          }
          if (petA > petB) {
            return 1;
          }
          return 0;
        });

    console.log(listaPets);
    return listaPets;
}

function verlistaconsultas (listaConsultas){
    console.log('Opção: 5 - Ver lista de consultas');
    //verificar se a lista ta vazia
    if (listaConsultas.length === 0) {
        console.log('Não há consultas agendadas.');
        return [];
    }
    //Ordenar a lista de consultas por data em ordem cronológica
    listaConsultas.sort(function(a, b) {
        const dataA = new Date(a.data);
        const dataB = new Date(b.data);
        return dataA - dataB;
    });  
    //Exibir a lista de consultas
    console.log(listaConsultas);
    return listaConsultas;
    }

function verlistafuncionarios(listaFuncionarios) {
    console.log('Opção: 6 - Ver lista de funcionários');
    if (listaFuncionarios.length === 0) {
        console.log('Não há funcionários cadastrados.');
        return [];
    }
    listaFuncionarios.sort(function(a, b) {
        const usuarioA = a.usuario.toUpperCase();
        const usuarioB = b.usuario.toUpperCase();
        if (usuarioA < usuarioB) {
            return -1;
        }
        if (usuarioA > usuarioB) {
            return 1;
        }
            return 0;
    });
    const usuariosOrdenados = listaFuncionarios.map(function(funcionario) {
        return funcionario.usuario;
    });
    return usuariosOrdenados;
}

function marcarconsulta(listaConsultas) {
    //TERMINAR ESSA FUNCAO
    console.log('Opção: 7 - Marcar consulta');
    //Marcar Consulta | Se a consulta já existir, deve ser possível remarcar
    //verificar se é um cliente cadastrado
    const nomecliente = prompt('Digite o nome do cliente: ');
    //verificar se é um pet cadastrado
    const nomepet = prompt('Digite o nome do pet: ');
    const status = prompt('Digite o status da consulta: ');
    const funcionario = prompt('Digite o nome do funcionário que está realizando o agendamento: ');
    const data = prompt('Digite a data da consulta: ')
    const consulta = new Consulta(nomecliente, nomepet, status, funcionario, data);
    listaConsultas.push(consulta);
    console.log('Nova consulta agendada:', consulta);
    return listaConsultas;
}

function alterarstatus (listaConsultas){
    //TERMINAR ESSA FUNÇÃO
    //Mudar Status de Consulta | Consulta pendente, adiada, realizada, cancelada.
    console.log('Opção: 8 - Mudar status de consulta');

}

function removercliente (listaClientes){
    //TERMINAR ESSA FUNÇÃO
    console.log('Opção: 9 - Remover cliente');
    
}

function removerpet (listaPets){
    //TERMINAR FUNCAO
    console.log('Opção: 10 - Remover pet');
    
}

function desmarcarconsulta (listaConsultas){
    //TERMINAR FUNCAO
    console.log('Opção: 11 - Cancelar consulta');

}

function removerfuncionario (listaFuncionarios){
    //TERMINAR FUNCAO
    console.log('Opção: 12 - Remover funcionário');  
}

function logout (){
    //TERMINAR FUNCAO
    console.log('Opção: 13 - Fazer logout');
}
function main (){
    let listaClientes = [];
    let listaFuncionarios = [];
    let listaPets = [];
    let listaConsultas = [];
    // funcionario nao logado
    while (true){
        let funcionarioon = null;
        let opcaonlogin = menunaologado();
        if (opcaonlogin == '1'){
            funcionarioon = inserirlogin(listaFuncionarios);
            console.log(funcionarioon)    
        }else if (opcaonlogin == '2'){
            listaFuncionarios = cadastrarFuncionario (listaFuncionarios);
        }else if (funcionarioon != null){
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
                    listaPets = verlistapets (listaPets)
                }else if (opcaonlogado == '5'){
                    listaConsultas = verlistaconsultas (listaConsultas)
                }else if (opcaonlogado == '6'){
                    listaFuncionarios = verlistafuncionarios(listaFuncionarios)
                }else if (opcaonlogado == '7'){
                    listaConsultas = marcarconsulta(listaConsultas) 
                }else if (opcaonlogado == '8'){
                    
                }else if (opcaonlogado == '9'){
                    
                }else if (opcaonlogado == '10'){
                    
                }else if (opcaonlogado == '11'){
                    
                }else if (opcaonlogado == '12'){
                    
                }else if (opcaonlogado == '13'){
                    
                }
            }
        }else {
            break;
        }    
    } 
}
console.log(main())

