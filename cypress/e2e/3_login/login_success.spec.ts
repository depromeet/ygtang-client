describe('3_login/login success', { testIsolation: false }, () => {
  it('이메일란에 올바른 이메일 입력시 확인 아이콘이 보여야 합니다', () => {
    cy.visit('/login');

    cy.get('label')
      .contains('이메일 아이디')
      .parent()
      .within(() => {
        cy.get('input').first().click().type(Cypress.env('user-email'));

        cy.get('svg').should('be.visible');
      });
  });

  it('비밀번호란에 올바른 비밀번호 입력시 확인 아이콘이 보여야 합니다', () => {
    cy.get('label')
      .contains('비밀번호')
      .parent()
      .within(() => {
        cy.get('input').first().click().type(Cypress.env('user-password'));

        cy.get('svg').should('be.visible');
      });
  });

  it('로그인 시 루트 url로 이동되어야 합니다', () => {
    cy.get('button').should('have.attr', 'type', 'submit').contains('로그인').click();
    cy.wait(2000).url().should('eq', Cypress.config().baseUrl);
  });
});

export {};
