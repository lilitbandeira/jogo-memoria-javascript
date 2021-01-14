jQuery.htmlPrefilter = function(html) {
    return html;
}
const btn = document.querySelector('.control-buttons button');
const body = document.querySelector('body');

function callbackStart() {
    yourName = prompt('Digite seu nome:','Dandara');
    if(yourName == null || yourName == ""){
        document.querySelector('.name span').innerHTML = 'Anônime';
    }else{
        document.querySelector('.name span').innerHTML = yourName;
    }
    document.querySelector('.control-buttons').remove();
}
btn.addEventListener('click', callbackStart);

const duration = 1000
const blocksContainer = document.querySelector('.game-imgs-blocks')
const gameBlocks = Array.from(blocksContainer.children)
const gBlocksOrderRange = [...Array(gameBlocks.length).keys()]

shuffle(gBlocksOrderRange); //reordena aleatoriamente os elementos da array (embaralha);

gameBlocks.forEach((block, index) => {
    block.style.order = gBlocksOrderRange[index]
    block.addEventListener('click', () => {
        flipBlock(block);
    })
})
function flipBlock(selectedBlock) {
    selectedBlock.classList.add('is-flipped')
    let allFlippedBlocks = gameBlocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'))
    if(allFlippedBlocks.length === 2) {
        stopClicking()
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
    let allCardsIsMatched = gameBlocks.filter(isMatchedBlock => isMatchedBlock.classList.contains('is-match'))
    if(allCardsIsMatched.length === 20) {
        let triesElement = document.querySelector('.tries span')
        let numberOfWrongTries = parseInt(triesElement.innerHTML)
        if(yourName == null || yourName == ""){
            document.querySelector('.modal-content p').innerHTML = 'Parabéns, anônime! Você venceu o jogo após ' +numberOfWrongTries+' Tentativas erradas.<br>Jogue novamente e tente se sair melhor!'
        }else{
            document.querySelector('.modal-content p').innerHTML = 'Parabéns, ' +yourName+'! Você venceu o jogo após ' +numberOfWrongTries+' Tentativas erradas.<br>Jogue novamente e tente se sair melhor!'
        }
        var modal = document.getElementById('myModal');
        var span = document.getElementsByClassName('close')[0];
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = 'none';
        }
        window.onclick = function(event) {
            if(event.target == modal) {
                modal.style.display = 'none';
            }
        }
    }
}
function stopClicking() {
    blocksContainer.classList.add('no-clicking')
    setTimeout(() => {
        blocksContainer.classList.remove('no-clicking')
    }, duration)
}
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector('.tries span')
    if(firstBlock.dataset.manga === secondBlock.dataset.manga){
        firstBlock.classList.remove('is-flipped')
        secondBlock.classList.remove('is-flipped')
        firstBlock.classList.add('is-match')
        secondBlock.classList.add('is-match')
        document.getElementById('success2').play()
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) +1
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped')
            secondBlock.classList.remove('is-flipped')
        }, duration)
        document.getElementById('fail').play()
    }
}
function shuffle(array){
    let current = array.length, temp, random
    while (current > 0){
        random = Math.floor(Math.random() * current)
        current--
        temp = array[current]
        array[current] = array[random]
       array[random] = temp
    }
    return array
} 