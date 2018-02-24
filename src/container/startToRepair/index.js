import React, { PureComponent } from 'react';
import { Steps, List, WhiteSpace, Modal, Radio, Button, TextareaItem } from 'antd-mobile';
import { selectOption } from '../../constants';
import { withRouter } from 'react-router-dom';
/**
 * @file 开始维修
 */
const Step = Steps.Step;
const Item = List.Item;
const RadioItem = Radio.RadioItem;
const alert = Modal.alert;
class StartToRepair extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      resultVisible: false, // 维修结果弹出框
      repairContentVisible: false, // 故障类型弹出框
      repairContentTypVisible: false, // 故障原因弹出框
      repairResult: '', // 维修结果
      repairResultText: '', // 维修结果 - 文字描述
      repairContentType: '', // 故障类型
      repairContentTypeText: '', // 故障类型 - 文字描述
      repairContentTyp: '', // 故障原因
      repairContentTypText: ''// 维修原因 - 文字描述
    }
  }
  setValue = ( params  ) => {
    this.setState({
      ...params
    })
  }
  render() {
    const { resultVisible, repairResultText, repairContentTyp, repairContentTypText,
      repairContentType, repairContentVisible, repairContentTypVisible, 
      repairResult, repairContentTypeText } = this.state;
    return (
      <List className='repair_list'>
        <Item>
          <Steps direction="horizontal" size='lg' style={{marginTop: 20}}>
            <Step title="填写维修信息"/>
            <Step title="添加配件"/>
            <Step title="完成"/>
          </Steps>
        </Item>
        <WhiteSpace size='lg'/>
        <Item
          extra={'内修'}
        >
          维修方式
        </Item>  
        <WhiteSpace size='lg'/>
        <Item 
          arrow='horizontal' 
          onClick={() => this.setState({resultVisible: true})}
          extra={repairResultText}
        >
          维修结果
        </Item>  
        <WhiteSpace size='lg'/>
        <Item 
          arrow='horizontal'
          onClick={() => this.setState({repairContentVisible: true})}
          extra={repairContentTypeText}
        >
          故障类型
        </Item>  
        <WhiteSpace size='lg'/>
        <Item 
          arrow='horizontal'
          onClick={() => this.setState({repairContentTypVisible: true})}
          extra={repairContentTypText}
        >
          故障原因
        </Item>
        <WhiteSpace size='lg'/>
        <Item>
          <TextareaItem
            clear
            title={'维修备注'}
            rows={4}
          />  
        </Item>
        <WhiteSpace size='lg'/>
        <Item
          extra={<a href="tel:18607107725">18607107725</a>}
        >
          维修人电话
        </Item>
        <WhiteSpace size='lg'/>
        <Button type="primary" onClick={() => {
          alert('确定', '是否完成填写信息', [
            { text: '取消' },
            {
              text: '确认',
              onPress: () => {
                this.props.history.push({
                  pathname: '/startToRepair/stepTwo/100'
                })
              }
            },
          ])
        }}>下一步</Button>
        {/**
         * 维修结果弹层
         */}
        <Modal
          popup
          visible={resultVisible}
          onClose={() => this.setState({resultVisible: false})}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>维修结果</div>} className="popup-list">
          {
            selectOption.repairResult.map(i => (
              <RadioItem 
                key={i.value} 
                checked={repairResult === i.value} 
                onChange={() => this.setValue({
                  repairResult: i.value,
                  repairResultText: i.text
                })}
              >
                {i.text}
              </RadioItem>
            ))
          }
            <List.Item>
              <Button type="primary" onClick={() => this.setState({resultVisible: false})}>确定</Button>
            </List.Item>
          </List>
        </Modal>
        {
          /**
           * 故障类型弹层
           */
        }
        <Modal
          popup
          visible={repairContentVisible}
          onClose={() => this.setState({repairContentVisible: false})}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>故障类型</div>} className="popup-list">
          {
            selectOption.repairContentType.map(i => (
              <RadioItem 
                key={i.value} 
                checked={repairContentType === i.value} 
                onChange={() => this.setValue({
                  repairContentType: i.value,
                  repairContentTypeText: i.text
                })}
              >
                {i.text}
              </RadioItem>
            ))
          }
            <List.Item>
              <Button type="primary" onClick={() => this.setState({repairContentVisible: false})}>确定</Button>
            </List.Item>
          </List>
        </Modal>
        {
          /**
           * 故障原因弹层
           */
        }
        <Modal
          popup
          visible={repairContentTypVisible}
          onClose={() => this.setState({repairContentTypVisible: false})}
          animationType="slide-up"
        >
          <List renderHeader={() => <div>故障原因</div>} className="popup-list">
          {
            selectOption.repairContentTyp.map(i => (
              <RadioItem 
                key={i.value} 
                checked={repairContentTyp === i.value} 
                onChange={() => this.setValue({
                  repairContentTyp: i.value,
                  repairContentTypText: i.text
                })}
              >
                {i.text}
              </RadioItem>
            ))
          }
            <List.Item>
              <Button type="primary" onClick={() => this.setState({repairContentTypVisible: false})}>确定</Button>
            </List.Item>
          </List>
        </Modal>
      </List>
    )
  }
}

export default withRouter(StartToRepair);