/**
 * @file 设备--验收
 */
import React, { PureComponent } from 'react';
import { Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { operation } from '../../service'
import  CardItem  from '../../component/card';
import ListViewScroll from '../../component/listViewScroll';
import {queryDetail } from '../../api/check';
import  assets  from '../../api/assets'

//import { selectRrpairList } from '../../api/check';
class MyCheckList extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          url : assets.selectRrpairList
        }
    }
    async componentWillMount  (){
        /* const data = await selectRrpairList({ body : { orderFstate : '50'},type : 'FormData'});
        if(data.status && data.result){
            console.log(data.result.rows)
            this.setState({ checkList : data.result.rows });
        } */
    }
    async onClick  (record){
        const { history } = this.props;
        const data = await queryDetail({body: {rrpairOrderGuid : record.rrpairOrderGuid },type:'1'});
        if(data.status){
            this.props.setCheckDetial({ BaseInfoInfoData:{
                ...data.result.selectRrpairDetailIsAcce,
                ...data.result.selectRrpairDetailIsAssets,
                ...data.result.selectRrpairDetailIsCall,
                ...data.result.selectRrpairDetailIsOrder,
                ...data.result.selectRrpairDetailIsRrpair,
                ...record
            }});
            Toast.loading('Loading....',1,()=>{
                history.push({ pathname:`/check/detail/${record.rrpairOrderGuid}`,state: record });
            })
        }
    }
    render(){
        return (
            <ListViewScroll 
                url={this.state.url}
                queryParams={{orderFstate:'50'}}
                item={
                    obj => {
                        return <CardItem data={obj} onClick={this.onClick.bind(this)}/>
                    }
                }
            />
        )
    }

}
export default  withRouter(connect(state => state, dispatch => ({
    setCheckDetial: check => dispatch(operation.setCheckDetial(check))
  }))(MyCheckList));