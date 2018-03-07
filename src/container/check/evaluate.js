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
    Button,
    Toast
} from 'antd-mobile';
import { updateCheckStatus } from '../../api/check'; 
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import styles from './style.css';
const Item = List.Item;
class Evaluate extends PureComponent {
    constructor(props){
        super(props)
        this.state = {
            tfRemark: '',
            loading: false
        }
    }
    async componentDidMount(){
        /* if(!this.props.checkParmasReducer.checkParmas.rrpairOrderGuid){
            const { history } = this.props;
            Toast.fail('没有权限',1,()=>history.push({pathname:'/workplace'}));
        } */
    }
    submit = () => {
        const parmas = this.props.checkParmasReducer.checkParmas;
        parmas.tfRemark =  this.state.tfRemark;
        this.addTfRemark(parmas);
    }
    async addTfRemark(val) {
        const { history } = this.props;
        this.setState({ loading: true });
        const data = await updateCheckStatus({ body: val,type: 'formData' });
        this.setState({ loading: false });
        if(data.status){
            Toast.success('操作成功',1, ()=>history.push({pathname:`/workplace/${val.userId}/${val.sessionId}`}));
        }else{
            Toast.fail(data.msg);
        }
    }
    render() {
        console.log(this.props,'render')
        return (
            <div className="result-example">
                <Result
                    img={< Icon type = "check-circle" className = {
                    styles['spe']
                }
                style = {{ fill: '#ffa000' }}/>}
                    title="验 收"/>
                <List renderHeader={() => '备注'}>
                    <TextareaItem
                        onBlur={(val)=> this.setState({tfRemark: val})}
                        defaultValue=''
                        rows={5}
                        placeholder='我的个人建议或意见....'
                        count={100}/>
                    <WhiteSpace/>
                    <Item>
                        <Button type="primary" onClick={this.submit} loading={this.state.loading}>确定</Button>
                    </Item>
                </List>
            </div>
        )
    }
}
export default withRouter(connect(state => state)(Evaluate));