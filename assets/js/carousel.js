swapClasses = (el, remove, add) => { el.classList.remove(remove); el.classList.add(add)}
getLeft = () => document.querySelector('.left')
getCurrent = () => document.querySelector('.current')
getRight = () => document.querySelector('.right')
gotoNext = () => {
  let left = getLeft()
  let current = getCurrent()
  let right = getRight()

  swapClasses(left, 'left', 'right')
  swapClasses(current, 'current', 'left')
  swapClasses(right, 'right', 'current')

  setCard(left, getCard(right.getAttribute('index')))
}
getCard = index => {
  index++
  if (!texts[index]) index = 0

  return index
}
setCard = (el, index) => {
  el.innerText = texts[index]
  el.setAttribute('index', index)
}
texts = ['text 1', 'text 2', 'text 3', 'text 4', 'text 5']

setCard(getLeft(), 4)
// setCard(getCurrent(), 0)
setCard(getRight(), 1)