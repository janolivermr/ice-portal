// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: red; icon-glyph: newspaper;
let speed = (await loadStatus()).speed || 'n/a'
if (config.runsInWidget) {
  // Tell the widget on the Home Screen to show our ListWidget instance.
  let widget = await createSpeedWidget(speed)
  Script.setWidget(widget)
} else if (config.runsWithSiri) {
  await QuickLook.present(speed)
} else {
  await QuickLook.present(speed)
}
// Calling Script.complete() signals to Scriptable that the script have finished running.
// This can speed up the execution, in particular when running the script from Shortcuts or using Siri.
Script.complete()

async function createSpeedWidget(speed) {
  let widget = new ListWidget()
  widget.backgroundColor = new Color("#EC0016")
  widget.addSpacer()
  let speedTextElement = widget.addText(speed + " km/h")
  speedTextElement.font = Font.boldSystemFont(24)
  speedTextElement.textColor = Color.white()
  speedTextElement.minimumScaleFactor = 0.75

  return widget
}

//----------------------------------------------------

async function loadStatus() {
  let url = "https://iceportal.de/api1/rs/status"
  let req = new Request(url)
  return await req.loadJSON()
}