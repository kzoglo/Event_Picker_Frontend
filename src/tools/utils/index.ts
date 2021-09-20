import { ClassesToManipulate } from '../../enums';
import { isLower } from '../predicates';
import { IClassManipulator } from './types';

/* Generic */
export const addClasses = (
  element: HTMLElement,
  classes: IClassManipulator
) => {
  if (!(classes instanceof Array)) classes = [classes];
  classes.forEach((newClass) => {
    element.classList.add(newClass);
  });
};

export const removeClasses = (
  element: HTMLElement,
  classes: IClassManipulator
) => {
  if (!(classes instanceof Array)) classes = [classes];
  classes.forEach((newClass) => {
    element.classList.remove(newClass);
  });
};

export const modifyClasses = (
  element: HTMLElement,
  classesToDel: IClassManipulator = [],
  classesToAdd: IClassManipulator = []
) => {
  removeClasses(element, classesToDel);
  addClasses(element, classesToAdd);
};

export const startLoading = (
  element: HTMLElement,
  classesToDel: IClassManipulator = [],
  classesToAdd: IClassManipulator = []
) => {
  const { INVISIBLE, SHOW, VISIBLE, HIDE } = ClassesToManipulate;
  if (!(classesToDel instanceof Array)) classesToDel = [classesToDel];
  if (!(classesToAdd instanceof Array)) classesToAdd = [classesToAdd];
  modifyClasses(
    element,
    [HIDE, INVISIBLE, ...classesToDel],
    [SHOW, VISIBLE, ...classesToAdd]
  );
};

export const finishLoading = (element: HTMLElement) => {
  const { INVISIBLE, SHOW, VISIBLE, HIDE } = ClassesToManipulate;
  modifyClasses(element, [SHOW, VISIBLE], [HIDE, INVISIBLE]);
};

export const disableElement = (
  element: HTMLElement,
  classesToAdd: IClassManipulator = [],
  classesToDel: IClassManipulator = []
) => {
  element.setAttribute('disabled', 'true');
  modifyClasses(element, classesToDel, classesToAdd);
};

export const enableElement = (
  element: HTMLElement,
  classesToAdd: IClassManipulator = [],
  classesToDel: IClassManipulator = []
) => {
  element.removeAttribute('disabled');
  modifyClasses(element, classesToDel, classesToAdd);
};

/* Form related */
export const validateEmail = (emailValue: string) => {
  if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)) return false;
  return true;
};

export const validateName = (value: string) => {
  if (!/^[a-żA-Ż]+(([',. -][a-żA-Ż ])?[a-żA-Ż]*)*$/.test(value)) return false;
  return true;
};

export const validateSurname = (value: string) => {
  if (!/^[a-żA-Ż]+(([',. -][a-żA-Ż ])?[a-żA-Ż]*)*$/.test(value)) return false;
  return true;
}

export const validateDateInputType = (value: string) => {
  const time = new Date(value).toString();
  if (time === 'Invalid Date') return false;
  return true;
};

export const validateDateInputValue = (value: string) => {
  const time = new Date(value).getTime();
  const now = Date.now();

  if (!isLower(now, time)) return false;
  return true;
};
