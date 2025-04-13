import { Meta, StoryObj } from '@storybook/react';

import Tab, { TabPanel } from '@components/Tab/Tab';
import { useTab } from '@components/Tab/useTab';

const meta = {
  title: 'Components/Tab',
  component: Tab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {
    children: [
      <TabPanel key='1' label='첫번째 탭'>
        첫번째 탭의 내용입니다.
      </TabPanel>,
      <TabPanel key='2' label='두번째 탭'>
        두번째 탭의 내용입니다.
      </TabPanel>,
      <TabPanel key='3' label='세번째 탭'>
        세번째 탭의 내용입니다.
      </TabPanel>,
    ],
  },
  render: (args) => {
    const { selectedTab, handleTabChange } = useTab('첫번째 탭');

    return <Tab {...args} selectedTab={selectedTab} handleTabChange={handleTabChange} />;
  },
};
