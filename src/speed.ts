// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.

// icon-color: red; icon-glyph: newspaper;

const DB_RED = "#EC0016"
const DB_COOL_GRAY_700 = "#282D37"

type TrainType = 'ICE' | 'IC' | null
type StatusData = {
  speed: number | null
  trainType: TrainType | null
}

loadStatus().then(async status => {
  if (config.runsInWidget) {
    let widget = await createWidget(status)
    Script.setWidget(widget)
  } else if (config.runsWithSiri) {
    await QuickLook.present(status)
  } else {
    await QuickLook.present(status)
  }
}).finally(() => {
  Script.complete()
})

/**
 * Create the Widget to Display the speed
 * @param status StatusData returned from ICE Portal
 */
async function createWidget(status: StatusData): Promise<ListWidget> {
  let widget = new ListWidget()
  widget.backgroundColor = Color.white()

  switch (config.widgetFamily) {
    case 'accessoryCircular':
      addCircularData(widget, String(status.speed))
      return widget
    case 'extraLarge':
    case 'large':
    case 'medium':
    case 'small':
      await addLogos(widget, status.trainType)
    case 'accessoryRectangular':
    case 'accessoryInline':
      // Skip logos
  }

  widget.addSpacer()
  textWithLabel(String(status.speed) + " km/h", "Geschwindigkeit", widget)

  return widget
}

/**
 * Add DB and train type logos to the widget
 * @param widget The Widgte to add the logos to
 * @param trainType The train time to choose the appropriate logo
 */
async function addLogos(widget: ListWidget | WidgetStack, trainType: TrainType) {
  let iconRow = widget.addStack()
  iconRow.layoutHorizontally()

  let trainLogo = iconRow.addImage(await getImage(trainType === 'ICE' ? 'ICE-Logo.svg.png' : 'IC-Logo.svg.png'))
  trainLogo.imageSize = new Size(51.2, 28)
  trainLogo.leftAlignImage()

  iconRow.addSpacer()

  let dbLogo = iconRow.addImage(await getImage('DB_logo_red_1000px_rgb.png'))
  dbLogo.imageSize = new Size(40, 28)
  dbLogo.rightAlignImage()
}

/**
 * Load an image from iCloud File Storage
 * @param image the image file name to load
 */
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

/**
 * Load the status from ICE Portal
 */
async function loadStatus(): Promise<StatusData> {
  let url = "https://iceportal.de/api1/rs/status"
  let req = new Request(url)
  let statusData
  try {
    statusData = await req.loadJSON()
  } catch (_) {
    statusData = {
      speed: null,
      trainType: null
    }
  }
  return statusData
}

/**
 * Add Text with a label to a Widget or WidgetStack
 *
 * @param text The text to print
 * @param label The label to print above the text
 * @param widget The WidgetStack or Widget to add the text to
 */
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

/**
 * Add smaller text data for the cirular widget on the lock screen
 *
 * @param widget The Widget to add the data to
 * @param speed The speed to print in the widget
 */
function addCircularData(widget: ListWidget, speed: string): void {
  let stack = widget.addStack()
  stack.centerAlignContent()
  stack.layoutHorizontally()
  stack.addSpacer()

  let textElement = stack.addText('' + speed)
  textElement.font = Font.boldSystemFont(12)

  stack.addSpacer()
}