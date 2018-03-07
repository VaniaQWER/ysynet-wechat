import React, { PureComponent } from 'react';
import { List } from 'antd-mobile'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './style.css';
const Item = List.Item;
class MyInfo extends PureComponent {
  
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
            extra={<div className={styles.extra_Text}>{'xxx科室'}</div>}>
            科室
          </Item>
          <Item 
            thumb={require('../../assets/userGroup.svg')}
            extra={<div className={styles.extra_Text}>{userInfo.groupName}</div>} >
            用户组
          </Item>
        </List>
      </div>
    )
  }
}

export default withRouter(connect(state => state)(MyInfo));