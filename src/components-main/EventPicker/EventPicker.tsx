import React, { Component, createRef } from 'react';

import timeout from '../../tools/timeout';
import { handleHttpStatus } from '../../tools/errors handling/handleHttpStatus';
import baseFetch from '../../tools/API/baseFetch';
import LoadingSpinner from '../../components-low-level/LoadingSpinner/LoadingSpinner';
import { SubmitBtn } from '../../components-low-level/SubmitBtn/SubmitBtn';
import FormInput from '../../components-low-level/FormInput/FormInput';
import {
  startLoading,
  finishLoading,
  disableElement as disableSubmitBtn,
  enableElement as enableSubmitBtn,
  validateEmail,
  validateSurname,
  validateName,
  validateMinDateInputValue,
  validateMaxDateInputValue,
} from '../../tools/utils';
import { DefProps } from './enums';
import { IEventCreateResp, IFormData, IProps, IState } from './types';
import { CustomError } from '../../tools/errors/Error';
import { isEqual, isLower } from '../../tools/predicates';
import { ClassesToManipulate } from '../../enums';
import './EventPicker.css';

class EventPicker extends Component<IProps, IState> {
  private firstNameRef = createRef<HTMLInputElement>();
  private lastNameRef = createRef<HTMLInputElement>();
  private emailRef = createRef<HTMLInputElement>();
  private eventDateRef = createRef<HTMLInputElement>();
  private validateSubmittingInfoRef = createRef<HTMLParagraphElement>();
  private submitSpinnerRef = createRef<HTMLElement>();
  private submitBtnRef = createRef<HTMLButtonElement>();

