import { RefObject } from 'react';

export interface IProps {
  reference: RefObject;
  classes: {
    outerWrapper?: string;
    spinnerWrapper?: string;
    spinner?: string;
  }
}
