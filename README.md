# node-plug

`node-plug` memungkinkan Anda menambahkan atau mengganti plugin secara dinamis. Mendukung `sync`, `callback`, dan `promise`, sehingga fleksibel untuk berbagai kebutuhan pengembangan.

Selain itu, dapat menjalankan pengujian menggunakan `assert` secara bersamaan dengan menjalankan aplikasi. Hal ini memungkinkan untuk memastikan integritas plugin selama aplikasi berjalan.

## Instalasi

```bash
npm install node-plug
```

## API

### plugin.js

Contoh definisi plugin. Setiap plugin harus memiliki method `run`.

```js
export const pluginSync = {
  run() {
    console.log('Plugin sync dijalankan!')
  },
}

export const pluginCallback = {
  run() {
    console.log('Plugin callback mulai...')
    setTimeout(() => console.log('Plugin callback selesai!'), 15)
  },
}

export const pluginPromise = {
  async run() {
    console.log('Plugin Promise mulai...')
    await new Promise((resolve) => setTimeout(resolve, 15))
    console.log('Plugin Promise selesai!')
  },
}
```

### main.js

Contoh menambahkan plugin, menjalankan plugin, dan melakukan pengujian.

```js
import { addPlugin, runPlugin, test } from 'node-plug'
import { pluginSync, pluginCallback, pluginPromise } from './plugin.js'

// Menambahkan plugin
addPlugin(pluginSync)
addPlugin(pluginCallback)
addPlugin(pluginPromise)

// Menjalankan plugin
runPlugin()

// Melakukan pengujian
test([
  'Plugin sync dijalankan!',
  'Plugin callback mulai...',
  'Plugin Promise mulai...',
  'Plugin callback selesai!',
  'Plugin Promise selesai!',
])
```

### Output:

```bash
Mocked logs: [
  'Plugin sync dijalankan!',
  'Plugin callback mulai...',
  'Plugin Promise mulai...',
  'Plugin callback selesai!',
  'Plugin Promise selesai!',
  'Semua pengujian berhasil dijalankan!'
]
Mocked errors: []
```

## Kontribusi Finansial

[Ko-fi](https://ko-fi.com/salmantok)

## Lisensi

[MIT](LICENSE)
