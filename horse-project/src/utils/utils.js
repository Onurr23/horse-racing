export function calculateSpeedPerTick(condition, distance) {
    const baseSpeed = 8.57
    const conditionFactor = 1 + (condition / 100) 
    const randomNoise = (Math.random() - 0.5) * 0.5
    const distanceFactor = 1200 / distance 
  
    const finalSpeed = baseSpeed * (conditionFactor + randomNoise) * distanceFactor
  
    return finalSpeed 
  }

  export function getRandomCondition() {
    return Math.floor(Math.random() * 100) + 1 // 1–100
}

export function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}
  