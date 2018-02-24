import React, { PureComponent } from 'react';
import { List, WhiteSpace, Result, Tabs, Button, Modal } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
const tabs = [
  { title: `报修信息` },
  { title: `指派信息` },
];
const alert = Modal.alert;
/**
 * @file 待接修 - 详情
 */
class WaitForRepairDetail extends PureComponent {
  render() {
    return (
      <div>
        <List className={'repair_list'}>
          <Result
            img={<img src={'https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg'} className={`${styles.spe} am-icon am-icon-md`} alt="" />}
            title="等待接修"
            message={<span>维修单号：12345678<br/>已提交申请，等待接修</span>}
          />
          <WhiteSpace size="lg" />
          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => {}}
          >
            全自动尿液尿有形成分分析系统
            <Brief>型号名字有点长/规格</Brief>
            <Brief>ABCDEFGHIJK</Brief>
          </Item>
          <WhiteSpace size="lg" />
          <Tabs tabs={tabs}
            initialPage={0}
          >
            <div className={styles.tabs_body}>
              <section>
                <span className={styles.tabs_item_label}>设备状态：</span>
                <span className={styles.tabs_item_text}>停用</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>紧急度：</span>
                <span className={styles.tabs_item_text}>紧急</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>备用：</span>
                <span className={styles.tabs_item_text}>无</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>故障现象：</span>
                <span className={styles.tabs_item_text}>无法开机</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>报修人：</span>
                <span className={styles.tabs_item_text}>张全蛋</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>报修部门：</span>
                <span className={styles.tabs_item_text}>骨科</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>报修时间：</span>
                <span className={styles.tabs_item_text}>2018-02-01 12：30</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>送修：</span>
                <span className={styles.tabs_item_text}>是</span>
              </section>
              <section>              
                <span className={styles.tabs_item_label}>故障描述：</span>
                <span className={styles.tabs_item_text}>没办法开机了，还问到了糊味</span>
              </section>
            </div>
            <div className={styles.tabs_body}>
              <section>
                <span className={styles.tabs_item_label}>维修方式：</span>
                <span className={styles.tabs_item_text}>内修</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>指派给：</span>
                <span className={styles.tabs_item_text}>维修1组</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>指派人：</span>
                <span className={styles.tabs_item_text}>张碧晨</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>指派时间：</span>
                <span className={styles.tabs_item_text}>2018-02-04 16：45</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>维修时间：</span>
                <span className={styles.tabs_item_text}>2018-02-04 16：45</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>期望完成：</span>
                <span className={styles.tabs_item_text}>2018-02-04 16：45</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>预计开始：</span>
                <span className={styles.tabs_item_text}>2018-02-04 16：45</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>指派备注：</span>
                <span className={styles.tabs_item_text}>院长交代的，好好干给你调级别</span>
              </section>
            </div>
          </Tabs>
        </List>
        <div className={styles.list_bottom}>
          <div className={`${styles.right}`}>
            <Button 
              type='primary' 
              style={{borderRadius: 0}}
              onClick={() => alert('接修', '是否确认接修?', [
                { text: '否' },
                { text: '是', onPress: () => this.props.history.push({
                  pathname: '/waitForRepair/100/success'
                }) },
              ])}
            >
              接修
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(WaitForRepairDetail);