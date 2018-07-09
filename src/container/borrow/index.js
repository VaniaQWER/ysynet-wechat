/**
 * @file 设备--借用记录/借用管理
 */
import React, {PureComponent} from 'react';
import { SearchBar, Icon } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import { operation } from '../../service'
import { scanUrl }  from '../../api/_local';
import styles from './style.css';
import CardItem from '../../component/borrowCard';
import ListViewScroll from '../../component/listViewScroll';
import borrow from '../../api/borrow'

class BorrowRecord extends PureComponent{
  constructor(props) {
    super(props)
    this.state = {
        placeholder:'搜索',
        searchName: null,
        url: borrow.findBorrowRecord,
        userId:'',
        sessionId: '',
        orderFstate:'',
        userType: ''
    }
  }
 
  onChange= (value) => {
    this.setState({ searchName: value });
  };
  render() {
    const { searchName } = this.state;
    const { userInfo } = this.props.userReducer;
    return (<div>
      <SearchBar
        placeholder={this.state.placeholder}
        onChange={this.onChange}
        onFocus={()=>this.setState({ placeholder: '输入资产名称' })}
        onBlur={()=>this.setState({ placeholder: '搜索' })}
        ref={ref => this.manualFocusInst = ref}
        onSubmit={value => {
          document.querySelector('.am-list-view-scrollview').scrollTo(0, 0);
          this.setState({ searchName: value })
        }}
      />
      <ListViewScroll
        url={this.state.url}
        queryParams={{
          equipmentStandardName: searchName
        }}
        item={obj => {
          return (<CardItem
            data={{...obj}}
            /* onClick={this
            .onClick
            .bind(this)} */
            />
        ) 
      }}/>
      {
        userInfo.orgType === '01'
        &&
        <div style={{position:'absolute',bottom: 16, right: 20 }}>
          {
            this.state.visible
            &&
            <div className={styles['hidden-button']}>
              <div style={{ backgroundColor:'#1296db' }} onClick={()=> window.location.href=`${scanUrl}/test/borrow.html?borrowFstate=00` }>借用</div>
              <div style={{ backgroundColor: '#09c2aa' }} onClick={()=> window.location.href=`${scanUrl}/test/borrow.html?borrowFstate=01`}>归还</div>
            </div>
          }
          <span 
            onClick={()=>this.setState({ visible: !this.state.visible })}
            className={styles['plusButton']}
            >
            <Icon type="plus" size='sm'/>
          </span>
        </div>
      }
    </div>)
  }
}
export default withRouter(connect(state => state)(BorrowRecord));