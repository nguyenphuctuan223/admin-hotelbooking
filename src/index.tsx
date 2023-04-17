// THIRD PARTY
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// PROJECT IMPORTS
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import * as serviceWorker from 'serviceWorker';
import { BASE_PATH } from 'config';
import { ConfigProvider } from 'contexts/ConfigContext';
import { persister, store } from 'store';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ConfigProvider>
        <BrowserRouter basename={BASE_PATH}>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();

reportWebVitals();
