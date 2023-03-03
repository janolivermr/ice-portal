// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.

// icon-color: red; icon-glyph: newspaper;
loadStatus().then(async status => {
  if (config.runsInWidget) {
    // Tell the widget on the Home Screen to show our ListWidget instance.
    let widget = await createWidget(status.speed)
    Script.setWidget(widget)
  } else if (config.runsWithSiri) {
    await QuickLook.present(status.speed)
  } else {
    await QuickLook.present(status.speed)
  }
}).finally(() => {
  Script.complete()
})

const DB_RED = "#EC0016"
const DB_COOL_GRAY_700 = "#282D37"

async function createWidget(speed) {
  let widget = new ListWidget()
  widget.backgroundColor = Color.white()

  let iconRow = widget.addStack()
  iconRow.layoutHorizontally()

  switch (config.widgetFamily) {
    case 'accessoryCircular':
      addCircularData(widget, speed as string)
      return widget
    case 'extraLarge':
    case 'large':
    case 'medium':
    case 'small':
      let trainLogo = iconRow.addImage(await getImage('ICE-Logo.svg.png'))
      trainLogo.imageSize = new Size(51.2, 28)
      trainLogo.leftAlignImage()

      iconRow.addSpacer()
      let dbLogo = iconRow.addImage(await getImage('DB_logo_red_1000px_rgb.png'))
      dbLogo.imageSize = new Size(40, 28)
      dbLogo.rightAlignImage()
    case 'accessoryRectangular':
    case 'accessoryInline':
      // Skip logos
  }

  widget.addSpacer()
  textWithLabel(speed + " km/h", "Geschwindigkeit", widget)

  return widget
}

async function getImage(image: string): Promise<Image> {
  let fm = FileManager.iCloud()
  let dir = fm.joinPath(fm.documentsDirectory(), 'ice-portal')
  let path = fm.joinPath(dir, image)
  if (!fm.fileExists(path)) {
    console.error(`could not find image at "${path}"`)
  }
  await fm.downloadFileFromiCloud(path)
  return fm.readImage(path)
}

async function loadStatus() {
  let url = "https://iceportal.de/api1/rs/status"
  let req = new Request(url)
  let statusData
  try {
    statusData = await req.loadJSON()
  } catch (_) {
    statusData = {
      speed: 'n/a'
    }
  }
  return statusData
}

function textWithLabel(text: string, label: string, widget: ListWidget | WidgetStack) {
  let stack = widget.addStack()
  stack.layoutVertically()

  let labelElement = stack.addText(label)
  labelElement.font = Font.boldSystemFont(12)
  labelElement.textColor = new Color(DB_RED)

  stack.addSpacer(1)

  let textElement = stack.addText(text)
  textElement.font = Font.boldSystemFont(20)
  textElement.textColor = new Color(DB_COOL_GRAY_700)
}

function addCircularData(widget: ListWidget, speed: string) {
  let stack = widget.addStack()
  stack.centerAlignContent()
  stack.layoutHorizontally()
  stack.addSpacer()

  let textElement = stack.addText('' + speed)
  textElement.font = Font.boldSystemFont(12)

  stack.addSpacer()
}