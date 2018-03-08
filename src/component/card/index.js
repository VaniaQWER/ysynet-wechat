/**
 * @file card
 */
import React, {PureComponent} from 'react';
import {List, Button} from 'antd-mobile';
import {faultDescribeData, selectOption} from '../../constants';
import styles from './style.css';

const Item = List.Item;
const Brief = Item.Brief;

class CardItem extends PureComponent {
    
    showText = (res) => {
        let str = '';
        if (res) {
            if (/^0./.test(res[0])) {
                res.map((item) => {
                    return str += faultDescribeData[item]
                        ? faultDescribeData[item].text + ","
                        : ''
                })
            } else {
                res.map((item) => {
                    return str += item
                        ? item + ","
                        : ''
                })
            }
        }
        return str.substring(0, str.length - 1);
    }
    //10申请，20指派，30维修中,50待验收，80已拒绝 90已关闭 
    btnText = (val)=>{
        switch (val){
            case '10' :
                return '已申请'
            case '20' :
                return '指派中'
            case '30' :
                return '维修中'
            case '50' :
                return '待验收'
            case '80' :
                return '已拒绝'
            case '90' :
                return '已关闭'
            default :
                return null
        }
    }
    
    render() {
        const check_btn = (orderFstate)=>{
            return (
                <div
                    style={{
                    textAlign: 'right',
                    marginRight: 15
                }}>
                    <Button
                        style={{
                        marginTop: 3,
                        marginBottom: 3
                    }}
                        type="ghost"
                        size="small"
                        inline
                        onClick={() => this.props.onClick(item)}>{orderFstate === '10'
                        ? '立即接修'
                        : orderFstate === '30'
                            ? '完成维修'
                            : '去验收'}</Button>
                </div>
            )
        }
        const BtnItem = (key,orderFstate,userType)=>{
            if(key === 'repairRecord'){
                return <div
                            style={{
                            textAlign: 'right',
                            marginRight: 15
                        }}>
                            <Button
                                style={{
                                marginTop: 3,
                                marginBottom: 3
                            }}
                                type="ghost"
                                size="small"
                                inline
                                onClick={() => this.props.onClick(item)}>{this.btnText(orderFstate)}</Button>
                        </div>
                }else if(userType === 'syks'&& orderFstate ==='50'){
                    return check_btn(orderFstate)
                }else if(userType !== 'syks'&& orderFstate !=='50'){
                    return check_btn(orderFstate)
                }
        }
        const item = this.props.data;
        const { orderFstate, userType, key } = item;
        /* 
            key: 维修管理页面独有  repairRecord
        */
        return (
            <List>
                <Item className={styles['equ-title']}>
                    {item.equipmentStandardName}
                </Item>
                {< Item
                platform = "android"
                onClick = {
                    () => this
                        .props
                        .onClick(item)
                } > <span className={styles['span-tag']}>
                    {item.deptName && <a className={styles['use-dept']}>{item.deptName}</a>
}
                    <a className={styles['urgent']}>{item.urgentFlag === '10'
                            ? '紧急'
                            : item.urgentFlag === '20'
                                ? '急'
                                : '一般'}</a>
                </span>
                {
                    item.faultDescribe !== null && <div className={styles['faultDesc-brief']}>
                        {this.showText(item.faultDescribe)}
                    </div>
                }
                {
                    item.createDate && <Brief>
                            报修时间：<span>{item.createDate}</span>
                        </Brief>
                }
                {
                    item.repairResult && <Brief>
                        {selectOption
                            .repairResult
                            .map((ii) => ii.value === item.repairResult
                                ? ii.text
                                : '')}
                    </Brief>
                } </Item>}
                {
                    BtnItem(key,orderFstate,userType)
                }
            </List>
        )
    }
}
export default CardItem;