import { powerUpIntervals, upgrades } from "./constants/upgrades.js";       //imports the upgrade.js file with the array and intervals

let coin = document.querySelector('.coin-cost');         //grabs the coins out of HTML 
let parsedCoin = parseFloat(coin.innerHTML);         // makes a float out of this coins

let btcpcText = document.getElementById('btcpc-text')       //grabs the btcpc out of HTML
let btcpsText = document.getElementById('btcps-text')       //grabs the btcps out of HTML

let coinImgContainer = document.querySelector('.coin-img-container')        //grabs the container with the coin image inside

let btcpc = 1;      //btcpc = bitcoins per click
let btcps = 0;       //btcps = bitcoins per second

const bgm = new Audio('./audio/bgm.mp3')        // makes a local variable for the audio file
bgm.volume = 0.15       // changes the volume of the audio bgm (background music)

function incrementalCoin(event) {       // generates a function you can recall in HTML
    
    const clickingSound = new Audio('./audio/click.wav')    // makes a local variable for the audio file
            // The line above is in the function to make it play at the same time, if you click really fast  

    clickingSound.play();        // plays this audio file once

    coin.innerHTML = Math.round(parsedCoin += btcpc);       // adds the amount of btcpc to the total coin amount (parsed, 'cause it needs to be a number)

    const x = event.offsetX         // gets the relative distance from the coin on the X - axis and names it x
    const y = event.offsetY         // gets the relative distance from the coin on the Y - axis and names it Y

    const div = document.createElement('div')       // creates a <div></div> in HTML
    div.innerHTML = `+${Math.round(btcpc)}`         // places the number of btcpc into this div
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 20px; pointer-events: none; `
            // gives the text that pops up a good style, at the right posittion
    coinImgContainer.appendChild(div)       // adds this div to the coin image container

    div.classList.add('fade-up')         // adds the animation to this text that pops up

    timeout(div)        // deletes the text after it is done with the animation
}

function buyUpgrade(upgrade) {      // generates a function you can recall in HTML
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u        // finds the same name as the upgrade and makes it mu.
    })

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)        // this local variable is (name-of-the-upgrade)-upgrade
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)       // this local variable is (name-of-the-upgrade)-next-level
    const nextLevelP = document.getElementById(`${mu.name}-next-p`)         // this local variable is (name-of-the-upgrade)-next-p, with p standing for paragraph <p></p>
    
    if (parsedCoin >= mu.parsedCost) {      // if the total amount is higher than the cost of the upgrade
        const upgradeSound = new Audio('./audio/upgrade.mp3')       // make a local varialble for this sound or mp3 file
        upgradeSound.volume = 0.25          // set the volume to 25%, with 1 = 100%
        upgradeSound.play()         // play the sound

        coin.innerHTML = Math.round(parsedCoin -= mu.parsedCost);       // substract the cost from the total coins

        let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML)) //this index is always one level behind, because it hasn't added 1 yet

        console.log('the first index is', index) // prints the index in console (1)

        if (index !== -1) { // -1 means that its not in the array 
            upgradeDiv.style.cssText = `border-color: white`;       // change border color to white
            nextLevelDiv.style.cssText = `background-color: #5a5959, font-weight: normal`;     // change the background color to the original color and the font-weight too
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier).toFixed(2)       // the cost of the next level of this upgrade gets updated

            if (mu.name === 'clicker') {        // if the name of the upgrades is clicker
                btcpc *= mu.powerUps[index].multiplier          // the btcpc gets multiplied with the multiplier
                nextLevelP.innerHTML = `+${mu.parsedIncrease.toFixed(2)} bitcoins per click`          // the next level paragraph is 'amount' bitcoins per click
            } else {            // if the name of the upgrade is not clicker 
                btcps -= mu.power       // the btcps needs to get updated but without the other upgrades
                mu.power *= mu.powerUps[index].multiplier       // mutliplying it wiht the multiplier 
                btcps += mu.power               // the other upgrades get added backt to the btcps 
                nextLevelP.innerHTML = `+${mu.parsedIncrease.toFixed(2)}} bitcoins per second`          // the next level paragraph is 'amount' bitcoins per second
            }

        }

        mu.level.innerHTML ++           // adds a level when you click on the upgrade 

        index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))        // the index corresponds wiht the right level

        console.log('the index after upgradeing is', index)         //prints the index in console (2)
        
        if (index !== -1) {  // if it is not -1
            upgradeDiv.style.cssText = `border-color: orange`;      //  upgrade the border color to orange
            nextLevelDiv.style.cssText = `background-color: #CC4500, font-weight: bold`;        // change the background color to the orange color and the font-weight to bold
            nextLevelP.innerText = mu.powerUps[index].description          // edits the description

            mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML).toFixed(2))        
                    // upgrades the cost to 2.5 times more times 1.004 to the power of the level

        } else {        // if it is -1 (normal upgrades)
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)      // the cost gets updated by multipying it with the cost multiplier, out of upgrades.js
            mu.parsedIncrease = parseFloat(mu.parsedIncrease * mu.coinMultiplier.toFixed(2));       // upgrades the increase of the upgrade

            if (mu.name === 'clicker') nextLevelP.innerHTML = `+${mu.parsedIncrease.toFixed(2)} bitcoins per click`    
            // if the name of the upgrade is clicker, it changes the description with btcpc
            else nextLevelP.innerHTML = `+${mu.parsedIncrease.toFixed(2)} bitcoins per second`           
            // if the name of the upgrade is not clicker, it changes the description with btcps
        }

        if (mu.name === 'clicker') btcpc += mu.parsedIncrease       // if the name of the upgrade is clicker it changes the btcpc in statistics 
        else {              // if the name of the upgrade is not clicker:
            btcps  -= mu.power          // the btcps needs to get updated but without the other upgrades
            mu.power += mu.parsedIncrease          // add the increase
            btcps += mu.power           // add the power again (other upgrades)
        }
    }
}


