import { useState } from 'react';
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
    function Wrapper() {
      const [value, setValue] = useState<string | null>(null);
      return (
        <DropdownMenu label={MOCK_LABEL} values={MOCK_VALUES} value={value} setValue={setValue} />
      );
    }
    customRender(<Wrapper />);
    expect(screen.getByText(MOCK_LABEL)).toBeInTheDocument();
  });

  it('label props를 주입하지 않을 시 label 태그가 렌더링되면 안됨', () => {
    function Wrapper() {
      const [value, setValue] = useState<string | null>(null);
      return <DropdownMenu values={MOCK_VALUES} value={value} setValue={setValue} />;
    }
    customRender(<Wrapper />);
    expect(screen.queryByRole('label')).not.toBeInTheDocument();
  });

  it('value가 null일 시 선택하기가 렌더링되어야함', () => {
    function Wrapper() {
      const [value, setValue] = useState<string | null>(null);
      return <DropdownMenu values={MOCK_VALUES} value={value} setValue={setValue} />;
    }
    customRender(<Wrapper />);
    expect(screen.getByText('선택하기')).toBeInTheDocument();
  });

  it('value가 있을 시 해당 값이 렌더링되어야함', () => {
    function Wrapper() {
      const [value, setValue] = useState<string | null>(MOCK_DEFAULT_VALUE);
      return <DropdownMenu values={MOCK_VALUES} value={value} setValue={setValue} />;
    }
    customRender(<Wrapper />);
    expect(screen.getByText(MOCK_DEFAULT_VALUE)).toBeInTheDocument();
  });

  it('버튼을 클릭할 시 values 값들이 렌더링되어야함', () => {
    function Wrapper() {
      const [value, setValue] = useState<string | null>(null);
      return <DropdownMenu values={MOCK_VALUES} value={value} setValue={setValue} />;
    }
    customRender(<Wrapper />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(MOCK_VALUES[0])).toBeInTheDocument();
    expect(screen.getByText(MOCK_VALUES[1])).toBeInTheDocument();
    expect(screen.getByText(MOCK_VALUES[2])).toBeInTheDocument();
  });

  it('버튼을 클릭한 후 요소를 클릭할 시, values 값들이 보이면 안되며 선택한 값만 보여야함', async () => {
    function Wrapper() {
      const [value, setValue] = useState<string | null>(null);
      return <DropdownMenu values={MOCK_VALUES} value={value} setValue={setValue} />;
    }
    customRender(<Wrapper />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText(MOCK_VALUES[0]));

    await new Promise(r => setTimeout(r, 1000));
    expect(screen.getByRole('button').innerHTML).toContain(MOCK_VALUES[0]);
    expect(screen.queryByText(MOCK_VALUES[1])).not.toBeInTheDocument();
    expect(screen.queryByText(MOCK_VALUES[2])).not.toBeInTheDocument();
  });
});
