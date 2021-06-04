import Express from 'express'
import { JPBBot } from '../structs/JPBBot'

import Index from './routes/index'
import Oauth from './routes/oauth'
import BodyParser from 'body-parser'

import cors from 'cors'

export async function Api (client: JPBBot) {
  const app = Express()

  app.use(BodyParser.json())
  app.use(BodyParser.urlencoded({
    extended: true
  }))

  app.use(cors())

  Index(client, app)

  const mainRouter = Express.Router()
  Index(client, mainRouter)

  const oauthRouter = Express.Router()
  Oauth(client, oauthRouter)

  mainRouter.use('/oauth', oauthRouter)

  app.use('/api', mainRouter)

  await new Promise(resolve => app.listen(6721, () => resolve(true)))
  console.log('Loaded API')
}