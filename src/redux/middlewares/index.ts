import { clientRTKProvider } from '../rtk/client'
import { addressRTKProvider } from '../rtk/address'
import { profileRTKProvider } from '../rtk/profile'

const middlewares = [
    clientRTKProvider.middleware,
    addressRTKProvider.middleware,
    profileRTKProvider.middleware
]

export default middlewares
