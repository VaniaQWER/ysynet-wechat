import React, { PureComponent } from 'react';
import { Result, Icon, Button } from 'antd-mobile';
import styles from './style.css';
/**
 * @file 接修 -> 接修状态
 */
class WaitForRepairResult extends PureComponent {
  render() {
    return (
      <Result
        className={styles.result}
        img={<Icon type="check-circle" className={styles.spe} style={{ fill: '#1F90E6' }} />}
        title="接修成功"
        message={
          <div className={styles.messageInfo}>
            <Button type='ghost' style={{width: '30%', marginRight: 50 }}>完成接修</Button>
            <Button type='primary' style={{width: '30%' }}>开始维修</Button>
          </div>
        }
      />
    )
  }
}

export default WaitForRepairResult;