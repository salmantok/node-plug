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
