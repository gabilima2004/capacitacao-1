//Gerando os IDs sem repetição
let clienteId = 1;
let petId = 1;
let funcionarioId = 1;
let consultaId = 1;

//Definindo a classe cliente
class Cliente {
    constructor(nome, pets, fidelizado){
        //O id vai ser diferente para cada novo cliente
        this.id = `C${clienteId++}`;
        this.nome = nome;
        this.pets = pets;
        this.fidelizado = fidelizado;
    }
}

//Definindo a classe funcionario
class Funcionario {
    constructor(usuario, senha){
        //O id vai ser diferente para cada novo funcionario
        this.id = `P${funcionarioId++}`;
        this.usuario = usuario;
        this.senha = senha;
    }
}

//Definindo a classe pet
class Pet {
    constructor(nomepet, nomedono, consultas){
        //O id vai ser diferente para cada novo pet
        this.id = `F${petId++}`;
        this.nomepet = nomepet;
        this.nomedono = nomedono;
        this.consultas = consultas;
    }
}

//Definindo a classe consulta
class Consulta {
    constructor(nomecliente, nomepet, funcionario, status, data){
        //O id vai ser diferente para cada nova consulta
        this.id = `CO${consultaId++}`;
        this.nomecliente = nomecliente;
        this.nomepet = nomepet;
        this.funcionario = funcionario;
        this.status = status;
        //Ver como é a forma de escrever datas
        this.data = data;
    }
}


//Interação com o usuário
const prompt = require('prompt-sync')({sigint:true})

//Funcao para cadastrar um novo cliente, utilizada na funcao de marcar consultas
function cadastrarcliente(listaClientes,listaConsultas) {
    const nome = prompt('Digite o nome do cliente: ');
    const petsString = prompt('Digite os pets do cliente (separados por vírgula): ');
    // Criando uma lista de pets
    const pets = petsString.split(','); 
    //DEFINIR A FIDELIZAÇAO
    let fidelizado =  fidelizacao (nome, listaConsultas)
    const cliente = new Cliente(nome, pets, fidelizado);
    listaClientes.push(cliente);
    console.log('Novo cliente inserido:', cliente);
    return listaClientes;
}

//Funçao para saber se um cliente é fidelizado ou não
function fidelizacao (cliente, listaConsultas){
    let qtdconsultas = 0
    let fidelizado = false;
    for (i = 0; i < listaConsultas; i++){
        consultamarcada = listaConsultas[i];
        if (consultamarcada[0].toLocaleLowerCase()==cliente.toLocaleLowerCase()){
            if(consultamarcada[3].toLocaleLowerCase() == 'consulta realizada'){
                qtdconsultas++
            }
        }
    }
    if(qtdconsultas>4){
        fidelizado = true
    }
    return fidelizado
}


function cadastrarFuncionario(listaFuncionarios) {
    //Verificando se o usuário já existe
    while (true) {
        const usuario = prompt('Digite o seu nome de usuário: ');
        let usuarioExistente = false;
        for (let i = 0; i < listaFuncionarios.length; i++) {
            const funcionario = listaFuncionarios[i];
            //usuário já existe
            if (funcionario.usuario === usuario) {
                usuarioExistente = true;
                break;
            }
        }
        if (usuarioExistente) {
            console.error('Esse usuário já existe, escolha outro.');
        //usuario nao existe e pode ser cadastrado
        } else {
            const senha = prompt('Digite a sua senha: ');
            console.log('Cadastro realizado com sucesso!');
            const funcionario = new Funcionario(usuario, senha);
            listaFuncionarios.push(funcionario);
            return listaFuncionarios;
        }
    }
}


function inserirlogin(listaFuncionarios) {
    //Verificando se a listafuncionarios está vazia
    if (listaFuncionarios.length === 0) {
        console.log('Não há funcionários cadastrados.');
        return null
    }
    const usuario = prompt('Digite o seu nome de usuário: ');
    //Verificando se o usuario logando existe
    let funcionarioEncontrado = null;
    let condicao = false;
    for (let i = 0; i < listaFuncionarios.length; i++) {
        const funcionario = listaFuncionarios[i];
        if (funcionario.usuario === usuario) {
            condicao = true;
            const senha = prompt('Digite a sua senha: ');
            //Usuario foi encontrado, verificando se a senha está correta
            if (funcionario.senha === senha) {
                funcionarioEncontrado = funcionario;
                return funcionarioEncontrado;
            } else {
                console.log('Senha inválida.');
                break;
            }
        }
    }
    //Usuario nao encontrado
    if (!condicao) {
        console.log('O usuário não foi encontrado.');
    }
    //Usuario nao encontrado ou senha incorreta
    return 'Realize o login novamente.' 
}

