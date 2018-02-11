import React, { PureComponent } from 'react';
import { NavBar, Icon,List,InputItem,Button } from 'antd-mobile'
import { createForm } from 'rc-form';
const Item = List.Item;
class ModifyUserName extends PureComponent {
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        const values = this.props.form.getFieldsValue();
        console.log(values);
        
      } else {
        alert('请输入有效信息!');
      }
    });
  }

  render () {
    const { history } = this.props;
    const { getFieldProps, getFieldError } = this.props.form;
    return this.props.children || (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.push({pathname: '/myinfo'})}
        >
          修改用户名
        </NavBar>
        <form>
        <List
        >
          <InputItem
            {...getFieldProps('username', {
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
            <Button type="primary" onClick={this.onSubmit}>提交</Button>
          </Item>
        </List>
      </form>
      </div>
    )
  }
}

const BasicInputWrapper = createForm()(ModifyUserName);
export default BasicInputWrapper;