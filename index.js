const sharp = require("sharp")
const fs = require("fs")
const { promisify } = require("util")

const readdir = promisify(fs.readdir)

const width = 300,
  height = 300,
  sprite_width = 150,
  sprite_height = 150
;(sprites_path = __dirname + "/assets/sprites"), (sprites_count = 228)

const colors = [
  "#eddcd2",
  "#fff1e6",
  "#fde2e4",
  "#fad2e1",
  "#c5dedd",
  "#dbe7e4",
  "#f0efeb",
  "#d6e2e9",
  "#bcd4e6",
  "#99c1de",
]

// async function spriteCounter() {
//   try {
//     return await readdir(sprites_path).length
//   } catch (err) {
//     console.error(err)
//   }
// }

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

async function createImage() {
  try {
    const bgImage = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: colors[getRandomInt(0, colors.length - 1)],
      },
    })
      .png()
      .toBuffer()

    const sprite_number = String(getRandomInt(0, sprites_count - 1)).padStart(
      3,
      "0"
    )
    const sprite = await sharp(
      sprites_path + `/tile${sprite_number}.png`
    ).toBuffer()

    const composedImage = await sharp(bgImage)
      .composite([
        {
          input: sprite,
          left: (width - sprite_width) / 2,
          top: (height - sprite_height) / 2,
        },
      ])
      .toFile(__dirname + `/output/${Date.now()}.png`, (err, info) => {
        if (err) return console.error(err)
      })
  } catch (err) {
    console.error(err)
  }
}

for (let i = 0; i < 20; i++) {
  createImage()
}
