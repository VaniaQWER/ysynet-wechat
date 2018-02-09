import { PureComponent } from 'react';
import { ListView } from 'antd-mobile';
import request from '../../request';
import querystring from 'querystring';

/**
 * @file 滑动刷新 构造方法
 */
class Slider extends PureComponent {
  constructor(props) {
    super(props)
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    this.NUM_ROWS_PER_SECTION = 5;
    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });
    this.dataBlobs = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.dataSource = dataSource;
  }
  genData = (params) => {
    let { pageIndex, isMore } = this.state;
    let query = null;
    if (params && params.query) {
      this.dataBlobs = {};
      this.sectionIDs = [];
      this.rowIDs = [];
      query = params.query;
    }
    const index = params && params.query && !params.endReached ? 1 : pageIndex;
    this.setState({ isLoading: true });
    request(`${this.url}?pagesize=${this.NUM_ROWS_PER_SECTION}&page=${index}&${querystring.stringify(this.searchName)}&${querystring.stringify(query)}`, {
      success: res => {
        let data = res.result;
        if (data.length > 0) {
          const sectionName = `${index}:`;
          this.dataBlobs[sectionName] = sectionName;
          this.sectionIDs.push(sectionName);
          this.rowIDs[index-1] = [];
          const pageSize = data.length > this.NUM_ROWS_PER_SECTION ? this.NUM_ROWS_PER_SECTION : data.length; 
          for (let i=0; i<pageSize; i++) {
            const row = data[i];
            this.rowIDs[ index-1 ].push(data[i].RN);
            this.dataBlobs[data[i].RN] = row;
          }
          isMore = data.length < 5 ? false : true;
        } else {
          this.sectionIDs = [];
          this.rowIDs = [];
          this.dataBlobs = {};
          isMore = false;
        }
        this.setState({
          dataSource: this.dataSource.cloneWithRowsAndSections(this.dataBlobs, this.sectionIDs, this.rowIDs),
          isLoading: false,
          pageIndex: index + 1,
          refreshing: false,
          isMore
        });
        if (params && typeof params.callback === 'function') {
          params.callback();
        }
      }
    })
  }
  onRefresh = (callback) => {
    this.setState({ 
      refreshing: true, 
      pageIndex: 1, 
      isLoading: true,
    });
    // 清空
    this.sectionIDs = [];
    this.rowIDs = [];
    this.dataBlobs = {};
    // simulate initial Ajax
    this.genData();
    if (typeof callback === 'function') {
      callback();
    }
  }
}

export default Slider;