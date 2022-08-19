import busyIndicator from '../assets/preloader.gif';

const BusyIndicator = () => {
  return (
    <img
      src={busyIndicator}
      alt='Busy indicator loading GIF'
      style={{ display: 'block', margin: 'auto', width: '75%' }}
    />
  );
};

export default BusyIndicator;
