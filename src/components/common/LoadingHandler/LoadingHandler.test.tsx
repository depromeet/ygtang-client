import { useState } from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import LoadingHandler from './LoadingHandler';

const LOADING_TEST_ID = 'loading-test';
function LoadingComponent() {
  return <div data-testid={LOADING_TEST_ID}>로딩중</div>;
}

const CHILDREN_TEST_ID = 'children-test';
function ChildrenComponent() {
  return <div data-testid={CHILDREN_TEST_ID}>children</div>;
}

describe('components/common/LoadingHandler/LoadingHandler', () => {
  it('should defined', () => {
    expect(LoadingHandler).toBeDefined();
  });

  it('로딩중일 시 loadingComponent를 렌더링해야 함', () => {
    customRender(
      <LoadingHandler isLoading={true} loadingComponent={<LoadingComponent />}>
        <ChildrenComponent />
      </LoadingHandler>
    );

    expect(screen.getByTestId(LOADING_TEST_ID)).toBeInTheDocument();
  });

  it('로딩중이 아닐 시 children을 렌더링해야 함', () => {
    customRender(
      <LoadingHandler isLoading={false} loadingComponent={<LoadingComponent />}>
        <ChildrenComponent />
      </LoadingHandler>
    );

    expect(screen.getByTestId(CHILDREN_TEST_ID)).toBeInTheDocument();
  });

  it('로딩 상태에 따라 children 혹은 loadingComponent를 렌더링해야 함', async () => {
    function App() {
      const [isLoading, setIsLoading] = useState(true);

      return (
        <>
          <button onClick={() => setIsLoading(prev => !prev)}>toggle</button>
          <LoadingHandler isLoading={isLoading} loadingComponent={<LoadingComponent />}>
            <ChildrenComponent />
          </LoadingHandler>
        </>
      );
    }

    customRender(<App />);
    expect(screen.getByTestId(LOADING_TEST_ID)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => screen.findByTestId(CHILDREN_TEST_ID));

    expect(screen.getByTestId(CHILDREN_TEST_ID)).toBeInTheDocument();
  });
});
