import icons from '../assets/images';

const breakpoints = {
  sm: 480,
  md: 768,
};

const lightColors = {
  MODAL_BACKGROUND: 'rgba(0,0,0,0.2)',

  BACKGROUND: '#FFFFFF',
  SURFACE1: '#FCFCFC',
  SURFACE2: '#F7F7F7',
  SURFACE3: '#FAFAFA',
  OUTLINE: '#EEEEED',
  UPPER_OUTLINE: '#D6D6D6',

  NEUTRAL_HIGH: '#19191A',
  NEUTRAL_MEDIUM: '#7D7D82',
  NEUTRAL_LOW: '#A3A3A3',

  BRAND_HIGH: '#103300',
  BRAND_UPPER_MEDIUM: '#7DCD28',
  BRAND_MEDIUM: '#B2EE7C',
  BRAND_UPPER_LOW: '#E4FDD8',
  BRAND_LOW: '#F3FEF0',

  SECONDARY_HIGH: '#3562FF',
  SECONDARY_UPPER_MEDIUM: '#4770FF',
  SECONDARY_MEDIUM: '#E3E8FC',
  SECONDARY_LOW: '#F1F4FE',

  ERROR_HIGH: '#FF3B30',
  ERROR_MEDIUM: '#FFE2E0',
  ERROR_LOW: '#FFF1F0',

  SUCCESS_HIGH: '#34C759',
  SUCCESS_MEDIUM: '#D8FDE2',
  SUCCESS_LOW: '#F0FFF4',

  WARNING_HIGH: '#FF9500',
  WARNING_MEDIUM: '#FFF2E0',
  WARNING_LOW: '#FFF9F0',

  INFORMATION_HIGH: '#007AFF',
  INFORMATION_MEDIUM: '#E0EFFF',
  INFORMATION_LOW: '#F0F7FF',

  ACCENT1_HIGH: '#32ADE6',
  ACCENT1_MEDIUM: '#E0F5FF',
  ACCENT1_LOW: '#F0FAFF',

  ACCENT2_HIGH: '#FF2D96',
  ACCENT2_MEDIUM: '#FFE0F0',
  ACCENT2_LOW: '#FFF0F7',

  ACCENT3_HIGH: '#00C7BE',
  ACCENT3_MEDIUM: '#E0FFFE',
  ACCENT3_LOW: '#F0FFFE',

  ACCENT4_HIGH: '#FF7A00',
  ACCENT4_MEDIUM: '#FFEFE0',
  ACCENT4_LOW: '#FFF7F0',

  ACCENT5_HIGH: '#FFCC00',
  ACCENT5_MEDIUM: '#FFF9E0',
  ACCENT5_LOW: '#FFFCF0',

  ACCENT6_HIGH: '#AF52DE',
  ACCENT6_MEDIUM: '#F5E0FF',
  ACCENT6_LOW: '#FAF0FF',
};

const darkColors = {
  MODAL_BACKGROUND: 'rgba(17,17,14,0.8)',

  BACKGROUND: '#1C1C1C',
  SURFACE1: '#1F1F1F',
  SURFACE2: '#242424',
  SURFACE3: '#212121',
  OUTLINE: '#38383A',
  UPPER_OUTLINE: '#5C5C5C',

  NEUTRAL_HIGH: '#FAFAFA',
  NEUTRAL_MEDIUM: '#9E9E9E',
  NEUTRAL_LOW: '#787878',

  BRAND_HIGH: '#103300',
  BRAND_UPPER_MEDIUM: '#7DCD28',
  BRAND_MEDIUM: '#A4E95C',
  BRAND_UPPER_LOW: '#2B4A1C',
  BRAND_LOW: '#1E381A',

  SECONDARY_HIGH: '#3360FF',
  SECONDARY_UPPER_MEDIUM: '#3149A0',
  SECONDARY_MEDIUM: '#232D52',
  SECONDARY_LOW: '#1F263E',

  ERROR_HIGH: '#FF5247',
  ERROR_MEDIUM: '#451A17',
  ERROR_LOW: '#391513',

  SUCCESS_HIGH: '#30D158',
  SUCCESS_MEDIUM: '#174522',
  SUCCESS_LOW: '#13391D',

  WARNING_HIGH: '#FF9F0A',
  WARNING_MEDIUM: '#5C310A',
  WARNING_LOW: '#453317',

  INFORMATION_HIGH: '#409FFF',
  INFORMATION_MEDIUM: '#172E45',
  INFORMATION_LOW: '#132639',

  ACCENT1_HIGH: '#64D2FF',
  ACCENT1_MEDIUM: '#173845',
  ACCENT1_LOW: '#0F252E',

  ACCENT2_HIGH: '#FF379B',
  ACCENT2_MEDIUM: '#45172E',
  ACCENT2_LOW: '#391326',

  ACCENT3_HIGH: '#63E6E2',
  ACCENT3_MEDIUM: '#174543',
  ACCENT3_LOW: '#133938',

  ACCENT4_HIGH: '#FF800A',
  ACCENT4_MEDIUM: '#452D17',
  ACCENT4_LOW: '#392513',

  ACCENT5_HIGH: '#FFD60A',
  ACCENT5_MEDIUM: '#453D17',
  ACCENT5_LOW: '#393313',

  ACCENT6_HIGH: '#BF5AF2',
  ACCENT6_MEDIUM: '#351745',
  ACCENT6_LOW: '#240F2E',
};

export const fonts = {
  TITLE: {
    fontSize: 17,
    fontFamily: 'Inter-Bold',
    lineHeight: '20px',
  },
  HEADING1: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    lineHeight: '20px',
  },
  HEADING2: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    lineHeight: '20px',
  },
  SECTION_HEADING1: {
    fontSize: 15,
    fontFamily: 'Inter-SemiBold',
    lineHeight: '20px',
  },
  SECTION_HEADING2: {
    fontSize: 15,
    fontFamily: 'Inter-Medium',
  },
  BODY1: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    lineHeight: '18px',
  },
  BODY2: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: '18px',
  },
  BODY3: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    lineHeight: '20px',
  },
  ACTION: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    lineHeight: '18px',
  },
  SIDE_NAVIGATION: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    lineHeight: '18px',
  },
  CAPTION: {
    fontSize: 13,
    fontFamily: 'Inter-Italic',
    lineHeight: '16px',
  },
  CAPTION_LARGE: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    lineHeight: '16px',
  },
  CAPTION_SMALL: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    lineHeight: '16px',
  },
  FOOTNOTE: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    lineHeight: '10px',
  },
  FOOTNOTE_SMALL: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    lineHeight: '12px',
  },
};

const shadow = {
  shadow1: {boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.08)'},
  shadow2: {boxShadow: '0px 0px 40px rgba(0, 0, 0, 0.08)'},
  shadow3: {boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06)'},
  shadow4: {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
  },
  shadow5: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06)',
  },
};

const radius = {
  '2xs': 1,
  xs: 2,
  sm: 3,
  md: 4,
  lg: 6,
  xl: 8,
  '2xl': 12,
  '3xl': 16,
  '4xl': 20,
  '5xl': 24,
};

const spacing = {
  '2xs': 2,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 10,
  xl: 12,
  '2xl': 16,
  '3xl': 20,
  '4xl': 24,
  '5xl': 30,
  '6xl': 32,
  '7xl': 36,
};

export default {
  breakpoints,
  lightColors,
  darkColors,
  icons,
  fonts,
  radius,
  spacing,
  shadow,
};
