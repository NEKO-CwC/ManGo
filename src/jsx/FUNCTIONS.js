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

export function checkCookie(name) {
    // 将document.cookie分割成一个数组，数组的每个元素都是一个cookie（键值对）
    const cookies = document.cookie.split(';');

    // 去除cookie名称和值两边的空白字符，并检查是否有匹配的cookie名称
    for(let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // 如果cookie名称匹配，则表示找到了相应的cookie字段
        if (cookie.startsWith(name + '=')) {
            return true;
        }
    }

    return false;
}