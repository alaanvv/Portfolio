swapClasses = (el, remove, add) => { el.classList.remove(remove); el.classList.add(add) }
getLeft = () => document.querySelector('.left')
getCurrent = () => document.querySelector('.current')
getRight = () => document.querySelector('.right')
gotoNext = () => {
  let left = getLeft()
  let current = getCurrent()
  let right = getRight()

  left.classList.remove('front')
  current.classList.add('front')
  right.classList.add('front')

  swapClasses(left, 'left', 'right')
  swapClasses(current, 'current', 'left')
  current.classList.remove('centered')
  setTimeout(() => {
    getCurrent().classList.add('centered')
  }, 1000)
  swapClasses(right, 'right', 'current')

  setTimeout(e => { setCard(left, getCard(right.getAttribute('index'))) }, 350)  
}
gotoPrevious = () => {
  let left = getLeft()
  let current = getCurrent()
  let right = getRight()

  left.classList.add('front')
  current.classList.add('front')
  right.classList.remove('front')

  swapClasses(left, 'left', 'current')
  swapClasses(current, 'current', 'right')
  current.classList.remove('centered')
  setTimeout(() => {
    getCurrent().classList.add('centered')
  }, 1000)
  swapClasses(right, 'right', 'left')

  setTimeout(e => { setCard(right, getPreviousCard(left.getAttribute('index'))) }, 500)
}
getCard = index => {
  index++
  if (!cards[index]) index = 0

  return index
}
getPreviousCard = index => {
  index--
  if (index < 0) index = cards.length - 1

  return index
}
setCard = (el, index) => {
  const { title, desc, img, links} = cards[index]
  linksStr = ''
  for (link of links) linksStr += `<a href="${link.url}"><div class="link"> ${link.label} </div></a> `
  el.innerHTML = `<img src="${img}">
 <div class="desc">
   <h3> ${title} </h3>
   <p> ${desc} </p>
   <div class='links'> ${linksStr} </div>
 </div>`
  el.setAttribute('index', index)
}
cards = [
  {
    title: 'Cowboy Bebop',
    desc: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
    Sapiente quae consequatur cumque temporibus soluta optio harum voluptas 
    modi placeat officiis architecto, nobis beatae repudiandae iure tempore, 
    non laudantium minima inventore.`,
    img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn-images-1.medium.com%2Fmax%2F1200%2F1*JiwqeTFtKeLdibEZ6wAe2g.jpeg&f=1&nofb=1&ipt=63be51d8498ec4b23407eae282e0a45e644d165eaaa92f835a1b4eba4680280e&ipo=images',
    links: [
      { label: 'Github', url: '#' },
      { label: 'Links', url: '#' }
    ]
  },
  {
    title: 'Verse Music',
    desc: `Verse-Music is a discord music-bot that supports a lot of sources, including Youtube and Spotify. <br>
    It have a favorite playlist system that is really helpful.  <br> A lot of useful commands as .lyrics and .move x to y.  <br>
    A easy guide to install it can be found in my github repository.`,
    img: './assets/img/verse-music.png',
    links: [
      { label: 'Github', url: 'https://github.com/alaanvv/Verse-Music' },
      { label: 'Youtube', url: 'https://www.youtube.com/watch?v=7cUM4XovTSY' }
    ]
  },
  {
    title: 'Solar System Orbits',
    desc: `It's a website that shows our solar-system orbits in a minimalist way. <br>
    I made this site just to fix some techniques about CSS, as the background stars, that is a lot of box-shadows. <br>
    I just used JS to simplify some calculus but i could do it just by using HTML and CSS.`,
    img: './assets/img/orbit.png',
    links: [
      { label: 'Github', url: 'https://github.com/alaanvv/Solar-System-Orbits' },
      { label: 'Site', url: 'https://alaanvv.github.io/Solar-System-Orbit' }
    ]
  },
  {
    title: 'Five Nights At Catty\'s',
    desc: `One of my best and most dedicated browser games. <br>
    It's a FNAF fan game that I made using only photos that I
    taked inside my own home. <br>
    I was trying to make it scary as a joke but i feel it's really scary now <br>
    It was made using only JS.`,
    img: './assets/img/fnac.png',
    links: [
      { label: 'Github', url: 'https://github.com/alaanvv/Five-Nights-At-Cattys' },
      { label: 'Site', url: 'https://f-n-a-c.netlify.app' }
    ]
  },
  {
    title: 'Free Fire 2',
    desc: `My famous and most classic browser game.
    Probably my first project ever made, a creative and immersive game made with vanilla JS.
    Even being a simple site, it means a lot to me.`,
    img: './assets/img/ff.png',
    links: [
      { label: 'Github', url: 'https://github.com/alaanvv/Free-Fire' },
      { label: 'Site', url: 'https://alaanvv.github.io/Free-Fire/' }
    ]
  },
]

setCard(getLeft(), cards.length - 1)
setCard(getCurrent(), 0)
setCard(getRight(), getCard(0))
let x
document.addEventListener('click', e => {
  if (e.target.classList.contains('right') || e.target.parentElement.classList.contains('right')) {
    gotoNext()
  }
  if (e.target.classList.contains('left') || e.target.parentElement.classList.contains('left')) {
    gotoPrevious()
  }
})
