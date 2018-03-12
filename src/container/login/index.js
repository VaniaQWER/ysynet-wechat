/**
 * @file 设备--微信-登陆
 */
import React, { Component } from 'react';
import { InputItem, Button,List,WingBlank,WhiteSpace,Toast } from 'antd-mobile';
import styles from './style.css';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
const Item = List.Item;
class LoginForm extends Component{
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            userId: '',
            sessionId: ''
        }
    }
    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
          if (!error) {
            let { userId, sessionId } = this.state;
            const { history } = this.props;
            this.setState({ loading: true });
            setTimeout(()=>{
                this.setState({ loading: false });
                Toast.fail('您当前没有权限，不能成为我们的用户')
                },
             1000);
            } 
        });
    }
    async componentWillMount(){
        const { params } = this.props.match;
        let { userId,sessionId } = params;
        this.setState({ userId, sessionId });
    }
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div className={styles['welcome']}>
                <WingBlank>
                        <div className={styles['logo']}></div>
                        <form>
                            <div className={styles.userRegHeader}>用户登陆</div>
                                <Item thumb={require('../../assets/username.png')} className={styles.loginItem}>
                                    <InputItem {...getFieldProps('account', {
                                            rules: [
                                            { required: true, message: '请输入工号' },
                                            ],
                                        })}
                                        clear
                                        error={!!getFieldError('account')}
                                        onErrorClick={() => {
                                            alert(getFieldError('account').join('、'));
                                        }}
                                        placeholder="请输入工号"
                                        >
                                    </InputItem>
                                </Item>
                                <WhiteSpace size='lg'/>
                                <Item thumb={require('../../assets/password.png')} className={styles.loginItem} >
                                    <InputItem {...getFieldProps('password', {
                                            rules: [
                                            { required: true, message: '请输入密码' },
                                            ],
                                        })}
                                        type={'password'}
                                        clear
                                        error={!!getFieldError('password')}
                                        onErrorClick={() => {
                                            alert(getFieldError('password').join('、'));
                                        }}
                                        placeholder="请输入密码"
                                        >
                                    </InputItem>
                                </Item>
                        </form>
                        <div className={styles.userRegfooter}>{(getFieldError('account') && getFieldError('account').join(','))||(getFieldError('password') && getFieldError('password').join(','))}</div>
                        <Button type='primary' size='large' 
                            className={styles['reg_btn']} 
                            onClick={this.onSubmit} 
                            loading={this.state.loading}>
                            登陆系统
                        </Button>
                        <div className={styles.footMsg}>注：第一次访问，请输入您在医院系统中的工号和密码，下次访问将直接登陆</div>
                </WingBlank>  
        </div>
        )
    }
}
const LoginFormWrapper = createForm()(LoginForm)
export default withRouter(connect(state => state)(LoginFormWrapper));