import React, {PureComponent} from 'react';
import {
  List,
  WhiteSpace,
  Result,
  Tabs,
  Button,
  Modal,
  Toast,
  ImagePicker
} from 'antd-mobile';
import {selectOption, faultDescribeData} from '../../constants'
import {queryDetail} from '../../api/check';
import {operation, user as userService, menu as menuService, session as sessionService} from '../../service'
import {updateRrpairOrderFstate, pushMessage} from '../../api/assets'
import ImageModal from '../../component/imageModal'
import {FTP} from '../../api/_local'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
const tabs = [
  {
    title: `报修信息`
  }, {
    title: `指派信息`
  }
];
const alert = Modal.alert;
/**
 * @file 待接修 - 详情
 */

class WaitForRepairDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      baseData: {},
      files: [], //图片
      src: '',
      visible: false,
      rrpairOrderGuid: '',
      multiple: false,
      userId: '',
      sessionId: '',
      userType: ''
    }
  }

  async componentWillMount() {
    if (this.props.userReducer.userInfo.userId) {
      const {rrpairOrderGuid, faultAccessory} = this.props.checkReducer.BaseInfoInfoData;
      const userType = this.props.userReducer.userInfo.groupName;
      const {sessionId} = this.props.sessionReducer.session;
      const {userId} = this.props.userReducer.userInfo;
      this.setImgModal(faultAccessory);
      this.setState({rrpairOrderGuid, userType, userId, sessionId, baseData: this.props.checkReducer.BaseInfoInfoData});
    } else {
      const {history} = this.props;
      const {params} = this.props.match;
      let {userId, sessionId, rrpairOrderGuid, userType} = params;
      this.setState({rrpairOrderGuid, userType, userId, sessionId});
      if (!userId) {
        history.push({pathname: `/error`});
      } else {
        const data = await queryDetail({
          body: {
            rrpairOrderGuid: rrpairOrderGuid
          },
          type: 'formData'
        });
        if (data.status) {
          let {faultAccessory} = data.result.selectRrpairDetailIsOrder;
          this.setImgModal(faultAccessory);
          this.setState({
            baseData: {
              ...data.result.selectRrpairDetail,
              ...data.result.selectRrpairDetailIsAcce,
              ...data.result.selectRrpairDetailIsAssets,
              ...data.result.selectRrpairDetailIsCall,
              ...data.result.selectRrpairDetailIsOrder,
              ...data.result.selectRrpairDetailIsRrpair
            }
          })
          this
            .props
            .setCheckDetial({
              BaseInfoInfoData: {
                ...data.result.selectRrpairDetail,
                ...data.result.selectRrpairDetailIsAcce,
                ...data.result.selectRrpairDetailIsAssets,
                ...data.result.selectRrpairDetailIsCall,
                ...data.result.selectRrpairDetailIsOrder,
                ...data.result.selectRrpairDetailIsRrpair
              }
            });
        }
      }
    }
  }
  //图片
  setImgModal = (faultAccessory) => {
    if (typeof faultAccessory === 'string') {
      let urls = faultAccessory.split(';');
      let u = urls.splice(0, urls.length - 1);
      let files = [];
      u.map((item, index) => {
        return files.push({
          url: FTP + item,
          id: index
        })
      });
      this.setState({files: files});
    }
  }

  handlefaultDescribeData = (res) => {
    let str = '';
    if (res) {
      if (/^0./.test(res[0])) {
        res.map((item) => {
          return str += faultDescribeData[item]
            ? faultDescribeData[item].text + ","
            : ''
        })
      } else {
        res.map((item) => {
          return str += item
            ? item + ","
            : ''
        })
      }
    }
    return str.substring(0, str.length - 1);
  }
  async pushRepairMsg() {
    const {baseData} = this.state;
    const data = await pushMessage({
      body: {
        rrpairOrderGuid: baseData.rrpairOrderGuid
      },
      type: 'fromData'
    });
    if (data.status) {
      console.log('推送成功');
    } else {
      console.log('出错啦....' + data.mag);
    }
  }
  async updateFstate() {
    const {baseData, userId, sessionId} = this.state;
    const {history} = this.props;
    let parmas = {};
    parmas.rrpairOrderGuid = baseData.rrpairOrderGuid;
    parmas.orderFstate = '30';
    parmas.sessionId = this.state.sessionId;
    const data = await updateRrpairOrderFstate({body: parmas, type: 'formData'});
    if (data.status) {
      Toast.success('接修成功', 1, () => {
        history.push({pathname: `/workplace/${userId}/${sessionId}`});
      })
      this.pushRepairMsg();
    } else {
      Toast.fail(data.msg, 1, () => history.push({pathname: `/error`}));
    }
  }
  showModal = (index, fs) => {
    this.setState({visible: true, src: fs[index].url})
  }
  render() {
    const {baseData, userType, files} = this.state;
    const {history} = this.props;
    return (
    <div>
        <List className={'repair_list'}>
          <Result
            img={< img src = {
            'https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg'
          }
          className = {
            `${styles.spe} am-icon am-icon-md`
          }
          alt = "" />}
            title="等待接修"
            message={< span > 维修单号： {baseData.rrpairOrderNo} < br /> 已提交申请，等待接修 </span>}/>
          <WhiteSpace size="lg"/>
          <Item
            arrow="horizontal"
            multipleLine
            onClick={() => history.push({pathname: '/check/assetsShow'})}>
            {baseData.equipmentStandardName}
            <Brief>{baseData.spec}
              / {baseData.fmodel}</Brief>
            <Brief>资产编码：{baseData.assetsRecord}</Brief>
          </Item>
          <WhiteSpace size="lg"/>
          <Tabs tabs={tabs} initialPage={0}>
            <div className={styles.tabs_body}>
              <section>
                <span className={styles.tabs_item_label}>设备状态：</span>
                <span className={styles.tabs_item_text}>{selectOption
                    .useFstate
                    .map((item) => item.value === baseData.useFstate
                      ? item.text
                      : '')}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>紧急度：</span>
                <span className={styles.tabs_item_text}>{selectOption
                    .urgentFlag
                    .map(item => item.value === baseData.urgentFlag
                      ? item.text
                      : '')}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>备用：</span>
                <span className={styles.tabs_item_text}>{selectOption
                    .spare
                    .map((item) => item.value === baseData.spare
                      ? item.text
                      : '')}</span>
              </section>
              <section>
                <div
                  style={{
                  float: 'left',
                  width: '30%'
                }}
                  className={styles.tabs_item_label}>故障现象：</div>
                <div className={styles.tabs_item_text_div}>{this.handlefaultDescribeData(baseData.faultDescribe)}</div>
              </section>
              <section>
                <span className={styles.tabs_item_label}>报修人：</span>
                <span className={styles.tabs_item_text}>{baseData.rrpairUsername}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>报修部门：</span>
                <span className={styles.tabs_item_text}>{baseData.deptName}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>报修时间：</span>
                <span className={styles.tabs_item_text}>{baseData.createDate}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>送修：</span>
                <span className={styles.tabs_item_text}>{selectOption
                    .rrpairSend
                    .map((item, ind) => item.value === baseData.rrpairSend
                      ? item.text
                      : '')}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>故障描述：</span>
                <span className={styles.tabs_item_text}>{baseData.faultWords}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>故障图片：</span>
                <div>
                  <ImagePicker
                    files={files}
                    onImageClick={(index, fs) => this.showModal(index, fs)}
                    selectable={false}
                    multiple={this.state.multiple}/>
                </div>
              </section>
            </div>
            <div className={styles.tabs_body}>
              <section>
                <span className={styles.tabs_item_label}>维修方式：</span>
                <span className={styles.tabs_item_text}>{baseData.rrpairType === '00'
                    ? '内修'
                    : baseData.rrpairType === '01'
                      ? '外修'
                      : ''}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>指派给：</span>
                <span className={styles.tabs_item_text}>{baseData.callDeptName}</span>
              </section>
              {/* <section>
                <span className={styles.tabs_item_label}>指派人：</span>
                <span className={styles.tabs_item_text}>张碧晨</span>
              </section> */}
              <section>
                <span className={styles.tabs_item_label}>指派时间：</span>
                <span className={styles.tabs_item_text}>{baseData.callTime}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>维修时间：</span>
                <span className={styles.tabs_item_text}>{baseData.callTime}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>期望完成：</span>
                <span className={styles.tabs_item_text}>{baseData.completTime}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>预计开始：</span>
                <span className={styles.tabs_item_text}>{baseData.callTime}</span>
              </section>
              <section>
                <span className={styles.tabs_item_label}>指派备注：</span>
                <span className={styles.tabs_item_text}>{baseData.tfRemarkZp}</span>
              </section>
            </div>
          </Tabs>
        </List>
        <ImageModal
          visible={this.state.visible}
          transparent={true}
          closable={true}
          maskClosable={true}
          onClose={() => this.setState({visible: false})}
          data={{
          src: this.state.src,
          equipmentName: baseData.equipmentStandardName,
          faultWords: baseData.faultWords
        }}/> {userType !== 'syks' && <div className={styles.list_bottom}>
          <div className={`${styles.right}`}>
            <Button
              type='primary'
              style={{
              borderRadius: 0
            }}
              onClick={() => alert('接修', '是否确认接修?', [
              {
                text: '否'
              }, {
                text: '是',
                onPress: () => this.updateFstate()
              }
            ])}>
              接修
            </Button>
          </div>
        </div>
}
      </div>
    )
  }
}

export default withRouter(connect(state => state, dispatch => ({
  setUser: user => dispatch(userService.setUserInfo(user)),
  setMenu: menu => dispatch(menuService.setMenu(menu)),
  setSessionId: id => dispatch(sessionService.setSessionId(id)),
  setCheckDetial: check => dispatch(operation.setCheckDetial(check))
}))(WaitForRepairDetail));