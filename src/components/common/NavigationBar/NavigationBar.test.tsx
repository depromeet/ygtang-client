import React from 'react';
import { screen } from '@testing-library/react';

import { customRender } from '~/__test__/utils';

import NavigationBar from './NavigationBar';

const mockTitle = 'title';

describe('components/common/NavigationBar', () => {
  it('render title props', () => {
    customRender(<NavigationBar title={mockTitle} />);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('render without title', () => {
    customRender(<NavigationBar />);
    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });

  it('render back button', () => {
    customRender(<NavigationBar />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  //TODO: back button click test

  it('render rightElement', () => {
    customRender(<NavigationBar rightElement={<p>{mockTitle}</p>} />);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it('render without rightElement', () => {
    customRender(<NavigationBar />);
    expect(screen.getByRole('navigation').childNodes.length).toEqual(1);
  });
});
