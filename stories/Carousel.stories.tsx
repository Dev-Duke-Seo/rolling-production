/* eslint-disable import/no-extraneous-dependencies */
import { Meta, StoryObj } from '@storybook/react';

import Card from '@/app/list/_components/Card/Card';
import Carousel from '@/app/list/_components/Carousel';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const mockList = [
  <Card
    key='1'
    backgroundColor='purple'
    name='1'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='2'
    backgroundColor='blue'
    name='2'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='3'
    backgroundColor='green'
    name='3'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='4'
    backgroundColor='beige'
    name='4'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='5'
    backgroundColor='beige'
    name='5'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='6'
    backgroundColor='beige'
    name='6'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='7'
    backgroundColor='purple'
    name='7'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='8'
    backgroundColor='blue'
    name='8'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='9'
    backgroundColor='green'
    name='9'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
  <Card
    key='10'
    backgroundColor='beige'
    name='10'
    id={10067}
    messageCount={0}
    recentMessages={[]}
    reactionCount={0}
    topReactions={[]}
    backgroundImageURL={null}
  />,
];

export const Default: Story = {
  args: {
    children: mockList,
    numberOfContentsToDisplay: 4,
  },
  render: (args) => {
    return (
      <div style={{ width: '100rem', height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Carousel {...args} />
      </div>
    );
  },
};
