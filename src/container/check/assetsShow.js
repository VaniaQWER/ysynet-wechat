/**
 * @file 设备--详情-资产详情
 */
import React, {PureComponent} from 'react';
import {List,WhiteSpace,Toast} from 'antd-mobile';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import styles from './style.css'
const Item = List.Item;
class AssetsShow extends PureComponent {
    componentWillMount = () => {
        const {BaseInfoInfoData} = this.props.checkReducer;
        const { baseDetail } = this.props.borrowReducer;
        if (!BaseInfoInfoData || !baseDetail) {
          Toast.fail('没有访问该页面权限', 1);
          this
            .props
            .history
            .push({pathname: '/workplace'})
        }
      }
    render() {
        const { checkReducer, borrowReducer } = this.props;
        const baseData = checkReducer.BaseInfoInfoData.assetsRecordGuid ? checkReducer.BaseInfoInfoData: borrowReducer.baseDetail
        return (
                <List className={styles['table-row']} renderHeader={() => '基本资料'}>
                    <Item thumb={require('../../assets/code.svg')}>
                        <span className={styles['table-span']}>资产编码</span>
                        {baseData.assetsRecord}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item thumb="https://zos.alipayobjects.com/rmsportal/UmbJMbWOejVOpxe.png">
                        <span className={styles['table-span']}>资产名称</span>
                        {baseData.equipmentStandardName}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item thumb={require('../../assets/fmodel.svg')}>
                        <span className={styles['table-span']}>型号</span>
                        {baseData.fmodel}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item thumb={require('../../assets/spec.svg')}>
                        <span className={styles['table-span']}>规格</span>
                        {baseData.spec}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item thumb={require('../../assets/dept.svg')}>
                        <span className={styles['table-span']}>使用科室</span>
                        {baseData.deptName}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item thumb={require('../../assets/userName.svg')}>
                        <span className={styles['table-span']}>保管员</span>
                        {baseData.custodian}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item thumb={require('../../assets/address_card.svg')}>
                        <span className={styles['table-span']}>存放地址</span>
                        {baseData.deposit}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item thumb={require('../../assets/protect.svg')}>
                        <span className={styles['table-span']}>是否在保</span>
                        {baseData.guaranteeFlag === '01'
                                ? '在保':baseData.guaranteeFlag === '02'?
                                '出保':
                                ''}
                    </Item>
                </List>
        )
    }
}
export default withRouter(connect(state => state)(AssetsShow));