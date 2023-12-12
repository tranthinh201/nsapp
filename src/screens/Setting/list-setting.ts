import { SCREENS_KEY } from '@/navigation/preset'
import { KEY_NAME_MODAL } from './types'

export type ItemSettingType = {
  name: string
  screen_key?: string
  key_name_modal?: string
  url?: string
}

export const listSetting: ItemSettingType[] = [
  {
    name: 'Thông tin',
    screen_key: SCREENS_KEY.SETTING.INFORMATION,
  },
  {
    name: 'Thay đổi mật khẩu',
    screen_key: SCREENS_KEY.SETTING.CHANGE_PASSWORD,
  },
  {
    name: 'Điều khoản sử dụng',
    screen_key: SCREENS_KEY.SETTING.CHANGE_PASSWORD,
  },
  {
    name: 'Đăng xuất',
    key_name_modal: KEY_NAME_MODAL.LOGOUT,
  },
]
