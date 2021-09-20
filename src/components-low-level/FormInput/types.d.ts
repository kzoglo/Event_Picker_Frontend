import { RefObject } from 'react';

export interface IProps {
  moduleName: string;
  title: string;
  formValue: string | number;
  validationVal?: string;
  type: string;
  name: string;
  placeholder?: string;
  inputRef: RefObject;
  minlength?: number;
  maxlength?: number;
  required?: boolean;
  onClick?: ChangeEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: ChangeEventHandler<HTMLInputElement>;
}
