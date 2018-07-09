/*
 * @Author: wwb 
 * @Date: 2018-07-04 15:41:46 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-05 21:43:40
 */

 /* 
  扫码借出，扫码归还 公用 header
 */
import React, {PureComponent} from 'react';
import { List,Toast } from 'antd-mobile';
import { operation } from '../../service'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { queryAssets } from '../../api/repair';

const Item = List.Item;
const Brief = Item.Brief;
class Header extends PureComponent{
  state = {
    assetsRecordGuid:''
  }
  async componentDidMount(){
    const { history } = this.props;
    if(!this.props.borrowReducer.baseDetail.assetsRecordGuid){
      const data = await queryAssets({body: {assetsRecordGuid: this.props.assetsRecordGuid },type:'formData'});
      if (data.status && data.result) {
        this.props.setBorrowDetial({
          baseDetail: data.result
        });
        let { equipmentStandardName, spec, fmodel } = data.result;
        if(this.props.cb){
          this.props.cb({ equipmentStandardName, spec, fmodel});
        }
      }else{
        Toast.fail(data.msg, 2,() => history.push({pathname: `/error`}));
      }
    }
  }
  render(){
    const baseData = this.props.borrowReducer.baseDetail;
    return (
      <List>
        <Item arrow="horizontal" onClick={() => this.props.history.push({ pathname:'/borrowRecord/AssetsShow' })}>
          {baseData.equipmentStandardName}
          <Brief><span>{baseData.spec}</span> <span>{baseData.fmodel}</span></Brief>
        </Item>
      </List>
    )
  }
}
export default withRouter(connect(state => state,dispatch=>({
  setBorrowDetial: borrow => dispatch(operation.setBorrowDetial(borrow))
}))(Header));
