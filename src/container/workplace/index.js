/**
 * @file 设备-工作台
 */
import React, { PureComponent } from 'react';
import { List, Card, Icon, Grid, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import styles from './style.css';
import CardTitle from './cardTitle';

const data = [
  {
    text: <CardTitle title={'12'} subTitle={'我的报修'} style={{fontSize: 20}}/>,
  },
  {
    text: <CardTitle title={'0'} subTitle={'我的保养'} style={{fontSize: 20}}/>,
  },
  {
    text: <CardTitle title={'3'} subTitle={'收藏夹'} style={{fontSize: 20}}/>,
  }
]

const data1 = [
  {
    text: '扫码报修',
    icon: require('../../assets/scan02.svg'),
    url: '/repair/1001',
  },
  {
    text: '资产登记',
    icon: require('../../assets/checkin.svg')
  },
  {
    text: '资产档案',
    icon: require('../../assets/assets.svg')
  }
]

class Workplace extends PureComponent {
  render() {
    const { history } = this.props;
    return (
      <List className={`workplace ${styles.workplace_viewList}`}>
        <Card className={styles.workplace_header} full>
          <Card.Header
            className={styles.workplace_header_body}
            title={<CardTitle title={'萌萌的拖鞋酱'} subTitle={'石河子医院'}/>}
            thumb={
              <img 
                alt='头像'
                src='http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoD2AWk42WvibH1eKcKDKbxRHrw7TxDMN1uE6bicNtcfiaQZXic3uDpkAohlYhMyAqybehffeRQ09j3dQ/0'
                className={styles.workplace_avatar}
              />
            }
            extra={
              <Icon type="right" size={'sm'} />
            }
          />
          <Card.Body style={{background: '#fff', padding: 0}}>
            <Grid data={data} activeStyle={false} hasLine={false}/>
          </Card.Body>
        </Card>
        <WhiteSpace/>
        <Grid 
          data={data1} 
          activeStyle={false} 
          hasLine={true} 
          onClick={(el, index) => history.push({pathname: el.url}) }
        />
      </List>
    )
  }
}

export default withRouter(Workplace);