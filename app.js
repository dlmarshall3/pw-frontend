//DOM Load

$(document).ready( () => {
    getAllPokemon();
    shuffleArray(pokedexIntegerArray);
    splitUpPokemon(pokedexIntegerArray);
    $(window).on('click', () => {
        $('#select').get(0).play();
    })
    if(generationChoice === 151){
        $homeButton.attr('src','assets/gen_one_home.png');
    }
    if(generationChoice === 251){
        $homeButton.attr('src','assets/gen_two_home.png');
    }
    if(generationChoice === 386){
        $homeButton.attr('src','assets/gen_three_home.png');
    }
    $('#volume-toggle').on('click', audioControl);
    $('#play-button').on('click', playPokemon);
});

//Variables

const totalPokemonPool = parseInt(JSON.parse(window.localStorage.getItem('numberOfPokemon')));
const generationChoice = parseInt(JSON.parse(window.localStorage.getItem('generationChoice')));
const pokedexIntegerArray = Array.from({length: generationChoice}, (_, i) => i + 1);

let playerOneDeckArr = [];
let playerOneActiveArr = [];
let playerOnePlayedArr = [];
let playerTwoDeckArr = [];
let playerTwoActiveArr = [];
let playerTwoPlayedArr = [];
let pokedexDataArr = [];

let drawInt = 0;
let playCount = 0;
let playerOnePercentage = 100;
let playerTwoPercentage = 100;
let playerOneWinsWar = 0;
let playerTwoWinsWar = 0;
let timeForWarCounter = 0;

let $playerOneScore = $('#playerOneScore');
let $playerOneName = $('#player-one-name');
let $playerOneStats = $('#player-one-stats-h3');
let $playerOnePokemon = $('#player-one-pokemon-img');
let $playerOneHPSpan = $('#player-one-hp-span');
let $playerTwoScore = $('#playerTwoScore');
let $playerTwoName = $('#player-two-name');
let $playerTwoStats = $('#player-two-stats-h3');
let $playerTwoPokemon = $('#player-two-pokemon-img');
let $playerTwoHPSpan = $('#player-two-hp-span');

let $playButton = $('#play-button');
let $totalPlaysH3 = $('#total-plays-h3');
let $homeButton = $('#home-button');
let $masterDiv = $('#master-div');
let $playerWinsH3 = $('#player-wins-h3');
let $winnerImg = $('#winner-img');
let $containerWinner = $('.container-winner');
let $parentWinnerDiv = $('.parent-winner-div');

let $audio = $('.audio');
let $genOneTrainerMusic = $('#gen-one-trainer-music');
let $genOneVictoryMusic = $('#gen-one-victory-music');
let $genTwoTrainerMusic = $('#gen-two-trainer-music');
let $genTwoVictoryMusic = $('#gen-two-victory-music');
let $genThreeTrainerMusic = $('#gen-three-trainer-music');
let $genThreeVictoryMusic = $('#gen-three-victory-music');
let $timeForWarDiv = $('#time-for-war-div');
let $replacementH2 = $('#replacement-h2');
let $pokemonCry = $('#pokemon-cry');
let $selectSFX = $('#select');

// Functions

function startMusic(){
    if(generationChoice === 151){
        var $music = $genOneTrainerMusic;
    }
    if(generationChoice === 251){
        var $music = $genTwoTrainerMusic;
    }
    if(generationChoice === 386){
        var $music = $genThreeTrainerMusic;
    }
    $music.prop('volume', .15);
    $music.get(0).play();
}

