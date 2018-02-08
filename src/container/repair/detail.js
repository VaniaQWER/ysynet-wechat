/**
 * @file 设备-报修详情
 */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class RepairDetail extends PureComponent {
  componentDidMount() {
    console.log(this.props)
  }
  
  render() {
    return (
      <div>报修详情</div>
    )
  }
}
export default connect(state => state)(RepairDetail);