import React, { PureComponent } from 'react';
import { Tabs, WhiteSpace, List, Stepper } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import styles from './style.css';
/**
 * @file 开始维修 -> 填写配件 -> 配件库
 */
const tabs = [
  { title: '本产品配件' },
  { title: '配件库' },
];
const Item = List.Item;
const Brief = Item.Brief;
class AddParts extends PureComponent {
  render() {
    return (
      <div className={`${styles.tabs_vertical_container} vertical_tabs`}>
        <Tabs tabs={tabs}
          initalPage={'t2'}
          tabBarPosition="left"
          tabDirection="vertical"
        >
          <div className={styles.tabs_content}>
            <List style={{width: '100%'}}>
              <Item
                wrap
                extra={
                  <Stepper
                    style={{ width: '100%', minWidth: '100px' }}
                    showNumber
                    max={10}
                    min={1}
                  />}
              >
                全自动尿液尿有形成分分析系统
                <Brief>型号名字有点长/规格</Brief>
                <Brief>ABCDEFGHIJK</Brief>
              </Item>
            </List>
          </div>
          <div className={styles.tabs_content}>
            暂不支持该服务
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default withRouter(AddParts);