import { WebGLRenderer, Scene, PerspectiveCamera, BufferGeometry, Line } from 'https://unpkg.com/three/build/three.module.js'

class CubeRain {
  generatePoints = (posArr) => {
    return posArr.map(pos => ({ x: pos[0], y: pos[1], z: pos[2] }))
  }
  createLine = (points, pos = null, rotation = null, move = null) => {
    const geometry = new BufferGeometry().setFromPoints(points)
    const line = new Line(geometry)

    if (pos) {
      line.position.x = pos.x || 0
      line.position.y = pos.y || 0
      line.position.z = pos.z || 0
    }

    line.rotationSpd = {}
    line.rotationSpd.x = rotation.x || 0
    line.rotationSpd.y = rotation.y || 0
    line.rotationSpd.z = rotation.z || 0

    line.moveSpd = {}
    line.moveSpd.x = move.x || 0
    line.moveSpd.y = move.y || 0
    line.moveSpd.z = move.z || 0

    return line
  }
  createCube = (size = 1, pos = null, rotation = null, move = null) => {
    const points = this.generatePoints([
      [0, 0, 0], [0, size, 0], [size, size, 0], [size, 0, 0],
      [0, 0, 0], [0, 0, size], [size, 0, size], [size, 0, 0],
      [size, 0, size], [size, size, size], [size, size, 0], [size, size, size],
      [0, size, size], [0, size, 0], [0, size, size], [0, 0, size]
    ])

    if (!pos) pos = {}
    pos.x = pos.x - size / 2 || -size / 2
    pos.y = pos.y - size / 2 || -size / 2
    pos.z = pos.z - size / 2 || -size / 2

    return this.createLine(points, pos, rotation, move)
  }
  randomCubeParams = () => {
    let size = Math.random() * (this.cubeConfig.size.max - this.cubeConfig.size.min) + this.cubeConfig.size.min
    let pos = {
      x: Math.random() * (this.cubeConfig.pos.x.max - this.cubeConfig.pos.x.min) + this.cubeConfig.pos.x.min,
      y: Math.random() * (this.cubeConfig.pos.y.max - this.cubeConfig.pos.y.min) + this.cubeConfig.pos.y.min,
      z: Math.random() * (this.cubeConfig.pos.z.max - this.cubeConfig.pos.z.min) + this.cubeConfig.pos.z.min
    }
    let rotation = {
      x: Math.random() * (this.cubeConfig.rotation.x.max - this.cubeConfig.rotation.x.min) + this.cubeConfig.rotation.x.min,
      y: Math.random() * (this.cubeConfig.rotation.y.max - this.cubeConfig.rotation.y.min) + this.cubeConfig.rotation.y.min,
      z: Math.random() * (this.cubeConfig.rotation.z.max - this.cubeConfig.rotation.z.min) + this.cubeConfig.rotation.z.min
    }
    let move = {
      x: Math.random() * (this.cubeConfig.move.x.max - this.cubeConfig.move.x.min) + this.cubeConfig.move.x.min,
      y: Math.random() * (this.cubeConfig.move.y.max - this.cubeConfig.move.y.min) + this.cubeConfig.move.y.min,
      z: Math.random() * (this.cubeConfig.move.z.max - this.cubeConfig.move.z.min) + this.cubeConfig.move.z.min
    }

    return [size, pos, rotation, move]
  }
  /** Start the animation in the param element (if none start in the body) ``` */
  init = (el = document.body) => {
    const renderer = new WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    this.canvas = renderer.domElement
    el.appendChild(this.canvas)

    // Scene
    const scene = new Scene()
    const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 10


    const cubes = []
    for (let i = 0; i < this.cubeConfig.num; i++) {
      let cube = this.createCube(...this.randomCubeParams())
      scene.add(cube)

      cubes.push(cube)
    }

    // Animation
    function animate() {
      requestAnimationFrame(animate)

      for (let cube of cubes) {
        cube.rotation.x += cube.rotationSpd.x
        cube.rotation.y += cube.rotationSpd.y
        cube.rotation.z += cube.rotationSpd.z

        cube.position.x += cube.moveSpd.x
        cube.position.y += cube.moveSpd.y
        cube.position.z += cube.moveSpd.z
      }

      renderer.render(scene, camera)
    }
    animate()
  }

  canvas = undefined
  cubeConfig = {
    num: 100,
    size: { max: 3, min: 0.5 },
    pos: {
      x: { max: 6, min: -6 },
      y: { max: 100, min: -5 },
      z: { max: 5, min: -5 }
    },
    rotation: {
      x: { max: .001, min: -.001 },
      y: { max: .001, min: -.001 },
      z: { max: .001, min: -.001 }
    },
    move: {
      x: { max: 0, min: -0 },
      y: { max: -0.01, min: -0.01 },
      z: { max: 0, min: -0 }
    }
  }
}

const cubeRain = new CubeRain()
cubeRain.cubeConfig = {
  num: 1000, // Number of cubes
  size: { max: 3, min: .5 }, // Cube size
  pos: { // Start position
    x: { max: 10, min: -10 },
    y: { max: 10, min: -500 },
    z: { max: 30, min: 1 }
  },
  rotation: { // Rotation speed
    x: { max: .001, min: .001 },
    y: { max: .001, min: .001 },
    z: { max: .001, min: .001 }
  },
  move: { // Movement speed
    x: { max: 0, min: 0 },
    y: { max: .02, min: .02 },
    z: { max: 0, min: 0 }
  }
}
cubeRain.init(document.querySelector('.projects'))

window.onresize = () => {
  cubeRain.canvas.removeAttribute('style')
  cubeRain.canvas.width = window.getComputedStyle(cubeRain.canvas).width.replace('px', '')
  cubeRain.canvas.height = window.getComputedStyle(cubeRain.canvas).height.replace('px', '')
}