/**
 * @file 设备--验收详情
 */
import React, {PureComponent} from 'react';
import {
    WhiteSpace,
    List,
    Tabs,
    Modal,
    Checkbox,
    Button,
    Toast,
    ImagePicker
} from 'antd-mobile';
import {selectOption, faultDescribeData} from '../../constants'
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {operation, user as userService, menu as menuService, session as sessionService} from '../../service'
import {queryDetail, updateCheckStatus} from '../../api/check';
import {pushMessage} from '../../api/assets'
import ImageModal from '../../component/imageModal'
import {FTP} from '../../api/_local'
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
const tabs = [
    {
        title: '维修信息'
    }, {
        title: '报修信息'
    }
];

class CheckDetail extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            loading: false,
            notCause: '',
            BaseInfoInfoData: {},
            userId: '',
            orderFstate: '', // 资产状态
            rrpairOrderGuid: '', //单据Guid
            userType: '',
            sessionId: '',
            files: [], //图片
            src: '',
            imgVisible: false
        }
    }
    async componentWillMount() {
        let {orderFstate, rrpairOrderGuid, userType, sessionId, userId} = this.state;
        if (!this.props.userReducer.userId) {
            const {params} = this.props.match;
            let {userId, orderFstate, sessionId, rrpairOrderGuid, userType} = params;
            this.setState({userId, orderFstate, sessionId, rrpairOrderGuid, userType});
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
                    BaseInfoInfoData: {
                        ...data.result.selectRrpairDetail,
                        ...data.result.selectRrpairDetailIsAcce,
                        ...data.result.selectRrpairDetailIsAssets,
                        ...data.result.selectRrpairDetailIsCall,
                        ...data.result.selectRrpairDetailIsOrder,
                        ...data.result.selectRrpairDetailIsRrpair
                    }
                })
            }
        } else {
            orderFstate = this.props.checkReducer.BaseInfoInfoData.orderFstate;
            rrpairOrderGuid = this.props.checkReducer.BaseInfoInfoData.rrpairOrderGuid;
            userType = this.props.userReducer.userInfo.groupName;
            sessionId = this.props.sessionReducer.session.sessionId;
            let {faultAccessory} = this.props.checkReducer.BaseInfoInfoData;
            this.setImgModal(faultAccessory)
            this.setState({
                orderFstate,
                rrpairOrderGuid,
                userType,
                userId,
                sessionId,
                BaseInfoInfoData: this.props.checkReducer.BaseInfoInfoData
            });
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

    //验收通过
    handOk = () => {
        alert('验收', '是否验收维修单？', [
            {
                text: '取消',
                onPress: () => console.log('取消'),
                style: 'default'
            }, {
                text: '确认',
                onPress: () => this.checkOk()
            }
        ])
    }
    showModal = (index, fs) => {
        this.setState({imgVisible: true, src: fs[index].url})
    }
    async checkOk() {
        const {history, setCheckParmas} = this.props;
        const pamars = {};
        pamars.rrpairOrderGuid = this.state.rrpairOrderGuid;
        pamars.rrAcceFstate = '65';
        /* pamars.sessionId = this.state.sessionId; */
        pamars.userId = this.state.userId;
        setCheckParmas(pamars);
        this.setState({loading: true});
        const data = await updateCheckStatus({body: pamars, type: 'formData'});
        this.setState({loading: false})
        if (data.status) {
            history.push({pathname: `/check/evaluate`});
            this.pushRepairMsg();
        } else {
            Toast.fail(data.msg, 2);
        }
    }
    async pushRepairMsg() {
        const {rrpairOrderGuid} = this.state;
        const data = await pushMessage({
            body: {
                rrpairOrderGuid: rrpairOrderGuid
            },
            type: 'fromData'
        });
        if (data.status) {
            console.log('推送成功');
        } else {
            console.log('出错啦....' + data.mag);
        }
    }
    //验收不通过
    handNotPass = (e) => {
        e.stopPropagation();
        this.setState({visible: true});
    }
    //验收不通过原因提交
    async optionSubmit() {
        if (!this.state.notCause) {
            Toast.fail('请选择验收不通过原因', 2);
        } else {
            const {history, setCheckParmas} = this.props;
            const pamars = {};
            pamars.rrpairOrderGuid = this.state.rrpairOrderGuid;
            pamars.rrAcceFstate = '66';
            pamars.notCause = this.state.notCause;
            /* pamars.sessionId = this.state.sessionId; */
            pamars.userId = this.state.userId;
            this.setState({loading: true});
            setCheckParmas(pamars);
            const data = await updateCheckStatus({body: pamars, type: 'formData'});
            this.setState({loading: false});
            if (data.status) {
                history.push({pathname: `/check/evaluate`});
                this.pushRepairMsg();
            } else {
                Toast.fail(data.msg, 2);
            }
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

    getColor = val => {
        switch (val) {
            case '02':
                return '#fadb14';
            case '01':
                return '#389e0d';
            default:
                return '#096dd9';
        }
    }
    showFstate = (val) => {
        switch (val) {
            case '10':
                return <span style={{
                    color: 'blue'
                }}>待接修</span>
            case '30':
                return <span style={{
                    color: 'green'
                }}>维修中</span>
            case '50':
                return <span style={{
                    color: 'orange'
                }}>待验收</span>
            default:
                return null
        }
    }
    render() {
        const {history} = this.props;
        const {
            visible,
            notCause,
            orderFstate,
            rrpairOrderGuid,
            userType,
            files
        } = this.state;
        const baseData = this.state.BaseInfoInfoData;
        const syks_btn = () => {
            return (
                <div className={styles.list_bottom}>
                    <div className={styles.btn_right}>
                        <a className={styles.checkBtn} onClick={this.handNotPass}>
                            <span>验收不通过</span>
                        </a>
                        <Button
                            type='primary'
                            inline
                            style={{
                            fontSize: 14,
                            borderTop: '1px solid #ffa000',
                            borderRadius: 0,
                            width: '50%'
                        }}
                            loading={this.state.loading}
                            onClick={this.handOk}>
                            验收通过
                        </Button>
                    </div>
                </div>
            )
        }
        const repair_btn = () => {
            return (
                <div className={styles.list_bottom}>
                    <div className={styles.btn_right}>
                        <Button
                            type='primary'
                            inline
                            style={{
                            borderRadius: 0,
                            width: '50%'
                        }}
                            onClick={() => history.push({pathname: `/startToRepair/stepOne/${rrpairOrderGuid}`})}>
                            开始维修
                        </Button>
                    </div>
                </div>
            )
        }
        return (
            <div className={styles.ysychat_content}>
                <List>
                    <Item multipleLine>
                        <span className={styles['span-bold']}>维修单号:</span>
                        <span className={styles['rep-No-span']}>{baseData.rrpairOrderNo}</span>
                        <span className={styles['fstate-span']}>{this.showFstate(orderFstate)}
                        </span>
                    </Item>
                    <WhiteSpace/>
                    <Item
                        multipleLine
                        arrow="horizontal"
                        onClick={() => history.push({pathname: `/check/assetsShow`, state: baseData})}>
                        <span style={{
                            fontWeight: 700
                        }}>
                            {baseData.equipmentStandardName}
                        </span>
                        {(baseData.guaranteeFlag !== undefined && baseData.guaranteeFlag !== null) && <span
                            className={styles.repair_tag_wrapper}
                            style={{
                            background: baseData.guaranteeFlag === '02'
                                ? '#ff4d4f'
                                : baseData.guaranteeFlag === '01'
                                    ? '#389e0d'
                                    : '#BEBEBE'
                        }}>
                            {baseData.guaranteeFlag === '01'
                                ? '在保'
                                : baseData.guaranteeFlag === '02'
                                    ? '出保'
                                    : ''}
                        </span>
}
                        <span
                            className={styles.repair_tag_wrapper}
                            style={{
                            background: this.getColor(baseData.useFstate)
                        }}>
                            {baseData.useFstate === '02'
                                ? '停用'
                                : baseData.useFstate === '01'
                                    ? '在用'
                                    : ''}
                        </span>
                        <Brief>
                            <span>型号:{baseData.spec}</span>
                            /
                            <span>规格: {baseData.fmodel}</span>
                            <br/>
                            <span>资产编号:
                            </span>
                            <span>{baseData.assetsRecord}</span>
                        </Brief>
                    </Item>
                    <WhiteSpace/>
                    <Tabs tabs={tabs} initialPage={0}>
                        <List>
                            <Item multipleLine>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>维修结果:</span>
                                    <span>{selectOption
                                            .repairResult
                                            .map((item) => item.value === baseData.repairResult
                                                ? item.text
                                                : '')}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>维修方式:</span>
                                    <span>{baseData.rrpairType === '00'
                                            ? '内修'
                                            : baseData.rrpairType === '01'
                                                ? '外修'
                                                : '暂无'}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>维修人:</span>
                                    <span>{baseData.rrpairType === '00'
                                            ? baseData.inRrpairUsername
                                            : baseData.outRrpairUsername}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>维修电话:</span>
                                    <span>{baseData.rrpairType === '00'
                                            ? baseData.inRrpairPhone
                                            : baseData.outRrpairPhone}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>维修时间:</span>
                                    <span>{baseData.repaireTime}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>故障类型:</span>
                                    <span>{selectOption
                                            .repairContentType
                                            .map((item) => item.value === baseData.repairContentType
                                                ? item.text
                                                : '')}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>故障原因:</span>
                                    <span>{selectOption
                                            .repairContentTyp
                                            .map((item) => item.value === baseData.repairContentTyp
                                                ? item.text
                                                : '')}</span>
                                </p>
                            </Item>
                            <Item
                                multipleLine
                                onClick={() => history.push({pathname: `/check/parts/${baseData.rrpairOrderGuid}`})}
                                extra={< span style = {{color:'red'}} > {
                                `${baseData.actualPrice === undefined || baseData.actualPrice === null
                                    ? ''
                                    : '￥' + baseData.actualPrice}`
                            } </span>}
                                arrow="horizontal">
                                <span className={styles['explain-span']}>维修费用</span>
                            </Item>
                            <WhiteSpace/>
                            <Item
                                extra={< span > {
                                `${baseData.actualPrice === undefined || baseData.actualPrice === null
                                    ? ''
                                    : '￥' + baseData.actualPrice}`
                            } </span>}>
                                <span className={styles['explain-span']}>配件费用</span>
                            </Item>
                        </List>
                        <List>
                            <Item multipleLine>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>紧急度:</span>
                                    <span>{selectOption
                                            .urgentFlag
                                            .map((item) => item.value === baseData.urgentFlag
                                                ? item.text
                                                : '')}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>备用:</span>
                                    <span>{selectOption
                                            .spare
                                            .map((item) => item.value === baseData.spare
                                                ? item.text
                                                : '')}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>故障信息:</span>
                                    <span>{this.handlefaultDescribeData(baseData.faultDescribe)}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>报修人:</span>
                                    <span>{baseData.rrpairUsername}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>报修部门:</span>
                                    <span>{baseData.deptName}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>报修时间:</span>
                                    <span>{baseData.createDate}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>送修:</span>
                                    <span>{baseData.rrpairSend === '01'
                                            ? '否'
                                            : '是'}</span>
                                </p>
                                <p className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>故障描述:</span>
                                    <span>{baseData.faultWords}</span>
                                </p>
                                <div className={styles['mb_12']}>
                                    <span className={styles['explain-span']}>故障图片:</span>
                                    <div>
                                        <ImagePicker
                                            files={files}
                                            onImageClick={(index, fs) => this.showModal(index, fs)}
                                            selectable={false}
                                            multiple={this.state.multiple}/>
                                    </div>
                                </div>
                            </Item>
                        </List>
                    </Tabs>
                </List>
                <ImageModal
                    visible={this.state.imgVisible}
                    transparent={true}
                    closable={true}
                    maskClosable={true}
                    onClose={() => this.setState({imgVisible: false})}
                    data={{
                    src: this.state.src,
                    equipmentName: baseData.equipmentStandardName,
                    faultWords: baseData.faultWords
                }}/>
                <Modal
                    popup
                    visible={visible}
                    onClose={() => this.setState({visible: false})}
                    animationType="slide-up">
                    <List renderHeader={() => <div>验收不通过</div>} className="popup-list">
                        <Item>
                            验收不通过后，本维修单将会关闭，是否继续？
                            <Brief>请选择验收不通过的原因：</Brief>
                        </Item>
                        {selectOption
                            .notCause
                            .map(i => (
                                <CheckboxItem
                                    checked={notCause === i.value}
                                    key={i.value}
                                    onChange={() => this.setState({notCause: i.value})}>
                                    {i.text}
                                </CheckboxItem>
                            ))
}
                        <Item>
                            <Button
                                type="primary"
                                onClick={this
                                .optionSubmit
                                .bind(this)}
                                loading={this.state.loading}>确定</Button>
                        </Item>
                    </List>
                </Modal>
                {(userType === 'syks' && orderFstate === '50')
                    ? syks_btn()
                    : (userType !== 'syks' && orderFstate === '30')
                        ?
                        //repair_btn()
                        null
                        : null
}

            </div>
        )
    }
}
export default withRouter(connect(state => state, dispatch => ({
    setUser: user => dispatch(userService.setUserInfo(user)),
    setMenu: menu => dispatch(menuService.setMenu(menu)),
    setSessionId: id => dispatch(sessionService.setSessionId(id)),
    setCheckParmas: parmas => dispatch(operation.setCheckParmas(parmas)),
    setCheckDetial: check => dispatch(operation.setCheckDetial(check))
}))(CheckDetail));