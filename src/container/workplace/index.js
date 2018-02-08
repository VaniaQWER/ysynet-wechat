/**
 * @file 设备-工作台
 */
import React, { PureComponent } from 'react';
import { List, Card, Icon, Grid } from 'antd-mobile'
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

class Workplace extends PureComponent {
  render() {
    return (
      <List className={styles.workplace_viewList}>
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
            <Grid data={data} activeStyle={false} hasLine={false} itemStyle={{
 
            }} style={{padding: 0}}/>
          </Card.Body>
        </Card>
      </List>
    )
  }
}

export default Workplace;