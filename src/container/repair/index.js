/**
 * @file 设备-报修
 */
import React, { PureComponent } from 'react';
import { List, WhiteSpace, Radio, Modal, ImagePicker, InputItem, Toast, Switch,
  Checkbox, Button, TextareaItem } from 'antd-mobile';  
import { createForm } from 'rc-form';  
import { selectOption } from '../../constants';
import styles from './style.css';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compressImage } from '../../utils';
import { operation } from '../../service';
import { queryAssets } from '../../api/repair';
const Item = List.Item;
const Brief = Item.Brief;
const CheckboxItem = Checkbox.CheckboxItem;
const alert = Modal.alert;

class RepairForm extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      assetsRecord: {
        rrpairOrderGuid: '',
        assetsRecord: '', //资产编号
        equipmentName: '', // 资产名称
        fmodel: '', // 型号
        spec: '',// 规格
        useFstate: '',// 是否在用
        guaranteeFlag: '',// 是否在用
        deposit: ''
      },
      useFstate: '', // 是否在用 - checkbox
      urgentFlag: '', // 紧急度
      spare: '', // 备用
      failCause: '', // 故障描述 文字
      faultDescribe: [], // 故障描述
      visible: false, // 选择层 modal
      files: [], // 展示图片
      submitFiles:[], // 提交图片
      imageVisible: false, // 图片 modal
      faultDescribeText: '', // 故障描述  - text
      rrpairPhone: '' // 维修电话
    }
  }
  onSubmit = () => {
    alert('报修', '是否确认报修', [
      { text: '取消' },
      {
        text: '确认',
        onPress: () => {
          console.log(this.state)
        }
      },
    ])
  }
  getPostData = () => {

  }
  goDetail = () => {
    const { history, setRepair, form } = this.props;
    const { useFstate, file, spare, urgentFlag, assetsRecord, faultDescribe, files, faultDescribeText } = this.state;
    history.push({
      pathname: `/repair/detail/${assetsRecord.assetsRecordGuid}`
    })
    setRepair({
      useFstate, file, spare, urgentFlag, assetsRecord, faultDescribe, files, faultDescribeText,
      ...form.getFieldsValue()
    });
  }
  optionSubmit = () => {
    const { faultDescribe } = this.state;
    let desc = '';
    selectOption.faultDescribe.map(item => (
      faultDescribe.includes(item.value) ? desc += `${item.text}，` : desc += ''
    ))
    this.setState({
      visible: false,
      faultDescribeText: desc.substring(0, desc.length - 1)
    })
  }
  onChange = (key, value) => this.setState({[key]: value})
  imageUpdate = (files, type, index) => {
    const len = files.length - 1;
    const { submitFiles } = this.state;
    if (type === 'add') {
      compressImage(files[len], newImgData => {
        this.setState({ files, submitFiles: [...submitFiles, newImgData]});
      })
    } else {
      submitFiles.splice(index, 1);
      this.setState({ files, submitFiles: submitFiles});
    }
  }
  onSelect = val => {
    const { faultDescribe } = this.state;
    if (faultDescribe.length === 0) {
      this.setState({faultDescribe: [ val ]})
    } else {
      let index = null;
      for (let i=0; i<faultDescribe.length; i++) {
        if (faultDescribe[i] === val) { 
          index = i;
          break;
        } else { 
          index = null;
        }  
      }
      if (index === null) {
        this.setState({faultDescribe: [...faultDescribe, val]})
      } else {
        faultDescribe.splice(index, 1);
        this.setState({faultDescribe: [...faultDescribe]})
      }
    }
  }
  async componentWillMount() {
    const { id } = this.props.match.params;
    const { repairReducer } = this.props;
    if (id && !repairReducer.assetsRecord.assetsRecordGuid) {
      const data = await queryAssets({body: {rrpairOrderGuid: id}});
      if (data.status && data.result) {
        this.setState({ assetsRecord: data.result })
      }
    } else if (repairReducer.assetsRecord.assetsRecordGuid) {
      this.setState({ ...repairReducer })
    }else {
      Toast.fail('没有访问该页面权限', 1);
      this.props.history.push({
        pathname: '/workplace'
      })
    }
  }
  getColor = val => {
    switch (val) {
      case '维修':
        return '#fadb14';
      case '闲置':
        return '#389e0d';
      case '在用':
        return '#08979c';
      default:
        return '#096dd9';
    }
  }
  render() {
    const { useFstate, urgentFlag, spare, faultDescribeText, assetsRecord, rrpairPhone, failCause,
      faultDescribe, visible, files, imageVisible, imgSrc, rrpairSend } = this.state;
    const { getFieldProps } = this.props.form;
    return (
      <List className={'repair_list'}>
        <Item multipleLine extra="详情" arrow="horizontal" onClick={this.goDetail}>
          { assetsRecord.equipmentName } 
          <span 
            className={styles.repair_tag_wrapper}
            style={{background: assetsRecord.guaranteeFlag === '出保' ? '#ff4d4f' : '#389e0d'}}
          >
            { assetsRecord.guaranteeFlag }
          </span>
          <span className={styles.repair_tag_wrapper} style={{background: this.getColor(assetsRecord.useFstate)}}>
            { assetsRecord.useFstate }
          </span>
          <Brief>
            <div>规格: { assetsRecord.spec }</div>
            <div>型号: { assetsRecord.fmodel }</div>
          </Brief>
        </Item>
        <WhiteSpace size="sm"/>
        <Item>
          <div className={styles.card_item}>
            <span>设备状态</span>
            <span>
              {
                selectOption.useFstate.map(i => (
                  <Radio 
                    style={{marginRight: 20, color: '#595959'}}
                    className='repair_radio' 
                    key={i.value}
                    checked={ i.value === useFstate } 
                    onChange={() => this.onChange('useFstate', i.value)}
                  >
                    {i.text}
                  </Radio>
                ))
              }
            </span>
          </div>
        </Item>
        <WhiteSpace size="sm"/>
        <Item>
          <div className={styles.card_item}>
            <span>紧急度</span>
            <span>
            {
              selectOption.urgentFlag.map(i => (
                <Radio 
                  checked={ i.value === urgentFlag } 
                  style={{marginRight: 20, color: '#595959'}}
                  className={`repair_radio`}
                  key={i.value} 
                  onChange={() => this.onChange('urgentFlag', i.value)}
                >
                  {i.text}
                </Radio>
              ))
            }
            </span>
          </div>
        </Item>
        <WhiteSpace size="sm"/>
        <Item>
          <div className={styles.card_item}>
            <span className={styles.card_item_label}>备用</span>
            <span className={styles.card_item_content}>
              {
                selectOption.spare.map(i => (
                  <Radio 
                    checked={ i.value === spare } 
                    style={{marginRight: 20, color: '#595959'}}
                    className='repair_radio' 
                    key={i.value} 
                    onChange={() => this.onChange('spare', i.value)}
                  >
                    {i.text}
                  </Radio>
                ))
              }
            </span>  
          </div>  
        </Item>
        <WhiteSpace size="sm"/>
        <Item 
          multipleLine 
          extra={faultDescribeText} 
          arrow="horizontal"
          onClick={() => this.setState({visible: true})}
        >  
          故障现象   
        </Item>
        <WhiteSpace size="sm"/>
        <Item 
          style={{padding: 0}}
        >  
          <TextareaItem
            {...getFieldProps('failCause', {
              initialValue: failCause
            })}  
            title={'故障描述'}
            placeholder='请输入故障描述'
            autoHeight
            labelNumber={5}
          />  
        </Item>
        <WhiteSpace size="sm"/>
        <Item
        >  
          故障图片(至多3张)
          <ImagePicker
            files={files}
            onChange={this.imageUpdate}
            onImageClick={(index, fs) => this.setState({imageVisible: true, imgSrc: fs[index].url })}
            selectable={files.length < 3}
            accept="image/gif,image/jpeg,image/jpg,image/png"
            />
        </Item>
        <WhiteSpace size="sm"/>
        <Item 
        >  
          <div className={styles.card_item}>
            <span className={styles.card_item_label}>维修地址</span>
            <span className={styles.card_item_content}> { assetsRecord.deposit } </span>
          </div>  
        </Item>
        <WhiteSpace size="sm"/>
        <Item 
          style={{padding: 0}}
        >  
          <InputItem
            {...getFieldProps('rrpairPhone', {
              initialValue: rrpairPhone
            })}
            placeholder="输入联系电话"
            clear
            moneyKeyboardAlign="left"
          >联系电话</InputItem>
        </Item>
        <Item extra={<Switch
          {...getFieldProps('rrpairSend', {
            initialValue: rrpairSend,
            valuePropName: 'checked',
          })}
          platform="ios"
          />}>  
          是否送修
        </Item>
        <Modal
          className={styles.modalImage}   
          visible={imageVisible}
          onClose={() => this.setState({imageVisible: false})}
          transparent
          closable={true}
        >
          <img src={imgSrc} alt='图片预览' style={{height: 480, width: 240}}/>
        </Modal>
        <Modal
          popup
          visible={visible}
          onClose={() => this.setState({visible: false})}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>故障现象(可多选)</div>} className="popup-list">
          {
            selectOption.faultDescribe.map(i => (
              <CheckboxItem
                checked={faultDescribe.includes(i.value)} 
                key={i.value} 
                onChange={() => this.onSelect(i.value)}
              >
                {i.text}
              </CheckboxItem>
            ))
          }
            <List.Item>
              <Button type="primary" onClick={this.optionSubmit}>确定</Button>
            </List.Item>
          </List>
        </Modal>
        <WhiteSpace size="sm"/>
        <Button type="primary" onClick={this.onSubmit}>报修</Button>
      </List>
    )
  }
}
const Repair = createForm()(RepairForm);
export default withRouter(connect(state => state, dispatch => ({
  setRepair: repair => dispatch(operation.setRepair(repair))
}))(Repair));
