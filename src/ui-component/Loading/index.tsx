import loadingImage from '../../assets/images/logo/logo1.svg';

const Loading = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(214, 214, 214, 0.2)',
      zIndex: 9999
    }}
  >
    {/* <div className="lds-dual-ring" /> */}
    {/* <div className="lds-hourglass" /> */}
    {/* <div className="image-loading">
      <img src={loadingImage} alt="logo page" />
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div> */}
    <div className="lds-dual-ring">
      <img src={loadingImage} alt="logo page" />
    </div>
  </div>
);

export default Loading;
