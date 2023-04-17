// THIRD-PARTY
import { useContext } from 'react';

// PROJECT IMPORT
import { ConfigContext } from 'contexts/ConfigContext';

const useConfig = () => useContext(ConfigContext);

export default useConfig;
