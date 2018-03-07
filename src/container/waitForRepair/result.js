import React, { PureComponent } from 'react';
import { Result, Icon, Button } from 'antd-mobile';
import styles from './style.css';
/**
 * @file 接修 -> 接修状态
 */
class WaitForRepairResult extends PureComponent {
  render() {
    const { history }  = this.props;
    return (
      <Result
        className={styles.result}
        img={<Icon type="check-circle" className={styles.spe} style={{ fill: '#ffa000' }} />}
        title="接修成功"
        message={
          <div className={styles.messageInfo}>
            <Button type='ghost' style={{width: '30%', marginRight: 50 }} onClick={()=>history.push({ pathname: '/waitForRepair' })}>继续接修</Button>
            <Button type='primary' style={{width: '30%' }} onClick={()=>history.push({ pathname: `/startToRepair/stepOne/100` })}>开始维修</Button>
          </div>
        }
      />
    )
  }
}

export default WaitForRepairResult;