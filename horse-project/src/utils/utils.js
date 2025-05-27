export function calculateSpeedPerTick(condition, distance) {
    const baseSpeed = 8.57
    const conditionFactor = 1 + (condition / 100) 
    const randomNoise = (Math.random() - 0.5) * 0.2 
    const distanceFactor = 1200 / distance 
  
    const finalSpeed = baseSpeed * (conditionFactor + randomNoise) * distanceFactor
  
    return finalSpeed 
  }
  