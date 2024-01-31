export function insertImgEl(src) {
  const img = document.createElement('img')
  img.src = src
  document.body.appendChild(img)
}