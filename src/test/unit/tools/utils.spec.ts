import {
  validateEmail,
  validateName,
  validateSurname,
  validateMinDateInputValue
} from '../../../tools/utils';

describe('UNIT', () => {
  describe('validateEmail', () => {
    test('invalid email', () => {
      const emails = [
        '@wp.pl',
        'test@',
        'test.pl',
        'test@pl',
        'test@wp',
        'test@wp.p',
        'test@wp.plplplplplplp',
        'test',
      ];

      emails.forEach((email) => {
        const returnedValue = validateEmail(email);
        expect(returnedValue).toBe(false);
      });
    });

    test('valid email', () => {
      const emails = [
        'k@w.pl',
        'kamil@wp.pl',
        'test@w.pl',
        'test@gmail.com',
        'test@gmail.pl',
      ];

      emails.forEach((email) => {
        const returnedValue = validateEmail(email);
        expect(returnedValue).toBe(true);
      });
    });
  });

  describe('validateName', () => {
    test('invalid text input.', () => {
      const inputs = [
        '416841',
        '!@#$%^&*()_+=-',
        'Kamd42719',
        'Kam421dask',
        'Jdah#@',
        'J@$fa',
      ];

      inputs.forEach((input) => {
        const returnedValue = validateName(input);
        expect(returnedValue).toBe(false);
      });
    });

    test('valid text input.', () => {
      const inputs = ['a', 'A', 'aaaa', 'Wa', 'Sample', 'AAA', ];

      inputs.forEach((input) => {
        const returnedValue = validateName(input);
        expect(returnedValue).toBe(true);
      });
    });
  });

  describe('validateSurname', () => {
    test('invalid surname', () => {
      const surnames = [
        'żogło-',
        'Żogło-',
        "Zfs'",
        '432 432',
        '#$& $@#',
        'Kamil @@$',
        'Ka41 Kam',
        "4'Kam",
        'Zogło-42',
        'Żogło-#^',
      ];

      surnames.forEach((surname) => {
        const returnedValue = validateSurname(surname);
        expect(returnedValue).toBe(false);
      });
    });

    test('valid surname', () => {
      const surnames = [
        'Żogło-Kamil',
        "d'Rogers",
        'Żogło Żogło',
        'Żogło',
        'sf',
      ];

      surnames.forEach((surname) => {
        const returnedValue = validateSurname(surname);
        expect(returnedValue).toBe(true);
      });
    });
  });

  describe('validateDateInputValue', () => {
    const date = new Date();
    const nowDateInput = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    test('invalid date value', () => {
      const dates = [
        nowDateInput,
        `${date.getFullYear() - 1}-${date.getMonth() + 1}-${date.getDate()}` ,
      ];

      dates.forEach((date) => {
        const returnedValue = validateMinDateInputValue(date);
        expect(returnedValue).toBe(false);
      });
    });

    test('valid date value', () => {
      const dates = [
        `${date.getFullYear() + 1}-${date.getMonth() + 1}-${date.getDate()}`,
      ];

      dates.forEach((date) => {
        const returnedValue = validateMinDateInputValue(date);
        expect(returnedValue).toBe(true);
      });
    });
  });
});
