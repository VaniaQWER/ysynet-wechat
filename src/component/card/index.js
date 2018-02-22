/**
 * @file card
 */
import React, {PureComponent} from 'react';
import {Card, List, Button} from 'antd-mobile';
import {faultDescribeData, selectOption} from '../../constants';
import styles from './style.css';

const Item = List.Item;
const Brief = Item.Brief;
class CardItem extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            checkList: {}
        }
    }
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
    render() {
        const item = this.props.data;
        return (
            <Card full>
                <Item className={styles['equ-title']}>
                    {item.equipmentStandardName}
                </Item>
                {< Item onClick = {
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
                    item.faultDescribe !== null && <Brief>
                        {this.showText(item.faultDescribe)}
                    </Brief>
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
                <div
                    style={{
                    textAlign: 'right',
                    marginRight: 15
                }}>
                    <Button
                        style={{
                        marginTop: 3
                    }}
                        type="primary"
                        size="small"
                        inline
                        onClick={() => this.props.onClick(item)}>去验收</Button>
                </div>
            </Card>
        )
    }
}
export default CardItem;