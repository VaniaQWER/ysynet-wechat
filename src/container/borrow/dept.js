/*
 * @Author: wwb 
 * @Date: 2018-07-05 11:29:58 
 * @Last Modified by: wwb
 * @Last Modified time: 2018-07-05 19:09:46
 */
/* 
  借用科室
*/
import React, { PureComponent } from 'react';
import { List, SearchBar, Radio, Toast } from 'antd-mobile';
import { selectUseDeptList } from '../../api/borrow';
import { operation } from '../../service'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

const RadioItem = Radio.RadioItem;
const Item = List.Item;
class DeptList extends PureComponent{
  state = {
    deptList: [],
    placeholder: '搜索'
  }
  async componentWillMount (){
    this.genDeptList();
  }
  async genDeptList(val) {
    let parmas = {};
    parmas.deptType = '01';
    if(val){
      parmas.deptName = val;
    }
    const data = await selectUseDeptList({body: parmas, type: 'formData'});
    if(data.status){
      if(data.result.length){
        this.setState({ deptList: data.result  })
      }else{
        Toast.info('暂无科室，请添加');
      }
    }else{
      Toast.fail(data.msg,3);
    }
  }
  onChange = (value,text) => {
    this.props.setDept({
      dept:{ deptGuid: value,text: text }
    })
  };
  render(){
    const { deptList } = this.state;
    return (
      <div>
        <SearchBar
          placeholder={this.state.placeholder}
          onFocus={()=>this.setState({ placeholder: '请输入科室名称' })}
          onBlur={()=>this.setState({ placeholder: '搜索' })}
          ref={ref => this.manualFocusInst = ref}
          onSubmit={value => {
            this.genDeptList(value);
          }}
        />
        {
          deptList.length?
          <List>
            {deptList.map(i => (
              <RadioItem key={i.value} checked={this.props.deptReducer.dept.deptGuid === i.value} onChange={() => this.onChange(i.value,i.text)}>
                {i.text}
              </RadioItem>
            ))}
          </List>
          :
          <List>
            <Item>暂无科室</Item>
          </List>
        }
      </div>
    )
  }
}
export default withRouter(connect(state => state,dispatch=>({
  setDept: dept => dispatch(operation.setDept(dept))
}))(DeptList));