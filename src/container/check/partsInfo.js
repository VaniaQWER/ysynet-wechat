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
const Brief = Item.Brief;
class PartInfo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            parts: []
        }
    }
    async componentWillMount() {
        console.log(this.props.partsReducer, 'reduce')
        const {id} = this.props.match.params;
        const {partsReducer,setParts} = this.props;
        if (id && !partsReducer.parts) {
            const data = await findFittingInfo({
                body: {
                    rrpairOrderGuid: id
                },
                type: 'type'
            });
            if (data.status) {
                setParts(data.result.rows);
                this.setState({parts: data.result.rows});
            }
        } else if (partsReducer.parts && partsReducer.parts.length) {
            this.setState({parts: partsReducer.parts});
        }
    }
     total = (record)=> {
        let total = 0;
        record.map((item,index)=>{
            let amount = typeof item.acceNum === 'undefined'? 1:item.acceNum;
            return total += amount * item.unitPrice
        });
        return `￥${total}` 
    }
    render() {
        console.log(this.props,'props')
        const {parts} = this.state;
        const partsItem = (item, index) => {
            return (
                <div key={index}>
                    <Item 
                        extra={< span style = {{color:'green'}} > {
                        `x${item.acceNum}`
                    } </span>}>
                        <p>{item.acceName}</p>
                        {
                            (item.acceFmodel && item.acceSpec) 
                            && 
                            <Brief>
                                <span style={{ marginRight: 8 }}>{item.acceFmodel}</span>
                                <span>{item.acceSpec}</span>
                            </Brief>
                        }
                        <Brief>{`￥${item.unitPrice}`}</Brief>
                    </Item>
                    <WhiteSpace size='md'/>
                </div>
            )
        }
        return (
            <div>
                {
                    parts.length > 0
                    ? <div>
                            <List renderHeader={() => '配件信息'}>
                                {parts.map((item, index) => partsItem(item, index))}
                            </List>
                            <p style={{marginLeft: 15, fontSize: 18}}>合计：<span style={{color: 'red' }}>{this.total(parts)}</span></p>                   
                        </div>
                    : <p>暂无配件信息</p>
                }
            </div>
        )
    }
}
export default withRouter(connect(state => state, dispatch => ({
    setParts: parts => dispatch(operation.setParts(parts))
}))(PartInfo));