
import { defaultValues } from "./defaultValues.js";
function createUpgrades() {
    const upgradesContainer = document.getElementById('upgrades-container')
    const template = document.getElementById('upgrade-template').textContent

    defaultValues.forEach(obj => {
        let html = template;

        Object.keys(obj).forEach((key => {
           const regex = new RegExp(`{{${key}}}`, 'g');
           html = html.replace(regex, obj[key])
        }));

        upgradesContainer.innerHTML += html
    })
}

createUpgrades()

export const upgrades = [
    {
        name: 'clicker',
        cost: document.querySelector('.clicker-cost'),
        parsedCost: parseFloat(document.querySelector('.clicker-cost').innerHTML),
        increase: document.querySelector('.clicker-increase'),
        parsedIncrease: parseFloat(document.querySelector('.clicker-increase').innerHTML),
        level: document.querySelector('.clicker-level'),
        coinMultiplier: 1.025,
        costMultiplier: 1.12
    },
    {
        name: 'pickaxe',
        cost: document.querySelector('.pickaxe-cost'),
        parsedCost: parseFloat(document.querySelector('.pickaxe-cost').innerHTML),
        increase: document.querySelector('.pickaxe-increase'),
        parsedIncrease: parseFloat(document.querySelector('.pickaxe-increase').innerHTML),
        level: document.querySelector('.pickaxe-level'),
        coinMultiplier: 1.03,
        costMultiplier: 1.115
    },
    {
        name: 'miner',
        cost: document.querySelector('.miner-cost'),
        parsedCost: parseFloat(document.querySelector('.miner-cost').innerHTML),
        increase: document.querySelector('.miner-increase'),
        parsedIncrease: parseFloat(document.querySelector('.miner-increase').innerHTML),
        level: document.querySelector('.miner-level'),
        coinMultiplier: 1.035,
        costMultiplier: 1.11
    },
    {
        name: 'factory',
        cost: document.querySelector('.factory-cost'),
        parsedCost: parseFloat(document.querySelector('.factory-cost').innerHTML),
        increase: document.querySelector('.factory-increase'),
        parsedIncrease: parseFloat(document.querySelector('.factory-increase').innerHTML),
        level: document.querySelector('.factory-level'),
        coinMultiplier: 1.04,
        costMultiplier: 1.40
    }
]