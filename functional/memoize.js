const memoize = (fn) => {
  let cache = {}

  return (...args) => {
    const key = `${fn.name}-${args}`

    if (key in cache) {
      console.log("Memoized result", cache[key])
      return cache[key]
    } else {
      let result = fn(...args) // Call the saved fn with our args from the memoize call
      cache[key] = result
      console.log("Non-memoized result", result)
    }
  }
}

function add(...args) {
  const sum = (x, y) => x + y
  return args.reduce(sum, 0)
}

// Memoize the function, then invoke this with the additional arguments
let memoizedAdd = memoize(add)

memoizedAdd(3, 3) // New args, returns un-memoized sum (6)
memoizedAdd(4, 3) // New args, returns un-memoized sum (7)
memoizedAdd(3, 3) // Cached args, returns memoized sum (6)
