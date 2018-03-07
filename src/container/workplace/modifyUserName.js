import React, { PureComponent } from 'react';
import { List,InputItem,Button,Toast } from 'antd-mobile'
import { createForm } from 'rc-form';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { user as userService } from '../../service';
import { updateUserName } from '../../api/user'
const Item = List.Item;
class ModifyUserName extends PureComponent {
  constructor(props){
    super(props)
    this.state = {
      userInfo: this.props.userReducer.userInfo,
      loading: false
    }
  }
   onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const values = this.props.form.getFieldsValue();
        let postData = {
          userId: this.state.userInfo.userId,
          userName: values.username
        };
        this.updateUserName(postData);
      } else {
        alert('请输入有效信息!');
      }
    });
  }
  async updateUserName (postData){
    const { history,setUser } = this.props;
    const { sessionId } = this.props.sessionReducer.session;
    this.setState({ loading: true });
    const data = await updateUserName({ body: postData,type:'FormData' });
    this.setState({ loading: false });
    if(data.status){
      setUser({ userInfo: {...this.state.userInfo,userName: postData.userName}});
      Toast.success('修改成功',1,()=>history.push({ pathname:`/workplace/${postData.userId}/${sessionId}` }));
    }else{
      Toast.fail('修改失败');
    }
  }
  render () {
    const { userInfo } = this.props.userReducer;
    const { getFieldProps, getFieldError } = this.props.form;
    return this.props.children || (
      <div>
        <form>
        <List
        >
          <InputItem
            {...getFieldProps('username', {
              initialValue:userInfo.userName,
              rules: [
                { required: true, message: '请输入新的用户名' },
                { max: 30, message:'字符长度不能超过30'}
              ],
            })}
            clear
            error={!!getFieldError('username')}
            onErrorClick={() => {
              alert(getFieldError('username').join('、'));
            }}
            placeholder="请输入新的用户名"
          >用户名</InputItem>
          <Item>
            <Button type="primary" onClick={this.onSubmit} loading={this.state.loading}>提交</Button>
          </Item>
        </List>
      </form>
      </div>
    )
  }
}

const BasicInputWrapper = createForm()(ModifyUserName);

export default withRouter(connect(state => state, dispatch => ({
  setUser: user => dispatch(userService.setUserInfo(user)),
}))(BasicInputWrapper));