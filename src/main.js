// =====================================
//
//  ##  ##  ##    ##  ##      #####
//  ## ##    ##  ##   ##      ##
//  ####      ####    ##      #####
//  ## ##      ##     ##      ##
//  ##  ##     ##     ######  #####
//
// =====================================

const repeat = n => [...Array(n)].map((_, i) => i)
const compose = (...fns) => initial => fns.reduceRight((args, fn) => fn(args), initial)

const IDLE = 'idle'
const ATTACKING = 'attack'
const DYING = 'dying'
const EXPLODING = 'exploding'
const JUMPING = 'jumping'
const WALKING = 'walking'
const RUNNING = 'running'
const GOOD = 'good'
const BAD = 'bad'
const MEDIUM = 'medium'

const MOVE_LEFT = 'left'
const MOVE_RIGHT = 'right'
const JUMP = 'jump'
const CROUCH = 'crouch'
const ATTACK = 'attack'
const SWORD = 'SWORD'

const PLAYER_KEYS = {
  w: JUMP,
  a: MOVE_LEFT,
  s: CROUCH,
  d: MOVE_RIGHT,
  q: ATTACK,
  e: SWORD
}

const PAUSED = 'paused'
const STARTED = 'started'
const ENDED = 'ended'

const PLAYER_1 = 0
const PLAYER_2 = 1

const BACKGROUND_SKY = 'Sky'
const BACKGROUND_GROUND = 'Ground'
const BACKGROUND_CLOUDS = 'Clouds'

const GAME_HEIGHT = 720
const GAME_WIDTH = 1280

const GROUND = {y: GAME_HEIGHT - 100}
const GRAVITY = {x: 0, y: 0.4}
const FRICTION = {x: 0.5, y: 0}
const MAX_CAMERA_TO_PLAYER = GAME_WIDTH - 400
const MIN_CAMERA_TO_PLAYER = 200
const TOLERANCE = 15

const FONT_NAME = 'Zorque'

const GROUND_IMAGE = 'images/Background Layers/Ground.png'
const SKY_IMAGE = 'images/Background Layers/Sky.png'
const CLOUDS_IMAGE = 'images/Background Layers/Clouds.png'
const BALL0_IDLE = 'images/Balloons/Balloons_01_64x64_Alt_00_004.png'
const BALL0_JUMPING = 'images/Balloons/Balloons_01_64x64_Alt_00_005.png'
const BALL0_WALKING = 'images/Balloons/Balloons_01_64x64_Alt_00_006.png'
const BALL0_RUNNING = 'images/Balloons/Balloons_01_64x64_Alt_00_007.png'
const BALL1_IDLE = 'images/Balloons/Balloons_01_64x64_Alt_01_004.png'
const BALL1_JUMPING = 'images/Balloons/Balloons_01_64x64_Alt_01_005.png'
const BALL1_WALKING = 'images/Balloons/Balloons_01_64x64_Alt_01_006.png'
const BALL1_RUNNING = 'images/Balloons/Balloons_01_64x64_Alt_01_007.png'
const BALL2_IDLE = 'images/Balloons/Balloons_01_64x64_Alt_02_004.png'
const BALL2_JUMPING = 'images/Balloons/Balloons_01_64x64_Alt_02_005.png'
const BALL2_WALKING = 'images/Balloons/Balloons_01_64x64_Alt_02_006.png'
const BALL2_RUNNING = 'images/Balloons/Balloons_01_64x64_Alt_02_007.png'
const BALL3_IDLE = 'images/Balloons/Balloons_01_64x64_Alt_03_004.png'
const BALL3_JUMPING = 'images/Balloons/Balloons_01_64x64_Alt_03_005.png'
const BALL3_WALKING = 'images/Balloons/Balloons_01_64x64_Alt_03_006.png'
const BALL3_RUNNING = 'images/Balloons/Balloons_01_64x64_Alt_03_007.png'
const BALL4_IDLE = 'images/Balloons/Balloons_01_64x64_Alt_04_004.png'
const BALL4_JUMPING = 'images/Balloons/Balloons_01_64x64_Alt_04_005.png'
const BALL4_WALKING = 'images/Balloons/Balloons_01_64x64_Alt_04_006.png'
const BALL4_RUNNING = 'images/Balloons/Balloons_01_64x64_Alt_04_007.png'
const BALL_DYING = ['images/fire/File', 30]
const PLAYER_1_IMAGES = ['images/Player/1_IDLE_00', 5]
const PLAYER_1_WALKING_IMAGES = ['images/Player/2_WALK_00', 5]
const PLAYER_1_RUNNING_IMAGES = ['images/Player/3_RUN_00', 5]
const PLAYER_1_JUMPING_IMAGES = ['images/Player/4_JUMP_00', 5]
const PLAYER_1_ATTACK_IMAGES = ['images/Player/5_ATTACK_00', 5]
const PLAYER_1_DYING_IMAGES = ['images/Player/7_DIE_00', 5]
const PLAYER_1_IMAGES_F = ['images/Player Flip/1_IDLE_00', 5]
const PLAYER_1_WALKING_IMAGES_F = ['images/Player Flip/2_WALK_00', 5]
const PLAYER_1_RUNNING_IMAGES_F = ['images/Player Flip/3_RUN_00', 5]
const PLAYER_1_JUMPING_IMAGES_F = ['images/Player Flip/4_JUMP_00', 5]
const PLAYER_1_ATTACK_IMAGES_F = ['images/Player Flip/5_ATTACK_00', 5]
const PLAYER_1_DYING_IMAGES_F = ['images/Player Flip/7_DIE_00', 5]
const PLAYER_2_IMAGES = ['images/Terror/idle/2_terrorist_2_Idle_00', 8]
const PLAYER_2_DYING_IMAGES = ['images/Terror/hurt/2_terrorist_2_Hurt_00', 9]
const PLAYER_2_WALKING_IMAGES = ['images/Terror/run/2_terrorist_2_Run_00', 6]
const PLAYER_2_JUMPING_IMAGES = ['images/Terror/jump/2_terrorist_2_Jump_00', 8]

