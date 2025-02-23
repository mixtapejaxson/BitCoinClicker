import { powerUpIntervals, upgrades } from "./constants/upgrades.js";       

let coin = document.querySelector('.coin-cost');         
let parsedCoin = parseFloat(coin.innerHTML);         

let btcpcText = document.getElementById('btcpc-text')       
let btcpsText = document.getElementById('btcps-text')       

let coinImgContainer = document.querySelector('.coin-img-container')        

let btcpc = 1;      
let btcps = 0;       

let upgradesNavButton = document.getElementById('upgrades-nav-button')
let skillsNavButton = document.getElementById('skills-nav-button')

let artifactNavButton = document.getElementById('artifacts-nav-button')

const bgm = new Audio('./audio/bgm.mp3')        
bgm.volume = 0.15       

function incrementalCoin(event) {       
    
    const clickingSound = new Audio('./audio/click.wav')    
            

    clickingSound.play();        

    coin.innerHTML = Math.round(parsedCoin += btcpc);       

    const x = event.offsetX         
    const y = event.offsetY         

    const div = document.createElement('div')       
    div.innerHTML = `+${Math.round(btcpc)}`         
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 20px; pointer-events: none; `
            
    coinImgContainer.appendChild(div)       

    div.classList.add('fade-up')         

    timeout(div)        
}

function buyUpgrade(upgrade) {      
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u        
    })

    const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)        
    const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)       
    const nextLevelP = document.getElementById(`${mu.name}-next-p`)         
    
    if (parsedCoin >= mu.parsedCost) {      
        const upgradeSound = new Audio('./audio/upgrade.mp3')       
        upgradeSound.volume = 0.25          
        upgradeSound.play()         

        coin.innerHTML = Math.round(parsedCoin -= mu.parsedCost);       

        let index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML)) 

        console.log('the first index is', index) 

        if (index !== -1) { 
            upgradeDiv.style.cssText = `border-color: white`;       
            nextLevelDiv.style.cssText = `background-color: #5a5959; font-weight: normal`;     
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier).toFixed(2)       

            if (mu.name === 'clicker') {        
                btcpc *= mu.powerUps[index].multiplier          
                nextLevelP.innerHTML = `+${mu.parsedIncrease.toFixed(2)} bitcoins per click`          
            } else {            
                btcps -= mu.power       
                mu.power *= mu.powerUps[index].multiplier       
                btcps += mu.power               
                nextLevelP.innerHTML = `+${mu.parsedIncrease.toFixed(2)}} bitcoins per second`          
            }

        }

        mu.level.innerHTML ++           

        index = powerUpIntervals.indexOf(parseFloat(mu.level.innerHTML))        

        console.log('the index after upgradeing is', index)         
        
        if (index !== -1) {  
            upgradeDiv.style.cssText = `border-color: orange`;      
            nextLevelDiv.style.cssText = `background-color: #CC4500; font-weight: bold`;        
            nextLevelP.innerText = mu.powerUps[index].description          

            mu.cost.innerHTML = Math.round(mu.parsedCost * 2.5 * 1.004 ** parseFloat(mu.level.innerHTML).toFixed(2))        
                    

        } else {        
            mu.cost.innerHTML = Math.round(mu.parsedCost *= mu.costMultiplier)      
            mu.parsedIncrease = parseFloat(mu.parsedIncrease * mu.coinMultiplier.toFixed(2));       

            if (mu.name === 'clicker') nextLevelP.innerHTML = `+${mu.parsedIncrease.toFixed(2)} bitcoins per click`    
            
            else nextLevelP.innerHTML = `+${mu.parsedIncrease.toFixed(2)} bitcoins per second`           
            
        }

        if (mu.name === 'clicker') btcpc += mu.parsedIncrease       
        else {              
            btcps  -= mu.power          
            mu.power += mu.parsedIncrease          
            btcps += mu.power           
        }
    }
}


function save() {       
    localStorage.clear()        
    
    upgrades.map((upgrade) => {     
        const obj = JSON.stringify({    
            parsedLevel: parseFloat(upgrade.level.innerHTML),    
            parsedCost: upgrade.parsedCost,    
            parsedIncrease: upgrade.parsedIncrease    
        })
        console.log(upgrade.name, obj)    

        localStorage.setItem(upgrade.name, obj)    
    })

    localStorage.setItem('btcpc', JSON.stringify(btcpc))    
    localStorage.setItem('btcps', JSON.stringify(btcps))    
    localStorage.setItem('coin', JSON.stringify(parsedCoin))    
}

function load() {    
    upgrades.map((upgrade) => {    
        const savedValues = JSON.parse(localStorage.getItem(upgrade.name))    

        upgrade.parsedCost = savedValues.parsedCost    
        upgrade.parsedIncrease = savedValues.parsedIncrease    

        upgrade.level.innerHTML = savedValues.parsedLevel    
        upgrade.cost.innerHTML = Math.round(savedValues.parsedCost)    
        upgrade.increase.innerHTML = savedValues.parsedIncrease    
    })
    btcpc = JSON.parse(localStorage.getItem('btcpc'))    
    btcps = JSON.parse(localStorage.getItem('btcps'))    
    parsedCoin = JSON.parse(localStorage.getItem('coin'))    

    coin.innerHTML = Math.round(parsedCoin)    
}

const timeout = (div) => {    
    setTimeout(() => {    
        div.remove()    
    }, 800);
}

setInterval(() => {    
    parsedCoin += btcps / 10    
    coin.innerHTML = Math.round(parsedCoin)    
    btcpcText.innerHTML = Math.round(btcpc)    
    btcpsText.innerHTML = Math.round(btcps);    
    bgm.play()    
}, 100)

skillsNavButton.addEventListener('click', function() {
    const upgradesContainer = document.querySelectorAll('.upgrade')

    upgradesContainer.forEach((container) => {
        if (container.classList.contains('type-skill')) container.style.display = 'flex'
        else container.style.display = "none" 
    })
})

upgradesNavButton.addEventListener('click', function() {
    const upgradesContainer = document.querySelectorAll('.upgrade')
    upgradesContainer.forEach((container) => {
        if (container.classList.contains('type-upgrade')) container.style.display = 'flex'
        else container.style.display = 'none'
    })
})

artifactNavButton.addEventListener('click', function() {
    const upgradesContainer = document.querySelectorAll('.upgrade')
    upgradesContainer.forEach((container) => {
        if (container.classList.contains('type-artifact')) container.style.display = 'flex'
        else container.style.display = 'none'
    })
})





window.incrementalCoin = incrementalCoin    
window.buyUpgrade = buyUpgrade    
window.save = save    
window.load = load    