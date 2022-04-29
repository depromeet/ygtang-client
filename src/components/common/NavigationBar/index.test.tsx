import { customRender } from '~/__test__/utils';

import DefaultNavigationBar from './index';
import NavigationBar from './NavigationBar';

describe('components/common/NavigationBar/index', () => {
  it('render samethings', () => {
    const { container: defaultContainer } = customRender(<DefaultNavigationBar />);
    const { container } = customRender(<NavigationBar />);
    expect(defaultContainer).toEqual(container);
  });
});