const utils = {
  randomColor () {
    const r = ~~(Math.random() * 255)
    const g = ~~(Math.random() * 255)
    const b = ~~(Math.random() * 255)
    const a = Math.random()
    return `rgba(${r}, ${g}, ${b}, ${a})`
  },

  getPlayerFromKey: key => PLAYER_KEYS.indexOf(key),

  random: (min = 0, max = 1) =>
    Math.round(min + Math.random() * (max - min)),

  updateText: ($, text) => {
    $.innerText = text
  },

  newCanvas: $ => {
    const canvas = document.createElement('canvas')
    ;[canvas.height, canvas.width] = [GAME_HEIGHT, GAME_WIDTH]
    $.appendChild(canvas)
    return canvas
  },

  newImageFromPath: path => {
    const image = document.createElement('img')
    image.src = path
    return image
  },

  lt: (a, b) => a < b,

  gt: (a, b) => a > b,

  newImagesFromPath: ([path, count]) => {
    return repeat(count).map(index => utils.newImageFromPath(`${path}${index}.png`))
  },

  flip: fn => (...args) => fn(args.reverse()),

  wait: ms => new Promise((resolve, reject) => setTimeout(resolve, ms)),

  isObject: val => val instanceof Object && val.constructor === Object && !Array.isArray(val),

  modulus: (a, b) => (((a % b) + b) % b),

  mergeProps: function assign (target, source) {
    return Object.keys(source).reduce((target, prop) => {
      target[prop] =
          utils.isObject(source[prop])
            ? assign(target[prop] || {}, source[prop])
            : source[prop]
      return target
    }, target)
  },

  mergeFunctions: (name, target, source) => {
    const oldFunc = target[name]
    target[name] = function (...args) {
      if (oldFunc) oldFunc.call(target, ...args)
      return source[name].call(target, ...args)
    }
    return target
  },

  setState: (ctx, state) => {
    utils.mergeProps(ctx.state, state)
    return ctx
  },

  vectorAdd: (v1, v2) => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y
  }),

  vectorAddC: v1 => v2 => utils.vectorAdd(v1, v2),

  vectorSubstract: (v1, v2) => ({
    x: v1.x - v2.x,
    y: v1.y - v2.y
  }),

  vectorSubstractC: v1 => v2 => utils.vectorSubstract(v1, v2),

  vectorDot: (v1, v2) => v1.x * v2.x + v1.y * v2.y,

  vectorLength: v => Math.sqrt(v.x * v.x + v.y * v.y),

  normalize: v => {
    var s = 1 / utils.vectorLength(v)
    return {
      x: v.x * s,
      y: v.y * s
    }
  },

  vectorMultiply: (v, c) => ({
    x: v.x * c,
    y: v.y * c
  }),

  vectorMax: (v1, v2) => ({
    x: v2.x !== undefined ? Math.min(v1.x, v2.x) : v1.x,
    y: v2.y !== undefined ? Math.min(v1.y, v2.y) : v1.y
  }),

  vectorMaxC: v2 => v1 => utils.vectorMax(v1, v2),

  vectorMin: (v1, v2) => ({
    x: v2.x !== undefined ? Math.max(v1.x, v2.x) : v1.x,
    y: v2.y !== undefined ? Math.max(v1.y, v2.y) : v1.y
  }),

  vectorMinC: v2 => v1 => utils.vectorMin(v1, v2),

  vectorGT: (v, n) => Math.abs(v.x) >= n || Math.abs(v.y) >= n,

  vectorLT: (v, n) => Math.abs(v.x) <= n || Math.abs(v.y) <= n
}

const mixin = (target, source) => {
  return Object.keys(source).reduce((target, prop) => {
    if (prop === 'update') {
      return utils.mergeFunctions(prop, target, source)
    }
    target[prop] = ['state', 'props'].includes(prop)
      ? utils.mergeProps(target[prop] || {}, source[prop])
      : source[prop]

    return target
  }, target)
}

const mixinAll = (sources, target) => {
  const newObject = {}
  sources.reduce(mixin, newObject)
  return mixin(newObject, target)
}

const $ = {
  gameArea: document.getElementById('game-area'),
  pop: document.getElementById('pop'),
  hadouken: document.getElementById('hadouken'),
  lose: document.getElementById('lose'),
  killingspree: document.getElementById('killingspree'),
  danger: document.getElementById('danger'),
  rampage: document.getElementById('rampage'),
  ownage: document.getElementById('ownage'),
  unstoppable: document.getElementById('unstoppable'),
  godlike: document.getElementById('godlike'),
  theme: document.getElementById('theme')
}

