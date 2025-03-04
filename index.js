import { powerUpIntervals, upgrades } from "./constants/upgrades.js";    
import { defaultUpgradeValues } from "./constants/defaultValues.js";  
import { defaultSkillValues } from "./constants/defaultValues.js";
import { defaultArtifactValues } from "./constants/defaultValues.js";

let coin = document.querySelector('.coin-cost');         
let parsedCoin = parseFloat(coin.innerHTML);         

let btcpcText = document.getElementById('btcpc-text')       
let btcpsText = document.getElementById('btcps-text')       

let coinImgContainer = document.querySelector('.coin-img-container')        

let prestigeButton = document.querySelector('.prestige-button')

let btcpc = 1;      
let btcps = 0;   

let cooldownActiveStrongerClicks = false;
let cooldownActiveLuckyDay = false;

let cooldownStrongerClicks = 6000;
let cooldownLuckyDay = 1000000;

let stopTimeStrongerclicks = 30000;

let upgradesNavButton = document.getElementById('upgrades-nav-button')
let skillsNavButton = document.getElementById('skills-nav-button')
let artifactNavButton = document.getElementById('artifacts-nav-button')

let relic = document.getElementById('relic')
let parsedRelic = parseFloat(relic.innerHTML)

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


function buySkill(skillName) {
    const skillData = defaultSkillValues.find((s) => s.name === skillName);

    if (!skillData) {
        console.error('Skill not found:', skillName);
        return;
    }

    const skillDiv = document.getElementById(`${skillData.name}-skill`);
    const nextLevelSkillDiv = document.getElementById(`${skillData.name}-next-level`);

    if (parsedCoin >= skillData.parsedCost) {
        if (skillData.name === 'stronger clicks') {
            if (!cooldownActiveStrongerClicks) {
                coin.innerHTML = Math.round(parsedCoin -= skillData.parsedCost);
                const originalBtcpc = btcpc;

                let originalCooldownStrongerClicks = cooldownStrongerClicks;

                const skillSound = new Audio('./audio/upgrade.mp3');
                skillSound.volume = 0.25;
                skillSound.play();

                btcpc *= 2;
                console.log('cooldown = true');
                cooldownActiveStrongerClicks = true;

                nextLevelSkillDiv.style.cssText = `background-color:rgb(19, 170, 52); font-weight: bold`;
                skillDiv.style.display = 'flex';
                skillDiv.style.borderColor = 'rgb(34, 214, 73)';

                alert('Stronger Clicks is active for 30 seconds!');

                setInterval(() => { cooldownStrongerClicks -= 1000; }, 1000);

                setTimeout(() => {
                    btcpc = originalBtcpc;
                    console.log('btcpc is back to normal')

                    nextLevelSkillDiv.style.cssText = `background-color:rgb(217, 231, 15); font-weight: bold`;
                    skillDiv.style.borderColor = 'yellow';

                }, stopTimeStrongerclicks);

                setTimeout(() => {
                    console.log('cooldown = false');
                    cooldownActiveStrongerClicks = false;
                    alert('You can use Stronger Clicks again!');

                    nextLevelSkillDiv.style.cssText = `background-color: #5a5959; font-weight: normal`;
                    skillDiv.style.borderColor = 'white';
                    cooldownStrongerClicks = originalCooldownStrongerClicks;
                }, originalCooldownStrongerClicks);

            } else {
                alert('The cooldown is still active for Stronger Clicks! ' + '(' + (cooldownStrongerClicks / 1000).toFixed(0) + ' seconds remaining)');
            }
        } else if (skillData.name === 'lucky-day') {
            if (!cooldownActiveLuckyDay) { 
                parsedCoin += btcps * 600;
                coin.innerHTML = Math.round(parsedCoin).toFixed(2);

                let originalCooldownLuckyDay = cooldownLuckyDay;

                console.log('cooldown = true');
                cooldownActiveLuckyDay = true;

                nextLevelSkillDiv.style.cssText = `background-color:rgb(19, 170, 52); font-weight: bold`;
                skillDiv.style.display = 'flex';
                skillDiv.style.borderColor = 'rgb(34, 214, 73)';

                const skillSound = new Audio('./audio/upgrade.mp3');
                skillSound.volume = 0.25;
                skillSound.play();

                alert('You gained 600 times your Bitcoins Per Second instantly!');

                setInterval(() => { cooldownLuckyDay -= 1000; }, 1000);

                setTimeout(() => {
                    console.log('cooldown = false');
                    cooldownActiveLuckyDay = false;
                    alert('You can use Lucky Day again!');
                    nextLevelSkillDiv.style.cssText = `background-color: #5a5959; font-weight: normal`;
                    skillDiv.style.borderColor = 'white';
                    cooldownLuckyDay = originalCooldownLuckyDay;
                }, originalCooldownLuckyDay);
            } else {
                alert('The cooldown is still active for Lucky Day! ' + '(' + (cooldownLuckyDay / 1000).toFixed(0) + ' seconds remaining)');
            }
        }
    } else {
        console.error("This doesn't work like that");
    }
}



