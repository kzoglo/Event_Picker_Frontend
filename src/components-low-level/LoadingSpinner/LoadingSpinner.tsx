import { DefProps } from './enums';
import { IProps } from './types';
import './LoadingSpinner.css';

const LoadingSpinner = (props: IProps): JSX.Element => {
  const {
    reference,
    classes: {
      outerWrapper = DefProps.OUTER_WRAPPER,
      spinnerWrapper = DefProps.SPINNER_WRAPPER,
      spinner = DefProps.SPINNER,
    },
  } = props;
  return (
    <div
      ref={reference}
      className={`loadingSpinner-outerWrapper invisible ${outerWrapper}`}
      data-testid="loading-spinner"
    >
      <div className={`loadingSpinner-wrapper ${spinnerWrapper}`}>
        <div className={`loadingSpinner-spinner ${spinner}`}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
