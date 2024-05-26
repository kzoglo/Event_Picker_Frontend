import { DefProps } from './enums';
import { IProps } from './types';
import './SubmitBtn.css';

export const SubmitBtn = (props: IProps): JSX.Element => {
  const {
    classesBtn = DefProps.CLASSES_BTN,
    btnText    = DefProps.BTN_TEXT,
    reference,
    children
  } = props;
  return (
    <button
      className={`submitBtn ${classesBtn}`} 
      type="submit" 
      ref={reference}
      data-testid="submit-button"
    >
      {btnText}
      {children}
    </button>
  );
};
