import React, { PureComponent } from 'react';
import { ListView } from 'antd-mobile';
import ReactDOM from 'react-dom';
import promiseRequest from '../../utils/promise_request'
const NUM_ROWS = 2;
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
      isLoading: true,
      height: document.documentElement.clientHeight
    };
    this.onEndReached = this.onEndReached.bind(this);
  }
  async genData (pIndex = 0) {
    const dataArr = [];
    const promiseData = await promiseRequest(`${this.props.url}`, {
      body: {
        pagesize: NUM_ROWS,
        page: pIndex + 1,
        ...this.props.queryParams
      },
      type:'formData'
    });
    const data = promiseData.result.rows || promiseData.result;
    for (let i = 0; i < data.length ; i++) {
      dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
    }
    this.setState({ data });
    return dataArr;
  }
  componentDidUpdate() {
    document.body.style.overflow = 'hidden';
  }

  async componentDidMount() {
    const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
    this.rData = await this.genData();
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      height: hei,
      refreshing: false,
      isLoading: false,
    })
  }
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
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
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
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
          {this.state.isLoading ? '加载中...' : '加载完成'}
        </div>)}
        renderRow={row}
        renderSeparator={separator}
        className="am-list"
        pageSize={4}
        style={{
            minHeight: '100vh',
            height: this.state.height,
            border: '1px solid #ddd',
            margin: '5px 0',
            overflow: 'auto',
          }}
        useBodyScroll
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
      />
    );
  }
}
export default ListViewScroll;