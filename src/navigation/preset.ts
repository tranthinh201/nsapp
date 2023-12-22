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
  VERIFICATION_ACCOUNT: {
    INDEX: 'VERIFICATION_ACCOUNT' as const,
  },
}

export const BOOKING_SCREEN = {
  BOOKING_MOVIE_DETAIL: {
    INDEX: 'BOOKING_MOVIE_DETAIL' as const,
  },
  BOOKING_LIST_CINEMA: {
    INDEX: 'BOOKING_LIST_CINEMA' as const,
  },
  BOOKING_SEAT: {
    INDEX: 'BOOKING_SEAT' as const,
  },
  BOOKING_CONFIRM: {
    INDEX: 'BOOKING_CONFIRM' as const,
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
}

export const SCREENS_KEY = {
  HOME: {
    INDEX: 'HOME_INDEX' as const,
    MEW: 'HOME_MEW' as const,
  },
  SETTING: {
    INDEX: 'SETTING_INDEX' as const,
    INFORMATION: 'SETTING_INFORMATION' as const,
    CHANGE_PASSWORD: 'SETTING_CHANGE_PASSWORD' as const,
  },
  COMING_SOON: {
    INDEX: 'COMING_SOON_INDEX' as const,
  },
  FOOD: {
    INDEX: 'FOOD_INDEX' as const,
    DETAIL: 'FOOD_DETAIL' as const,
  },
  ...SEARCH,
  ...TUTORIAL,
  ...AUTH_SCREEN,
  ...INFORMATION_STACK,
  ...BOOKING_SCREEN,
}

export const BOTTOM_TABS_KEY = {
  TAB_HOME: 'TAB_HOME' as const,
  TAB_SETTING: 'TAB_SETTING' as const,
  TAB_COMING_SOON: 'TAB_COMING_SOON' as const,
  TAB_FOOD: 'TAB_FOOD' as const,
}
