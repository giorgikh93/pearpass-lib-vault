import { createAsyncThunk } from '@reduxjs/toolkit'

import { addDevice as addDeviceApi } from '../api/addDevice'
import { addDeviceFactory } from '../utils/addDeviceFactory'
import { logger } from '../utils/logger'

export const addDevice = createAsyncThunk(
  'vault/addDevice',
  async (payload, { getState }) => {
    const state = getState()
    const vaultState = state.vault
    const vaultId = vaultState.data.id
    const existingDevices = vaultState.data?.devices ?? []

    const existingDevice = existingDevices.find(
      (device) => device.name === payload
    )

    if (existingDevice) {
      logger.log('Device already added to vault')
      return existingDevice
    }

    const newDevice = addDeviceFactory(payload, vaultId)

    await addDeviceApi(newDevice)

    return newDevice
  }
)
