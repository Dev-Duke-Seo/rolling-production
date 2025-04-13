import Check from '@icons/check.svg?component';

import styles from './CheckIcon.module.scss';

export default function CheckIcon() {
  return (
    <div className={styles['check-icon']}>
      <Check />
    </div>
  );
}
