const appRoot = document.querySelector('#__next, #root') // The root element of the React app (Next.js or MFE React app)
const pageElements = appRoot.querySelectorAll('*')

// Avoid modifying iframe, SVG and other elements that don't have or need a font-size
const validElements = ['DIV', 'SPAN', 'A', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'INPUT', 'SELECT', 'BUTTON']

function reduceSize(element, amount) {
  const currentSize = parseInt(getComputedStyle(element)?.fontSize) ?? 0

  if (currentSize === 0 || !validElements.includes(element.tagName)) return
  element.style.fontSize = `${currentSize - amount}px`
}

function modifySize(amount) {
  // 1. Iterate over all elements on the page
  Array.from(pageElements).forEach((element) => {
    // 2. If the element is a shadow root host, get the children and apply the reduced font sizing to each
    if (element.shadowRoot) {
      const shadowElements = element.shadowRoot.querySelectorAll('*')

      shadowElements.forEach((shadowElement) => {
        reduceSize(shadowElement, amount)
      })
    }

    // 3. Apply the reduced font sizing logic to the element from the light DOM
    reduceSize(element, amount)
  })
}

modifySize(5) // px value (using 5px to make it obvious what has changed)
