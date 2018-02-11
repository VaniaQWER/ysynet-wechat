/**
 * @file card 
 */
import React, { PureComponent } from 'react';
import { Card, List, Button } from 'antd-mobile';
import { faultDescribeData, selectOption } from '../../constants';
import styles from './style.css';
const Item = List.Item;
class CardItem extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          checkList: {}
        }
    }
    showText = (res)=>{
        let str = '';
          if(res){
            res.map((item) => {
              return  str += faultDescribeData[item] ? faultDescribeData[item].text + "," : '' 
             }) 
          }
          return str.substring(0,str.length-1);
    }
    render(){
        const item = this.props.data;
        return  ( 
            <Card full>
                <Item className={styles['equ-title']}>
                    {item.equipmentStandardName}
                </Item>
                <div className={styles['span-tag']}>
                    {
                        item.deptName
                        &&
                        <a className={styles['use-dept']}>{item.deptName}</a>
                    }
                    <a className={styles['urgent']}>{item.urgentFlag==='10'?'紧急':item.urgentFlag==='20'?'急':'一般'}</a>
                </div>
                <Item onClick={()=>this.props.onClick(item)}>
                    {
                        item.faultDescribe
                        &&
                        <p className={styles['acc-con']}>{this.showText(item.faultDescribe)}</p>
                    }
                    <p className={styles['acc-con']}>报修时间：<span>{item.createDate}</span></p>
                    {
                        item.repairResult 
                        &&
                        <p className={styles['acc-con']}>{selectOption.repairResult.map((ii)=>ii.value===item.repairResult?ii.text:'')}</p>
                    }
                </Item>
                <div style={{textAlign:'right',marginRight : 15}}>
                    <Button style={{marginTop:3}} type="primary" size="small" inline onClick={()=>this.props.onClick(item)}>去验收</Button>
                </div>
            </Card>
        )
    }
}
export default CardItem;