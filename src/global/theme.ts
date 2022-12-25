import { extendTheme } from '@chakra-ui/react'
import "@fontsource/poppins";

const theme = {
  styles: {
    global: {
      'html, body': {
        fontFamily: 'Poppins, sans-serif',
      }
    }
  },
  colors: {
    brand: {
      blue: '#5429CC',
      green: '#33CC95',
      red: '#E52E4D',
      shape: '#FFFFFF',
      title: '#363F5F',
      text: '#969CB2',
      background: '#F0F2F5',
    },
    fonts: {
      title: "Poppins, sans-serif",
      heading: "Poppins, sans-serif",
      mono: "Poppins, sans-serif",
    }
  }
}

export const customTheme = extendTheme(theme);

