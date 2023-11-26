import * as Updates from 'expo-updates'

const ENV = {
  dev: {
    REACT_APP_ENV_SCHEME: '',
    REACT_APP_NAVIGATION_TITLE: '',
    REACT_APP_HTTP: 'https://',
    REACT_APP_DOMAIN_IOS: '',
    REACT_APP_DOMAIN_ANDROID: '',
    REACT_APP_API_VERSION: '',
    REACT_APP_RESERVA_URL: '',
    REACT_APP_TERMS_OF_SERVICE_URL: '',
    REACT_APP_PRIVACY_POLICY_URL: '',
    REACT_APP_WITHDRAW_QUESTIONNAIRE: '',
    REACT_APP_TERMS_OF_SERVICE_URL_JP: '',
    REACT_APP_PRIVACY_POLICY_URL_JP: '',
    WEBSITE: '',
  },
  adhoc: {
    REACT_APP_ENV_SCHEME: '',
    REACT_APP_NAVIGATION_TITLE: '',
    REACT_APP_HTTP: 'https://',
    REACT_APP_DOMAIN_IOS: '',
    REACT_APP_DOMAIN_ANDROID: '',
    REACT_APP_API_VERSION: '',
    REACT_APP_RESERVA_URL: '',
    REACT_APP_TERMS_OF_SERVICE_URL: '',
    REACT_APP_PRIVACY_POLICY_URL: '',
    REACT_APP_WITHDRAW_QUESTIONNAIRE: '',
    REACT_APP_TERMS_OF_SERVICE_URL_JP: '',
    REACT_APP_PRIVACY_POLICY_URL_JP: '',
    WEBSITE: '',
  },
  production: {
    // CONST
    REACT_APP_ENV_SCHEME: '',
    REACT_APP_NAVIGATION_TITLE: 'NEKONOTE',
    REACT_APP_HTTP: 'https://',
    REACT_APP_DOMAIN_IOS: '',
    REACT_APP_DOMAIN_ANDROID: '',
    REACT_APP_API_VERSION: '',
    REACT_APP_RESERVA_URL: '',
    REACT_APP_TERMS_OF_SERVICE_URL: '',
    REACT_APP_PRIVACY_POLICY_URL: '',
    REACT_APP_WITHDRAW_QUESTIONNAIRE: '',
    REACT_APP_TERMS_OF_SERVICE_URL_JP: '',
    REACT_APP_PRIVACY_POLICY_URL_JP: '',
    WEBSITE: '',
  },
}

export const getEnvVars = (env: string | null = null) => {
  // What is __DEV__ ?
  // This variable is set to true when react-native is running in Dev mode.
  // __DEV__ is true when run locally, but false when published.
  console.log('CHANNEL', Updates.channel)

  if (env == null) {
    env = Updates.channel || null
  }
  if (__DEV__) {
    return ENV.dev
  } else if (env === 'adhoc') {
    return ENV.adhoc
  } else if (env === 'production') {
    return ENV.production
  }
}
