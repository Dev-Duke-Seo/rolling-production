import React, { PropsWithChildren, useEffect } from 'react';

import classNames from 'classnames/bind';

import Toggle from '@components/Tab/Toggle';

import styles from './Tab.module.scss';

const cx = classNames.bind(styles);

type TabChildren = React.ReactElement<typeof TabPanel>;

interface TabProps {
  children: TabChildren | TabChildren[];
  selectedTab?: string | null;
  handleTabChange?: (tab: string) => void;
  callback?: () => void | unknown;
}

export default function Tab({ children, selectedTab, handleTabChange, callback }: TabProps) {
  const labels = React.Children.map(children, (child) => {
    if (React.isValidElement<TabPanelProps>(child)) {
      return child.props.label;
    }

    throw new Error('Invalid child component');
  });

  if (!labels || labels.length === 0) {
    return null;
  }

  const activePanel = React.Children.toArray(children).find(
    (child) => React.isValidElement<TabPanelProps>(child) && child.props.label === selectedTab,
  );

  useEffect(() => {
    if (callback) {
      callback();
    }
  }, [selectedTab]);

  return (
    <div className={cx('tab')}>
      <div className={cx('tab-buttons')}>
        <Toggle toggleItems={labels} activeTab={selectedTab!} handleChangeTab={handleTabChange!} />
      </div>
      <div className={cx('tab-pannel')}>{activePanel}</div>
    </div>
  );
}

interface TabPanelProps {
  label?: string;
}

export function TabPanel({ label = '', children }: PropsWithChildren<TabPanelProps>) {
  if (!label) {
    throw new Error('Label is required');
  }

  return <div id={label}>{children}</div>;
}
