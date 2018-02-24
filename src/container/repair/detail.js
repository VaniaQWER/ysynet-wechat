/**
 * @file 设备-报修详情
 */
import React, {PureComponent} from 'react';
import {List, WhiteSpace, Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import styles from './style.css';
const Item = List.Item;

class RepairDetail extends PureComponent {
  componentWillMount = () => {
    const {assetsRecord} = this.props.repairReducer;
    if (!assetsRecord.assetsRecordGuid) {
      Toast.fail('没有访问该页面权限', 1);
      this
        .props
        .history
        .push({pathname: '/workplace'})
    }
  }

  render() {
    const {assetsRecord} = this.props.repairReducer;
    return (
      <List className={'repair_list'} renderHeader={() => '资产详情'}>
        <Item thumb={require('../../assets/code.svg')}>
          <span className={styles.repair_detail_label}>资产编码</span>
          {assetsRecord.assetsRecord}
        </Item>
        <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png">
          <span className={styles.repair_detail_label}>资产名称</span>
          {assetsRecord.equipmetStandardName}
        </Item>
        <Item thumb={require('../../assets/fmodel.svg')}>
          <span className={styles.repair_detail_label}>型号</span>
          {assetsRecord.fmodel}
        </Item>
        <WhiteSpace size='sm'/>
        <Item>
          <span className={styles.repair_detail_label}>规格</span>
          {assetsRecord.spec}
        </Item>
        <WhiteSpace size='sm'/>
        <Item thumb={require('../../assets/dept.svg')}>
          <span className={styles.repair_detail_label}>使用科室</span>
          {assetsRecord.useDept}
        </Item>
        <WhiteSpace size='sm'/>
        <Item>
          <span className={styles.repair_detail_label}>保管员</span>
          {assetsRecord.custodian}
        </Item>
        <WhiteSpace size='sm'/>
        <Item thumb={require('../../assets/address_card.svg')}>
          <span className={styles.repair_detail_label}>存放地址</span>
          {assetsRecord.deposit}
        </Item>
        <WhiteSpace size='sm'/>
        <Item>
          <span className={styles.repair_detail_label}>是否在保</span>
          {assetsRecord.guaranteeFlag}
        </Item>
      </List>
    )
  }
}
export default withRouter(connect(state => state)(RepairDetail));