/**
 * @file 设备--配件信息
 */
import React, {PureComponent} from 'react';
import {List, Toast} from 'antd-mobile';
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
        const {partsReducer, setParts, history} = this.props;
        if (partsReducer.parts && partsReducer.parts.length > 0) {
            this.setState({parts: partsReducer.parts});
        } else {
            const {id} = this.props.match.params;
            const data = await findFittingInfo({
                body: {
                    rrpairOrderGuid: id
                },
                type: 'formData'
            });
            if (data.status && data.result.rows.length > 0) {
                setParts(data.result.rows);
                this.setState({parts: data.result.rows});
            } else {
                Toast.fail('获取配件信息异常', 1, () => history.push({pathname: `/error`}));
            }
        }

    }
    total = (record) => {
        let total = 0;
        record.map((item, index) => {
            let amount = typeof item.acceNum === 'undefined'
                ? 1
                : item.acceNum;
            return total += amount * item.unitPrice
        });
        return `￥${total}`
    }
    render() {
        console.log(this.props, 'props')
        const {parts} = this.state;
        const partsItem = (item, index) => {
            return (
                <div
                    key={index}
                    style={{
                    borderBottom: 'solid 6px #f5f5f9'
                }}>
                    <Item
                        extra={< span style = {{color:'green',fontSize: 18}} > {
                        `x${item.acceNum}`
                    } < /span>}>
                        <p>{item.acceName}</p>
                        {(item.acceFmodel && item.acceSpec) && <Brief>
                            <span
                                style={{
                                marginRight: 8
                            }}>{item.acceFmodel}</span>
                            <span>{item.acceSpec}</span>
                        </Brief>
}
                        <Brief>{`￥${item.unitPrice}`}</Brief>
                    </Item>
                </div>
            )
        }
        return (
            <div>
                {parts.length > 0
                    ? <div>
                            <List renderHeader={() => '配件信息'}>
                                {parts.map((item, index) => partsItem(item, index))}
                            </List>
                            <p
                                style={{
                                marginLeft: 15,
                                fontSize: 18
                            }}>合计：<span
                                style={{
                            color: 'red'
                        }}>{this.total(parts)}</span>
                            </p>
                        </div>
                    : <List renderHeader={() => '配件信息'}>
                        <Item>暂无配件</Item>
                        <Item>
                            合计：<span style={{
                        color: 'red'
                    }}>0</span>
                        </Item>

                    </List>
}
            </div>
        )
    }
}
export default withRouter(connect(state => state, dispatch => ({
    setParts: parts => dispatch(operation.setParts(parts))
}))(PartInfo));