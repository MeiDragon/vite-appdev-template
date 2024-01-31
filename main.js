import dataJson from '@/assets/data.json'
import '@styles/index.scss'
import { age, username } from '@utils/basic'
import { insertImgEl } from '@utils/inertImgEl'
import { insertRedBox } from '@utils/insertRedBox'

const sex = 'boy'
const hobbies = ['sing', 'run']
console.log(`${username}姓别${sex},今年${age}岁了，喜欢${hobbies.join(',')}`)

insertImgEl('/IMG_1487.JPG')

const arrowFunc = (a, b) => a + b

const promiseFunc = () => {
  return new Promise((rs) => {
    setTimeout(() => {
      rs(true)
    }, 1000)
  })
}

console.log(arrowFunc(1, 2))
promiseFunc()
insertRedBox()
console.log(dataJson)