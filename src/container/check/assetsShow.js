/**
 * @file 设备--详情-资产详情
 */
import React, { PureComponent } from 'react';
import { List } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import styles from './style.css'
const Item = List.Item;
class AssetsShow extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          baseData: {}
        }
    }
    render(){
        //const { history } = this.props;
        const baseData = this.state;
        return (
            <div>
                <div className={styles['ysy-assets']}>
                    <div>
                        <List className={styles['table-row']} renderHeader={() => '基本资料'}>
                            <Item className={styles['table-span']}>
                                <p className={styles['table-p-100']}>资产编码</p>
                                <p>{baseData.assetsRecord}</p>
                            </Item>
                            <Item className={styles['table-span']}>
                                <p className={styles['table-p-100']}>资产名称</p>
                                <p>{baseData.equipmentStandardName}</p>
                            </Item>
                            <Item className={styles['table-span']}>
                                <p className={styles['table-p-100']}>型号</p>
                                <p>{baseData.fmodel}</p>
                            </Item>
                            <Item className={styles['table-span']}>
                                <p className={styles['table-p-100']}>规格</p>
                                <p>{baseData.spec}</p>
                            </Item>
                            <Item className={styles['table-span']}>
                                <p className={styles['table-p-100']}>使用科室</p>
                                <p>{baseData.deptName}</p>
                            </Item>
                            <Item className={styles['table-span']}>
                                <p className={styles['table-p-100']}>保管员</p>
                                <p>{baseData.custodian}</p>
                            </Item>
                            <Item className={styles['table-span']}>
                                <p className={styles['table-p-100']}>存放地址</p>
                                <p>{baseData.deposit}</p>
                            </Item>
                            <Item className={styles['table-span']}>
                                <p className={styles['table-p-100']}>是否在保</p>
                                <p>{baseData.guaranteeFlag==='01'?'在保':'出保'}</p>
                            </Item>
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(AssetsShow);