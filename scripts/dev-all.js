import { spawn } from 'node:child_process'
import { createServer } from 'node:net'
import { fileURLToPath } from 'node:url'

/**
 * 개발 서버 두 개를 한 터미널에서 띄운다.
 *
 *   mock-api/server.js  운세 기록 API — 3001
 *   vite                화면        — 5173 (쓰이고 있으면 5174, 5175 …)
 *
 * 이미 `npm run api` 를 따로 띄워 둔 채로 이걸 실행하는 일이 흔하다.
 * 그때 무턱대고 3001 을 잡으려 들면 EADDRINUSE 로 죽는데,
 * 예전에는 그 죽음이 Vite 까지 끌고 내려가 화면도 못 보게 됐다.
 * 그래서 먼저 포트를 두드려 보고, 이미 쓰이고 있으면 API 는 건너뛴다.
 */
const API_PORT = 3001

const apiPath = fileURLToPath(new URL('../mock-api/server.js', import.meta.url))
const vitePath = fileURLToPath(new URL('../node_modules/vite/bin/vite.js', import.meta.url))

/** 그 포트에 이미 누가 앉아 있는지 확인한다 (직접 잡아 보는 것이 가장 정확하다) */
const isPortTaken = (port) =>
  new Promise((resolve) => {
    const probe = createServer()
      .once('error', (error) => resolve(error.code === 'EADDRINUSE'))
      .once('listening', () => probe.close(() => resolve(false)))
      .listen(port)
  })

const children = []

if (await isPortTaken(API_PORT)) {
  console.log(
    `\n  이미 ${API_PORT} 포트에 API 가 떠 있어 그대로 씁니다. (Vite 만 새로 띄웁니다)\n`,
  )
} else {
  children.push(spawn(process.execPath, [apiPath], { stdio: 'inherit' }))
}

children.push(spawn(process.execPath, [vitePath], { stdio: 'inherit' }))

function stopChildren(signal = 'SIGTERM') {
  for (const child of children) {
    if (!child.killed) child.kill(signal)
  }
}

process.on('SIGINT', () => {
  stopChildren('SIGINT')
  process.exit(0)
})

process.on('SIGTERM', () => {
  stopChildren('SIGTERM')
  process.exit(0)
})

for (const child of children) {
  child.on('exit', (code) => {
    if (code && code !== 0) {
      stopChildren()
      process.exitCode = code
    }
  })
}
