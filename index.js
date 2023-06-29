const sharp = require("sharp")

const width = 300,
  height = 300,
  background = "#ff0000"

const sprite_path = __dirname + "/assets/sprites/tile000.png",
  sprite_width = width / 2,
  sprite_height = height / 2

async function createImage() {
  try {
    const bgImage = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background,
      },
    })
      .png()
      .toBuffer()

    const sprite = await sharp(sprite_path).toBuffer()

    const composedImage = await sharp(bgImage)
      .composite([
        {
          input: sprite,
          left: (width - sprite_width) / 2,
          top: (height - sprite_height) / 2,
        },
      ])
      .toFile(__dirname + "/output/test.png", (err, info) => {
        if (err) return console.error(err)
      })
  } catch (err) {
    console.error(err)
  }
}

createImage()
