/**
 * @file 设备--验收完成
 */
import React, { PureComponent } from 'react';
import { Result, Icon, WhiteSpace,NavBar,List,TextareaItem,Button  } from 'antd-mobile';
import { createForm } from 'rc-form';
import  styles from './style.css';
const Item = List.Item;
class Evaluate extends PureComponent{
    submit = ()=>{

    }
    render(){
        const { history } = this.props;
        const { getFieldProps } = this.props.form;
        return (<div>
            <NavBar
                className={'ysynet-header'}
                mode="dark"
                icon={<Icon type="left" />}
                onLeftClick={() => history.push({ pathname:`/check`})}
            >
            验收完成
            </NavBar>
            <div className="result-example">
                <Result
                    img={<Icon type="check-circle" className={styles['spe']} style={{ fill: '#1F90E6' }} />}
                    title="验收完成"
                />
                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        {...getFieldProps('count', {
                        initialValue: '',
                        })}
                        rows={5}
                        placeholder='我的个人建议或意见....'
                        count={100}
                    />
                    <WhiteSpace />
                    <Item>
                        <Button type="primary" onClick={this.submit}>确定</Button>
                    </Item>
                </List>

            </div>
            <WhiteSpace />
        </div>
        )
    }
}
export default createForm()(Evaluate);