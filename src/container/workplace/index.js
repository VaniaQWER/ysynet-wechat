/**
 * @file 设备-工作台
 */
import React, { PureComponent } from 'react';
import { List, Card, Icon, Grid, WhiteSpace,Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import { user as userService, menu as menuService, operation as operSerVice, session as sessionService  } from '../../service';
import { fetchUser,fetchMenu,getSession } from '../../api/user';
import { selectRrpairFstateNum } from '../../api/assets';
import { scanUrl }  from '../../api/_local';
import styles from './style.css';
import CardTitle from './cardTitle';
const menuIcon = {
  'repair':{
    icon: require('../../assets/scan02.svg'),
  },
  'repairMag':{
    icon: require('../../assets/protect.svg')
  },
  "construct":{
    icon: require('../../assets/assets.svg')
  },
  "check":{
    icon: require('../../assets/checkin.svg')
  }
} 


const bgData = Array.from(new Array(3)).map((_val, i) => ({
  text: `医商云`,
}));
const addMenu = [{
  text: '资产变更',
  icon: require('../../assets/assetChange.svg'),
  path: "/construct",
  key: "construct"
},{
  text: '联系我们',
  icon: require('../../assets/contactUs.svg'),
  path: "/construct",
  key: "construct"
}];
const browser={
  versions:function(){
      var u = navigator.userAgent;
      return {
          weixin: u.indexOf('MicroMessenger') > -1, //是否微信
      };
  }()
}
class Workplace extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      userType:'',//用户类型  syks  使用科室  glks 管理科室  nxz  内修组
      userInfo: {},//用户信息
      menuList: [],//菜单
      sessionId:'',
      list: []//列表
    }
  }
   //10待接修，30维修中,50待验收，80已拒绝 "assetsRecordCount" 资产记录   "rrpairOrderCount"  总维修单
  handMenu = (res,userType)=>{
    let list = [];
    if(userType === 'syks'){
      res.map((item,index)=>{
        if(item.code==='10'||item.code==='50'||item.code==='assetsRecordCount'){
          return list.push({
            text: <CardTitle title={item.num} subTitle={this.MuneText(item.code,userType)} style={{fontSize: 20}}/>,
            url: item.code !=='assetsRecordCount'?`/check`:`/construct`,
            code: item.code
          });
        }
        return null;
      });
    }else{
      res.map((item,index)=>{
        if(item.code==='10'||item.code==='30'|| item.code==='50'){
          return list.push({
            text: <CardTitle title={item.num} subTitle={this.MuneText(item.code,userType)} style={{fontSize: 20}}/>,
            url: `/check/`,
            code: item.code
          });
        }
        return null;
      });
    }
    return list
  }
  MuneText = (val,userType)=>{
    switch (val){
      case '10':
        return userType === 'syks'?' 我的报修' : '等待接修'
      case '30':
        return '维修中'
      case '50':
        return userType === 'syks'? '我的验收' : '等待验收'
      case '80':
        return '已拒绝'
      case 'assetsRecordCount':
        return '我的资产'
      case 'rrpairOrderCount':
        return '我的维修单'
      default :
        return null
    }
  }
  compare = (property)=>{
      return (a,b) =>{
          var value1 = a[property];
          var value2 = b[property];
          return value1 - value2;
      }
  }
  async componentWillMount() {
    const { history } = this.props;
    if(browser.versions.weixin){
      if(!this.props.userReducer.userInfo.userId && !this.props.menuReducer.menuList){
        let params = this.props.match.params;
        let userId = params.userId;
        let sessionId = params.sessionId;
        this.getUserInfo(userId,sessionId);
        const session = await getSession();
        if(session.status){
          console.log('session 请求')
        }
      }else{
        this.setState({ 
          userInfo: this.props.userReducer.userInfo,
          menuList: this.props.menuReducer.menuList,
          userType: this.props.userReducer.userInfo.groupName,
          sessionId: this.props.sessionReducer.session.sessionId
        });
      }
        //获取相关单据数量
        this.getEquipment();
   }else{
      Toast.fail('请使用微信浏览器登陆',1,()=>history.push({ pathname: `/error` }))
    }
  }
  async getUserInfo(userId,sessionId){
    const { history, setUser, setMenu, setSessionId }= this.props;
    const data = await fetchUser({ body:{ userId: userId,sessionId: sessionId },type:'formData'});
        if(data.status && data.result){
          let userType = null;
          setUser({userInfo: data.result});
          setSessionId({ sessionId: sessionId });
          userType = data.result.groupName;
          this.setState({ userInfo: data.result,userType: userType, sessionId: sessionId})
        }else{
          Toast.fail('用户信息异常', 1 ,() => history.push({ pathname:`/error` }));
        }
        const menu = await fetchMenu({ body:{ userId: userId, sessionId: sessionId },type:'formData'});
        if(menu.status && menu.result){
          let menuRes = menu.result,menuList = [];
          menuRes.map((item,index)=>{
            if(item.key === null && item.path === null){
              menuList = menuRes[index].subMenus;
              return null;
            }
            return null;
          })
          menuList.sort(this.compare('fsort'));
          console.log(menuList,'menuList');
          menuList.map((item,index)=>{
            item.text = item.name;
            item.icon = menuIcon[item.key].icon;
            return null;
          });
          menuList = [...menuList,...addMenu];
          console.log(menuList,'menuList');
          setMenu(menuList);
          this.setState({ menuList: menuList  })
        }else{
          Toast.fail('用户菜单异常', 1 , () => history.push({ pathname:`/error` }));
        }
    }
    async getEquipment () {
      const { history } = this.props;
      const res = await selectRrpairFstateNum();
        if(res.status && res.result){
          this.setState({ list: res.result });
        }else{
          Toast.fail('状态数量异常', 1 ,() => history.push({ pathname:`/error` }));
        }
    }
    goNextStep = (el,index)=>{
      const { setCheckDetial, history } = this.props;
      setCheckDetial({BaseInfoInfoData:{ orderFstate: el.code }});
      history.push({ pathname: `${el.url}`}) 
    }
    render() {
      console.log(this.props,'porps')
      const { history, userReducer } = this.props;
      const { menuList, list,userType, sessionId } = this.state; 
      const { userInfo } = userReducer;
      return (
        this.props.children
        ||
        <List className={`workplace ${styles.workplace_viewList}`}>
          <Card className={styles.workplace_header} full>
            <Card.Header
              className={styles.workplace_header_body}
              title={<CardTitle title={userInfo.userName} subTitle={userInfo.orgName}/>}
              onClick={() => history.push({pathname:'/myinfo'}) }
              thumb={
                <img 
                  alt='头像'
                  src={userInfo.headImgUrl}
                  className={styles.workplace_avatar}
                />
              }
              extra={
                <Icon type="right" size={'sm'} />
              }
            />
            <Card.Body style={{background: '#fff', padding: 0,minHeight:'122px'}}>
              <Grid 
                data={ list && list.length > 0 ? this.handMenu(list,userType): bgData}
                columnNum='3'
                activeStyle={false} 
                hasLine={false} 
                onClick={(el, index) => this.goNextStep(el,index) }
              />
            </Card.Body>
          </Card>
          <WhiteSpace/>
          <Grid 
            data={menuList} 
            columnNum='3'
            activeStyle={false} 
            hasLine={true}
            onClick={(el, index) => el.key === "repair"?window.location.href= `${scanUrl}/test/test.html?sessionId=${sessionId}`:el.path?history.push({ pathname:el.path }):console.log(el) }
          />
        </List>
      )
    }
  }

export default withRouter(connect(state => state, dispatch => ({
  setUser: user => dispatch(userService.setUserInfo(user)),
  setMenu: menu =>dispatch(menuService.setMenu(menu)),
  getMenu: () => dispatch(menuService.fetchMenu()),
  setSessionId: id => dispatch(sessionService.setSessionId(id)),
  setCheckDetial: check => dispatch(operSerVice.setCheckDetial(check))
}))(Workplace));