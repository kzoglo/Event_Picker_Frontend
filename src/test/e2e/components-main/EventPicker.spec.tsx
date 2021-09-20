import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';


import EventPicker from '../../../components-main/EventPicker/EventPicker';

describe('E2E', () => {
  describe('EventPicker', () => {
    afterEach(() => {
      cleanup();
    });

    test('Props - "title" (proper place and value)', () => {
      const title = 'My Test';
      const { getByText } = render(<EventPicker title={title} />);
      const titleHeader = getByText(title);

      expect(titleHeader).toBeDefined();
      expect(titleHeader).toHaveClass('eventPicker-title');
    });

    describe('Inputs (provided data validation)', () => {
      let inputFirstName: HTMLInputElement;
      let inputLastName: HTMLInputElement;
      let inputEmail: HTMLInputElement;
      let inputEventDate: HTMLInputElement;
      let validationParagraphFirstName: HTMLParagraphElement;
      let validationParagraphLastName: HTMLParagraphElement;
      let validationParagraphEmail: HTMLParagraphElement;
      let validationParagraphEventDate: HTMLParagraphElement;

      beforeEach(() => {
        render(
          <EventPicker />, {
            container: document.body.appendChild(document.createElement('div')),
          }
        );
        inputFirstName = document.querySelector('#firstName')!;
        inputLastName = document.querySelector('#lastName')!;
        inputEmail = document.querySelector('#email')!;
        inputEventDate = document.querySelector('#eventDate')!;
        validationParagraphFirstName = document.querySelector('#firstName + .validation-p')!;
        validationParagraphLastName = document.querySelector('#lastName + .validation-p')!;
        validationParagraphEmail = document.querySelector('#email + .validation-p')!;
        validationParagraphEventDate = document.querySelector('#eventDate + .validation-p')!;
      })

      test('Valid values', () => {
        inputFirstName.focus();
        inputFirstName.value = 'Kamil';
        inputFirstName.blur();
        expect(validationParagraphFirstName).toHaveTextContent('');
        
        inputLastName.focus();
        inputLastName.value = 'Żogło';
        inputLastName.blur();
        expect(validationParagraphLastName).toHaveTextContent('');

        inputEmail.focus();
        inputEmail.value = 'zoglo@gmail.com';
        inputEmail.blur();
        expect(validationParagraphEmail).toHaveTextContent('');

        inputEventDate.focus();
        inputEventDate.value = '2030-09-29';
        inputEventDate.blur();
        expect(validationParagraphEventDate).toHaveTextContent('');
      });

      test('Invalid values (left blank)', () => {
        inputFirstName.focus();
        inputFirstName.value = '';
        inputFirstName.blur();
        expect(validationParagraphFirstName).toHaveTextContent('"First name" needs to have at least 1 character');
        
        inputLastName.focus();
        inputLastName.value = '';
        inputLastName.blur();
        expect(validationParagraphLastName).toHaveTextContent('"Last name" needs to have at least 1 character');

        inputEmail.focus();
        inputEmail.value = '';
        inputEmail.blur();
        expect(validationParagraphEmail).toHaveTextContent('Wrong email format');

        inputEventDate.focus();
        inputEventDate.value = '';
        inputEventDate.blur();
        expect(validationParagraphEventDate).toHaveTextContent('"Date" needs to be selected');
      });

      test('Invalid values (invalid format)', () => {
        inputFirstName.focus();
        inputFirstName.value = 'ka242mil';
        inputFirstName.blur();
        expect(validationParagraphFirstName).toHaveTextContent('"First name" cannot contain numbers and special characters');
        
        inputLastName.focus();
        inputLastName.value = 'g543';
        inputLastName.blur();
        expect(validationParagraphLastName).toHaveTextContent('"Last name" cannot contain numbers and special characters');

        inputEmail.focus();
        inputEmail.value = 'ds@pl';
        inputEmail.blur();
        expect(validationParagraphEmail).toHaveTextContent('Wrong email format');

        inputEventDate.focus();
        inputEventDate.value = '2021-07-07';
        inputEventDate.blur();
        expect(validationParagraphEventDate).toHaveTextContent('"Date" needs to be in future');
      });
    })

    describe('Submit data - (LoadingSpinner and SubmitBtn states changes)', () => {
      let inputFirstName: HTMLInputElement;
      let inputLastName: HTMLInputElement;
      let inputEmail: HTMLInputElement;
      let inputEventDate: HTMLInputElement;

      beforeEach(() => {
        render(
          <EventPicker />, {
            container: document.body.appendChild(document.createElement('div')),
          }
        );
        inputFirstName = document.querySelector('#firstName')!;
        inputLastName = document.querySelector('#lastName')!;
        inputEmail = document.querySelector('#email')!;
        inputEventDate = document.querySelector('#eventDate')!;
      })

      test('SubmitBtn, LoadingSpinner appearance changes', async () => {
        const submitBtn: HTMLButtonElement = document.querySelector('.eventPicker-Btn')!;
        const loadingSpinner: HTMLDivElement = document.querySelector('.eventPicker-spinner-outerWrapper')!;
        expect(loadingSpinner).toHaveClass('invisible');
        expect(submitBtn).toHaveClass('cursor-pointer');
        expect(submitBtn).not.toHaveAttribute('disabled');

        inputFirstName.value = 'Kamil';
        inputLastName.value = 'Żogło';
        inputEmail.value = 'zoglo@gmail.com';
        inputEventDate.value = '2030-09-29';

        userEvent.click(submitBtn);
        expect(loadingSpinner).toHaveClass('visible');
        expect(loadingSpinner).toHaveClass('show');
        expect(submitBtn).toHaveClass('cursor-auto');
        expect(submitBtn).toHaveAttribute('disabled');
      });
    })
  });
})