function buyArtifact(artifactName) {
    
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


function prestige() {
    upgrades.map((upgrade) => {
        const mu = defaultUpgradeValues.find((u) => {if(upgrade.name === u.name) return u})
            
        upgrade.parsedCost = mu.cost    
        upgrade.parsedIncrease = mu.increase    

        upgrade.level.innerHTML = 0   
        upgrade.cost.innerHTML = mu.cost
        upgrade.increase.innerHTML = mu.increase  

        const upgradeDiv = document.getElementById(`${mu.name}-upgrade`)        
        const nextLevelDiv = document.getElementById(`${mu.name}-next-level`)       
        const nextLevelP = document.getElementById(`${mu.name}-next-p`)
        
        upgradeDiv.style.cssText = `border-color: white`;       
        nextLevelDiv.style.cssText = `background-color: #5a5959; font-weight: normal`;   

        nextLevelP.innerHTML = `+${mu.increase.toFixed(2)} bitcoins per click`

    })

    relic.innerHTML = Math.ceil(Math.sqrt(parsedCoin - 999_999) / 300)

    btcpc = 1
    btcps = 0
    parsedCoin = 0
    coin.innerHTML = parsedCoin
}

function handleBuy(type, name) {
    if (type === 'upgrade') {
        buyUpgrade(name);
    } else if (type === 'skill') {
        buySkill(name);
    } else if (type === 'artifact') {
        buyArtifact(name);
    } else {
        console.error('Unknown type:', type);
    }
}

setInterval(() => {    
    parsedCoin += btcps / 10    
    coin.innerHTML = Math.round(parsedCoin)    
    btcpcText.innerHTML = Math.round(btcpc)    
    btcpsText.innerHTML = Math.round(btcps);    
    bgm.play()    

    if (parsedCoin >= 1_000_000) {
        prestigeButton.style.display = 'block' 
    } else {
        prestigeButton.style.display = 'none' 
    }
}, 100)

const timeout = (div) => {    
    setTimeout(() => {    
        div.remove()    
    }, 800);
}

upgradesNavButton.addEventListener('click', function() {
    const upgradesContainer = document.querySelectorAll('.upgrade')
    upgradesContainer.forEach((container) => {
        if (container.classList.contains('type-upgrade')) container.style.display = 'flex'
        else container.style.display = 'none'
    })
})

skillsNavButton.addEventListener('click', function() {
    const upgradesContainer = document.querySelectorAll('.upgrade')

    upgradesContainer.forEach((container) => {
        if (container.classList.contains('type-skill')) container.style.display = 'flex'
        else container.style.display = "none" 
        })
})

artifactNavButton.addEventListener('click', function() {
    const upgradesContainer = document.querySelectorAll('.upgrade')
    upgradesContainer.forEach((container) => {
        if (container.classList.contains('type-artifact')) container.style.display = 'flex'
        else container.style.display = 'none'
    })
})

document.getElementById('skills-nav-button').addEventListener('click', function() {
    const levelSections = document.querySelectorAll('.right-section');


    levelSections.forEach(section => {
        section.style.display = 'none';
    });
});

document.getElementById('upgrades-nav-button').addEventListener('click', function() {
    const levelSections = document.querySelectorAll('.right-section'); 

    levelSections.forEach(section => {
        section.style.display = 'block'; 
    });
});

document.getElementById('artifacts-nav-button').addEventListener('click', function() {
    const levelSections = document.querySelectorAll('.right-section'); 

    levelSections.forEach(section => {
        section.style.display = 'block'; 
    });
});



window.incrementalCoin = incrementalCoin;
window.buyUpgrade = buyUpgrade;    
window.save = save;    
window.load = load;  
window.prestige = prestige;
window.buySkill = buySkill;
window.buyArtifact = buyArtifact;
window.handleBuy = handleBuy;