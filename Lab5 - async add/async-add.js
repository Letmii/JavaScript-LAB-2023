const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]

async function asyncAdd(...args) {
  let result = args[0]
  // console.log(result)

  for (let i = 1; i < args.length; i++) {
      result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(result + args[i])
        }, 10)
      })
      // console.log(result)
    }
    return result
  }
  
  async function addTwoNumbersAsync(a, b) {
    const result = await asyncAdd(a, b)
    console.log('Wynik dodawania:', result)
  }

  async function addAnyNumbersAsync(...args) {
    const result = await asyncAdd(...args)
    console.log('Wynik dodawania:', result)
  }
  
  async function measurePerformance(func) {
    const startTime = performance.now()
    await func()
    const endTime = performance.now()
    const executionTime = endTime - startTime
    console.log(`Czas wykonania: ${executionTime.toFixed(4)} milisekundy`)
  }
  
  await measurePerformance(() => addTwoNumbersAsync(5, 7))
  await measurePerformance(() => addAnyNumbersAsync(2, 4, 6, 8))
  await measurePerformance(() => addAnyNumbersAsync(...data))