const Renderable = {
  state: {
    position: {
      x: 0,
      y: 0
    },
    display: true,
    width: 0,
    height: 0,
    animation: {
      name: IDLE,
      flipped: false,
      index: 0,
      framesSkipped: 0,
      repeatCount: 0,
      duplicateCount: 0
    }
  },
  props: {
    zIndex: 0,
    animations: {
      [IDLE]: {
        images: [],
        imagesFlipped: [],
        duplicate: 0,
        delay: 0,
        repeat: 0
      }
    }
  },
  update: function () {},
  resetAnimation () {
    return utils.setState(this, {
      animation: {
        index: 0,
        framesSkipped: 0,
        repeatCount: 0
      }
    })
  },
  getBoundingRect () {
    return {
      x1: this.state.position.x,
      x2: this.state.position.x + this.getCurrentAnimationFrame().width,
      y1: this.state.position.y - this.getCurrentAnimationFrame().height,
      y2: this.state.position.y
    }
  },
  getCurrentAnimationFrame () {
    return this.getAnimationFrameAt(this.getAnimationIndex())
  },
  getCurrentAnimation () {
    const animation = this.props.animations[this.state.animation.name]
    return this.state.animation.flipped
      ? animation.imagesFlipped
      : animation.images
  },
  getAnimationIndex () {
    return this.state.animation.index
  },
  getAnimationFrameAt (index) {
    const animation = this.getCurrentAnimation()
    return animation[index % animation.length]
  },
  getAnimationProp (prop) {
    const stateProp = this.state.animation[prop]
    const propProp = this.props.animations[this.state.animation.name][prop]
    if (stateProp !== undefined) return stateProp
    if (propProp !== undefined) return propProp
    throw Error('Invalid Property')
  },
  setAnimationProp (prop, value) {
    this.state.animation[prop] = value
    return this
  },
  setAnimationIndex (index) {
    if (index >= this.getCurrentAnimation().length - 1) {
      this.incAnimationProp('repeatCount')
    }
    if (this.isAnimationDone()) {
      this.state.animation.index = this.getCurrentAnimation().length - 1
      return this
    }
    this.state.animation.index = index % this.getCurrentAnimation().length
    return this
  },
  incAnimationProp (prop) {
    if (prop === 'index') return this.incAnimationIndex()
    return this.setAnimationProp(prop, this.getAnimationProp(prop) + 1)
  },
  incAnimationIndex () {
    return this.setAnimationIndex(this.getAnimationIndex() + 1)
  },
  isAnimationDone () {
    return (this.getAnimationProp('repeatCount') >=
      this.getAnimationProp('repeat')
    )
  },
  nextFrame (doReset = false, camera) {
    if (doReset) this.resetAnimation()
    const next = this.getAnimationFrameAt(this.getAnimationIndex())
    const incrementFrame = () => {
      this.incAnimationProp('framesSkipped')
      if (this.getAnimationProp('framesSkipped') < this.getAnimationProp('delay')) return next
      this.setAnimationProp('framesSkipped', 0)
        .incAnimationIndex()
      return next
    }

    incrementFrame()
    return next
  },

  reset () {
    this.update(true)

    return utils
      .setState(this, {
        animation: {name: IDLE}
      })
      .resetAnimation()
  },

  drawParallaxLayer (ctx, position) {
    const nextFrame = this.getAnimationFrameAt(this.getAnimationIndex())
    const modX = utils.modulus(-position.x, nextFrame.width)
    const clippedWidth = Math.min(nextFrame.width - modX, GAME_WIDTH)
    const shouldDuplicate = !!this.getAnimationProp('duplicate')
    if (this.getAnimationProp('duplicateCount') > this.getAnimationProp('duplicate')) {
      if (modX === 0) this.state.display = false
      ctx.drawImage(nextFrame, -modX, position.y)
      return this
    }
    if (shouldDuplicate && modX === 0) {
      this.incAnimationProp('duplicateCount')
    }
    ctx.drawImage(nextFrame, modX, position.y, clippedWidth, GAME_HEIGHT, 0, 0, clippedWidth, GAME_HEIGHT)

    if (clippedWidth < GAME_WIDTH) {
      const remaining = GAME_WIDTH - clippedWidth
      ctx.drawImage(nextFrame, 0, position.y, remaining, GAME_HEIGHT, clippedWidth, 0, remaining, GAME_HEIGHT)
    }
    return this
  },
  nextPosition (camera) {
    return utils.vectorSubstract(this.state.position, camera.position)
  },
  drawParticle (ctx, camera) {
    const position = this.nextPosition(camera)
    if (this.state.radius <= 0) return this
    ctx.beginPath()
    ctx.arc(position.x, position.y, this.state.radius, 0, 2 * Math.PI, false)
    ctx.fillStyle = `hsla(${this.state.hue}, 100%, 50%, 1)`
    ctx.fill()
  },
  drawImage (ctx, camera) {
    if (this.props.name === 'particle') {
      return this.drawParticle(ctx, camera)
    }
    if (!this.state.display) return this
    const position = this.nextPosition(camera)
    this.getBoundingRect()

    if (this.getAnimationProp('duplicate')) {
      this.drawParallaxLayer(ctx, position)
    } else {
      const next = this.nextFrame(false)
      if (!next) {
        return this
      }
      if (this.props.name === 'ball' || this.props.name === 'playerTwo') {
      }
      ctx.drawImage(next, position.x, position.y - this.getCurrentAnimationFrame().height)
    }
    return this
  },

  render (ctx, camera) {
    this.update()
    return this.drawImage(ctx, camera)
  }
}

const EmitsParticles = {
  state: {
    particleOrigin: {
      x: 0,
      y: 0
    },
    maxRadius: 100,
    minRadius: 5,
    particleCount: 0,
    hue: 0
  },
  props: {
    targetParticles: 25
  },
  emitParticles (addRenderable) {
    this.state.particleCount++
    this.state.hue = Math.floor(Math.random() * 360)
    const particle = createParticleAt(this.state.particleOrigin, this.state.hue, Math.random() * (this.state.maxRadius - this.state.minRadius) + this.state.minRadius)
    this.state.addRenderable(`PARTICLE${Math.random()} * 1000000`, particle)
    console.log(this.state.hue)
  },
  update () {
    if (!this.state.particleCount) return this
    this.state.particleCount++
    const particle = createParticleAt(this.state.particleOrigin, this.state.hue, Math.random() * (this.state.maxRadius - this.state.minRadius) + this.state.minRadius)
    this.state.addRenderable(`PARTICLE${Math.random()} * 1000000`, particle)
    if (this.state.particleCount >= this.props.targetParticles) utils.setState(this, EmitsParticles.state)
  }
}

const Attacks = {
  state: {
    attacking: false,
    superAttack: false
  },
  props: {
    animations: {
      [ATTACKING]: {
        repeat: 1
      }
    }
  },
  attack (superAttack = false) {
    return utils
      .setState(this, {
        attacking: true,
        superAttack: superAttack,
        animation: {name: ATTACKING}
      })
      .resetAnimation()
  },
  update (doReset = false) {
    const reset = () => utils.setState(this, {
      ...Attacks.state,
      animation: {name: IDLE}
    }).resetAnimation()

    if (doReset) return reset()

    return this.state.attacking && this.isAnimationDone()
      ? reset()
      : this
  }
}

const Dies = {
  state: {
    dying: false,
    dead: false,
    deadCount: 0
  },
  props: {
    animations: {
      [DYING]: {
        images: [],
        delay: 0,
        repeat: 1
      }
    }
  },

  die () {
    this.props.name === 'ball' && this.state.incrementScore()

    return utils
      .setState(this, {
        dying: true,
        animation: {name: DYING},
        acceleration: {
          y: 1,
          x: 0
        },
        velocity: {
          y: 10,
          x: 0
        }
      })
      .resetAnimation()
  },
  update (doReset = false) {
    if (doReset) return utils.setState(this, Dies.state)
    if (!this.state.dying && !this.state.dead) return this
    if (this.props.name === 'ball' && this.state.dead && ++this.state.deadCount > 120) {
      utils.setState(this, {display: false})
    }
    return this.isAnimationDone()
      ? utils.setState(this, {dead: true})
      : this
  }
}

const VelocityKills = {
  update () {
    if (this.state.dying || this.state.dead) return this
    if (utils.vectorGT(this.state.velocity, 40)) {
      const centerOfBall = {
        x: this.state.position.x + this.getCurrentAnimationFrame().width / 2,
        y: this.state.position.y - this.getCurrentAnimationFrame().height / 2
      }
      utils.setState(this, {
        maxRadius: 10,
        minRadius: 1,
        addRenderable: this.state.addRenderable,
        particleOrigin: {...centerOfBall}
      })
      this.emitParticles()
      this.die()
    }
  }
}

