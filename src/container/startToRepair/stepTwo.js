import React, { PureComponent } from 'react';
import { List, Steps, SwipeAction, WhiteSpace, Switch, InputItem } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { createForm } from 'rc-form';
import styles from './style.css';
/**
 * @file 接修 - 步骤2
 */
const Item = List.Item;
const Step = Steps.Step;
const getPartsComponent = parts => (
  parts.map((item, i) => (
    <SwipeAction
      key={i}
      style={{ backgroundColor: 'gray' }}
      autoClose
      right={[
        {
          text: '取消',
          style: { backgroundColor: '#ddd', color: 'white', width: 50 },
        },
        {
          text: '删除',
          onPress: () => alert(`删除-${item.id}`),
          style: { backgroundColor: '#F4333C', color: 'white', width: 50 },
        }
      ]}
    >
      <Item arrow='horizontal'>
        { item.text }
      </Item>
    </SwipeAction>
  ))
)
class StepTwo extends PureComponent {
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <List className='repair_list'>
        <Item>
          <Steps direction="horizontal" size='lg' style={{marginTop: 20}} current={1}>
            <Step title="填写维修信息"/>
            <Step title="添加配件"/>
            <Step title="完成"/>
          </Steps>
        </Item>
        <WhiteSpace size='lg'/>
        {
          getPartsComponent([
            { text: '配件1配件1配件1配件1配件1', value: '1001' },
            { text: '配件2', value: '1002' },
          ])
        }
        <div className={styles.plus_container} onClick={() => this.props.history.push({
          pathname: '/startToRepair/stepTwo/addParts/100'
        })}>+</div>
        <Item>
          配件总数：99    总金额：9999.99
        </Item>
        <WhiteSpace size='lg'/>
        <Item>
          <InputItem
            {...getFieldProps('money2', {
              normalize: (v, prev) => {
                if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                  if (v === '.') {
                    return '0.';
                  }
                  return prev;
                }
                return v;
              },
            })}
            type={'money'}
            placeholder="输入金额"
            ref={el => this.customFocusInst = el}
            clear
          >其他费用</InputItem>
        </Item>
        <WhiteSpace size='lg'/> 
        <Item
          extra={<Switch
            {...getFieldProps('Switch1', {
              initialValue: true,
              valuePropName: 'checked',
            })}
            onClick={(checked) => { console.log(checked); }}
          />}
        >
          配件费用计入维修金额
        </Item>
      </List>
    )
  }
}

export default createForm()(withRouter(StepTwo));