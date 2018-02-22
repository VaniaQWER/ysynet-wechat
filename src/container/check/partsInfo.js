/**
 * @file 设备--配件信息
 */
import React, {PureComponent} from 'react';
import {WhiteSpace, List} from 'antd-mobile';
import {findFittingInfo} from '../../api/check';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {operation} from '../../service'
const Item = List.Item;
class PartInfo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            partsInfo: []
        }
    }
    async componentWillMount() {
        console.log(this.props.checkReducer, 'reduce')
        const {id} = this.props.match.params;
        const {checkReducer} = this.props;
        if (id && !checkReducer.BaseInfoInfoData.partsInfo) {
            const data = await findFittingInfo({
                body: {
                    rrpairOrderGuid: id
                },
                type: 'type'
            });
            if (data.status) {
                this.setState({partsInfo: data.result.rows});
            }
        } else if (checkReducer.partsInfo) {
            this.setState({partsInfo: checkReducer.partsInfo});
        }
    }
    async total(record) {
        let total = 0;
        record.map((item,index)=>{
            let amount = typeof item.acceNum === 'undefined'? 1:item.acceNum;
            return total += amount * item.unitPrice
        });
        return `￥${total}` 
    }
    render() {
        const {partsInfo} = this.state;
        const partsItem = (item, index) => {
            return (
                <Item
                    key={index}
                    extra={< span style = {{color:'green'}} > {
                    `x${item.acceNum}`
                } </span>}>
                    <p>{item.acceName}</p>
                    {(item.acceFmodel && item.acceSpec) && <p>
                        <span
                            style={{
                            marginRight: 8
                        }}>{item.acceFmodel}</span>
                        <span>{item.acceSpec}</span>
                    </p>
}
                    <p>{`￥${item.unitPrice}`}</p>
                </Item>
            )
        }
        return (
            <div>
                {partsInfo.length > 0
                    ? <div>
                            <WhiteSpace/>
                            <List renderHeader={() => '配件信息'}>
                                {partsInfo.map((item, index) => partsItem(item, index))
}
                            </List>
                            <div>
                                <p
                                    style={{
                                    marginLeft: 15,
                                    fontSize: 18
                                }}>合计：<span
                                    style={{
                            color: 'red'
                        }}>{this.total(partsInfo)}</span>
                                </p>
                            </div>
                        </div>
                    : <p style={{
                        textAlign: 'center'
                    }}>暂无配件信息</p>
}

            </div>
        )
    }
}
export default withRouter(connect(state => state, dispatch => ({
    getFitting: check => dispatch(operation.getFitting(check))
}))(PartInfo));