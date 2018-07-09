/*
 * @Author: wwb 
 * @Date: 2018-07-04 15:47:36 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-05 21:45:18
 */
/* 
  借用
*/
import React, {PureComponent} from 'react';
import { List, DatePicker, TextareaItem, WhiteSpace, Button, Toast } from 'antd-mobile';
import { insertBorrow } from '../../api/borrow';
import { fetchUser } from '../../api/user';
import { user as userService } from '../../service';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import Header from './commonHeader';

const Item = List.Item;
const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);

class BorrowOut extends PureComponent{
  state = {
    NowDate: now,
    date: null,
    assetsRecordGuid: '',
    equipmentStandardName: null,
    spec: null,
    fmodel: null,
    borrowCause: null,
    deptGuid: null,
    loading: false
  }
  async componentWillMount() {
    const { assetsRecordGuid, userId } = this.props.match.params;
    const { setUser, history }= this.props;
    this.setState({ assetsRecordGuid });
    const data = await fetchUser({ body:{ userId: userId },type:'formData'});
    if(data.status){
      setUser({userInfo: data.result});
    }else{
      Toast.fail('用户信息异常', 1 ,() => history.push({ pathname:`/error` }));
    }
  }
  async handSubmit () {
    const { history } = this.props;
    const { equipmentStandardName, spec, fmodel, date, borrowCause, assetsRecordGuid } = this.state;
    const { borrowReducer, deptReducer } = this.props;
    let parmas = {},estimateBack = null;
    let newDate = date ? date: '';
    if(!newDate){
      estimateBack = '';
    }else{
      let d = new Date(newDate);
      estimateBack = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
    }
    parmas.equipmentStandardName = equipmentStandardName || borrowReducer.baseDetail.equipmentStandardName;
    parmas.spec = spec || borrowReducer.baseDetail.spec;
    parmas.fmodel = fmodel || borrowReducer.baseDetail.fmodel;
    parmas.estimateBack = estimateBack;
    parmas.borrowCause = borrowCause;
    parmas.assetsRecordGuid = assetsRecordGuid;
    parmas.deptGuid = deptReducer.dept.deptGuid;
    this.setState({ loading: true });
    const res = await insertBorrow({body: parmas, type: 'formData'});
    this.setState({ loading: false });
    if(res.status){
      Toast.success('借出成功',2,()=> history.push({ pathname: '/borrowRecord' }));
    }else{
      Toast.fail(res.msg||'借出失败',2, () => history.push({pathname: `/error`}));
    }
  }
  async setequipment(equipment){
    this.setState(equipment);
  }
  render(){
    console.log(this.props,'props');
    return (
      <div>
        <Header 
          cb={(equipment)=>this.setequipment(equipment)}
          assetsRecordGuid={this.state.assetsRecordGuid}/>
        <List className="date-picker-list" style={{ backgroundColor: 'white' }}>
        <DatePicker
          value={this.state.NowDate}
          onChange={date => this.setState({ NowDate: date })}
        >
          <Item arrow="horizontal">借用时间</Item>
        </DatePicker>
        <DatePicker
          value={this.state.date}
          onChange={date => this.setState({ date })}
        >
          <Item arrow="horizontal">预计归还时间</Item>
        </DatePicker>
        <Item arrow="horizontal" 
          extra={<span>{this.props.deptReducer.dept.deptGuid?this.props.deptReducer.dept.text:''}</span>}
          onClick={()=>this.props.history.push({ pathname:'/borrowRecord/dept' })}>
          借用科室
        </Item>
        </List>
        <WhiteSpace size='lg'/>
        <TextareaItem
          onChange={(value)=>this.setState({ borrowCause: value })}
          rows={5}
          placeholder="借出原因"
        />
        <WhiteSpace size='lg'/>
        <div style={{ padding: '0 5px',marginTop: 30 }}>
          <Button type="primary" onClick={()=>this.handSubmit()} loading={this.state.loading}>提交</Button>
        </div>
      </div>
    )
  }
}
export default withRouter(connect(state => state,dispatch=>({
  setUser: user => dispatch(userService.setUserInfo(user)),
}))(BorrowOut));