var input = document.getElementById('input');
var text = document.getElementById('text');
var time = document.querySelector('#time');
var mistake = document.querySelector('#mistake');
var wpm = document.querySelector('#wpm');
var cpm = document.querySelector('#cpm');
var btn = document.getElementById('btn');

// set values
let timer;
let maxTime = 60;
let leftTime = maxTime;
let mistakes = 0;
let charIndex = 0;
let isTyping = false;

function loadPara(){
    let paras = ['Through vivid and heartfelt stories this book highlights the stark realities faced by those uprooted by the Cameroonian Civil War',
        'showing the severe disruption to their lives and communities agonies of the Displaced serves as a call to action',
        'reminding us that the crisis continues and the plight of the displaced is far from over',
        'We believe in a world where artists are free to use their creativity to provide an engine for social change, and their work is honored as a human right',
        'We amplify the critical voices of artists who risk their lives to bring human rights issues to the forefront of conversation and inspire social change around the world'
    ]
    let index = Math.floor(Math.random()*paras.length);
    text.innerHTML = '';
    for(var char of paras[index]){
        console.log(char);
        text.innerHTML += `<span>${char}</span>`
    }
    text.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown', ()=>{
        input.focus();
    })
    text.addEventListener('click', ()=>{
        input.focus();
    })
}


function typing(){
    const char = text.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);
    
    if (charIndex < char.length && leftTime > 0){

        if (!isTyping){
            timer = setInterval(initTime, 1000);
            isTyping = true;
        }
        if (char[charIndex].innerText === typedChar){
            char[charIndex].classList.add('correct');
            console.log('correct');
        }
        else{
            mistakes++;
            char[charIndex].classList.add('incorrect');
            console.log('incorrect');
        }
        // char[charIndex].classList.remove('active');
        charIndex++;
        mistake.innerText = mistakes;
        cpm.innerText = charIndex-mistakes;
        char[charIndex].classList.add('active');
        if (charIndex+1 === char.length){
            clearInterval(timer);
        }
    }
    else{
        clearInterval(timer);
        input.value = '';
    }
}


function initTime(){
    if (leftTime>0){
        leftTime--;
        time.innerText = leftTime;
        let w = Math.round(((charIndex-mistakes)/5)/(maxTime-leftTime)*60);
        wpm.innerText = w;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadPara();
    clearInterval(timer);
    leftTime = maxTime;
    mistakes = 0;
    charIndex = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerText = 0;
    time.innerText = leftTime;
    input.value = '';
}

input.addEventListener('input', typing);
btn.addEventListener('click', reset);

loadPara();
