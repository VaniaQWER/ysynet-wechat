/*
 * @Author: wwb 
 * @Date: 2018-07-04 15:47:36 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-05 21:45:34
 */
/* 
  归还
*/
import React, {PureComponent} from 'react';
import { List, DatePicker,Button,Toast } from 'antd-mobile';
import { findBorrowReturn, updateBorrowReturn } from '../../api/borrow';
import { fetchUser } from '../../api/user';
import { user as userService } from '../../service';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Header from './commonHeader';

const Item = List.Item;

const nowTimeStamp = Date.now();
const nowDate = new Date(nowTimeStamp);
class BorrowReturn extends PureComponent{
  state = {
    date: nowDate,
    revertData: {},
    assetsRecordGuid:'',
    borrowGuid:'',
    diff: 0,
    price: 0,
    totalPrice: 0,
    loading: false
  }
  async componentWillMount() {
    const { assetsRecordGuid, borrowGuid, userId } = this.props.match.params;
    this.setState({ assetsRecordGuid, borrowGuid });
    const { setUser,history }= this.props;
    const userData = await fetchUser({ body:{ userId: userId },type:'formData'});
    if(userData.status){
      setUser({userInfo: userData.result});
    }else{
      Toast.fail('用户信息异常', 1 ,() => history.push({ pathname:`/error` }));
    }
    const data = await findBorrowReturn({body: { borrowGuid: borrowGuid }, type: 'formData'});
    if(data.status){
      let diff = this.GetDateDiff(this.state.date,data.result.createTime);
      let price = data.result.rentingPrice ? data.result.rentingPrice: 0
      let totalPrice = diff * price;
      this.setState({ revertData: data.result, diff, totalPrice, price });
    }else{
      Toast.fail(data.msg,2,()=> () => history.push({pathname: `/error`}))
    }
  }
  async handSubmit (){
    const { history } = this.props;  
    let params = {};
    params.borrowDetailGuid = this.state.revertData.borrowDetailGuid;
    params.borrowPrice = this.state.totalPrice;
    this.setState({ loading: true });
    const data = await updateBorrowReturn({ body: params,type: 'formData' });
    this.setState({ loading: false });
    if(data.status){
      Toast.success('归还成功',2,()=> history.push({ pathname:'/borrowRecord' }));
    }else{
      Toast.fail('归还失败',2,() => history.push({ pathname: '/error' }))
    }
  }
  GetDateDiff = (startDate,endDate) => {  
    let startTime = new Date(Date.parse(startDate)).getTime();
    let endTime = new Date(Date.parse(endDate.replace(/-/g,   "/"))).getTime();
    let dates = Math.abs((startTime - endTime))/(1000*60*60*24);
    return  (dates*24).toFixed(2);
  }
  onChange = (date) =>{
    let endTime = this.state.revertData.createTime;
    const diff = this.GetDateDiff(date,endTime);
    let totalPrice = diff * this.state.price;
    this.setState({ date, diff, totalPrice });
  }
  render(){
    const { revertData } = this.state;
    return (
      <div>
        <Header assetsRecordGuid={this.state.assetsRecordGuid}/>
        <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
          <Item extra={revertData.createTime}>
            实际借用时间
          </Item>
          <DatePicker
            value={this.state.date}
            onChange={this.onChange}
          >
            <Item arrow="horizontal">归还时间</Item>
          </DatePicker>
          <Item extra={<span>{this.state.diff}<label style={{ marginLeft: 5 }}>H</label></span>}>
            时长
          </Item>
          <Item extra={<span style={{ color: 'red' }}> { this.state.totalPrice } <label>￥</label></span>}>
            金额
          </Item>
          <div style={{ padding: '0 5px',marginTop: 30 }}>
            <Button type="primary" onClick={()=>this.handSubmit()} loading={this.state.loading}>提交</Button>
          </div>
        </List>
      </div>
    )
  }
}
export default withRouter(connect(state => state,dispatch=>({
  setUser: user => dispatch(userService.setUserInfo(user)),
}))(BorrowReturn));