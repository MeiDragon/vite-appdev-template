export function insertImgEl(src: string) {
  const img = document.createElement('img')
  img.src = src
  document.body.appendChild(img)
}