import 'normalize.css';
import { debounce } from 'lodash-es'

const onClick = debounce(() => {
  console.log('hello world')
}, 300)

document.body.addEventListener('click', onClick)
