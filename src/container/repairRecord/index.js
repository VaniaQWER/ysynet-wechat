/**
 * @file 设备--维修记录
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
            userType: ''
        }
    }
    async componentWillMount(){
        const { userInfo } = this.props.userReducer;
        const { userId } = userInfo;
        const userType = this.props.userReducer.userInfo.groupName === undefined? null: this.props.userReducer.userInfo.groupName;
        const { sessionId } = this.props.sessionReducer.session;
        //alert(orderFstate,'orderFstate');
        this.setState({userId, userType, sessionId });
    }
    async onClick(record) {
        const { history } = this.props;
        const { userId, userType,sessionId } = this.state;
        console.log( userId, userType,sessionId );
        const data = await queryDetail({
            body: {
                rrpairOrderGuid: record.rrpairOrderGuid
            },
            type: 'formData'
        });
        if (data.status) {
            Toast.loading('加载中....', 1, () => {
                record.orderFstate==='10'?
                history.push({pathname: `/waitForRepair/detail/${userId}/${record.rrpairOrderGuid}/${userType}/${sessionId}`})
                :
                history.push({pathname: `/check/detail/${userId}/${record.orderFstate}/${record.rrpairOrderGuid}/${userType}/${sessionId}`});
            })
            this
                .props
                .setCheckDetial({
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
        }
    }
    render() {
        const { sessionId } = this.state;
        return (
            <ListViewScroll
                url={this.state.url}
                queryParams={{
                sessionId: sessionId
            }}
                item={obj => {
                 return (<CardItem
                    data={{...obj, key: 'repairRecord'}}
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