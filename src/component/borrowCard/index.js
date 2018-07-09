/* 
  借用记录card
*/
import React, {PureComponent} from 'react';
import { List } from 'antd-mobile';
import styles from './style.css';

const Item = List.Item;

class BorrowCard extends PureComponent{
  render(){
    const item = this.props.data;
    return (
      <List className='borrow-card'>
        <Item>
          <span style={{ fontSize: 15,fontWeight: 'bold' }}>{item.equipmentStandardName}</span>
        </Item>
        <Item style={{ position: 'relative' }} multipleLine extra={<label className={item.borrowFstate === '00'?styles['borrowed']:item.borrowFstate === '01'?styles['borrowRevert']:''}>{item.borrowFstate === '00'?'已借出':item.borrowFstate === '01'?'已归还':''}</label>}>
          <div>
            <span>借用单号:</span>
            <span>{item.borrowNo?item.borrowNo:''}</span>
          </div>
          <div>
            <span>借用科室:</span>
            <span>{item.deptName?item.deptName:''}</span>
          </div>
          <div>
            <span>借出时间:</span>
            <span>{item.createTime?item.createTime:''}</span>
          </div>
        </Item>
        <Item multipleLine>
          <div>
            <span>预计归还时间:</span>
            <span>{item.estimateBack?item.estimateBack:''}</span>
          </div>
          <div>
            <span>归还时间:</span>
            <span>{item.actualBack?item.actualBack:''}</span>
          </div>
        </Item>
      </List>
    )
  }
}
export default BorrowCard;