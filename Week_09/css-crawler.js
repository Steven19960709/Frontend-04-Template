function happen(element, event) {
  return new Promise((resolve) => {
    let handler = () => {
      resolve()
      element.removeEventListener(event, handler)
    }
    element.addEventListener(event, handler)
  })
}
