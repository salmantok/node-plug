import { addPlugin, runPlugin, test } from '../lib/index.js'
import { pluginSync, pluginCallback, pluginPromise } from './plugin.js'

// Menambahkan plugin
addPlugin(pluginSync)
addPlugin(pluginCallback)
addPlugin(pluginPromise)

// Menjalankan plugin
runPlugin()

// Melakukan testing
test([
  'Plugin sync dijalankan!',
  'Plugin callback mulai...',
  'Plugin Promise mulai...',
  'Plugin callback selesai!',
  'Plugin Promise selesai!',
])
