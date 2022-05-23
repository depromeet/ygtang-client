describe('1_before_login/onboard', () => {
  it('비로그인, root 접근 시 onboard로 이동', () => {
    cy.visit('/');
    cy.url().should('include', '/onboard');
  });
});

export {};
