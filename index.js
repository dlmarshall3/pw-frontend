$(document).ready(function(){

    wakeUpHeroku();
    $introMusic.prop('volume', .15).get(0).play();
    $(window).on('click', function(){
        $selectSFX.get(0).play();
    })
    $textArrow.on('click', dialogScript);
    $('#volume-toggle').on('click', audioControl);
    if((JSON.parse(window.localStorage.getItem('playedBefore'))) === 'true'){
        $introMusic.get(0).pause();
        $masterDiv.css('display', 'none');
        $returningDiv.css('display', 'grid');
        $textArrowReturn.on('click', returningChoices);
    }
    $('input[type="radio"][name="number-choice"]').change(function(){
        let numberChoice = document.querySelectorAll('input[type="radio"][name="number-choice"]');
        for (let num of numberChoice){
            if (num.checked) {
                window.localStorage.setItem('numberOfPokemon', JSON.stringify(num.value))
            }
        }
                setTimeout(function(){
                    numberSelected()
            }, 500)
    })
    $('input[type="radio"][name="generation-choice"]').change(function(){
        let generationChoice = document.querySelectorAll('input[type="radio"][name="generation-choice"]');
        for (let gen of generationChoice){
            if (gen.checked) {
                window.localStorage.setItem('generationChoice', JSON.stringify(gen.value))
            }
        }
        setTimeout(function(){
            generationSelected()
    }, 500)
    })
})

let $masterDiv = $('#master-div');
let $returningDiv = $('#returning-div');
let $returningChoicesDiv = $('#returning-choices-div');
let $initialDialogH3 = $('#initial-dialog-h3');
let $returningDialogH3 = $('#returning-dialog-h3');
let $continueSpan = $('#continue');
let $newGameSpan = $('#new-game');
let $textArrow = $('#initial-text-arrow');
let $textArrowReturn = $('#text-arrow-return');
let $numberContainer = $('.container-number-choice');
let $generationContainer = $('.container-generation-choice');
let $headerDiv = $('#header');

let $introMusic = $('#intro-music');
let $selectSFX = $('#select');
let $audio = $('.audio');

async function wakeUpHeroku(){
    await axios.get('https://poke-war.herokuapp.com/api/');
    console.log('awake!')
}


function dialogScript() {
    if($headerDiv.css('visibility','hidden')){
        $headerDiv.css('visibility','visible');
    }
    let currentDialog = dialogArray.shift();
    $initialDialogH3.html(currentDialog);
    if(currentDialog.includes('First, how many')){
        $textArrow.off('click', dialogScript);
        setTimeout(function(){
            $textArrow.on('click', numberOfPokemon);
        }, 100)
    }
    if(currentDialog.includes('Next, what generation')){
        $textArrow.off('click', dialogScript);
        setTimeout(function(){
            $textArrow.on('click', generationOfPokemon);
        }, 100)
    }
    if(currentDialog.includes('Wonderful, thanks')){
        $textArrow.off('click', dialogScript);
        setTimeout(function(){
            $textArrow.on('click', function(){
                window.localStorage.setItem('playedBefore', JSON.stringify('true'))
                $initialDialogH3.css('display', 'none');
                $textArrow.css('display', 'none');
                $generationContainer.css('display', 'none')
                window.location.replace('app.html')
            });
        }, 100)
    }
}

function numberOfPokemon(){
    $headerDiv.css('visibility','hidden');
    $initialDialogH3.css('display', 'none');
    $textArrow.css('display', 'none');
    $numberContainer.css('display', 'grid');
}

function generationOfPokemon(){
    $headerDiv.css('visibility','hidden');
    $initialDialogH3.css('display', 'none');
    $textArrow.css('display', 'none');
    $numberContainer.css('display', 'none');
    $generationContainer.css('display', 'grid');
}

function numberSelected(){
    dialogScript();
    $initialDialogH3.css('display', 'flex');
    $textArrow.css('display', 'flex');
    $numberContainer.css('display', 'none');
}

function generationSelected(){
    dialogScript();
    $initialDialogH3.css('display', 'flex');
    $textArrow.css('display', 'flex');
    $generationContainer.css('display', 'none');
}

function returningChoices(){
    $('#returning-div').css('display', 'none');
    $('#returning-choices-div').css('display', 'flex');
    $('#continue').on('click', function(){
        window.location.replace('app.html')
    })
    $('#new-game').on('click', function(){
        window.localStorage.setItem('playedBefore', JSON.stringify('false'));
        window.localStorage.setItem('numberOfPokemon', JSON.stringify(null));
        window.localStorage.setItem('generationChoice', JSON.stringify(null));
        window.location.replace('index.html');
    })
}

let dialogArray = [
    'My name is David, and I am the maker of this game!',
    'Well, not Pokemon. Definitely not. So please do not sue me, Nintendo.',
    'The rules of the game are pretty simple.',
    'Click the arrow to draw your Pokemon.',
    'The Pokemon with the highest stats wins.',
    'And like the card game of War, if the stats are tied, you will draw two more and battle again.',
    'In the end, whoever gets all of the Pokemon wins!',
    '(Or, if you go to war three times, whoever has the most at that point wins.)',
    'Be aware: type advantages will come into play, so the stats will change depending on the match-up.',
    `You can find the stats underneath each Pokemon's name.`,
    `The colors will change depending on the type advantages, as well.`,
    'Green means the Pokemon got a boost, red means they are not quite super effective.',
    'Also, each player has a HP bar that displays the percentage of the total Pokemon in play they have acquired.',
    'Green means 50 percent or more, yellow is 20-49, and red is 1-19.',
    'That said, a few questions before we get started.',
    'First, how many Pokemon would you like to use when playing?',
    'Great! Next, what generation of Pokemon would you like to choose?',
    'Wonderful, thanks for answering. Have fun playing!'
]

function audioControl(){

    let mutedBool = $audio.prop('muted');
    $audio.prop('muted', !mutedBool);
}

