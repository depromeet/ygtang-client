import { fireEvent, screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import RegisteredTagList from './RegisteredTagList';

const mockTags: TagType[] = [
  { id: 1, content: 'tag1' },
  { id: 2, content: 'tag2' },
];

describe('components/common/TagForm/RegisteredTagList', () => {
  it('should defined', () => {
    expect(RegisteredTagList).toBeDefined();
  });

  it('heading이 존재합니다', () => {
    customRender(<RegisteredTagList registeredTags={mockTags} onClick={() => {}} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  it('태그 리스트를 렌더링합니다', () => {
    customRender(<RegisteredTagList registeredTags={mockTags} onClick={() => {}} />);
    expect(screen.getByText(`#${mockTags[0].content}`)).toBeInTheDocument();
    expect(screen.getByText(`#${mockTags[1].content}`)).toBeInTheDocument();
  });

  it('태그 리스트가 없을 시 텍스트가 렌더링됩니다', () => {
    customRender(<RegisteredTagList registeredTags={[]} onClick={() => {}} />);
    expect(screen.getByText('등록된 태그가 없습니다.')).toBeInTheDocument();
  });

  it('태그를 클릭할 시 onClick이 호출됩니다', () => {
    const mockOnClick = jest.fn();
    customRender(<RegisteredTagList registeredTags={mockTags} onClick={mockOnClick} />);
    const tag1 = screen.getByText(`#${mockTags[0].content}`);
    expect(mockOnClick).not.toBeCalled();

    fireEvent.click(tag1);
    expect(mockOnClick).toBeCalled();

    fireEvent.click(tag1);
    expect(mockOnClick).toBeCalledTimes(2);
  });

  it('태그를 클릭할 시 각 태그를 props으로 사용합니다', () => {
    const list: number[] = [];

    const mockOnClick = jest.fn((tag: TagType) => {
      list.push(tag.id);
    });

    customRender(<RegisteredTagList registeredTags={mockTags} onClick={mockOnClick} />);
    const tag1 = screen.getByText(`#${mockTags[0].content}`);
    const tag2 = screen.getByText(`#${mockTags[1].content}`);

    fireEvent.click(tag1);
    expect(list.length).toBe(1);
    expect(list[0]).toBe(mockTags[0].id);
    expect(mockOnClick).toBeCalledTimes(1);
    expect(mockOnClick).toBeCalledWith(mockTags[0]);

    fireEvent.click(tag2);
    expect(list.length).toBe(2);
    expect(list[1]).toBe(mockTags[1].id);
    expect(mockOnClick).toBeCalledTimes(2);
    expect(mockOnClick).toBeCalledWith(mockTags[1]);
  });
});
