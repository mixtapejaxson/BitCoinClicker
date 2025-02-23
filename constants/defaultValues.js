export const defaultUpgradeValues = [
    {name: 'clicker', image: './Assets/pointer.png', cost: 10, increase: 1, type: "upgrade"},
    {name: 'pickaxe', image: './Assets/Pickaxe.png', cost: 60, increase: 4, type: "upgrade"},
    {name: 'miner', image: './Assets/Miner.png', cost: 480, increase: 32, type: "upgrade"},
    {name: 'factory', image: './Assets/Factory.png', cost: 4240, increase: 410, type: "upgrade"},
    {name: 'potion', image: './Assets/potion.png', cost: 52800, increase: 5500, type: "upgrade"}
]

export const defaultSkillValues = [
    {
        name: "Stronger Clicks",
        description: "Double you clicking power for 30 seconds",
        image: "/Assets/Stronger-Clicks.png",
        cooldown: 600,
        cost: 12000,
        type: 'skill'
    },
    {
        name: "Lucky Day",
        description: "Gain 600 time your Bitcoins Per Second Instantly",
        image: "/Assets/lucky-day.png",
        cooldown: 1200,
        cost: 480000,  
        type: 'skill'
    }
]

export const defaultArtifactValues = [
    {
        name: "Artifact 1",
        description: "Permanently increase all bitcoins gained by x amount",
        image: "",
        type: 'artifact'
    }
]