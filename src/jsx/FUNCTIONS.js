import Swal from "sweetalert2"

export function transform(element, elementTransformData) {
    let transformString = ""
    for (let key in elementTransformData) {
        transformString += `${key}(${elementTransformData[key]}) `
    }
    element.style.transform = transformString
}

export function standardErrorMessageBox(text) {
    Swal.fire({
        "title": text,
        "icon": "error"
    })
}

export function waveAnimation(e) {
    const wave = document.createElement("span")
    const target = e.target
    const offsetX = e.clientX - target.getBoundingClientRect().left
    const offsetY = e.clientY - target.getBoundingClientRect().top
    target.style.overflow = "hidden"
    target.appendChild(wave)
    wave.className = "wave"
    wave.style.left = offsetX+"px"
    wave.style.top = offsetY+"px"
    setTimeout(()=>{
        wave.remove()
        target.style.overflow = "auto"
    }, 1000)
}