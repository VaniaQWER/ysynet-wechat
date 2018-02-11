import React, { PureComponent } from 'react';
import { NavBar, Icon,List } from 'antd-mobile'
import styles from './style.css';
const Item = List.Item;
class MyInfo extends PureComponent {
  
  render () {
    const { history } = this.props;
    return this.props.children || (
      <div>
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => history.push({pathname: '/workplace'})}
        >
          用户信息
        </NavBar>
        <List  className="my-list">
          <Item extra={ <img 
                alt='头像'
                src='http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoD2AWk42WvibH1eKcKDKbxRHrw7TxDMN1uE6bicNtcfiaQZXic3uDpkAohlYhMyAqybehffeRQ09j3dQ/0'
                className={styles.workplace_avatar}
              />} arrow="horizontal" 
              >
          头像
          </Item>
          <Item extra={"萌萌的拖鞋酱"} arrow="horizontal"  onClick={() => history.push({pathname: '/modifyUserName'})}>
            用户名
          </Item>
          <Item extra={"某某医院"}>
            机构
          </Item>
          <Item extra={"某某科室"}>
            科室
          </Item>
          <Item extra={"维修组"} >
            用户组
          </Item>
        </List>
      </div>
    )
  }
}

export default MyInfo;