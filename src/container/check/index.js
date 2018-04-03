/**
 * @file 设备--验收
 */
import React, {PureComponent} from 'react';
import {Toast} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {operation} from '../../service'
import CardItem from '../../component/card';
import ListViewScroll from '../../component/listViewScroll';
import {queryDetail} from '../../api/check';
import assets from '../../api/assets'

class MyCheckList extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            url: assets.selectRrpairList,
            userId:'',
            sessionId: '',
            orderFstate:'',
            userType: ''
        }
    }
    async componentWillMount(){
        const { userInfo } = this.props.userReducer;
        const { userId } = userInfo;
        const userType = this.props.userReducer.userInfo.groupName === undefined? null: this.props.userReducer.userInfo.groupName;
        const { sessionId } = this.props.sessionReducer.session;
        const orderFstate = this.props.checkReducer.BaseInfoInfoData.orderFstate === undefined?'50': this.props.checkReducer.BaseInfoInfoData.orderFstate
        this.setState({userId, userType, sessionId, orderFstate });
    }
    async onClick(record) {
        const { history } = this.props;
        const { orderFstate, userId, userType,sessionId} = this.state;
        const data = await queryDetail({
            body: {
                rrpairOrderGuid: record.rrpairOrderGuid
            },
            type: 'formData'
        });
        if (data.status) {
            this.props.setCheckDetial({
                    BaseInfoInfoData: {
                        ...data.result.selectRrpairDetail,
                        ...data.result.selectRrpairDetailIsAcce,
                        ...data.result.selectRrpairDetailIsAssets,
                        ...data.result.selectRrpairDetailIsCall,
                        ...data.result.selectRrpairDetailIsOrder,
                        ...data.result.selectRrpairDetailIsRrpair,
                        ...record
                    }
                });
            Toast.loading('加载中....', 1, () => {
                orderFstate==='10'?
                history.push({pathname: `/waitForRepair/detail/${userId}/${record.rrpairOrderGuid}/${userType}/${sessionId}`})
                :
                history.push({pathname: `/check/detail/${userId}/${orderFstate}/${record.rrpairOrderGuid}/${userType}/${sessionId}`});
            })
            
        }
    }
    render() {
        const { orderFstate, userType, sessionId } = this.state;
        return (
            <ListViewScroll
                url={this.state.url}
                queryParams={{
                /* sessionId: sessionId, */
                orderFstate: orderFstate
            }}
                item={obj => {
                 return (<CardItem
                    data={{...obj,userType: userType}}
                    onClick={this
                    .onClick
                    .bind(this)}
                    />
                ) 
            }}/>
        )
    }

}
export default withRouter(connect(state => state, dispatch => ({
    setCheckDetial: check => dispatch(operation.setCheckDetial(check))
}))(MyCheckList));