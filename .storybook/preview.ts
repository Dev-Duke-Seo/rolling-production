import type { Preview } from '@storybook/react';
import '../styles/global-styles/global.scss';

import previewDecorator from './decorator';

const preview: Preview = {
  decorators: [previewDecorator],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
