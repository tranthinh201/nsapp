export const AUTH_SCREEN = {
  TUTORIAL: {
    INDEX: 'TUTORIAL' as const,
  },
  SIGN_IN: {
    INDEX: 'SIGN_IN' as const,
  },
  SIGN_UP: {
    INDEX: 'SIGN_UP' as const,
  },
  WELCOME: {
    INDEX: 'WELCOME' as const,
  },
  FORGOT_PASSWORD: {
    INDEX: 'FORGOT_PASSWORD' as const,
  },
}

export const TUTORIAL = {
  TUTORIAL: {
    INDEX: 'TUTORIAL' as const,
  },
}

export const REGISTER_BASIC = {
  REGISTER_BASIC_INFO: {
    INDEX: 'REGISTER_BASIC_INFO' as const,
  },
  REGISTRATION_SUCCESS_SCREEN: {
    INDEX: 'REGISTRATION_SUCCESS_SCREEN' as const,
  },
}

export const SEARCH = {
  SEARCH: {
    INDEX: 'SEARCH_INDEX' as const,
  },
}

export const INFORMATION_STACK = {
  INFORMATION: {
    INDEX: 'INFORMATION' as const,
  },
  CHANGE_PASSWORD: {
    INDEX: 'CHANGE_PASSWORD' as const,
  },
  ABOUT_APP: {
    INDEX: 'ABOUT_APP' as const,
  },
  CANCEL_MEMBERSHIP: {
    INDEX: 'CANCEL_MEMBERSHIP' as const,
  },
  PUBLIC_INFORMATION: {
    INDEX: 'PUBLIC_INFORMATION' as const,
  },
  PRIVATE_INFORMATION: {
    INDEX: 'PRIVATE_INFORMATION' as const,
  },
}

export const JOB_DETAILS_STACK = {
  JOB_DETAILS: {
    INDEX: 'JOB_DETAILS' as const,
  },
  DEPART_TIME_SEND: {
    INDEX: 'DEPART_TIME_SEND' as const,
  },
  DEPART: {
    INDEX: 'DEPART' as const,
  },
  ACCEPT_EVENT: {
    INDEX: 'ACCEPT_EVENT' as const,
  },
  ACCEPT_EVENT_FINISH: {
    INDEX: 'ACCEPT_EVENT_FINISH' as const,
  },
  EVENT_APPLICATION_FINISH: {
    INDEX: 'EVENT_APPLICATION_FINISH' as const,
  },
}

export const WEBVIEW_STACK = {
  WEBVIEW: {
    INDEX: 'WEBVIEW' as const,
  },
}

export const ATTENDANCE_STACK = {
  ATTENDANCE: {
    INDEX: 'ATTENDANCE' as const,
  },
  SCAN_QR_CODE: {
    INDEX: 'SCAN_QR_CODE' as const,
  },
}

export const SCREENS_KEY = {
  HOME: {
    INDEX: 'HOME_INDEX' as const,
    MEW: 'HOME_MEW' as const,
  },
  LIKE: {
    INDEX: 'LIKE_INDEX' as const,
  },
  EVENT: {
    INDEX: 'EVENT_INDEX' as const,
  },
  PROFILE: {
    INDEX: 'PROFILE_INDEX' as const,
  },
  SETTING: {
    INDEX: 'SETTING_INDEX' as const,
  },
  ...SEARCH,
  ...TUTORIAL,
  ...AUTH_SCREEN,
  ...REGISTER_BASIC,
  ...JOB_DETAILS_STACK,
  ...INFORMATION_STACK,
  ...WEBVIEW_STACK,
  ...ATTENDANCE_STACK,
}

export const BOTTOM_TABS_KEY = {
  TAB_HOME: 'TAB_HOME' as const,
  TAB_LIKE: 'TAB_LIKE' as const,
  TAB_EVENT: 'TAB_EVENT' as const,
  TAB_SCANNER: 'TAB_SCANNER' as const,
  TAB_PROFILE: 'TAB_PROFILE' as const,
}
