import { Decorator } from '@storybook/react';
import React from 'react';

import { getQueryClient, QueryProvider } from '../queries/QueryProvider';

const previewDecorator: Decorator = (Story, context) => {

  return (
    <QueryProvider>
      <Story {...context} />
    </QueryProvider>
  );
};

export default previewDecorator;
