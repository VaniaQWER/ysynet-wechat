/**
 * @file 下滑刷新 - 组件二次封装
 */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { PullToRefresh, ListView } from 'antd-mobile';
import promiseRequest from '../../utils/promise_request'

const NUM_ROWS = 20;
let pageIndex = 0;

class ListViewScroll extends PureComponent {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      data: [],
      dataSource,
      refreshing: true,
      isLoading: true,
      height: document.documentElement.clientHeight
    };
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }
  async genData (pIndex = 0) {
    const dataArr = [];
    const promiseData = await promiseRequest('getRepairRecordList', {
      body: {
        pagesize: NUM_ROWS,
        page: pIndex,
        ...this.props.queryParams
      }
    });
    const data = promiseData.result;
    for (let i = 0; i < data.length; i++) {
      dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    this.setState({ data });
    return dataArr;
  }
  componentDidUpdate() {
    document.body.style.overflow = 'hidden';
  }
  async componentDidMount() {
    const hei = this.state.height - ReactDOM.findDOMNode(this.lv).offsetTop;
    this.rData = await this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      height: hei,
      refreshing: false,
      isLoading: false,
    })
  }

  async onRefresh () {
    this.setState({ refreshing: true, isLoading: true });
    this.rData = await this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      refreshing: false,
      isLoading: false,
    })
  };

  async onEndReached (event) {
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    const newData = await this.genData(++pageIndex);
    this.rData = [...this.rData, ...newData];
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      isLoading: false,
    });
  };

  render() {
    const { data } = this.state;
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <this.props.item {...obj}/>
      );
    };
    return (
      <ListView
        key={'1'}
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完成'}
        </div>)}
        renderRow={row}
        style={{
          minHeight: '100vh',
          height: this.state.height,
          border: '1px solid #ddd',
          margin: '5px 0',
        }}
        pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
        onEndReached={this.onEndReached}
        pageSize={5}
      />
    );
  }
}

export default ListViewScroll;
