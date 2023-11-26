import { Models } from '@rematch/core'
import { auth } from './auth'
import { tutorial } from './tutorial'

export interface RootModel extends Models<RootModel> {
  auth: typeof auth
  tutorial: typeof tutorial
}

export const models: RootModel = { auth, tutorial }
