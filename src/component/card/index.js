/**
 * @file card 
 */
import React, { PureComponent } from 'react';
import { Card, List, Button } from 'antd-mobile';
import { repairData } from '../../constants'
const Item = List.Item;
class CardItem extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          checkList: {}
        }
    }
    render(){
        const item = this.props.data;
        
        return  ( 
            <Card full>
                <List key={item.RN}>
                    <Item>
                        <p>{item.title}</p>
                    </Item>
                    <Item multipleLine extra={<span style={{color:'red'}}>{`￥${item.TotalMoney.toFixed(2)}`}</span>}>
                        故障全部修复
                    </Item>
                    <Item multipleLine extra={<span style={{color:repairData[item.orderFstate].color}}>{repairData[item.orderFstate].text}</span>}>
                        <p style={{marginBottom : 5}}>维修时间：<span>{item.repaireTime}</span></p>
                        <p>报修时间：<span>{item.orderTime}</span></p>
                    </Item>
                    <Item extra={<Button type="primary" size="small" inline onClick={()=>this.props.onClick(item)}>立即验收</Button>}>
                        <input type='hidden'/>
                    </Item>
                </List>
            </Card>
        )
    }
}
export default CardItem;