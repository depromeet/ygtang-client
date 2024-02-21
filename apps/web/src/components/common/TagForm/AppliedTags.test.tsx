import { screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import AppliedTags from './AppliedTags';

const mockTags: TagType[] = [
  { content: 'tag1', id: 1 },
  { content: 'tag2', id: 2 },
];

describe('components/common/TagForm/AppliedTags', () => {
  it('should defined', () => {
    expect(AppliedTags).toBeDefined();
  });

  it('should render each tags', () => {
    customRender(<AppliedTags applyedTags={mockTags} onRemove={() => {}} />);
    expect(screen.getByText(`#${mockTags[0].content}`)).toBeInTheDocument();
    expect(screen.getByText(`#${mockTags[1].content}`)).toBeInTheDocument();
  });
});
