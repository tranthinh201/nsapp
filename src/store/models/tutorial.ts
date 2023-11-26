import { STORAGE_KEY } from '@/libs/asyncStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createModel } from '@rematch/core'
import { Dispatch } from '..'
import { RootModel } from './root'

interface TutorialProps {
  seenIntroduce: boolean
}

const state: TutorialProps = {
  seenIntroduce: false,
}

const reducers = {
  setSeenIntroduce: (state: TutorialProps, payload: boolean) => {
    setHasSeenIntroduce(payload)
    return {
      ...state,
      seenIntroduce: payload,
    }
  },
}

const effects = (dispatch: Dispatch) => ({})

export const tutorial = createModel<RootModel>()({
  state,
  reducers,
  effects,
})

export const setHasSeenIntroduce = async (value: boolean) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY.TUTORIAL, JSON.stringify(value))
  } catch (error) {
    console.log(error)
  }
}