async function getAllPokemon(){
    const getPokemonData = await axios.get('https://poke-war.herokuapp.com/api');
    const allPokemonData = getPokemonData.data;
    for(let mon in allPokemonData){
        pokedexDataArr.push(allPokemonData[mon]);
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}


function splitUpPokemon(pokedexIntegerArray){
    startMusic();
    for(let i = 0; i < totalPokemonPool/2; i++){
        let mon = pokedexIntegerArray.shift();
        playerOneDeckArr.push(mon);
    }
    for(let i = 0; i < totalPokemonPool/2; i++){
        let mon2 = pokedexIntegerArray.shift();
        playerTwoDeckArr.push(mon2);
    }
    drawPokemon();
}


function drawPokemon(){
    $replacementH2.html('');
    setTimeout(function(){
        $playButton.prop('disabled', false);
    }, 1150);
    let playerOneActiveMon = playerOneDeckArr.shift();
    playerOneActiveArr.push(playerOneActiveMon);
    let playerTwoActiveMon = playerTwoDeckArr.shift();
    playerTwoActiveArr.push(playerTwoActiveMon);
}


function playPokemon(){

    $('.initial-hidden').css('visibility', 'visible');

    playCount++;

    $playButton.prop('disabled', true);

    $playerOneStats.css('color', '#000000');
    $playerTwoStats.css('color', '#000000');
    
    let playerOneActiveDex = playerOneActiveArr[0];
    let playerTwoActiveDex = playerTwoActiveArr[0];
    let playerOnePokemonImg = `assets/pokemon/${playerOneActiveDex}.png`;
    let playerTwoPokemonImg = `assets/pokemon/${playerTwoActiveDex}.png`;
    let playerOneTotal = pokedexDataArr[playerOneActiveDex-1].total;
    let playerTwoTotal = pokedexDataArr[playerTwoActiveDex-1].total;
    
    $playerOneStats.html(playerOneTotal);
    $playerOnePokemon.attr('src', playerOnePokemonImg);
    $playerOneName.html(pokedexDataArr[playerOneActiveDex-1].name);
    $playerOnePokemon.removeClass('hidden');
    $playerTwoPokemon.attr('src', playerTwoPokemonImg);
    $playerTwoName.html(pokedexDataArr[playerTwoActiveDex-1].name);
    $playerTwoStats.html(playerTwoTotal);
    $playerTwoPokemon.removeClass('hidden');

    drawInt = playerOneActiveArr.length-1;
    
    checkCardCount();

    setTimeout(function(){
        typeCheck(drawInt)
        }, 450);
}


function typeCheck(x){

    let playerOneDex = playerOneActiveArr[x];
    let playerTwoDex = playerTwoActiveArr[x];
    let playerOneTotal = pokedexDataArr[playerOneDex-1].total;
    let playerTwoTotal = pokedexDataArr[playerTwoDex-1].total;
    let playerOneInitialTotal = playerOneTotal;
    let playerTwoInitialTotal = playerTwoTotal;

    let playerOneWeakness = pokedexDataArr[playerOneDex-1].weakness;
    let playerTwoWeakness = pokedexDataArr[playerTwoDex-1].weakness;

    let playerOneTypeOne = pokedexDataArr[playerOneDex-1].type_1;
    let playerOneTypeTwo = pokedexDataArr[playerOneDex-1].type_2;
    let playerTwoTypeOne = pokedexDataArr[playerTwoDex-1].type_1;
    let playerTwoTypeTwo = pokedexDataArr[playerTwoDex-1].type_2;

    let playerOneImmune = pokedexDataArr[playerOneDex-1].immune;
    let playerTwoImmune = pokedexDataArr[playerTwoDex-1].immune;

    let playerOneResistant = pokedexDataArr[playerOneDex-1].resistant;
    let playerTwoResistant = pokedexDataArr[playerTwoDex-1].resistant;

    if(playerOneTotal === playerTwoTotal){
        if((playerTwoWeakness.includes(playerOneTypeOne) || playerTwoWeakness.includes(playerOneTypeTwo))){ 
                playerOneTotal = playerOneTotal + 100;
            }
        else {
            if((playerOneWeakness.includes(playerTwoTypeOne) || playerOneWeakness.includes(playerTwoTypeTwo))){ 
                    playerTwoTotal = playerTwoTotal + 100;
            }
        }
    }

    if(playerOneTotal < playerTwoTotal){
        if((playerTwoWeakness.includes(playerOneTypeOne) || playerTwoWeakness.includes(playerOneTypeTwo))){
                if((playerOneWeakness.includes(playerTwoTypeOne) || playerOneWeakness.includes(playerTwoTypeTwo))){
                    playerOneTotal = playerOneTotal + 50;
                    playerTwoTotal = playerTwoTotal + 50;
                }
                else { 
                    playerOneTotal = playerOneTotal + 100;

                }
            }
        }

    if(playerTwoTotal < playerOneTotal){
        if((playerOneWeakness.includes(playerTwoTypeOne) || playerOneWeakness.includes(playerTwoTypeTwo))){
                if((playerTwoWeakness.includes(playerOneTypeOne) || playerTwoWeakness.includes(playerOneTypeTwo))){
                    playerTwoTotal = playerTwoTotal + 50;
                    playerOneTotal = playerOneTotal + 50;
                }
                else {
                    playerTwoTotal = playerTwoTotal + 100;
                }
            }
        }
    
    if(playerOneImmune !== null){
        if((playerOneImmune.includes(playerTwoTypeOne) || playerOneImmune.includes(playerTwoTypeTwo))){
            playerTwoTotal = playerTwoTotal - 75;
        }
    }

    if(playerTwoImmune !== null){
        if((playerTwoImmune.includes(playerOneTypeOne) || playerTwoImmune.includes(playerOneTypeTwo))){
            playerOneTotal = playerOneTotal - 75;
        }
    }
    
    if(playerOneResistant !== null){
        if((playerOneResistant.includes(playerTwoTypeOne) || playerOneResistant.includes(playerTwoTypeTwo))){
            playerTwoTotal = playerTwoTotal - 50;
        }
    }
    
    if(playerTwoResistant !== null){
        if((playerTwoResistant.includes(playerOneTypeOne) || playerTwoResistant.includes(playerOneTypeTwo))){
            playerOneTotal = playerOneTotal - 50;
        }
    }
    
   if(playerOneInitialTotal > playerOneTotal){
       $playerOneStats.css('color', '#FF0000');
    }

   if(playerOneInitialTotal < playerOneTotal){
       $playerOneStats.css('color','#008000');
    }

   if(playerTwoInitialTotal > playerTwoTotal){
       $playerTwoStats.css('color', '#FF0000');
    }

    if(playerTwoInitialTotal < playerTwoTotal){
        $playerTwoStats.css('color','#008000');
    }

    $playerOneStats.html(`${playerOneTotal}`);
    $playerTwoStats.html(`${playerTwoTotal}`);

    if(playerOneTotal === playerTwoTotal){
        timeForWar();
    }

    if(playerOneTotal > playerTwoTotal){
        playerOneWins();
    }
    if(playerOneTotal < playerTwoTotal){
        playerTwoWins();
    }
}


function playerOneWins(){

    let drawInt = playerTwoActiveArr.length-1;
    let winningMonDex = playerOneActiveArr[drawInt];
    let losingMonDex = playerTwoActiveArr[drawInt];
    for(let mon in playerOneActiveArr){
        playerOnePlayedArr.push(playerOneActiveArr[mon]);
    }
    for(let mon in playerTwoActiveArr){
        playerOnePlayedArr.push(playerTwoActiveArr[mon]);
    }
    playerOneActiveArr = [];
    playerTwoActiveArr = [];

    checkCardCount();

    checkForGameOver();

    setTimeout(function(){
        $pokemonCry.attr('src',`assets/pokemon_cries/${losingMonDex}.wav`).prop('volume', .15).get(0).play();
        $playerTwoPokemon.addClass('hidden');
    }, 400)
    setTimeout(function(){
        $replacementH2.html(`${pokedexDataArr[winningMonDex-1].name} wins!`);
    }, 550);
    setTimeout(function(){
        updateScore();
    }, 600);

    drawPokemon();
}

function playerTwoWins(){

    let drawInt = playerTwoActiveArr.length-1;
    let winningMonDex = playerTwoActiveArr[drawInt];
    let losingMonDex = playerOneActiveArr[drawInt];
    for(let mon in playerOneActiveArr){
        playerTwoPlayedArr.push(playerOneActiveArr[mon]);
    }
    for(let mon in playerTwoActiveArr){
        playerTwoPlayedArr.push(playerTwoActiveArr[mon]);
    }
    playerOneActiveArr = [];
    playerTwoActiveArr = [];

    checkCardCount();

    checkForGameOver();

    setTimeout(function(){
        $pokemonCry.attr('src',`assets/pokemon_cries/${losingMonDex}.wav`).prop('volume', .15).get(0).play();
        $playerOnePokemon.addClass('hidden');
    }, 400)
    setTimeout(function(){
        $replacementH2.html(`${pokedexDataArr[winningMonDex-1].name} wins!`);
    }, 550); 
    setTimeout(function(){
        updateScore();
    }, 600);

    drawPokemon();
}


function updateScore(){
    playerOneScore = playerOneDeckArr.length + playerOnePlayedArr.length + playerOneActiveArr.length;
    playerTwoScore = playerTwoDeckArr.length + playerTwoPlayedArr.length + playerTwoActiveArr.length;

    playerOnePercentage = (playerOneScore/totalPokemonPool) * 100;
    playerTwoPercentage = (playerTwoScore/totalPokemonPool) * 100;

    if (playerOnePercentage < 50 && playerOnePercentage >= 20){
        $playerOneHPSpan.css('background-color','#f8c81e');
    } else if (playerOnePercentage < 20){
        $playerOneHPSpan.css('background-color','#af3e3f');
    } else {
        $playerOneHPSpan.css('background-color','#20df26');
    }

    if (playerTwoPercentage <= 50 && playerTwoPercentage >= 20){
        $playerTwoHPSpan.css('background-color','#f8c81e');
    } else if (playerTwoPercentage < 20){
        $playerTwoHPSpan.css('background-color','#af3e3f');
    } else {
        $playerTwoHPSpan.css('background-color','#20df26');
    }

    $playerOneHPSpan.css('width',`${playerOnePercentage}%`);
    $playerTwoHPSpan.css('width',`${playerTwoPercentage}%`);
}


function timeForWar(){

    if(playerOneDeckArr.length < 2){
        refillHandPlayerOne();
    }
    if(playerTwoDeckArr.length < 2){
        refillHandPlayerTwo();
    }

    if(playerOneDeckArr.length + playerOnePlayedArr.length <= 1){
        playerTwoWinsWar++;
        checkForGameOver();
    }
    if(playerTwoDeckArr.length + playerTwoPlayedArr.length <= 1){
        playerOneWinsWar++;
        checkForGameOver();
    }

    timeForWarCounter++;

    $playerOneStats.css('color', '#000000');
    $playerTwoStats.css('color', '#000000');

    function timeout(){
        setTimeout(function(){
            $replacementH2.html('3');
            },1000),
        setTimeout(function(){
            $replacementH2.html('2');
            $playerOneStats.html('...');
            $playerOnePokemon.attr('src', 'assets/pokeball.png');
            $playerOneName.html('...');
            $playerTwoPokemon.attr('src','assets/pokeball.png');
            $playerTwoName.html('...');
            $playerTwoStats.html('...');
            }, 2000),
        setTimeout(function(){
            $replacementH2.html('1'); 
            let playerOneFirstWarDraw = playerOneDeckArr[0];
            let playerOneSecondWarDraw = playerOneDeckArr[1];
            let playerTwoFirstWarDraw = playerTwoDeckArr[0];
            let playerTwoSecondWarDraw = playerTwoDeckArr[1];
            playerOneActiveArr.push(playerOneFirstWarDraw, playerOneSecondWarDraw);
            playerTwoActiveArr.push(playerTwoFirstWarDraw, playerTwoSecondWarDraw);
            drawInt = playerOneActiveArr.length-1; //2
            playerOneDeckArr.splice(0,drawInt);
            playerTwoDeckArr.splice(0,drawInt);
            }, 3000),
        setTimeout(function(){
            drawPokemonWar(drawInt)  
            }, 4000);
        }
    
    $timeForWarDiv.css('display', 'flex');
    $replacementH2.html('Time For War!'); 

    timeout();      
}

function drawPokemonWar(drawInt){

    playCount++;

    let playerOneActiveDex = playerOneActiveArr[drawInt];
    let playerOneTotal = pokedexDataArr[playerOneActiveDex-1].total;
    $playerOneStats.html(playerOneTotal);
    $playerOnePokemon.attr('src', `assets/pokemon/${playerOneActiveDex}.png`);
    $playerOneName.html(pokedexDataArr[playerOneActiveDex-1].name);
    $playerOnePokemon.removeClass('hidden');

    let playerTwoActiveDex = playerTwoActiveArr[drawInt];
    let playerTwoTotal = pokedexDataArr[playerTwoActiveDex-1].total;
    $playerTwoPokemon.attr('src', `assets/pokemon/${playerTwoActiveDex}.png`);
    $playerTwoName.html(pokedexDataArr[playerTwoActiveDex-1].name);
    $playerTwoStats.html(playerTwoTotal);
    $playerTwoPokemon.removeClass('hidden');

    drawInt = playerOneActiveArr.length-1;

    setTimeout( () => {
            typeCheck(drawInt);
        }, 450);
}


function refillHandPlayerOne(){
    for(let mon of playerOnePlayedArr){
        playerOneDeckArr.push(mon);
    }
    shuffleArray(playerOneDeckArr);
    playerOnePlayedArr = [];
}

function refillHandPlayerTwo() {
    for(let mon of playerTwoPlayedArr){
        playerTwoDeckArr.push(mon);
    }
    shuffleArray(playerTwoDeckArr);
    playerTwoPlayedArr = [];
}

function checkCardCount(){
    if(playerOneDeckArr.length === 0 && playerOnePlayedArr.length > 0){
        refillHandPlayerOne();
    }

    if(playerTwoDeckArr.length === 0 && playerTwoPlayedArr.length > 0){
        refillHandPlayerTwo();
    }
}

function checkForGameOver(){

    if(timeForWarCounter === 3){
        if (playerOnePercentage > playerTwoPercentage){
            $playButton.off('click', playPokemon);
            playerOnePercentage = 0;
            playerTwoPercentage = 100;
            playerTwoWinsWar++;
        }
        if (playerTwoPercentage < playerOnePercentage){
            $playButton.off('click', playPokemon);
            playerTwoPercentage = 0;
            playerOnePercentage = 100;
            playerOneWinsWar++;
        }
    }

    if ((playerOneDeckArr.length === 0 && playerOnePlayedArr.length === 0) || (playerTwoWinsWar >= 1)){
        if(generationChoice === 151){
            $playButton.off('click', playPokemon);
            $masterDiv.css('display', 'none');
            $playerWinsH3.html('Player Two Wins!');
            $winnerImg.attr('src', 'assets/blue.png');
            $totalPlaysH3.html(`Total plays: ${playCount}`);
            $genOneTrainerMusic.get(0).pause();
            $pokemonCry.get(0).pause();
            $genOneVictoryMusic.get(0).play();
            $parentWinnerDiv.css('display', 'block');
            $containerWinner.css('display', 'grid');
        }
        if(generationChoice === 251){
            $playButton.off('click', playPokemon);
            $masterDiv.css('display', 'none');
            $playerWinsH3.html('Player Two Wins!');
            $winnerImg.attr('src', 'assets/silver.png');
            $totalPlaysH3.html(`Total plays: ${playCount}`);
            $genTwoTrainerMusic.get(0).pause();
            $pokemonCry.get(0).pause();
            $genTwoVictoryMusic.get(0).play();
            $parentWinnerDiv.css('display', 'block');
            $containerWinner.css('display', 'grid');
        }
        if(generationChoice === 386){
            $playButton.off('click', playPokemon);
            $masterDiv.css('display', 'none');
            $playerWinsH3.html('Player Two Wins!');
            $winnerImg.attr('src', 'assets/brendan.png');
            $totalPlaysH3.html(`Total plays: ${playCount}`);
            $genThreeTrainerMusic.get(0).pause();
            $pokemonCry.get(0).pause();
            $genThreeVictoryMusic.get(0).play();
            $parentWinnerDiv.css('display', 'block');
            $containerWinner.css('display', 'grid');
        }
    }
    
    if ((playerTwoDeckArr.length === 0 && playerTwoPlayedArr.length === 0) || (playerOneWinsWar >= 1)){
        if(generationChoice === 151){
            $playButton.off('click', playPokemon);
            $masterDiv.css('display', 'none');
            $playerWinsH3.html('Player One Wins!');
            $winnerImg.attr('src', 'assets/red.png');
            $totalPlaysH3.html(`Total plays: ${playCount}`);
            $genOneTrainerMusic.get(0).pause();
            $pokemonCry.get(0).pause();
            $genOneVictoryMusic.get(0).play();
            $genOneVictoryMusic.get(0).play();
            $parentWinnerDiv.css('display', 'block');
            $containerWinner.css('display', 'grid');
    }
        if(generationChoice === 251){
            $playButton.off('click', playPokemon);
            $masterDiv.css('display', 'none');
            $playerWinsH3.html('Player One Wins!');
            $winnerImg.attr('src', 'assets/ethan.png');
            $totalPlaysH3.html(`Total plays: ${playCount}`);
            $genTwoTrainerMusic.get(0).pause();
            $pokemonCry.get(0).pause();
            $genTwoVictoryMusic.get(0).play();
            $genTwoVictoryMusic.get(0).play();
            $parentWinnerDiv.css('display', 'block');
            $containerWinner.css('display', 'grid');
        }
        if(generationChoice === 386){
            $playButton.off('click', playPokemon);
            $masterDiv.css('display', 'none');
            $playerWinsH3.html('Player One Wins!');
            $winnerImg.attr('src', 'assets/may.png');
            $totalPlaysH3.html(`Total plays: ${playCount}`);
            $genThreeTrainerMusic.get(0).pause();
            $pokemonCry.get(0).pause();
            $genThreeVictoryMusic.get(0).play();
            $genThreeTrainerMusic.get(0).play();
            $parentWinnerDiv.css('display', 'block');
            $containerWinner.css('display', 'grid');
        }
    }
}

function audioControl(){

    let unmutedBool = $audio.prop('muted');
    $audio.prop('muted', !unmutedBool);
}



