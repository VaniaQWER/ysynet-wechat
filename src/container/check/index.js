/**
 * @file 设备--验收
 */
import React, { PureComponent } from 'react';
import { WhiteSpace} from 'antd-mobile';
import { checkList } from '../../constants';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { operation } from '../../service'
import  CardItem  from '../../component/card';
class MyCheckList extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
          checkList: {}
        }
    }
    onClick = (record)=>{
        const { history } = this.props;
        history.push({ pathname:`/check/detail/${record.RN}`,state: record });
    }
    render(){
        return (
            <div>
                {
                    checkList.map((item,index)=>{
                        return (
                        <div key={index}>
                                <CardItem data={item} onClick={this.onClick}/>
                                <WhiteSpace  size="sm" />
                            </div>)
                    })
                }
            </div>
        )
    }

}
export default withRouter(connect(state => state, dispatch => ({
    setRepair: repair => dispatch(operation.setRepair(repair))
  }))(MyCheckList));