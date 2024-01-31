import redBoxStyle from '../styles/redbox.module.scss'
export function insertRedBox() {
  const div = document.createElement('div')
  div.className = redBoxStyle['red-box']
  document.body.appendChild(div)
}