import { fireEvent, screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import DropdownMenu from './DropdownMenu';

const MOCK_LABEL = 'label';
const MOCK_VALUES = ['foo', 'bar', 'baz'];
const MOCK_DEFAULT_VALUE = 'foo';

jest.setTimeout(30000);

describe('components/common/DropdownMenu', () => {
  it('default export로 정의되어 있어야함', () => {
    expect(DropdownMenu).toBeDefined();
  });

  it('label props를 정상적으로 렌더링해야함', () => {
    customRender(<DropdownMenu label={MOCK_LABEL} values={MOCK_VALUES} />);
    expect(screen.getByText(MOCK_LABEL)).toBeInTheDocument();
  });

  it('label props를 주입하지 않을 시 label 태그가 렌더링되면 안됨', () => {
    customRender(<DropdownMenu values={MOCK_VALUES} />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('default value가 없을 시 선택하기가 렌더링되어야함', () => {
    customRender(<DropdownMenu values={MOCK_VALUES} />);
    expect(screen.getByText('선택하기')).toBeInTheDocument();
  });

  it('default value가 있을 시 해당 값이 렌더링되어야함', () => {
    customRender(<DropdownMenu values={MOCK_VALUES} defaultValue={MOCK_VALUES[0]} />);
    expect(screen.getByText(MOCK_DEFAULT_VALUE)).toBeInTheDocument();
  });

  it('버튼을 클릭할 시 values 값들이 렌더링되어야함', () => {
    customRender(<DropdownMenu values={MOCK_VALUES} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(MOCK_VALUES[0])).toBeInTheDocument();
    expect(screen.getByText(MOCK_VALUES[1])).toBeInTheDocument();
    expect(screen.getByText(MOCK_VALUES[2])).toBeInTheDocument();
  });

  it('버튼을 클릭한 후 요소를 클릭할 시, values 값들이 보이면 안되며 선택한 값만 보여야함', async () => {
    customRender(<DropdownMenu values={MOCK_VALUES} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText(MOCK_VALUES[0]));

    await new Promise(r => setTimeout(r, 1000));
    expect(screen.getByRole('button').innerHTML).toContain(MOCK_VALUES[0]);
    expect(screen.queryByText(MOCK_VALUES[1])).not.toBeInTheDocument();
    expect(screen.queryByText(MOCK_VALUES[2])).not.toBeInTheDocument();
  });

  it('select 태그는 렌더링되지 않아야함', () => {
    customRender(<DropdownMenu values={MOCK_VALUES} />);
    expect(screen.getByTestId('select')).toHaveStyleRule('display', 'none');
  });
});
