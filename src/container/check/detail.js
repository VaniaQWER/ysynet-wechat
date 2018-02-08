/**
 * @file 设备--验收详情
 */
import React, { PureComponent } from 'react';
import { WhiteSpace, List, Tabs, Modal,Checkbox,Button } from 'antd-mobile';
import { repairData, selectOption } from '../../constants'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { operation } from '../../service'
import styles from './style.css';
const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
class CheckDetail extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          visible: false,
          notCause: '',
          checkList: {}
        }
    }
    //验收通过
    handOk = ()=>{

    }
    //验收不通过
    handNotPass = ()=>{
        this.setState({ visible: true })
    }
    //验收不通过原因提交
    optionSubmit = ()=>{
        const { history } = this.props;
        console.log(this.state.notCause,'不通过原因');
        history.push({ pathname:`/check/evaluate` })
    }
    render(){
        const { history } = this.props;
        const { visible, notCause } = this.state;
        const tabs = [
            { title: '维修信息' },
            { title: '报修信息' }
          ];
        const baseData = this.props.location.state;
        console.log(baseData,'baseData')
        return (<div>
            <div className={'ysychat-content'}>
                <List>
                    <Item multipleLine extra={<span style={{color:repairData[baseData.orderFstate].color}}>{repairData[baseData.orderFstate].text}</span>}>
                        <p>维修单号: <span>{baseData.rrpairOrderNo}</span></p>
                    </Item>
                    <WhiteSpace />
                    <Item multipleLine arrow="horizontal" onClick={()=>history.push({ pathname:`/check/assetsShow` })}>
                        <p>{baseData.equipmentStandardName}</p>
                        <Brief>
                            <p style={{paddingTop : 5 }}>型号/规格: <span>{baseData.spec}</span></p>
                            <p style={{paddingTop : 5 }}>资产编号:  <span>{baseData.assetsRecord}</span></p>
                        </Brief>
                    </Item>
                    <WhiteSpace />
                        <Tabs tabs={tabs} initialPage={0}>
                            <div className={'repaireInfo'}>
                                <List>
                                    <Item multipleLine>
                                        <p className={styles['mb_12']}>维修结果:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>维修方式:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>维修人:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>维修电话:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>维修时间:<span>{baseData.repaireTime}</span></p>
                                        <p className={styles['mb_12']}>故障类型:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>故障原因:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                    </Item>
                                    <Item multipleLine 
                                        onClick={()=>history.push({ pathname:`/check/parts/${baseData.RN}` })}
                                        extra={<span style={{color:'red'}}>{`￥${baseData.TotalMoney.toFixed(2)}`}</span>} arrow="horizontal">
                                        维修费用
                                    </Item>
                                    <WhiteSpace />
                                    <Item extra={<span>{`￥${baseData.TotalMoney.toFixed(2)}`}</span>}>
                                        配件费用
                                    </Item>
                                </List>
                            </div>
                            <div className={'orderInfo'}>
                                <List>
                                    <Item multipleLine>
                                        <p className={styles['mb_12']}>紧急度:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>备用:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>故障信息:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>报修人:<span>{baseData.repaireTime}</span></p>
                                        <p className={styles['mb_12']}>报修部门:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>报修时间:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>送修:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                        <p className={styles['mb_12']}>故障描述:<span>{selectOption.repairResult.map((item)=>item.value===baseData.repairResult?item.text:'')}</span></p>
                                    </Item>
                                </List>
                            </div>
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
                            checked={notCause.includes(i.value)} 
                            key={i.value} 
                            onChange={(val) => this.setState({ notCause: val })}
                        >
                            {i.text}
                        </CheckboxItem>
                        ))
                    }
                        <Item>
                            <Button type="primary" onClick={this.optionSubmit}>确定</Button>
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
        </div>
        )
    }
}
export default withRouter(connect(state => state, dispatch => ({
    setRepair: repair => dispatch(operation.setRepair(repair))
  }))(CheckDetail));