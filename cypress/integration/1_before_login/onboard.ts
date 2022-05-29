import theme from '~/styles/Theme';

// TODO: emotion rgb 변환 이유 확인 후, 공통 유틸로
function hexToRGB(hex: string) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

describe('1_before_login/onboard', () => {
  it('비로그인, root 접근 시 onboard로 이동', () => {
    cy.visit('/');
    cy.url().should('include', '/onboard');
  });

  it('온보드 이미지는 가로 슬라이드가 되어야 하며, 슬라이드 시 이전 요소가 보이지 않아야 합니다', () => {
    // 첫 번째 온보딩 이미지가 보여야 합니다.
    cy.get('section > article').first().should('be.visible');
    // 첫 번째 인디케이터가 강조되어 있어야 합니다.
    cy.get('div[data-testid=carouselIndicator] > span')
      .first()
      .should('be.visible')
      .should('have.css', 'background-color', hexToRGB(theme.color.gray04));

    cy.get('section').first().scrollTo('50%', 0);
    // 온보딩 섹션을 스크롤 할 시 첫 번째 이미지가 보이지 않아야 합니다.
    cy.get('section > article').first().should('not.be.visible');
    // 첫 번째 인디케이터가 강조되어 있지 않아야 합니다.
    cy.get('div[data-testid=carouselIndicator] > span')
      .first()
      .should('be.visible')
      .should('not.have.css', 'background-color', hexToRGB(theme.color.gray04));

    // 두 번째 온보딩 이미지가 보여야 합니다.
    cy.get('section > article').eq(1).should('be.visible');
    // 두 번째 인디케이터가 강조되어 있어야 합니다.
    cy.get('div[data-testid=carouselIndicator] > span')
      .eq(1)
      .should('be.visible')
      .should('have.css', 'background-color', hexToRGB(theme.color.gray04));
  });

  it('하단의 버튼을 클릭할 시 로그인 화면으로 이동합니다', () => {
    cy.get('button')
      .contains('시작하기')
      .should('have.css', 'background-color', hexToRGB(theme.color.primary));
    cy.get('button').contains('시작하기').click();
    cy.url().should('include', '/login');
  });

  it('뒤로 간 후, 빠르게 가입하기 버튼을 누를 시 회원가입 화면으로 이동합니다.', () => {
    cy.go('back');
    cy.scrollTo('bottom', { ensureScrollable: false });
    cy.get('button').contains('빠르게 가입하기').should('be.visible').click();
    cy.url().should('include', '/signup');
  });
});

export {};
