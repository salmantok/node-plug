import assert from 'assert'
import PluginSystem from './node-plug.js'

const pluginSystem = () => new PluginSystem()

const system = pluginSystem()

export const addPlugin = (plugin) => system.use(plugin)

const systemRun = (callback) => {
  system.run(() => {
    if (typeof callback === 'function') {
      callback()
    }
  })
}

const mockedLogs = []
const mockedErrors = []
const originalConsoleLog = console.log
const originalConsoleError = console.error

console.log = (msg) => mockedLogs.push(msg)
console.error = (...msgs) => mockedErrors.push(msgs.join(' '))

const restoreConsole = () => {
  console.log = originalConsoleLog
  console.error = originalConsoleError
}

const getMockedResults = () => ({
  logs: mockedLogs,
  errors: mockedErrors,
})

let definedExpectedLogs = []

export const test = (test) => {
  definedExpectedLogs = test
}

export const runPlugin = () => {
  return new Promise((resolve, reject) => {
    systemRun(() => {
      try {
        assert.deepStrictEqual(
          mockedLogs,
          definedExpectedLogs,
          'Urutan eksekusi plugin tidak sesuai'
        )
        console.log('Semua pengujian berhasil dijalankan!', resolve())
      } catch (error) {
        const errorMessage = `PENGUJIAN GAGAL: ~> ${JSON.stringify(
          definedExpectedLogs
        )}, TAPI TIDAK: ~> ${JSON.stringify(mockedLogs)}`
        console.error(errorMessage, reject(error))
      } finally {
        restoreConsole()
        const { logs, errors } = getMockedResults()
        console.log('Mocked logs:', logs)
        console.log('Mocked errors:', errors)
      }
    })
  })
}
