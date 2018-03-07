import React, { PureComponent } from 'react';
import { WingBlank,WhiteSpace, Button } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './style.css';
class Construct extends PureComponent{
    constructor(props){
        super(props)
        this.state = {
            userId: '',
            sessionId: ''
        }
    }
    async componentWillMount(){
        const { userId } = this.props.userReducer.userInfo;
        const { sessionId } = this.props.sessionReducer.session;
        this.setState({ userId,sessionId })
    }
    render() {
        const { history }  = this.props;
        const { userId, sessionId } = this.state;
        return (
            <div className={styles.construct}>
                <div>
                     <p style={{textAlign:'center',fontSize:20,margin:'20px 0 40px'}}>页面正在建设中.....</p>
                     <div className={styles.result}></div>
                </div>
                <WhiteSpace size='md'/>
                <WingBlank size='md'>
                    <Button type='primary' style={{marginTop:50}} onClick={()=>history.push({ pathname: `/workplace/${userId}/${sessionId}` })}>返回</Button>
                </WingBlank>
            </div>
        )
    }
}
/* export default Construct; */
export default withRouter(connect(state => state)(Construct));