//funcao usada na funcao marcarconsulta para cadastrar um pet
function cadastraranimal(listaPets) {
    const nomepet = prompt('Digite o nome do pet: ');
    const nomecliente = prompt('Digite o nome do cliente: ');
    const consultas = prompt('Digite as consultas realizadas: ');
    const pet = new Pet(nomepet, nomecliente, consultas);
    listaPets.push(pet);
    console.log('Novo pet inserido:', pet);
    return listaPets;
}

//Função que mostra o menu principal, quando o funcionario ainda nao está logado
function menunaologado(){
    console.log('Seja bem-vindx ao sistema de gerenciamento da veterinária!');
    console.log('1 - Realizar login');
    console.log('2 - Realizar cadastro');
    console.log('3 - Sair');
    //testando se o funcionario digitou uma opcao válida
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

//Funcao que exibe o menu para um funcionario logado
function menulogado(funcionarioon){
    let nome = funcionarioon[0];
    // senha = funcionarioon[2];
    console.log(`Olá ${nome} !`);
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
    //verificando se o funcionario digitou uma opcao valida
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

//funcao que mostra os dados do funcionario logado
function verdadosfuncionario(funcionarioon){
    console.log('Opção: 1 - Ver meus dados');
    const usuario = funcionarioon.usuario;
    const senha = funcionarioon.senha;
    console.log(`Seu usuário é ${usuario} e sua senha é ${senha}.`);
}

//funcao que possibilita a alteraçao de dados do usuario
function mudardadosfuncionario(funcionarioon){
    console.log('Opção: 2 - Modificar meus dados');
    console.log('1 - Usuário');
    console.log('2 - Senha');
    console.log('3 - Sair');
    let usuario = funcionarioon.usuario;
    let senha = funcionarioon.senha;
    let opcao;
    let funcionarioAtualizado = {
        usuario: usuario,
        senha: senha
    };
    //verificando se o usuario digitou uma opcao válida
    while (true) {
        try {
            opcao = prompt('Digite uma opção: ');
            if (opcao === '1' || opcao === '2' || opcao === '3') {
                break;
            } else {
                throw new Error('Resposta inválida.');
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error.message);
        }
        if (opcao == '1'){
            console.log(`O seu usuário é ${funcionarioon.usuario}.`);
            //Verificando se o usuario ja existe
            while (true) {
                const novoUsuario = prompt('Insira o novo usuário:');
                //usuário já existe
                if (usuario.toLowerCase() === novoUsuario.toLowerCase()) {
                    console.error('Esse usuário já existe, escolha outro.');
                //usuario nao existe e pode ser cadastrado
                } else {
                    funcionarioAtualizado.usuario = novoUsuario;
                    console.log('O usuário foi modificado com sucesso!');
                }
            }   
        }else if (opcao == '2'){
            console.log(`A sua senha é ${senha}.`);
            const novaSenha = prompt('Insira a nova senha:');
            funcionarioAtualizado.senha = novaSenha;
            console.log('A senha foi modificada com sucesso!');
        }else if (opcao == '3'){
            break;
        }
    }
    return funcionarioAtualizado;
}
 
//Funcao para ver os clientes cadastrados
function verlistaclientes(listaClientes){
    console.log('Opção: 3 - Ver lista de clientes');
    if (listaClientes.length === 0) {
        console.log('Não há clientes cadastrados.');
        return [];
    }    
    //Mostras apenas os nomes dos clientes
    const nomesClientes = listaClientes.map(cliente => cliente[0]);
    //COLOCAR A LISTA EM ORDEM ALFABETICA
    nomesClientes.sort(function(a, b) {
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

    console.log(nomesClientes);
}

//Funcao para ver os pets cadastrados
function verlistapets (listaPets){
    console.log('Opção: 4 - Ver lista de pets');
    //verificar se a lista ta vazia
    if (listaPets.length === 0) {
        console.log('Não há pets cadastrados.');
        return [];
    }
    //Criando uma cópia da lista de pets 
    const listaPetsOrdenada = [...listaPets]; 
    //Colocar a lista em ordem alfabetica pelos pets
    listaPetsOrdenada.sort(function(a, b) {
        const petA = a[0].nomepet.toUpperCase();
        const petB = b[0].nomepet.toUpperCase();
        if (petA < petB) {
            return -1;
          }
          if (petA > petB) {
            return 1;
          }
          return 0;
        });
    //Mostrar apenas os pets e os donos
    listaPetsOrdenada.forEach(pet => {
        console.log(`Pet: ${pet.nomepet}, Dono: ${pet.nomedono}`);
    });
    return listaPetsOrdenada;
}

//Funcao para ver as consultas marcadas
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
    //Exibir a lista de consultas organizadas
    listaConsultas.forEach(consulta => {
        console.log(`Data: ${consulta.data}, Pet: ${consulta.pet}, Dono: ${consulta.dono}`);
    });
    return listaConsultas;
}

//Funcao para ver os funcionarios cadastrados
function verlistafuncionarios(listaFuncionarios) {
    console.log('Opção: 6 - Ver lista de funcionários');
    if (listaFuncionarios.length === 0) {
        console.log('Não há funcionários cadastrados.');
        return [];
    }
    //Colocando os funcionários em ordem alfabética 
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
    //Mostrando apenas o usuario, sem a senha
    const usuariosOrdenados = listaFuncionarios.map(function(funcionario) {
        return funcionario.usuario;
    });
    return usuariosOrdenados;
}

//funcao para marcar consultas
function marcarconsulta(listaConsultas, listaPets, listaClientes, listaFuncionarios) {
    //Marcar Consulta | Se a consulta já existir, deve ser possível remarcar
    console.log('Opção: 7 - Marcar consulta');
    console.log('1 - Marcar consulta.')
    console.log('2 - Remarcar consulta.')
    while (true) {
        try {
            opcao = prompt('Digite uma opção: ');
            if (opcao === '1' || opcao === '2') {
                break;
            } else {
                throw new Error('Resposta inválida.');
            }
        } catch (error) {
            console.error('Ocorreu um erro:', error.message);
        }
    }
    //Marcando a consulta 
    if (opcao == '1'){
        //verificando se é um cliente cadastrado
        let condicaoc = false
        while (true){
            const nomecliente = prompt('Digite o nome do cliente: ');
            for (let i = 0; i < listaClientes.length; i++) {
                const cliente = listaClientes[i];
                if (cliente[0].toLowerCase() === nomecliente.toLowerCase()) {
                    //O cliente já está cadastrado
                    //Imprimir os dados do cliente
                    //atualizando o fidelizado
                    cliente.fidelizado = fidelizacao(cliente[0], listaConsultas)
                    console.log(`Cliente: ${cliente[0].nome}, Pets: ${cliente[0].pets}, Fidelizado: ${cliente[0].fidelizado}`);
                    condicaoc = true;
                    break;
                }
            }
            if (!condicaoc){
                console.log('O cliente não está cadastrado. Realize o cadastro.');
                listaClientes = cadastrarcliente(listaClientes);
            }else{
                break;
            }
        }
        let condicaop = false ;
        while (true){
            //verificar se é um pet cadastrado
            const nomepet = prompt('Digite o nome do pet: ');
            for (let i = 0; i < listaPets.length; i++) {
                const pet = listaPets[i];
                if (pet[0].toLowerCase() === nomepet.toLowerCase()) {
                    //O pet já está cadastrado
                    //Mostrar as informações do pet
                    console.log(`Nome do pet: ${pet[0].nomepet}, nome do dono ${pet[0].nomedono}, consultas realizadas${pet[0].consultas}.`);
                    condicaop = true;
                    break;
                }
            }
            if (!condicaop){
                console.log('O pet não está cadastrado. Realize o cadastro.');
                listaPets = cadastraranimal(listaPets);
            }else{
                break;
            }
        }
        const status = prompt('Digite o status da consulta: ');
        //Verificando o funcionario
        let condicaof = false;
        while (true){
            const funcionarioon = prompt('Digite o nome do funcionário que está realizando o agendamento: ');
            for (let i = 0; i < listaFuncionarios.length; i++) {
                const nomefuncionario = listaFuncionarios[i];
                if (nomefuncionario[0].toLowerCase() === funcionarioon.toLowerCase()) {
                    // O funcionário está certo
                    console.log(`Funcionário ${funcionarioon} que realizou a consulta.`);
                    condicaof = true;
                    break;
                }
            }
            if (!condicaof){
                console.log('Funcionário não encontrado, digite um funcionário válido.');
            }else{
                break;
            }
        }
        //Verificar a disponibilidade das consultas?
        const data = prompt('Digite a data da consulta: ')
        const consulta = new Consulta(nomecliente, nomepet, status, funcionarioon, data);
        listaConsultas.push(consulta);
        console.log('Nova consulta agendada:', consulta);
    //Remarcando uma consulta
    }else {
        //desmarcar a consulta antiga
        listaConsultas = desmarcarconsulta(listaConsultas);
        //marcar a nova consulta
        listaConsultas = marcarconsulta(listaConsultas);
    }
    return listaConsultas;
}

function alterarstatus (listaConsultas){
    //Mudar Status de Consulta | Consulta pendente, adiada, realizada, cancelada.
    console.log('Opção: 8 - Mudar status de consulta');
    //Encontrar a consulta
    const cliente = prompt('Insira o nome do cliente: ');
    const pet = prompt('Insira o nome do pet: ');
    const data = prompt('Insira a data: ');
    let condicao = false;
    for (let i = 0; i < listaConsultas.length; i++) {
        const consulta = listaConsultas[i];
        //Verificando o nome do cliente 
        if (consulta[0].toLowerCase() === cliente.toLowerCase()) {
            //verificando o pet
            if (consulta[1].toLowerCase() === pet.toLowerCase()){
                //verificando a data
                if (consulta[2] === data){
                    //alterando o status
                    console.log(`O status dessa consulta é ${consulta.status}.`);
                    console.log('Opções de status: Consulta pendente, consulta adiada, consulta realizada, consulta cancelada.');
                    const novoStatus = prompt ('Digite o novo status: ');
                    listaConsultas[i].status = novoStatus;
                    condicao = true;
                }
            }
        }
    }
    //caso a consulta não seja encontrada
    if (!condicao){
        console.log('A consulta não foi encontrada.');
        }
    //retorna a lista atualizada se o status for mudado
    return listaConsultas
}

//funcao para remover um cliente
function removercliente (listaClientes, listaPets){
    console.log('Opção: 9 - Remover cliente');
    //definindo o cliente que deseja excluir
    let condicao = false;
    let clienteexcluir = prompt('Insira o nome do cliente: ');
    //verificando se o cliente existe
    for (i = 0; i < listaClientes.length; i++){
        const cliente = listaClientes[i];
        if (clienteexcluir.toLowerCase() == cliente[0].toLowerCase()){
            //excluindo os dados do cliente
            console.log(`Você está excluindo o cliente ${cliente[0]}.`);
            listaClientes.splice(i,1);
            console.log(`Você precisa excluir os pets ${cliente[1]} desse cliente do arquivo de pets.`);
            listaPets = removerpetclientes (listaPets, cliente[1]);
            //IMPORTANTE remover pets
            condicao = true;
            break;
        }
    }
    if (!condicao){
        console.log('O cliente não foi encontrado.');
    }
    return listaClientes, listaPets;
}

//funcao para remover os pets de um cliente que foi excluido
function removerpetclientes(listaPets, listapetsclientes){
    //pegando os pets do cliente excluido
    for (i=0; i < listapetsclientes.length; i++){
        const pet = listapetsclientes[i];
        //procurando o pet na lista geral de pets
        for (j=0; j <listaPets; j++){
            const pet2 = listaPets[j];
            if (pet.toLocaleLowerCase() == pet2.toLocaleLowerCase()){
                listaPets.splice(j,1);
                console.log(`O pet ${pet} foi removido com sucesso.`);
            }
        }

    }
    return listaPets;
}

//funcao para remover um pet
function removerpet (listaPets){
    console.log('Opção: 10 - Remover pet');
    //definindo o pet que deseja excluir
    let condicao = false;
    let petexcluir = prompt('Insira o nome do pet: ');
    let donoexcluir = prompt('Insira o nome do dono do pet: ');
    //verificando se o pet existe
    for (i = 0; i < listaPets.length; i++){
        const pet = listaPets[i];
        if (petexcluir.toLowerCase() == pet[0].toLowerCase()){
            if (donoexcluir.toLowerCase() == pet[1].toLowerCase()){
                //excluindo os dados do pet
                console.log(`Você está excluindo o pet ${pet[0]} do cliente ${pet[1]}.`);
                listaPets.splice(i,1);
                condicao = true;
                break;
            }  
        }
    }
    if (!condicao){
        console.log('O pet não foi encontrado.');
    }
    return listaPets;
}

//funcao que desmarca a consulta
function desmarcarconsulta (listaConsultas){
    //TERMINAR FUNCAO
    console.log('Opção: 11 - Cancelar consulta');
    //nomecliente, nomepet, funcionario, status, data
    let condicao = false
    console.log('Informações da consulta a ser desmarcada:');
    const clienteexcluir = prompt('Insira o nome do cliente: ');
    const petexcluir = prompt('Insira o nome do pet: ');
    const dataexcluir = prompt('Insira a data da consulta: ');
    for (i = 0; i < listaConsultas.length; i++){
        const consulta = listaConsultas[i];
        if (clienteexcluir.toLocaleLowerCase() == consulta.nomecliente.toLocaleLowerCase()){
            if (dataexcluir == consulta.data){
                for (j = 0; j < consulta.pets.length; j++){
                    petlista = consulta.pets[j]
                    if (petexcluir.toLocaleLowerCase() == petlista.toLocaleLowerCase()){
                        condicao = true
                        console.log(`Você está desmarcando a consulta do cliente ${consulta.nomecliente}, respectiva ao pet ${petlista}, no dia ${consulta.data}.`);
                        listaConsultas.splice(i,1);
                        condicao = true;
                        break;

                    }
                }
            }
        }
    }
    if (!condicao){
        console.log('A consulta não foi encontrada.');
    }
    return listaConsultas
}

//ver as consultas que um funcionario tem
function verconsultasfuncionario(funcionario, listaConsultas){
    let condicao = true
    for (i=0; i<listaConsultas.length; i++){
        const consulta = listaConsultas[i]
        if (consulta.funcionario.toLocaleLowerCase() == funcionario.toLocaleLowerCase()){
            condicao = false
        }
    }
    if (!condicao){
        return true
    }else{
        return false
    }
}

//funcao para remover funcionario
function removerfuncionario (listaFuncionarios, listaConsultas){
    console.log('Opção: 12 - Remover funcionário');  
    //definindo o funcionario que deseja excluir
    let condicao = false;
    let funcionarioexcluir = prompt('Insira o nome do funcionário: ');
    //verificando se o funcionario existe
    for (i = 0; i < listaFuncionarios.length; i++){
        const funcionario = listaFuncionarios[i];
        if (funcionarioexcluir.toLowerCase() == funcionario[0].toLowerCase()){
            //O funcionário não pode ser removido se tiver consultas em seu nome.
            if (verconsultasfuncionario(funcionarioexcluir, listaConsultas) == true ){
                console.log('Esse funcionário não pode ser removido.')
            }else if (verconsultasfuncionario(funcionarioexcluir, listaConsultas) == false ){
                console.log(`Você está excluindo o funcionário ${funcionario[0]}.`);
                console.log('Funcionário removido com sucesso!')
                listaFuncionarios.splice(i,1);
            }
            condicao = true;
            break;  
        }
    }
    if (!condicao){
        console.log('O funcionário não foi encontrado.');
    }
    return listaFuncionarios;
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
            console.log(funcionarioon); 
            if (funcionarioon != null) {
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
                        listaConsultas = marcarconsulta(listaConsultas, listaPets, listaClientes, listaFuncionarios) 
                    }else if (opcaonlogado == '8'){
                        listaConsultas = alterarstatus (listaConsultas)
                    }else if (opcaonlogado == '9'){
                        listaClientes, listaPets = removercliente (listaClientes, listaPets)
                    }else if (opcaonlogado == '10'){
                        listaPets = removerpet (listaPets)
                    }else if (opcaonlogado == '11'){
                        listaConsultas = desmarcarconsulta (listaConsultas)
                    }else if (opcaonlogado == '12'){
                        listaFuncionarios = removerfuncionario(listaFuncionarios, listaConsultas)
                    }else if (opcaonlogado == '13'){
                        console.log('Opção: 13 - Fazer logout');
                        console.log(`Tchau ${funcionarioon}!`)
                        funcionarioon = null;
                    }
                }
            }    
        }else if (opcaonlogin == '2'){
            listaFuncionarios = cadastrarFuncionario (listaFuncionarios);
        }else if (opcaonlogin == '3') {
            break;
        }    
    } 
}
console.log(main())

