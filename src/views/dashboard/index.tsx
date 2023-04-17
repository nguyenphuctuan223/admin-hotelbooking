// THIRD-PARTY
import { Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { activeItem } from 'store/slices/menu';

// PROJECT IMPORTS
import MainCard from 'ui-component/cards/MainCard';

const DashboardPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeItem(['dashboard']));
  }, [dispatch]);

  return (
    <MainCard title="Dashboard">
      <Typography variant="body2">
        Lorem ipsum dolor sit amen, consenter nipissing eli, sed do elusion tempos incident ut laborers et doolie magna alissa. Ut enif ad
        minim venice, quin nostrum exercitation illampu laborings nisi ut liquid ex ea commons construal. Duos aube grue dolor in
        reprehended in voltage veil esse colum doolie eu fujian bulla parian. Exceptive sin ocean cuspidate non president, sunk in culpa qui
        officiate descent molls anim id est labours.
      </Typography>
    </MainCard>
  );
};

export default DashboardPage;