const Moves = {
  state: {
    velocity: {
      x: 0,
      y: 0
    }
  },
  props: {
    runningVelocity: {
      x: 10,
      y: 0
    },
    animations: {
      [WALKING]: {
        name: WALKING,
        images: [],
        delay: 0,
        repeat: Infinity,
        duplicate: 0
      },
      [RUNNING]: {
        name: RUNNING,
        images: [],
        delay: 0,
        repeat: Infinity,
        duplicate: 0
      },
      [JUMPING]: {
        name: JUMPING,
        images: [],
        delay: 0,
        repeat: Infinity,
        duplicate: 0
      }
    },
    maxVelocity: {
      x: 5,
      y: 5
    },
    minVelocity: {
      x: -5,
      y: -5
    }
  },

  update () {
    // TODO REFACTOR this crap
    const velocity = this.state.velocity
    if (!this.state.attacking && this.props.name !== 'ball' && !this.state.dying) {
      if (velocity.x === 0) {
        if ([WALKING, RUNNING].includes(this.state.animation.name)) {
          utils.setState(this, {animation: {name: IDLE}}).resetAnimation()
        }
      } else {
        if (this.props.animations[WALKING].images.length) {
          utils.setState(this, {animation: {name: WALKING}})
        } if (this.props.animations[RUNNING].images.length && velocity.x >= this.props.runningVelocity.x) {
          utils.setState(this, {animation: {name: RUNNING}})
        }
      }
      if (velocity.y === 0) {
        if (this.state.animation.name === JUMPING) {
          utils.setState(this, {animation: {name: IDLE}}).resetAnimation()
        }
      } else {
        if (this.props.animations[JUMPING].images.length) utils.setState(this, {animation: {name: JUMPING}})
      }
    }

    return utils.setState(this, {position: this.getNextPosition()})
  },

  getNextPosition () {
    const newPosition = utils.vectorAdd(this.state.position, this.state.velocity)
    return utils.vectorMax(newPosition, GROUND)
  }
}

const Accelerates = {
  state: {
    slowDown: false,
    acceleration: {
      x: 0,
      y: 0
    }
  },
  stopMovingX () {
    return utils.setState(this, {
      velocity: { x: 0 },
      acceleration: {x: 0},
      slowDown: false
    })
  },
  updateVelocities () {
    const isOnGround = (GROUND.y === this.state.position.y)
    if (!isOnGround) {
      this.state.acceleration.y = GRAVITY.y
    }
    const newVelocity = compose(
      utils.vectorMinC(this.props.minVelocity),
      utils.vectorMaxC(this.props.maxVelocity),
      utils.vectorAddC(this.state.acceleration)
    )(this.state.velocity)

    if (isOnGround && this.state.velocity.y > 0) {
      newVelocity.y = this.state.acceleration.y = 0
    }

    if (this.state.dying || this.state.dead) newVelocity.x = 0

    return utils.setState(this, {velocity: newVelocity})
  },
  updateFlip (oldVelocity) {
    const newVelocity = this.state.velocity
    if (newVelocity.x !== 0 && oldVelocity.x !== 0) {
      this.setAnimationProp('flipped', newVelocity.x < 0)
    }
  },
  shouldStopSlowingDown () {
    return (
      (this.state.acceleration.x > 0 && this.state.velocity.x >= 0) ||
        (this.state.acceleration.x < 0 && this.state.velocity.x <= 0)
    )
  },
  updateSlowDown () {
    this.state.slowDown &&
      this.shouldStopSlowingDown() &&
      this.stopMovingX()
    return this
  },
  update () {
    return this
      .updateVelocities()
      .updateSlowDown()
      .updateFlip(this.state.velocity)
  }
}

const Blocks = {
  props: {
    blocks: true,
    damages: false,
    elasticity: 0,
    mass: 100
  }
}

const Explodes = {
  props: {
    zIndex: 9,
    animations: {
      [IDLE]: {
        images: [],
        delay: Infinity,
        repeat: Infinity
      },
      [EXPLODING]: {
        images: [],
        delay: 10,
        repeat: 3
      }
    }
  },
  state: {
    animation: {name: IDLE},
    display: false,
    exploding: false
  },
  explode () {
    this.resetAnimation()
    utils.setState(this, {
      exploding: true,
      velocity: {x: 0},
      animation: {name: EXPLODING}
    })
  },
  update (doReset) {
    const reset = () => utils.setState(this, Explodes.state).resetAnimation()

    if (doReset) return reset()
  }
}

