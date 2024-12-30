export default class PluginSystem {
  constructor() {
    this.plugins = []
  }

  use(plugin) {
    this.plugins.push(plugin)
  }

  async run(callback) {
    for (const plugin of this.plugins) {
      if (plugin.run) {
        const result = plugin.run()
        if (result instanceof Promise) {
          await result
        }
      }
    }
    if (callback && typeof callback === 'function') {
      callback()
    }
  }
}
