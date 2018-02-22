/**
 * @file 设备--详情-资产详情
 */
import React, {PureComponent} from 'react';
import {List,WhiteSpace} from 'antd-mobile';
import styles from './style.css'
const Item = List.Item;
class AssetsShow extends PureComponent {
    state = {}

    render() {
        console.log(this.props.location.state, 'prop')
        const baseData = this.props.location.state;
        return (
            <div className={styles['ysy-assets']}>
                <List className={styles['table-row']} renderHeader={() => '基本资料'}>
                    <Item>
                        <span className={styles['table-span']}>资产编码</span>
                        {baseData.assetsRecord}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item>
                        <span className={styles['table-span']}>资产名称</span>
                        {baseData.equipmentStandardName}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item>
                        <span className={styles['table-span']}>型号</span>
                        {baseData.fmodel}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item>
                        <span className={styles['table-span']}>规格</span>
                        {baseData.spec}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item>
                        <span className={styles['table-span']}>使用科室</span>
                        {baseData.deptName}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item>
                        <span className={styles['table-span']}>保管员</span>
                        {baseData.custodian}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item>
                        <span className={styles['table-span']}>存放地址</span>
                        {baseData.deposit}
                    </Item>
                    <WhiteSpace size='sm'/>
                    <Item>
                        <span className={styles['table-span']}>是否在保</span>
                        {baseData.guaranteeFlag === '01'
                                ? '在保'
                                : '出保'}
                    </Item>
                </List>
            </div>
        )
    }
}
export default AssetsShow;