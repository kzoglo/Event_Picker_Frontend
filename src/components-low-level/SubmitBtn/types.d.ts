import { RefObject, ReactElement } from 'react';

export interface IProps {
  classesBtn: string;
  btnText: string;
  reference: RefObject<HTMLButtonElement>;
  children: ReactElement | ReactElement[];
}
