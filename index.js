import { upgrades } from "./constants/upgrades.js";

let coin = document.querySelector('.coin-cost');
let parsedCoin = parseFloat(coin.innerHTML);

let btcpcText = document.getElementById('btcpc-text')
let btcpsText = document.getElementById('btcps-text')

let coinImgContainer = document.querySelector('.coin-img-container')

let btcpc = 1;
let btcps = 0;

function incrementalCoin(event) {
    coin.innerHTML = Math.round(parsedCoin += btcpc);

    const x = event.offsetX
    const y = event.offsetY

    const div = document.createElement('div')
    div.innerHTML = `+${Math.round(btcpc)}`
    div.style.cssText = `color: white; position: absolute; top: ${y}px; left: ${x}px; font-size: 15px; pointer-events: none;`
    coinImgContainer.appendChild(div)

    div.classList.add('fade-up')

    timeout(div)
}

function buyUpgrade(upgrade) {
    const mu = upgrades.find((u) => {
        if (u.name === upgrade) return u
    })

    if (parsedCoin >= mu.parsedCost) {
        coin.innerHTML = Math.round(parsedCoin -= mu.parsedCost);
        
        mu.level.innerHTML ++

        mu.parsedIncrease = parseFloat(mu.parsedIncrease * mu.coinMultiplier.toFixed(2));
        mu.increase.innerHTML = mu.parsedIncrease

        mu.parsedCost *= mu.costMultiplier;
        mu.cost.innerHTML = Math.round(mu.parsedCost)
        
        if(mu.name === 'clicker') {
            btcpc += mu.parsedIncrease
        }
        else {
            btcps += mu.parsedIncrease
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
}, 100);


window.incrementalCoin = incrementalCoin
window.buyUpgrade = buyUpgrade
window.save = save
window.load = load
