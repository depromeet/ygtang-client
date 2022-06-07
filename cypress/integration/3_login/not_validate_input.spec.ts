const NOT_EMAIL = 'notEmail';
const NOT_PASSWORD = 'foo';

const EMAIL_ERROR_MESSAGE = '올바른 이메일을 입력해주세요.';
const PASSWORD_ERROR_MESSAGE = '비밀번호는 6자리 이상이여야 합니다.';

describe('3_login/not validate input', () => {
  it('이메일란에 비 이메일 입력시 에러 메세지가 보여야 합니다', () => {
    cy.visit('/login');

    cy.get('label')
      .contains('이메일 아이디')
      .parent()
      .within(() => {
        cy.get('input')
          .first()
          .should('have.attr', 'placeholder', '이메일을 입력해주세요')
          .click()
          .type(NOT_EMAIL);

        cy.get('p').contains(EMAIL_ERROR_MESSAGE).should('be.visible');
      });
  });

  it('비밀번호란에 부합하지 않는 비밀번호 입력시 에러 메세지가 보여야 합니다', () => {
    cy.get('label')
      .contains('비밀번호')
      .parent()
      .within(() => {
        cy.get('input')
          .first()
          .should('have.attr', 'placeholder', '영문, 숫자 포함 6자 이상의 비밀번호')
          .click()
          .type(NOT_PASSWORD);

        cy.get('p').contains(PASSWORD_ERROR_MESSAGE).should('be.visible');
      });
  });
});

export {};