  constructor(props: IProps) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      eventDate: '',
      afterSubmitInfo: '',
      validationMsgFirstName: '',
      validationMsgLastName: '',
      validationMsgEmail: '',
      validationMsgEventDate: '',
    };
  }

  /* Lifecycle Methods */
  componentDidMount() {
    this.firstNameRef.current!.focus();
  }

  /* Assistive Methods */
  renderInputs = () => {
    const inputsData = [
      {
        title: 'First name',
        name: 'firstName',
        placeholder: 'min. 3 characters',
        minLength: 3,
        maxLength: 100,
        formValue: this.state.firstName,
        type: 'text',
        reference: this.firstNameRef,
        validationMsg: this.state.validationMsgFirstName,
        validationMsgName: 'validationMsgFirstName',
      },
      {
        title: 'Last name',
        name: 'lastName',
        placeholder: 'min. 3 characters',
        minLength: 3,
        maxLength: 100,
        formValue: this.state.lastName,
        type: 'text',
        reference: this.lastNameRef,
        validationMsg: this.state.validationMsgLastName,
        validationMsgName: 'validationMsgLastName',
      },
      {
        title: 'E-mail',
        name: 'email',
        placeholder: 'min. 5 characters',
        minLength: 5,
        maxLength: 100,
        formValue: this.state.email,
        type: 'email',
        reference: this.emailRef,
        validationMsg: this.state.validationMsgEmail,
        validationMsgName: 'validationMsgEmail',
      },
      {
        title: 'Date',
        name: 'eventDate',
        formValue: this.state.eventDate,
        type: 'date',
        reference: this.eventDateRef,
        validationMsg: this.state.validationMsgEventDate,
        validationMsgName: 'validationMsgEventDate',
      },
    ];

    return inputsData.map(
      ({
        title,
        name,
        formValue,
        type,
        placeholder,
        minLength,
        maxLength,
        reference,
        validationMsg,
        validationMsgName,
      }, index) => {
        return (
          <FormInput
            moduleName='eventPicker'
            key={index}
            title={title}
            name={name}
            placeholder={placeholder}
            formValue={formValue}
            validationVal={validationMsg}
            type={type}
            minLength={minLength}
            maxLength={maxLength}
            inputRef={reference}
            onChange={() =>
              this.handleInputChange(name, reference.current!.value)
            }
            onBlur={() =>
              this.validateInput(
                title,
                reference.current!,
                validationMsgName,
                minLength,
              )
            }
          />
        );
      }
    );
  };

  negativeValidation = (inputClassList: DOMTokenList, warningText: string, validationMsgName: string) => {
    //@ts-ignore
    this.setState({ [validationMsgName]: warningText });
    const { NEUTRAL_INPUT, INVALID_INPUT } = ClassesToManipulate;
    inputClassList.replace(NEUTRAL_INPUT, INVALID_INPUT);
  };

  positiveValidation = (inputClassList: DOMTokenList, validationMsgName: string) => {
    //@ts-ignore
    this.setState({ [validationMsgName]: '' });
    const { NEUTRAL_INPUT, INVALID_INPUT } = ClassesToManipulate;
    inputClassList.replace(INVALID_INPUT, NEUTRAL_INPUT);
  };

  validateInput = (
    title: string,
    { name: inputName, value: inputValue, classList: inputClassList }:
      { name: string, value: string, classList: DOMTokenList },
    validationMsgName: string,
    minlength?: number,
  ) => {
    let warningText;

    if (isEqual(inputName, 'firstName')) {
      if (isLower(inputValue.length, minlength as number)) {
        warningText = `"${title}" needs to have at least ${minlength} characters`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      }
      else if (!validateName(inputValue)) {
        warningText = `"${title}" cannot contain numbers and special characters`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      }
      else this.positiveValidation(inputClassList, validationMsgName);
    }

    if (isEqual(inputName, 'lastName')) {
      if (isLower(inputValue.length, minlength as number)) {
        warningText = `"${title}" needs to have at least ${minlength} characters`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      } 
      else if (!validateSurname(inputValue)) {
        warningText = `"${title}" cannot contain numbers and special characters`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      }
      else this.positiveValidation(inputClassList, validationMsgName);
      return;
    }

    if (isEqual(inputName, 'email')) {
      if (isLower(inputValue.length, minlength as number)) {
        warningText = `"${title}" needs to have at least ${minlength} characters`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      }
      else if (!validateEmail(inputValue)) {
        warningText = `Wrong email format`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      }
      else this.positiveValidation(inputClassList, validationMsgName);
      return;
    }

    if (isEqual(inputName, 'eventDate')) {
      if (isEqual(inputValue.length, 0)) {
        warningText = `"${title}" needs to be selected`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      }
      else if (!validateMinDateInputValue(inputValue)) {
        warningText = `"${title}" needs to be in future`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      }
      else if (!validateMaxDateInputValue(inputValue)) {
        warningText = `"${title}" can extend up to 100 years into the future`;
        this.negativeValidation(inputClassList, warningText, validationMsgName);
      }
      else this.positiveValidation(inputClassList, validationMsgName);
      return;
    }
  };

  validateSubmittingInfo = (status: number, msg: string) => {
    const { VALID, INVALID } = ClassesToManipulate;
    const validateSubmittingInfoParagraph = this.validateSubmittingInfoRef.current;
    if (isEqual(status, 201)) {
      this.setState({ afterSubmitInfo: msg });
      validateSubmittingInfoParagraph!.classList.replace(INVALID, VALID);
    } else {
      this.setState({ afterSubmitInfo: msg });
    }

    timeout(() => {
      this.setState({ afterSubmitInfo: '' });
      validateSubmittingInfoParagraph!.classList.replace(VALID, INVALID);
    }, 1000);
  };

  checksDataEntirety = () => {
    let validationMsgs = [
      this.state.validationMsgFirstName,
      this.state.validationMsgLastName,
      this.state.validationMsgEmail,
      this.state.validationMsgEventDate,
    ];
    let areDataCorrect = validationMsgs.every((msg) => isEqual(msg, ''));
    if (!areDataCorrect) {
      const msg = 'Correct the entered data';
      this.setState({ afterSubmitInfo: msg }, () => {
        timeout(() => {
          this.setState({ afterSubmitInfo: '' });
        }, 1000);
      });
      throw new Error(msg);
    }
  };

  endFormSubmitting = () => {
    const { CURSOR_AUTO, CURSOR_POINTER } = ClassesToManipulate;
    finishLoading(this.submitSpinnerRef.current!);
    enableSubmitBtn(this.submitBtnRef.current!, [CURSOR_POINTER], [CURSOR_AUTO]);
  };

  /* Handlers */
  handleInputChange = (stateKey: string, value: any) => {
    //@ts-ignore
    this.setState({ [stateKey]: value });
  };

  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { CURSOR_AUTO, CURSOR_POINTER } = ClassesToManipulate;
    disableSubmitBtn(this.submitBtnRef.current!, [CURSOR_AUTO], [CURSOR_POINTER]);
    startLoading(this.submitSpinnerRef.current!);

    try {
      this.checksDataEntirety();
    } catch (err: any) {
      this.endFormSubmitting();
      return;
    }

    try {
      const formData: IFormData = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        eventDate: new Date(this.state.eventDate).getTime(),
      };

      const res = await baseFetch({
        path: '/event/add',
        body: JSON.stringify(formData),
        method: 'POST',
      });

      handleHttpStatus(res.status);
      const resParsed: IEventCreateResp = await res.json();
      this.endFormSubmitting();
      this.validateSubmittingInfo(res.status, resParsed.message);
    } catch (err: any) {
      this.endFormSubmitting();
      err as CustomError;
      this.validateSubmittingInfo(err.status, err.message);
    }
  };

  render() {
    const {
      title = DefProps.TITLE,
    } = this.props;
    const { CURSOR_POINTER } = ClassesToManipulate;

    return (
      <div className='eventPicker-outerWrapper'>
        <div className='eventPicker-wrapper'>
          <h1 className='eventPicker-title'>{title}</h1>
          <form className='eventPicker-form' onSubmit={this.handleSubmit}>
            {this.renderInputs()}
            <SubmitBtn
              classesBtn={`eventPicker-Btn ${CURSOR_POINTER}`}
              btnText='Send'
              reference={this.submitBtnRef}
            >
              <LoadingSpinner
                reference={this.submitSpinnerRef}
                classes={{
                  outerWrapper: 'eventPicker-spinner-outerWrapper',
                  spinner: 'eventPicker-spinner',
                }}
              />
            </SubmitBtn>
            <p
              ref={this.validateSubmittingInfoRef}
              className='validate-eventPicker-info invalid'
            >
              {this.state.afterSubmitInfo}
            </p>
          </form>
        </div>
      </div>
    );
  }
}

export default EventPicker;
