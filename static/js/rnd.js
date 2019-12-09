const video = document.querySelector('.indexvid')

async function rvlink() {
  let uri = await (await fetch('https://cinema.hayarin.xyz/capi/r')).text()
  if (video.src === uri) {
    rvlink()
  } else {
    video.src = uri
    video.volume = 0.1
    video.play()
  }
}
rvlink()
