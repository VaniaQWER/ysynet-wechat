/**
 * @file 设备--验收完成
 */
import React, {PureComponent} from 'react';
import {
    Result,
    Icon,
    WhiteSpace,
    List,
    TextareaItem,
    Button
} from 'antd-mobile';
import {createForm} from 'rc-form';
import styles from './style.css';
const Item = List.Item;
class Evaluate extends PureComponent {
    submit = () => {}
    render() {
        const {getFieldProps} = this.props.form;
        return (
            <div className="result-example">
                <Result
                    img={< Icon type = "check-circle" className = {
                    styles['spe']
                }
                style = {{ fill: '#1F90E6' }}/>}
                    title="验收完成"/>
                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        {...getFieldProps('count', { initialValue: '', })}
                        rows={5}
                        placeholder='我的个人建议或意见....'
                        count={100}/>
                    <WhiteSpace/>
                    <Item>
                        <Button type="primary" onClick={this.submit}>确定</Button>
                    </Item>
                </List>
            </div>
        )
    }
}
export default createForm()(Evaluate);