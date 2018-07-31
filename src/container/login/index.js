/**
 * @file 设备--微信-登陆
 */
import React, {PureComponent} from 'react';
import { InputItem, Button, List, WingBlank, WhiteSpace, Toast } from 'antd-mobile';
import styles from './style.css';
import { loginBind } from '../../api/user';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
const Item = List.Item;
class LoginForm extends PureComponent{
    state = {
        loading: false,
        openId: null
    }
    async componentWillMount(){
        const { params } = this.props.match;
        let { openId } = params;
        this.setState({ openId });
    }
    async onClick () {
        const { history } = this.props;
        this.props.form.validateFields({ force: true }, async (error) => {
          if (!error) {
            this.setState({ loading: true });
            const values = this.props.form.getFieldsValue();
            values.openid =  this.state.openId;
            console.log(values,'values')
            const data = await loginBind({body: values, type: 'formData'});
            this.setState({ loading: false });
            let { userId, sessionId } = data.result;
            if(data.status && !data.result.err){
                Toast.success('登陆成功',2,()=>history.push({ pathname: `/workplace/${userId}/${sessionId}` }));
            }else{
                Toast.fail('登陆失败',2,()=>history.push({ pathname: `/error` }))
            }
            } 
        });
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
                                    <InputItem {...getFieldProps('name', {
                                            rules: [
                                            { required: true, message: '请输入工号' },
                                            ],
                                        })}
                                        clear
                                        error={!!getFieldError('name')}
                                        onErrorClick={() => {
                                            alert(getFieldError('name').join('、'));
                                        }}
                                        placeholder="请输入工号"
                                        >
                                    </InputItem>
                                </Item>
                                <WhiteSpace size='lg'/>
                                <Item thumb={require('../../assets/password.png')} className={styles.loginItem} >
                                    <InputItem {...getFieldProps('pwd', {
                                            rules: [
                                            { required: true, message: '请输入密码' },
                                            ],
                                        })}
                                        type={'password'}
                                        clear
                                        error={!!getFieldError('pwd')}
                                        onErrorClick={() => {
                                            alert(getFieldError('pwd').join('、'));
                                        }}
                                        placeholder="请输入密码"
                                        >
                                    </InputItem>
                                </Item>
                        </form>
                        <div className={styles.userRegfooter}>{(getFieldError('name') && getFieldError('name').join(','))||(getFieldError('pwd') && getFieldError('pwd').join(','))}</div>
                        <Button type='primary' size='large' 
                            className={styles['reg_btn']} 
                            onClick={()=>this.onClick()} 
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