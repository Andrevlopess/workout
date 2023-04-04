import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

const theme = extendTheme({
    shadows:{
        teste: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,
          
          elevation: 14,
        }
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  })

  export default theme