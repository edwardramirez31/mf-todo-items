import { render } from '@testing-library/react';

import Root from './root.component';

describe('Root component', () => {
  it('should be in the document', () => {
    render(<Root />);
    expect(1).toBe(1);
  });
});
