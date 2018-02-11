/**
 * @file 设备--验收详情
 */
import React, { PureComponent } from 'react';
import { WhiteSpace, List, Tabs, Modal,Checkbox,Button,Toast } from 'antd-mobile';
import { selectOption } from '../../constants'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { operation } from '../../service'
import { queryDetail, updateCheckStatus } from '../../api/check';
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;
class CheckDetail extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          visible: false,
          loading: false,
          notCause: '',
          BaseInfoInfoData:{}
        }
    }
    async componentWillMount(){
        console.log(this.props.checkReducer,'reduce')
        const { id } = this.props.match.params;
        const { checkReducer } = this.props;
        if(id && !checkReducer.BaseInfoInfoData.assetsRecordGuid){
            const data = await queryDetail({body: {rrpairOrderGuid : id },type:'1'});
            if(data.status){
                this.setState({BaseInfoInfoData:{
                    ...data.result.selectRrpairDetailIsAcce,
                    ...data.result.selectRrpairDetailIsAssets,
                    ...data.result.selectRrpairDetailIsCall,
                    ...data.result.selectRrpairDetailIsOrder,
                    ...data.result.selectRrpairDetailIsRrpair,
                    ...this.props.location.state
                } })
            }
        }else if(checkReducer.BaseInfoInfoData.assetsRecordGuid){
            this.setState({BaseInfoInfoData: checkReducer.BaseInfoInfoData });
        }
    }
    //验收通过
    handOk = ()=>{
        alert('验收','是否确认收货？',[
            { text: '取消', onPress: () => console.log('取消'), style: 'default' },
            { text: '确认', onPress: () => console.log('确认') },
          ])
    }
    //验收不通过
    handNotPass = ()=>{
        this.setState({ visible: true })
    }
    //验收不通过原因提交
    async optionSubmit () {
        if(!this.state.notCause){
            Toast.fail('请选择验收不通过原因',2);
        }else{
            const { history } = this.props;
            const pamars = {};
            pamars.rrpairOrderGuid = this.props.location.state.rrpairOrderGuid;
            pamars.rrAcceFstate = '66';
            pamars.notCause = this.state.notCause;
            this.setState({ loading: true });
            const data = await updateCheckStatus({body : pamars,type:'type'});
            this.setState({ loading: false });
            if(data.status){
                history.push({ pathname:`/check/evaluate` })
            }else{
                Toast.fail(data.msg, 2);
            }
        }
    }
    render(){
        const { history } = this.props;
        const { visible, notCause } = this.state;
        const tabs = [
            { title: '维修信息' },
            { title: '报修信息' }
          ];
        const baseData = this.state.BaseInfoInfoData;
        console.log(baseData,'baseData');
        console.log(this.props,'props')
        return (
            <div className={'ysychat-content'}>
                <List>
                    <Item multipleLine extra={<span className={styles['fstate-span']}>待验收</span>}>
                        <span className={styles['span-bold']}>维修单号: </span><span className={styles['rep-No-span']}>{baseData.rrpairOrderNo}</span>
                    </Item>
                    <WhiteSpace />
                    <Item multipleLine arrow="horizontal" onClick={()=>history.push({ pathname:`/check/assetsShow`,state:baseData })}>
                        <span>{baseData.equipmentStandardName}</span>
                        <Brief>
                            <span>型号/规格: </span><span>{baseData.spec}</span>
                            <br/>
                            <span>资产编号: </span><span>{baseData.assetsRecord}</span>
                        </Brief>
                    </Item>
                    <WhiteSpace />
                        <Tabs tabs={tabs} initialPage={0}>
                            <List>
                                <Item multipleLine>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>维修结果:</span><span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>维修方式:</span><span>{baseData.rrpairType==='00'?'内修':baseData.rrpairType==='01'?'外修':'暂无'}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>维修人:</span><span>{baseData.rrpairType==='00'?baseData.inRrpairUsername:baseData.outRrpairUsername}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>维修电话:</span><span>{baseData.rrpairType==='00'?baseData.inRrpairUsername:baseData.outRrpairPhone}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>维修时间:</span><span>{baseData.repaireTime}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>故障类型:</span><span>{selectOption.repairContentType.map((item)=>item.value===baseData.repairContentType?item.text:'')}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>故障原因:</span><span>{selectOption.repairContentTyp.map((item)=>item.value===baseData.repairContentTyp?item.text:'')}</span></p>
                                </Item>
                                <Item multipleLine 
                                    onClick={()=>history.push({ pathname:`/check/parts/${baseData.rrpairOrderGuid}` })}
                                    extra={<span style={{color:'red'}}>{`￥${180}`}</span>} arrow="horizontal">  
                                    <span className={styles['explain-span']}>维修费用</span>
                                </Item>
                                <WhiteSpace />
                                <Item extra={<span>{`￥${180}`}</span>}>
                                    <span className={styles['explain-span']}>配件费用</span>
                                </Item>
                            </List>
                            <List>
                                <Item multipleLine>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>紧急度:</span> <span>{selectOption.urgentFlag.map((item)=>item.value===baseData.urgentFlag?item.text:'')}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>备用:</span> <span>{selectOption.spare.map((item)=>item.value===baseData.spare?item.text:'')}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>故障信息:</span> <span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>报修人:</span> <span>{baseData.rrpairUsername}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>报修部门:</span> <span>{baseData.deptName}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>报修时间:</span> <span>{baseData.createDate}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>送修:</span> <span>{selectOption.rrpairSend.map((item,ind)=>item.value===baseData.rrpairSend?item.text:'')}</span></p>
                                    <p className={styles['mb_12']}><span className={styles['explain-span']}>故障描述:</span> <span>{baseData.failCause}</span></p>
                                </Item>
                            </List>
                        </Tabs>
                </List>
                <Modal
                    popup
                    visible={visible}
                    onClose={() => this.setState({visible: false})}
                    animationType="slide-up"
                    >
                    <List renderHeader={() => <div>验收不通过</div>} className="popup-list">
                        <Item>
                            验收不通过后，本维修单将会关闭，是否继续？
                            <Brief>请选择验收不通过的原因：</Brief>
                        </Item>
                    {
                        selectOption.notCause.map(i => (
                        <CheckboxItem
                            checked={notCause === i.value} 
                            key={i.value} 
                            onChange={() => this.setState({ notCause: i.value})}
                        >
                            {i.text}
                        </CheckboxItem>
                        ))
                    }
                        <Item>
                            <Button type="primary" onClick={this.optionSubmit.bind(this)} loading={this.state.loading}>确定</Button>
                        </Item>
                    </List>
                    </Modal>
                    <div className={styles['ysynet-detail-foot']}>
                        <div className={styles['foot-button']}>
                            <a className={styles['btn-cancel']} onClick={this.handNotPass}>验收不通过</a>
                            <a className={styles['btn-submit']} onClick={this.handOk}>验收通过</a>
                        </div>
                    </div>
            </div>
        )
    }
}
export default withRouter(connect(state => state, dispatch => ({
    setCheckDetial: check => dispatch(operation.setCheckDetial(check))
  }))(CheckDetail));