/*Criando variáveis globais */
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal'){
    //1500
    var criaMosquitoTempo = 1500
}else if (nivel === 'dificil'){
    //1100
    var criaMosquitoTempo = 1000
}else if (nivel === 'chucknorris'){
    //750
    var criaMosquitoTempo = 750
}


//Função para ajustar o tamanho da tela - sem usar barra de rolagem
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

    console.log(largura, altura) //mostra o tamanho atualizado no console
}

ajustaTamanhoPalcoJogo()

//Criando o cronômetro
var cronometro = setInterval(function(){
    tempo -= 1
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaMosca)
        window.location.href = 'vitoria.html'
    }else{
        document.getElementById('cronometro').innerHTML = tempo
    }    
}, 1000);

//Função que cria os elementos de forma randômica respeitando o tamanho da tela
function posicaoRandomica(){
    //Removendo o mosquito anterio caso ele exista
    //A imagem fica aprecendo de modo sortido de só uma imagem por vez
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()

        //console.log('elemento selecionado foi: v' + vidas)
        //Condição que determina o game over
        if(vidas > 3){
            window.location.href = 'fim_de_jogo.html'
        }else{
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png"
            vidas++
        }        
    }    

    //Ajustando a tela de forma randômica, subtrai 90 para não estourar a tela
    //Math.radom produz um número que vai de 0 até muito próximo de 1
    //Math.floor arredonda o número para baixo
    var posicaoX = Math.floor(Math.random() * largura) - 90
    var posicaoY = Math.floor(Math.random() * altura) - 90

    //Corrigindo valores negativos criados de forma aleatória usando operadores ternários
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY)

    //criar o elemento html de forma dinâmica através do JS
    var mosquito = document.createElement('img')
    //Atribuindo um endereço a imagem criada
    mosquito.src = 'imagens/mosquito.png'
    //Após a criação da imagem é preciso ajustá-la
    //Concatenação do retorno do tamanho aleatório com o retorno do lado aleatorio
    //O espaço entre a concatenação é para que o interpretador entenda que são classes diferentes
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    //Acessando os atributos de estilo do elemento html criado
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    //Criando um id para o elemento para poder agir sobre ele
    mosquito.id = 'mosquito'
    //Inclusão do evento onclick
    //O this faz referência ao próprio elemento html que executa a função
    mosquito.onclick = function () {
        this.remove()
    }

    //Incluindo o elemento criado no body da página
    document.body.appendChild(mosquito)

    tamanhoAleatorio()
}

//Função que retorna as imagens com tamanho aleatório
function tamanhoAleatorio(){    
    var classe = Math.floor(Math.random() * 3)
    
    switch(classe){
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

//Função responsável pelas imagens que aparecerão viradas para direita e esquerda
function ladoAleatorio(){
    var classe = Math.floor(Math.random() * 2)
    
    switch(classe){
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }
}