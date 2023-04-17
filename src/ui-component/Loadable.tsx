import { ComponentType, LazyExoticComponent, Suspense } from 'react';

// material-ui
import { LinearProgressProps } from '@mui/material/LinearProgress';

// PROJECT IMPORTS
import Loader from './Loader';

interface LoaderProps extends LinearProgressProps {}

const Loadable = (Component: LazyExoticComponent<() => JSX.Element> | ComponentType<React.ReactNode>) => (props: LoaderProps) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
