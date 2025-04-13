import classNames from 'classnames/bind';

import styles from './Badge.module.scss';

const cn = classNames.bind(styles);

export type Relationship = '지인' | '친구' | '가족' | '동료';

export interface BadgeProps {
  relationship: Relationship;
}

export const RELATIONSHIP_MAPPER: { [key in Relationship]: string } = {
  지인: 'beige',
  친구: 'purple',
  가족: 'green',
  동료: 'blue',
};

export default function Badge({ relationship }: BadgeProps) {
  return (
    <div className={cn('badge', RELATIONSHIP_MAPPER[relationship])}>
      <span>{relationship}</span>
    </div>
  );
}
