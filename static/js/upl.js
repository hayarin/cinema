const url = 'https://cinema.hayarin.xyz/capi/u'
const form = document.querySelector('form')
const copybtn = document.querySelector('.bCopy')
const linkStorage = document.querySelector('.linkStorage')
const selector = document.querySelector('.selector')
const selectorShadow = document.querySelector('.selectorShadow')
const selectorLabel = document.querySelector('.selectorLabel')
const overlay = document.querySelector('.overlay')
const progWrap = document.querySelector('.progress')
const progBar = document.querySelector('.progBar')

form.addEventListener('change', e => {
  e.preventDefault()
  selector.style.visibility = 'hidden'
  selectorShadow.style.visibility = 'hidden'   
  selectorLabel.style.visibility = 'hidden'
  selectorShadow.classList.remove('drag')
  let fileInput = document.querySelector('.filestoupload')
  let file = fileInput.files[0]
  let formData = new FormData()
  formData.append('file', file)

  const request = () => {
    let xhr = new XMLHttpRequest()
    xhr.open('POST', url)

    xhr.upload.onprogress = e => {
      if (e.lengthComputable) {
        let stateOfAffairs = (e.loaded / e.total) * 100 + '%'        
        progWrap.style.visibility = 'visible'
        progBar.style.width = stateOfAffairs
        console.log(stateOfAffairs)
        if (stateOfAffairs === '100%') {
        }
      }
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {        
        progWrap.style.visibility = 'hidden'
        progBar.style.width = '0%'
        let text = xhr.responseText
        console.log(text)
        copybtn.style.visibility = 'visible'
        linkStorage.value = text
        video.src = linkStorage.value
        video.volume = 0.1
        video.play()
      }
    }
    xhr.send(formData)
  }

  // async function request() {
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     body: formData
  //   })
  //   text = await response.text()
  //   copybtn.style.visibility = 'visible'
  //   linkStorage.value = text
  //   video.src = linkStorage.value
  //   video.volume = 0.1
  //   video.play()
  // }
  request()
})

selector.addEventListener('dragenter', e => {
  e.preventDefault()
  selectorShadow.classList.add('drag')
})

selector.addEventListener('dragleave', e => {
  e.preventDefault()
  selectorShadow.classList.remove('drag')
})

selector.addEventListener('dragend', e => {
  e.preventDefault()
  selectorShadow.classList.remove('drag')
})

function copy() {
  linkStorage.select()
  document.execCommand('copy')
  copybtn.style.visibility = 'hidden'
  selector.style.visibility = 'visible'
  selectorShadow.style.visibility = 'visible'  
  selectorLabel.style.visibility = 'visible'
}
