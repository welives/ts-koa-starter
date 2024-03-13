import './env'
import 'reflect-metadata'
import app from './app'
import { logger, DBSource } from './utils'

DBSource.initialize()
  .then(() => {
    console.log('数据库连接成功')
    const PORT = process.env.APP_PORT ?? 3000
    app.listen(PORT, () => {
      logger.info(`
      ------------
      Server Started!
      App is running in ${app.env} mode
      Logging initialized at ${process.env.LOG_LEVEL ?? 'debug'} level

      Http: http://localhost:${PORT}

      API Docs: http://localhost:${PORT}/api/swagger-html
      API Spec: http://localhost:${PORT}/api/swagger-json
      ------------
      `)
    })
  })
  .catch((err) => {
    console.error('数据库连接失败', err)
    process.exit(1)
  })
