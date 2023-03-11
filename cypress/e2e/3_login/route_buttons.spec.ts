describe('3_login/route buttons', { testIsolation: false }, () => {
  it('비밀번호 찾기 버튼 클릭시 올바른 route로 이동해야함', () => {
    cy.visit('/login');
    cy.wait(2000).get('button').contains('비밀번호 찾기').should('be.visible').click();
    cy.url().should('include', '/password');
  });

  it('회원가입 버튼 클릭시 올바른 route로 이동해야함', () => {
    cy.get('nav').within(() => {
      cy.get('button').first().click();
      cy.wait(2000).url().should('include', '/login');
    });

    cy.get('button').contains('빠르게 가입하기').should('be.visible').click();
    cy.wait(2000).url().should('include', '/signup');
  });
});

export {};
