/**
 * @file 设备--配件信息
 */
import React, { PureComponent } from 'react';
import { WhiteSpace, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
class PartInfo extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          parstData: [
              {
                "acceUnit": null, //单位
                "acceNum": 1, //数量
                "acceSpec": null, //规格
                "equipmentCode": "AS171219000008", //设备编号
                "money": 100, //金额
                "assetsRecord": "AS171218000002-1", //附件编号
                "unitPrice": 100, //单价
                "RN": 1,
                "acceName": "立式冷藏箱", //附件名称
                "acceFmodel": null, //附件型号
                "rrpairFittingUseGuid": "F3C47515524A435EB595FD1BD771B578" //维修附件使用guid
              }
          ]
        }
    }
    componentWillMount = ()=>{

    }
    render(){
        const { parstData } = this.state;
        const partsItem = (item,index)=>{
            return (
            <Item  key={index} extra={<span style={{color:'green'}}>{`x${item.acceNum}`}</span>}>
                <p>{item.acceName}</p>
                <Brief>
                    <p>型号/规格</p>
                    <p>{`￥${item.unitPrice}`}</p>
                </Brief>
            </Item>)
        }
        return (<div>
                <WhiteSpace />
                <List renderHeader={() => '配件信息'}>
                    {
                        parstData.map((item,index) => partsItem(item,index))
                    }
                </List>
                <div>
                    <p>合计：<span>119</span></p>
                </div>
            </div>
        )
    }
}
export default PartInfo;