const ground = mixinAll([Renderable], {
  state: {
    animation: {name: IDLE},
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  props: {
    zIndex: -1,
    animations: {
      [IDLE]: {
        images: [utils.newImageFromPath(GROUND_IMAGE)],
        duplicate: Infinity,
        delay: Infinity,
        repeat: Infinity
      }
    }
  }
})

const sky = mixinAll([Renderable], {
  state: {
    animation: {name: IDLE},
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  props: {
    zIndex: -10,
    animations: {
      [IDLE]: {
        images: [utils.newImageFromPath(SKY_IMAGE)],
        duplicate: Infinity,
        delay: Infinity,
        repeat: Infinity
      }
    }
  }
})

const clouds = mixinAll([Renderable, Moves], {
  state: {
    velocity: {x: -2},
    animation: {name: IDLE, duplicateCount: 0}
  },
  props: {
    zIndex: -9,
    animations: {
      [IDLE]: {
        images: [utils.newImageFromPath(CLOUDS_IMAGE)],
        delay: Infinity,
        duplicate: Infinity,
        repeat: Infinity
      }
    }
  }
})

const Colourful = {
  update () {
    if (this.state.dying || this.state.dead) return this
    if (utils.vectorLT(this.state.velocity, 10)) utils.setState(this, {animation: {name: IDLE}})
    if (utils.vectorGT(this.state.velocity, 20)) utils.setState(this, {animation: {name: WALKING}})
    if (utils.vectorGT(this.state.velocity, 40)) utils.setState(this, {animation: {name: JUMPING}})
    if (utils.vectorGT(this.state.velocity, 50)) utils.setState(this, {animation: {name: RUNNING}})
  }
}

const Ball0 = {
  props: {
    name: 'ball',
    elasticity: 0.2,
    mass: 200,
    zIndex: 1,
    runningVelocity: {
      x: 20,
      y: 20
    },
    maxVelocity: {
      x: 150,
      y: 150
    },
    minVelocity: {
      x: -50,
      y: -50
    },
    animations: {
      [IDLE]: {
        images: [utils.newImageFromPath(BALL0_IDLE)],
        imagesFlipped: [utils.newImageFromPath(BALL0_IDLE)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [WALKING]: {
        images: [utils.newImageFromPath(BALL0_WALKING)],
        imagesFlipped: [utils.newImageFromPath(BALL0_WALKING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [RUNNING]: {
        images: [utils.newImageFromPath(BALL0_RUNNING)],
        imagesFlipped: [utils.newImageFromPath(BALL0_RUNNING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [JUMPING]: {
        images: [utils.newImageFromPath(BALL0_JUMPING)],
        imagesFlipped: [utils.newImageFromPath(BALL0_JUMPING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [DYING]: {
        images: utils.newImagesFromPath(BALL_DYING),
        imagesFlipped: utils.newImagesFromPath(BALL_DYING),
        delay: 10,
        repeat: 3,
        duplicate: 0
      }
    }
  }
}

const Ball1 = {
  props: {
    name: 'ball',
    elasticity: 0.9,
    mass: 40,
    zIndex: 1,
    runningVelocity: {
      x: 20,
      y: 20
    },
    maxVelocity: {
      x: 50,
      y: 50
    },
    minVelocity: {
      x: -50,
      y: -50
    },
    animations: {
      [IDLE]: {
        images: [utils.newImageFromPath(BALL1_IDLE)],
        imagesFlipped: [utils.newImageFromPath(BALL1_IDLE)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [WALKING]: {
        images: [utils.newImageFromPath(BALL1_WALKING)],
        imagesFlipped: [utils.newImageFromPath(BALL1_WALKING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [RUNNING]: {
        images: [utils.newImageFromPath(BALL1_RUNNING)],
        imagesFlipped: [utils.newImageFromPath(BALL1_RUNNING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [JUMPING]: {
        images: [utils.newImageFromPath(BALL1_JUMPING)],
        imagesFlipped: [utils.newImageFromPath(BALL1_JUMPING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [DYING]: {
        images: utils.newImagesFromPath(BALL_DYING),
        imagesFlipped: utils.newImagesFromPath(BALL_DYING),
        delay: 3,
        repeat: 10,
        duplicate: 0
      }
    }
  }
}

const Ball2 = {
  props: {
    name: 'ball',
    elasticity: 0.7,
    mass: 840,
    zIndex: 1,
    runningVelocity: {
      x: 20,
      y: 20
    },
    maxVelocity: {
      x: 150,
      y: 150
    },
    minVelocity: {
      x: -50,
      y: -50
    },
    animations: {
      [IDLE]: {
        images: [utils.newImageFromPath(BALL2_IDLE)],
        imagesFlipped: [utils.newImageFromPath(BALL2_IDLE)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [WALKING]: {
        images: [utils.newImageFromPath(BALL2_WALKING)],
        imagesFlipped: [utils.newImageFromPath(BALL2_WALKING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [RUNNING]: {
        images: [utils.newImageFromPath(BALL2_RUNNING)],
        imagesFlipped: [utils.newImageFromPath(BALL2_RUNNING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [JUMPING]: {
        images: [utils.newImageFromPath(BALL2_JUMPING)],
        imagesFlipped: [utils.newImageFromPath(BALL2_JUMPING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [DYING]: {
        images: utils.newImagesFromPath(BALL_DYING),
        imagesFlipped: utils.newImagesFromPath(BALL_DYING),
        delay: 10,
        repeat: 3,
        duplicate: 0
      }
    }
  }
}

const Ball3 = {
  props: {
    name: 'ball',
    elasticity: 0.1,
    mass: 440,
    zIndex: 1,
    runningVelocity: {
      x: 20,
      y: 20
    },
    maxVelocity: {
      x: 150,
      y: 150
    },
    minVelocity: {
      x: -50,
      y: -50
    },
    animations: {
      [IDLE]: {
        images: [utils.newImageFromPath(BALL3_IDLE)],
        imagesFlipped: [utils.newImageFromPath(BALL3_IDLE)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [WALKING]: {
        images: [utils.newImageFromPath(BALL3_WALKING)],
        imagesFlipped: [utils.newImageFromPath(BALL3_WALKING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [RUNNING]: {
        images: [utils.newImageFromPath(BALL3_RUNNING)],
        imagesFlipped: [utils.newImageFromPath(BALL3_RUNNING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [JUMPING]: {
        images: [utils.newImageFromPath(BALL3_JUMPING)],
        imagesFlipped: [utils.newImageFromPath(BALL3_JUMPING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [DYING]: {
        images: utils.newImagesFromPath(BALL_DYING),
        imagesFlipped: utils.newImagesFromPath(BALL_DYING),
        delay: 10,
        repeat: 3,
        duplicate: 0
      }
    }
  }
}

const Ball4 = {
  props: {
    name: 'ball',
    elasticity: 0.2,
    mass: 240,
    zIndex: 1,
    runningVelocity: {
      x: 20,
      y: 20
    },
    maxVelocity: {
      x: 150,
      y: 150
    },
    minVelocity: {
      x: -50,
      y: -50
    },
    animations: {
      [IDLE]: {
        images: [utils.newImageFromPath(BALL4_IDLE)],
        imagesFlipped: [utils.newImageFromPath(BALL4_IDLE)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [WALKING]: {
        images: [utils.newImageFromPath(BALL4_WALKING)],
        imagesFlipped: [utils.newImageFromPath(BALL4_WALKING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [RUNNING]: {
        images: [utils.newImageFromPath(BALL4_RUNNING)],
        imagesFlipped: [utils.newImageFromPath(BALL4_RUNNING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [JUMPING]: {
        images: [utils.newImageFromPath(BALL4_JUMPING)],
        imagesFlipped: [utils.newImageFromPath(BALL4_JUMPING)],
        delay: 20,
        repeat: Infinity,
        duplicate: 0
      },
      [DYING]: {
        images: utils.newImagesFromPath(BALL_DYING),
        imagesFlipped: utils.newImagesFromPath(BALL_DYING),
        delay: 10,
        repeat: 3,
        duplicate: 0
      }
    }
  }
}

const playerOne = mixinAll([Renderable, Moves, Accelerates, Attacks, Dies, Blocks, EmitsParticles], {
  props: {
    blocks: true,
    zIndex: 1,
    elasticity: 0.2,
    mass: 500,
    radius: 125,
    maxVelocity: {
      x: 200,
      y: 5
    },
    minVelocity: {
      x: -200,
      y: -5
    },
    animations: {
      [IDLE]: {
        images: utils.newImagesFromPath(PLAYER_1_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_1_IMAGES_F),
        delay: 8,
        repeat: Infinity,
        duplicate: 0
      },
      [WALKING]: {
        images: utils.newImagesFromPath(PLAYER_1_WALKING_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_1_WALKING_IMAGES_F),
        delay: 4,
        repeat: Infinity,
        duplicate: 0
      },
      [RUNNING]: {
        images: utils.newImagesFromPath(PLAYER_1_RUNNING_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_1_RUNNING_IMAGES_F),
        delay: 4,
        repeat: Infinity,
        duplicate: 0
      },
      [JUMPING]: {
        images: utils.newImagesFromPath(PLAYER_1_JUMPING_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_1_JUMPING_IMAGES_F),
        delay: 8,
        repeat: Infinity,
        duplicate: 0
      },
      [ATTACKING]: {
        images: utils.newImagesFromPath(PLAYER_1_ATTACK_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_1_ATTACK_IMAGES_F),
        delay: 4,
        repeat: 1,
        duplicate: 0
      },
      [DYING]: {
        images: utils.newImagesFromPath(PLAYER_1_DYING_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_1_DYING_IMAGES_F),
        delay: 4,
        repeat: 1,
        duplicate: 0
      }
    }
  },
  state: {
    health: 100,
    animation: {name: IDLE},
    position: {
      x: GAME_WIDTH / 5,
      y: GAME_HEIGHT - 400
    },
    hadouken: 0
  },
  update () {
    return this.state.position.x < 0
      ? utils.setState(this, {position: {x: 0}, velocity: {x: 0}})
      : this
  },
  doMove (direction) {
    return utils.setState(this, {
      slowDown: false,
      acceleration: {
        x: direction === MOVE_LEFT ? -1 : 1
      }
    })
  },
  stopMove (direction) {
    utils.setState(this, {
      slowDown: true,
      acceleration: {x: -Math.sign(this.state.velocity.x) * FRICTION.x} // TODO refactor with vector methods
    })
    return this
  },
  doJump () {
    const isOnGround = this.state.position.y === GROUND.y
    const canDoubleJump = this.state.velocity.y > 0 && this.state.velocity.y < 10
    if (isOnGround || canDoubleJump) {
      this.state.velocity.y -= 80
    }
    return this
  },
  doAttack (superAttack, addRenderable, sound) {
    this.attack(superAttack)

    if (!superAttack) return this
    sound && sound()

    const centerOfPlayer = {
      x: this.state.position.x + this.getCurrentAnimationFrame().width / 2,
      y: this.state.position.y - this.getCurrentAnimationFrame().height / 2
    }
    utils.setState(this, {addRenderable, particleOrigin: {...centerOfPlayer}})
    this.emitParticles()
    return this
  },
  handleAction (action, addRenderable, sound) {
    switch (action) {
      case MOVE_LEFT:
        this.doMove(action)
        break
      case MOVE_RIGHT:
        this.doMove(action)
        break
      case ATTACK:
        if (this.state.hadouken) {
          this.doAttack(true, addRenderable, sound)
          this.state.hadouken--
        }
        break
      case SWORD:
        this.doAttack(false)
    }
  },
  handleActionStop (action) {
    switch (action) {
      case MOVE_LEFT:
        this.stopMove(action)
        break
      case MOVE_RIGHT:
        this.stopMove(action)
        break
      case JUMP:
        this.doJump()
    }
  }
})

const Particle = {
  state: {
    position: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    },
    radius: 5,
    hue: 0
  },
  props: {
    name: 'particle',
    zIndex: 10
  },
  update () {
    this.state.position = utils.vectorAdd(
      this.state.position, this.state.velocity
    )
    this.state.radius -= 0.50
    this.state.hue -= 1
    if (this.state.radius <= 0) utils.setState(this, {display: false})
  }
}

const createParticleAt = (position, hue, radius) => {
  return mixinAll([Renderable, Particle], {
    state: {
      position: {
        x: position.x,
        y: position.y
      },
      velocity: {
        x: -20 + Math.random() * 40,
        y: -20 + Math.random() * 40
      },
      hue: hue,
      radius: radius
    }
  })
}

const playerTwo = mixinAll([Renderable, Moves, Accelerates, Dies, Blocks], {
  props: {
    name: 'playerTwo',
    blocks: true,
    damages: 10,
    mass: 300,
    elasticity: 0.3,
    zIndex: 1,
    animations: {
      [IDLE]: {
        images: utils.newImagesFromPath(PLAYER_2_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_2_IMAGES),
        delay: 5,
        repeat: Infinity
      },
      [DYING]: {
        images: utils.newImagesFromPath(PLAYER_2_DYING_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_2_DYING_IMAGES),
        delay: 5,
        repeat: 1
      },
      [WALKING]: {
        images: utils.newImagesFromPath(PLAYER_2_WALKING_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_2_WALKING_IMAGES),
        delay: 4,
        repeat: Infinity
      },
      [RUNNING]: {
        images: utils.newImagesFromPath(PLAYER_2_WALKING_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_2_WALKING_IMAGES),
        delay: 4,
        repeat: Infinity
      },
      [JUMPING]: {
        images: utils.newImagesFromPath(PLAYER_2_JUMPING_IMAGES),
        imagesFlipped: utils.newImagesFromPath(PLAYER_2_JUMPING_IMAGES),
        delay: 4,
        repeat: Infinity
      }
    }
  },
  state: {
    animation: {name: IDLE},
    position: {
      x: GAME_WIDTH / 1.5,
      y: GAME_HEIGHT - 800
    },
    velocity: {
      x: -0.5,
      y: 0
    }
  }
})

const fireball = mixinAll([Renderable, Moves, Explodes, {}], {})

const camera = {
  position: {x: 0, y: 0},
  target: playerOne,
  update () {
    // TODO refactor to vector calculations
    const playerCameraDiff = this.target.state.position.x - this.position.x
    if (playerCameraDiff > MAX_CAMERA_TO_PLAYER) {
      this.position.x += (playerCameraDiff) - MAX_CAMERA_TO_PLAYER
    } else if (playerCameraDiff < MIN_CAMERA_TO_PLAYER) {
      this.position.x -= MIN_CAMERA_TO_PLAYER - (playerCameraDiff)
    }
    this.position.x = Math.max(0, this.position.x)
  }
}

class GameEngine {
  constructor (renderables) {
    this.state = {
      game: PAUSED,
      score: 0,
      camera: camera,
      renderables: {...renderables},
      balls: 0,
    }

    $.canvas = utils.newCanvas($.gameArea)
    this.ctx = $.canvas.getContext('2d')

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.animationLoop = this.animationLoop.bind(this)
    this.addRenderable = this.addRenderable.bind(this)
    this.incrementScore = this.incrementScore.bind(this)
    this.playHadoukenSound = this.playHadoukenSound.bind(this)

    $.theme.loop = true
    $.theme.load()
    const startRound = () => {
      document.removeEventListener('click', startRound)
      document.getElementById('game-area').style.display = 'block'
      document.querySelector('.card').style.display = 'none'
      $.theme.play()
      this.animationLoop()
      this.setGameState(STARTED)
        .captureKeys()
    }
    document.addEventListener('click', startRound)
  }

  playDangerSound () {
    $.danger.cloneNode(true).play()
  }

  getHadoukenCount () {
    return this.getPlayer().state.hadouken
  }

  incHadoukenCount () {
    this.getPlayer().state.hadouken++
    return this
  }

  animationLoop () {
    this.cleanUpDead()
    const maxBalls = Math.max(this.getScore(), 200)
    const shouldSpawn = this.state.balls < maxBalls && (Math.random() * 20 + 1 >= 20)
    const shouldRain = Math.random() * 50 + 1 >= 50
    if (shouldSpawn) {
      shouldRain && this.playDangerSound()
      const numberToSpawn = shouldRain
        ? Math.abs(20)
        : ~~(Math.random() * Math.max(2, this.getScore() / 50) + 1)
      repeat(numberToSpawn).forEach(() => {
        const ballTypes = [Ball0, Ball1, Ball2, Ball3, Ball4]
        const randomType = ~~(Math.random() * (ballTypes.length - 1))
        this.addBall(ballTypes[randomType], Math.random() * 100000)
      })
    }

    this.handleAllCollisions()

    this.state.camera.update()

    this.getSortedRenderables()
      .forEach(element => element.render(this.ctx, this.state.camera))

    if (this.getHealth() <= 0 && !this.gameStateIs(ENDED)) {
      this.state.renderables[PLAYER_1].die()
      this.ignoreKeys()
      this.setGameState(ENDED)
    }

    this.renderInfoBar()
    window.requestAnimationFrame(this.animationLoop)
  }

  cleanUpDead () {
    Object.entries(this.state.renderables).forEach(([key, renderable]) => {
      if (!renderable.state.display) {
        if (renderable.props.name === 'ball') {
          this.state.balls--
        }
        delete this.state.renderables[key]
        return
      }
      if (renderable.props.name !== 'ball') return
      if ((Math.abs(renderable.state.position.x - this.state.camera.position.x)) > GAME_WIDTH * 5) {
        this.state.balls--
        delete this.state.renderables[key]
      }
    })
  }

  getHealth () {
    return this.state.renderables[PLAYER_1].state.health
  }

  incHealth () {
    this.playPopSound()
    this.state.renderables[PLAYER_1].state.health = Math.min(this.state.renderables[PLAYER_1].state.health + 0.25, 100)
  }

  renderGameOver () {
    this.ctx.font = `48px "${FONT_NAME}"`
    this.ctx.globalAlpha = 1
    this.ctx.fillStyle = '#dc2f4c'
    this.ctx.textAlign = 'center'
    this.ctx.fillText('NOW YOU HAVE TO START FROM THE BEGINNING.',
      GAME_WIDTH / 2, GAME_HEIGHT / 2)
    return this
  }

  renderInfoBar () {
    if (this.gameStateIs(ENDED)) return this.renderGameOver()

    this.ctx.font = `48px "${FONT_NAME}"`
    this.ctx.globalAlpha = 1
    const health = ~~this.getHealth()
    const hue = ((1 - (100 - health) / 100) * 120)
    const color = `hsl(${hue}, 100%, 50%)`
    this.ctx.fillStyle = color
    this.ctx.fillText(`Health: ${health}`, 50, 50)
    this.ctx.fillStyle = '#fff'
    this.ctx.fillText(`Score: ${this.getScore()}`, 50, 100)
    this.ctx.fillText(`Spawns: ${this.state.balls}`, GAME_WIDTH - 350, 50)
    this.ctx.fillText(`Super: ${this.getHadoukenCount()}`, GAME_WIDTH - 350, 100)

    return this
  }

  addRenderable (key, renderable) {
    this.state.renderables[key] = renderable
  }

  handleKeyDown (e) {
    const handleAction = (action) =>
      this.gameStateIs(STARTED)
        ? this.state.renderables[PLAYER_1].handleAction(action, this.addRenderable, this.playHadoukenSound)
        : this

    Object.keys(PLAYER_KEYS).includes(e.key) && handleAction(PLAYER_KEYS[e.key])

    return this
  }

  handleKeyUp (e) {
    const handleAction = (action) =>
      this.gameStateIs(STARTED)
        ? this.state.renderables[PLAYER_1].handleActionStop(action)
        : this

    Object.keys(PLAYER_KEYS).includes(e.key) && handleAction(PLAYER_KEYS[e.key])

    return this
  }

  doAttack (player) {
    return this
  }

  getPlayer () {
    return this.state.renderables[PLAYER_1]
  }

  collisionFormula (v1, v2, m1, m2) {
    return (v1 * (m1 - m2) + 2 * m2 * v2) / (m1 + m2)
  }

  handleCollision (body, body2, magic) {
    // if (!body.props.damages) return this
    if (body.state.dying || body2.state.dying || body.state.dead || body2.state.dead) return this

    const p1 = body2.state.position
    const p2 = body.state.position
    const r1 = body.props.radius || body.getCurrentAnimationFrame().width / 2
    const r2 = body2.props.radius || body2.getCurrentAnimationFrame().width / 2
    const v1 = body2.state.velocity
    const v2 = body.state.velocity
    const m1 = body2.props.mass
    const m2 = body.props.mass
    const minElasticity = Math.min(body2.props.elasticity, body.props.elasticity)

    const deltaPosition = {
      x: p1.x - p2.x,
      y: p1.y - p2.y
    }

    const sumRadius = r1 + r2
    const magnitude = utils.vectorLength(deltaPosition)

    if (magnitude > sumRadius) {
      return this
    }

    const sumOfMasses = m1 + m2
    if ([body.props.name || body2.props.name].includes('Floor')) {
    }
    const normalizeDeltaPosition = utils.normalize(deltaPosition)

    const deltaTangent = {
      x: normalizeDeltaPosition.y,
      y: -normalizeDeltaPosition.x
    }

    const correction = utils.vectorMultiply(normalizeDeltaPosition, r1 + r2 - magnitude)
    body2.state.position = utils.vectorAdd(p1, utils.vectorMultiply(correction, m2 / sumOfMasses))
    body.state.position = utils.vectorAdd(p2, utils.vectorMultiply(correction, -m1 / sumOfMasses))

    const magnitudeVelocity1 = utils.vectorLength(
      utils.vectorMultiply(normalizeDeltaPosition, utils.vectorDot(v1, normalizeDeltaPosition))
    )

    const magnitudeVelocity2 = utils.vectorLength(
      utils.vectorMultiply(normalizeDeltaPosition, utils.vectorDot(v2, normalizeDeltaPosition))
    )

    body.state.velocity = utils.vectorAdd(
      utils.vectorMultiply(deltaTangent, utils.vectorDot(v2, deltaTangent)),
      utils.vectorMultiply(normalizeDeltaPosition,
        (minElasticity * m1 * (magnitudeVelocity1 - magnitudeVelocity2) +
        m2 * magnitudeVelocity2 + m1 * magnitudeVelocity1) / sumOfMasses
      )
    )

    body2.state.velocity = utils.vectorAdd(
      utils.vectorMultiply(deltaTangent, utils.vectorDot(v1, deltaTangent)),
      utils.vectorMultiply(normalizeDeltaPosition,
        (minElasticity * m2 * (magnitudeVelocity2 - magnitudeVelocity1) +
        m1 * magnitudeVelocity1 + m2 * magnitudeVelocity2) / sumOfMasses)
    )

    if (magic) {
      if (this.getPlayer().state.superAttack) {
        this.getPlayer().state.velocity.y = -10
      }
      body2.state.velocity = utils.vectorMultiply(body2.state.velocity, magic)
    }

    if ([body, body2].includes(this.getPlayer()) && !this.getPlayer().state.attacking) {
      [body, body2].forEach(body => {
        if (body === this.getPlayer()) {
          body.state.health -= 1
        }
      })
    }

    return this
  }

  handleAllCollisions () {
    const allBodies = [...this.getAllBodies()]

    allBodies.forEach((body, index) => {
      allBodies.slice(index + 1).forEach(body2 => this.handleCollision(body, body2))
    })

    const collisionsWithGround = allBodies.filter(body =>
      body !== this.getPlayer() && body.state.position.y >= GROUND.y - 50
    )

    collisionsWithGround.forEach(body => {
      if (body.state.dying) {
        body.state.velocity.y = 0
        body.state.velocity.x = 0
      }
      body.state.velocity.y *= -0.8
    })

    if (this.getPlayer().state.attacking) {
      allBodies.forEach((body) => {
        const superRadius = {
          state: {
            velocity: {...this.getPlayer().state.velocity},
            position: {...this.getPlayer().state.position}
          },
          props: {
            mass: 100,
            radius: this.getPlayer().state.superAttack ? 800 : 150,
            elasticity: 0
          }
        }
        body !== this.getPlayer() && this.handleCollision(
          superRadius, body, 1.25)
      })
    }

    return this
  }

  addBall (type, key) {
    this.state.balls++
    const newBall = mixinAll([Renderable, Moves, Accelerates, Blocks,
      Dies, type, Colourful, VelocityKills, EmitsParticles], {
      state: {
        incrementScore: this.incrementScore,
        addRenderable: this.addRenderable,
        position: {
          x: this.state.camera.position.x + ~~(Math.random() * GAME_WIDTH),
          y: ~~(Math.random() * GAME_HEIGHT) - GROUND.y
        },
        velocity: {
          y: -10
        }
      }
    })
    this.addRenderable(`BALL${key}`, newBall)
  }

  doesRangeOverlap (start, end, start2, end2, tolerance) {
    return ((((end - start2) > tolerance) && ((end2 - start) > tolerance)))
  }

  isCollision (v1, v2) {
    return this.doesRangeOverlap(v1.x1, v1.x2, v2.x1, v2.x2, TOLERANCE) &&
          this.doesRangeOverlap(v1.y1, v1.y2, v2.y1, v2.y2, TOLERANCE)
  }

  getSortedRenderables () {
    return Object.values(this.state.renderables).sort(
      (a, b) => a.props.zIndex - b.props.zIndex
    )
  }

  getAllBodies (bodies = []) {
    return Object.values(this.state.renderables).filter(renderable =>
      renderable && renderable.props.blocks && !bodies.includes(renderable)
    )
  }

  getGameState () { return this.state.game }

  gameStateIs (state) { return (this.getGameState() === state) }

  getScore () { return this.state.score }

  ignoreKeys () {
    document.removeEventListener('keydown', this.handleKeyDown)
    return this
  }

  captureKeys () {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
    return this
  }

  resetScore () {
    this.state.score = 0
    return this
  }

  updateInfoBar (text) {
    return this
  }

  setGameState (state) {
    this.state.game = state
    return this
  }

  playScoreSound () {
    const score = this.getScore()
    let soundToPlay = null
    if (score >= 20 && !$.killingspree.hasPlayed) soundToPlay = $.killingspree
    if (score >= 50 && !$.rampage.hasPlayed) soundToPlay = $.rampage
    if (score >= 150 && !$.ownage.hasPlayed) soundToPlay = $.ownage
    if (score >= 200 && !$.unstoppable.hasPlayed) soundToPlay = $.unstoppable
    if (score >= 300 && !$.godlike.hasPlayed) soundToPlay = $.godlike
    if (!soundToPlay) return this
    this.incHadoukenCount()
    soundToPlay.hasPlayed = true
    soundToPlay.play()
  }

  incrementScore (player) {
    this.playScoreSound()
    this.incHealth()
    this.state.score++
    return this
  }

  playPopSound () {
    $.pop.cloneNode(true).play()
    return this
  }

  playHadoukenSound () {
    $.hadouken.cloneNode(true).play()
    return this
  }
}

const main = () => {
  const renderables = {
    [BACKGROUND_GROUND]: ground,
    [BACKGROUND_SKY]: sky,
    [BACKGROUND_CLOUDS]: clouds,
    [PLAYER_1]: playerOne
  }

  document.fonts.load(`10pt "${FONT_NAME}"`)

  const game = new GameEngine(renderables)
}

main()
