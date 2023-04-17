// THIRD-PARTY
import React from 'react';

// PROJECT IMPORTS
import Locales from 'ui-component/Locales';
import NavigationScroll from 'layout/NavigationScroll';
import Routes from 'routes';
import RTLLayout from 'ui-component/RTLLayout';
import ThemeCustomization from 'themes';
import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
import Snackbar from 'ui-component/extended/Snackbar';

const App = () => (
  <ThemeCustomization>
    <RTLLayout>
      <Locales>
        <NavigationScroll>
          <AuthProvider>
            <>
              <Routes />
              <Snackbar />
            </>
          </AuthProvider>
        </NavigationScroll>
      </Locales>
    </RTLLayout>
  </ThemeCustomization>
);

export default App;
