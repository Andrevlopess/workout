import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';

const theme = extendTheme({
    shadows:{
        teste: {
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 10,
            },
            shadowOpacity: 0.53,
            shadowRadius: 13.97,
            elevation: 21,
            }
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  })

  export default theme