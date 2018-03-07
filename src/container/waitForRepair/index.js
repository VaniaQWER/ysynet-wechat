import React, { PureComponent } from 'react';
import {
  Tabs,
  Toast
} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {operation} from '../../service'
import CardItem from '../../component/card';
import {queryDetail} from '../../api/check';
import ListViewScroll from '../../component/listViewScroll';
import assets from '../../api/assets'
/**
 * @file 待接修
 */
class WaitForRepair extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        url: assets.selectRrpairList
    }
  }
  async onClick(record) {
    const {history} = this.props;
    const data = await queryDetail({
        body: {
            rrpairOrderGuid: record.rrpairOrderGuid
        },
        type: '1'
    });
    if (data.status) {
        this
            .props
            .setCheckDetial({
                BaseInfoInfoData: {
                    ...data.result.selectRrpairDetailIsAcce,
                    ...data.result.selectRrpairDetailIsAssets,
                    ...data.result.selectRrpairDetailIsCall,
                    ...data.result.selectRrpairDetailIsOrder,
                    ...data.result.selectRrpairDetailIsRrpair,
                    ...record
                }
            });
        Toast.loading('加载中....', 1, () => {
            record.orderFstate==='10'?
            history.push({pathname: `/waitForRepair/detail`, state: record})
            :
            history.push({pathname: `/startToRepair/stepOne/100`, state: record});

        })
    }
  }
  render() {
    const tabs = [
        {
            title: '待接修'
        }, {
            title: '维修中'
        }
    ];
    return (
      <div>
        <Tabs tabs={tabs} initialPage={0}>
          <ListViewScroll
            url={this.state.url}
            queryParams={{
            orderFstate: '10'
          }}
            item= {
              obj => {
              return <CardItem
              orderFstate={'10'}
              data={obj}
              onClick={this
              .onClick
              .bind(this)}/>
            }}
          />
          <ListViewScroll
            url={this.state.url}
            queryParams={{
            orderFstate: '30'
          }}
            item= {
              obj => {
              return <CardItem
              orderFstate={'30'}
              data={obj}
              onClick={this
              .onClick
              .bind(this)}/>
            }}
          />
        </Tabs>
        
      </div>
    )
  }
}

// export default WaitForRepair;
export default withRouter(connect(state => state, dispatch => ({
  setCheckDetial: check => dispatch(operation.setCheckDetial(check))
}))(WaitForRepair));