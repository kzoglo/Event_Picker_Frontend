export interface IEventCreateResp {
  message: string;
}

export interface IFormData {
  firstName: string,
  lastName: string,
  email: string,
  eventDate: number,
}

export interface IProps {
  title?: string;
}

export interface IState {
  firstName: string,
  lastName: string,
  email: string,
  eventDate: string,
  afterSubmitInfo: string,
  validationMsgFirstName: string | undefined,
  validationMsgLastName: string | undefined,
  validationMsgEmail: string | undefined,
  validationMsgEventDate: string | undefined,
}
