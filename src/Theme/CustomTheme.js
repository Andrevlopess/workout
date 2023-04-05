import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

const theme = extendTheme({

  fontConfig:{
    Inter:{
      normal: "Inter_700Bold"
    },
  },
  fonts: {
    heading: "Inter",
    body: "Inter",
    mono: "Inter",
  },
  config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  })

  export default theme