function save() {       // makes a function, save(), you can recall in HTML 
    localStorage.clear()        // clears the localstorage
    
    upgrades.map((upgrade) => {     // loops through each upgrade in the upgrades array
        const obj = JSON.stringify({    // creates a JSON string from the upgrade's level, cost, and increase
            parsedLevel: parseFloat(upgrade.level.innerHTML),    // gets the current level of the upgrade
            parsedCost: upgrade.parsedCost,    // gets the current cost of the upgrade
            parsedIncrease: upgrade.parsedIncrease    // gets the current increase of the upgrade
        })
        console.log(upgrade.name, obj)    // logs the upgrade name and its JSON string to the console

        localStorage.setItem(upgrade.name, obj)    // saves the JSON string to local storage with the upgrade name as the key
    })

    localStorage.setItem('btcpc', JSON.stringify(btcpc))    // saves the current btcpc to local storage
    localStorage.setItem('btcps', JSON.stringify(btcps))    // saves the current btcps to local storage
    localStorage.setItem('coin', JSON.stringify(parsedCoin))    // saves the current coin amount to local storage   
}

function load() {    // makes a function, load(), you can recall in HTML 
    upgrades.map((upgrade) => {    // loops through each upgrade in the upgrades array
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))    // retrieves the saved values for the upgrade from local storage

        upgrade.parsedCost = savedValues.parsedCost    // sets the upgrade's cost to the saved cost
        upgrade.parsedIncrease = savedValues.parsedIncrease    // sets the upgrade's increase to the saved increase

        upgrade.level.innerHTML = savedValues.parsedLevel    // sets the upgrade's level in the HTML to the saved level
        upgrade.cost.innerHTML = Math.round(savedValues.parsedCost)    // sets the upgrade's cost in the HTML to the saved cost, rounded
        upgrade.increase.innerHTML = savedValues.parsedIncrease    // sets the upgrade's increase in the HTML to the saved increase
    })
    btcpc = JSON.parse(localStorage.getItem('btcpc'))    // retrieves the saved bitcoins per click (btcpc) from local storage
    btcps = JSON.parse(localStorage.getItem('btcps'))    // retrieves the saved bitcoins per second (btcps) from local storage
    parsedCoin = JSON.parse(localStorage.getItem('coin'))    // retrieves the saved coin amount from local storage

    coin.innerHTML = Math.round(parsedCoin)    // sets the coin amount in the HTML to the saved amount, rounded
}

const timeout = (div) => {    // makes a function, timeout(), that removes a div after a delay
    setTimeout(() => {    // sets a timeout to execute the following code after 800 milliseconds
        div.remove()    // removes the div from the DOM
    }, 800);
}

setInterval(() => {    // sets an interval to execute the following code every 100 milliseconds
    parsedCoin += btcps / 10    // adds a fraction of the bitcoins per second (btcps) to the total coin amount
    coin.innerHTML = Math.round(parsedCoin)    // updates the coin amount in the HTML, rounded
    btcpcText.innerHTML = Math.round(btcpc)    // updates the bitcoins per click (btcpc) in the HTML, rounded
    btcpsText.innerHTML = Math.round(btcps);    // updates the bitcoins per second (btcps) in the HTML, rounded
    bgm.play()    // plays the background music
}, 100);

window.incrementalCoin = incrementalCoin    // makes the incrementalCoin function available globally
window.buyUpgrade = buyUpgrade    // makes the buyUpgrade function available globally
window.save = save    // makes the save function available globally
window.load = load    // makes the load function available globally