import './spinner-style.scss';

export type SpinnerType = {
  size?: 'small' | 'middle' | 'large';
};

export const Spinner = ({ size = 'middle' }: SpinnerType) => {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
};
