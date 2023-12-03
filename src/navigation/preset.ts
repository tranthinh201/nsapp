export const AUTH_SCREEN = {
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
  VERIFICATION: {
    INDEX: 'VERIFICATION' as const,
  },
  RESET_PASSWORD: {
    INDEX: 'RESET_PASSWORD' as const,
  },
}

export const TUTORIAL = {
  TUTORIAL: {
    INDEX: 'TUTORIAL' as const,
  },
}

export const SEARCH = {
  SEARCH: {
    INDEX: 'SEARCH_INDEX' as const,
  },
}

export const SCREENS_KEY = {
  HOME: {
    INDEX: 'HOME_INDEX' as const,
    MEW: 'HOME_MEW' as const,
  },
  PROFILE: {
    INDEX: 'PROFILE_INDEX' as const,
    CHANGE_PASSWORD: 'PROFILE_CHANGE_PASSWORD' as const,
    UPDATE: 'PROFILE_UPDATE' as const,
  },
  SETTING: {
    INDEX: 'SETTING_INDEX' as const,
    PROFILE: 'SETTING_PROFILE' as const,
  },
  ...SEARCH,
  ...TUTORIAL,
  ...AUTH_SCREEN,
}

export const BOTTOM_TABS_KEY = {
  TAB_HOME: 'TAB_HOME' as const,
  TAB_LIKE: 'TAB_LIKE' as const,
  TAB_PROFILE: 'TAB_PROFILE' as const,
}
