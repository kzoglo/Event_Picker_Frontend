import { DefProps } from './enums';
import { IProps } from './types';
import './FormInput.css';

const FormInput = (props: IProps): JSX.Element => {
  const {
    moduleName,
    title,
    formValue,
    validationVal = DefProps.VALIDATION_VAL,
    type,
    name,
    placeholder,
    inputRef,
    minlength = DefProps.MIN_LENGTH,
    maxlength = DefProps.MAX_LENGTH,
    required  = DefProps.REQUIRED,
    onClick,
    onChange,
    onBlur,
  } = props;
  return (
    <div className={`field ${moduleName}-${name}-wrapper`}>
      <label className='formInput-label' htmlFor={name}>
        {title}
      </label>
      <input
        id={name}
        className='formInput-input neutral-input'
        placeholder={placeholder}
        name={name}
        type={type}
        ref={inputRef}
        value={formValue}
        minLength={minlength}
        maxLength={maxlength}
        required={required}
        onChange={onChange}
        onClick={onClick}
        onBlur={onBlur}
      />
      <p className='validation-p'>{validationVal}</p>
    </div>
  );
};

export default FormInput;
