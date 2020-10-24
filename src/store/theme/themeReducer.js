import { DEFAULT_THEME } from '../../assets/theme'

const ThemeActionType = {
  SET_THEME: 'SET_THEME',
  RESET_THEME: 'RESET_THEME',
}

export const setThemeAction = (theme) => ({
  type: ThemeActionType.SET_THEME,
  payload: { theme },
})

export const restThemeAction = () => ({
  type: ThemeActionType.RESET_THEME,
})

const themeReducer = (state = DEFAULT_THEME, action) => {
  switch (action.type) {
    case ThemeActionType.SET_THEME:
      if (action?.payload?.theme) return action.payload.theme
      return state
    case ThemeActionType.RESET_THEME:
      return DEFAULT_THEME
    default:
      return state
  }
}

export default themeReducer
