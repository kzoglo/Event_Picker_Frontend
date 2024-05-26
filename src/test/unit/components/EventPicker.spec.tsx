import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect';

import EventPicker from '../../../components-main/EventPicker/EventPicker';

describe('INTEGRATION', () => {
  describe('EventPicker', () => {
    const firstNameValidationError = '"First name" needs to have at least 3 characters';
    const lastNameValidationError = '"Last name" needs to have at least 3 characters';
    const emailValidationError = '"E-mail" needs to have at least 5 characters';
    const eventDateValidationError = '"Date" needs to be selected';

    afterEach(() => {
      cleanup();
    });

    test('Should change the name of the event to "My Test"', () => {
      const title = 'My Test';
      render(<EventPicker title={title} />);
      const titleHeader = screen.getByText(title);

      expect(titleHeader).toBeDefined();
      expect(titleHeader).toHaveClass('eventPicker-title');
    });

    describe('Inputs filling', () => {
      let inputFirstName: HTMLElement;
      let inputLastName: HTMLElement;
      let inputEmail: HTMLElement;
      let inputEventDate: HTMLElement;

      beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(
          <EventPicker />, {
            container: document.body.appendChild(document.createElement('div')),
          }
        );

        inputFirstName = screen.getByLabelText('First name');
        inputLastName = screen.getByLabelText('Last name');
        inputEmail = screen.getByLabelText('E-mail');
        inputEventDate = screen.getByLabelText('Date');
      })

      test('Should not display validation error messages when inputs are properly filled', () => {
        inputFirstName.focus();
        fireEvent.change(inputFirstName, { target: { value: 'Kamil' } });
        inputFirstName.blur();
        const validationParagraphFirstName = screen.queryByText(firstNameValidationError);
        expect(validationParagraphFirstName).not.toBeInTheDocument();
        
        inputLastName.focus();
        fireEvent.change(inputLastName, { target: { value: 'Żogło' } });
        inputLastName.blur();
        const validationParagraphLastName = screen.queryByText(lastNameValidationError);
        expect(validationParagraphLastName).not.toBeInTheDocument();

        inputEmail.focus();
        fireEvent.change(inputEmail, { target: { value: 'zoglo@gmail.com' } });
        inputEmail.blur();
        const validationParagraphEmail = screen.queryByText(emailValidationError);
        expect(validationParagraphEmail).not.toBeInTheDocument();

        inputEventDate.focus();
        fireEvent.change(inputEventDate, { target: { value: '2030-09-29' } });
        inputEventDate.blur();
        const validationParagraphEventDate = screen.queryByText(eventDateValidationError);
        expect(validationParagraphEventDate).not.toBeInTheDocument();
      });

      test('Should display the empty input validation error messages when inputs were focused, not filled and blurred', () => {
        inputFirstName.focus();
        fireEvent.change(inputFirstName, { target: { value: '' } });
        inputFirstName.blur();
        const validationParagraphFirstName = screen.queryByText(firstNameValidationError);
        expect(validationParagraphFirstName).toBeInTheDocument();
        
        inputLastName.focus();
        fireEvent.change(inputLastName, { target: { value: '' } });
        inputLastName.blur();
        const validationParagraphLastName = screen.queryByText(lastNameValidationError);
        expect(validationParagraphLastName).toBeInTheDocument();

        inputEmail.focus();
        fireEvent.change(inputEmail, { target: { value: '' } });
        inputEmail.blur();
        const validationParagraphEmail = screen.queryByText(emailValidationError);
        expect(validationParagraphEmail).toBeInTheDocument();

        inputEventDate.focus();
        fireEvent.change(inputEventDate, { target: { value: '' } });
        inputEventDate.blur();
        const validationParagraphEventDate = screen.queryByText(eventDateValidationError);
        expect(validationParagraphEventDate).toBeInTheDocument();
      });

      test('Should display the wrong data format validation error messages when inputs were focused, incorrectly filled and blurred', () => {
        inputFirstName.focus();
        fireEvent.change(inputFirstName, { target: { value: 'ka242mil' } });
        inputFirstName.blur();
        const validationParagraphFirstName = screen.queryByText('"First name" cannot contain numbers and special characters');
        expect(validationParagraphFirstName).toBeInTheDocument();
        
        inputLastName.focus();
        fireEvent.change(inputLastName, { target: { value: 'g543' } });
        inputLastName.blur();
        const validationParagraphLastName = screen.queryByText('"Last name" cannot contain numbers and special characters');
        expect(validationParagraphLastName).toBeInTheDocument();

        inputEmail.focus();
        fireEvent.change(inputEmail, { target: { value: 'ds@pl' } });
        inputEmail.blur();
        const validationParagraphEmail = screen.queryByText('Wrong email format');
        expect(validationParagraphEmail).toBeInTheDocument();

        inputEventDate.focus();
        fireEvent.change(inputEventDate, { target: { value: '2021-07-07' } });
        inputEventDate.blur();
        const validationParagraphEventDate = screen.queryByText('"Date" needs to be in future');
        expect(validationParagraphEventDate).toBeInTheDocument();
      });
    });
  });

  describe('LoadingSpinner and SubmitBtn', () => {
    let inputFirstName: HTMLElement;
    let inputLastName: HTMLElement;
    let inputEmail: HTMLElement;
    let inputEventDate: HTMLElement;

    beforeEach(() => {
      // eslint-disable-next-line testing-library/no-render-in-setup
      render(
        <EventPicker />, {
          container: document.body.appendChild(document.createElement('div')),
        }
      );

      inputFirstName = screen.getByLabelText('First name');
      inputLastName = screen.getByLabelText('Last name');
      inputEmail = screen.getByLabelText('E-mail');
      inputEventDate = screen.getByLabelText('Date');
    })

    test('Should disable Submit Button and show Loading Spinner when valid data was provided and Submit Button was clicked', async () => {
      const submitBtn =  screen.getByTestId('submit-button');
      const loadingSpinner = screen.getByTestId('loading-spinner');

      expect(loadingSpinner).toHaveClass('invisible');
      expect(submitBtn).toHaveClass('cursor-pointer');
      expect(submitBtn).not.toHaveAttribute('disabled');

      fireEvent.change(inputFirstName, { target: { value: 'Kamil' } });
      fireEvent.change(inputLastName, { target: { value: 'Żogło' } });
      fireEvent.change(inputEmail, { target: { value: 'zoglo@gmail.com' } });
      fireEvent.change(inputEventDate, { target: { value: '2030-09-29' } });
      fireEvent.click(submitBtn);

      expect(loadingSpinner).toHaveClass('visible');
      expect(loadingSpinner).toHaveClass('show');
      expect(submitBtn).toHaveClass('cursor-auto');
      expect(submitBtn).toHaveAttribute('disabled');
    });
  });
})
