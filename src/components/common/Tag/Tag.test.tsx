import { fireEvent, screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import Tag from './Tag';

const mockContent = 'foo';

describe('components/common/Tag', () => {
  it('should defined', () => {
    expect(Tag).toBeDefined();
  });

  it('#와 함께 content가 렌더링되어야 합니다', () => {
    customRender(<Tag content={mockContent} />);
    expect(screen.getByText(`#${mockContent}`)).toBeInTheDocument();
  });

  it('wrapper에 onClick 이벤트가 부착되어 있으며, 클릭할 시 호출되어야 합니다', () => {
    const mockOnClick = jest.fn();
    customRender(<Tag content={mockContent} onClick={mockOnClick} />);
    const wrapper = screen.getByText(`#${mockContent}`);
    expect(mockOnClick).not.toHaveBeenCalled();

    fireEvent.click(wrapper);
    expect(mockOnClick).toHaveBeenCalled();

    fireEvent.click(wrapper);
    expect(mockOnClick).toHaveBeenCalledTimes(2);
  });

  it('deletable일 시, 삭제 버튼이 있어야 합니다', () => {
    customRender(<Tag content={mockContent} deletable />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('delete 버튼을 클릭할 시, onDelete가 호출되어야 합니다', () => {
    const mockOnDelete = jest.fn();
    customRender(<Tag content={mockContent} deletable onDelete={mockOnDelete} />);
    const deleteButton = screen.getByRole('button');
    expect(mockOnDelete).not.toHaveBeenCalled();

    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalled();

    fireEvent.click(deleteButton);
    expect(mockOnDelete).toHaveBeenCalledTimes(2);
  });
});
