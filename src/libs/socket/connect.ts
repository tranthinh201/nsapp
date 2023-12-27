import { io } from 'socket.io-client'
import { getEnvVars } from '../../../environment'

const env = getEnvVars()
const baseURL = env?.REACT_APP_ENV_ENDPOINT || 'https://nsbe.onrender.com/'

export const socket = io(baseURL, {
  autoConnect: false,
})
