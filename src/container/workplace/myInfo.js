import React, { PureComponent } from 'react';
import { List, Modal } from 'antd-mobile'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { weUnBind } from '../../api/user';
import styles from './style.css';
const alert = Modal.alert;
const Item = List.Item;
class MyInfo extends PureComponent {
  showUserType = (userTye)=>{
    switch (userTye){
      case 'syks':
        return '使用科室';
      case 'nxz':
        return '内修组';
      case 'wxz':
        return '外修组';
      default : 
        return null;
    }
  }
  onClick = () =>{
    alert('解绑', '是否确认解绑', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: async () => this.UnBind()  },
    ])
  }
  async UnBind (){
    const postData = {};
    const { history } = this.props;
    postData.userId = this.props.userReducer.userInfo.userId;
    // postData.userId = 'E2EDF6E336AC4EE28F87FF53F4F6BBD7';
    const data = await weUnBind({ body: postData, type:'formData' });
    document.querySelector('#closeTarget').click();
    if(data.status && !data.result.err){
      // 关闭浏览器
      document.querySelector('#closeTarget').click();
    }else{
      history.push({ pathname:`/error` });
    }
  }
  render () {
    const { history } = this.props;
    const { userInfo } = this.props.userReducer;
    return this.props.children || (
      <div>
        <List  className="my-list">
          <Item 
            thumb={require('../../assets/Avatar.svg')}
            extra={ <img 
                alt='头像'
                src={userInfo.headImgUrl}
                className={styles.workplace_avatar}
              />} arrow="horizontal" 
              >
          头像
          </Item>
          <Item 
            thumb={require('../../assets/userName.svg')}
            extra={userInfo.userName} arrow="horizontal"  onClick={() => history.push({pathname: '/modifyUserName'})}>
            用户名
          </Item>
          <Item 
            thumb={require('../../assets/organization.svg')}
            extra={
              <div className={styles.extra_Text}>{userInfo.orgName}</div>
              }>
            机构
          </Item>
          <Item 
            thumb={require('../../assets/dept.svg')}
            extra={<div className={styles.extra_Text}>{}</div>}>
            科室
          </Item>
          <Item 
            thumb={require('../../assets/userGroup.svg')}
            extra={<div className={styles.extra_Text}>{userInfo.groupName}</div>} >
            用户组
          </Item>
          <Item 
            thumb={require('../../assets/weixin.svg')}
            extra={<div className={styles.extra_Text} style={{ color:'red' }} onClick={this.onClick}>
            {'解绑'}</div>} >
            微信
          </Item>
          <a style={{ display: 'none' }} id='closeTarget' href="javascript:WeixinJSBridge.call('closeWindow');">点我啊点我啊</a>
        </List>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(MyInfo));