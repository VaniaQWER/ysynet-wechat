import React, { PureComponent } from 'react';
import ListViewScroll from '../../component/listViewScroll';
/**
 * @file 待接修
 */
class WaitForRepair extends PureComponent {
  render() {
    return (
      <div>
        <ListViewScroll
          item={
            obj => <div style={{height: 150}}> { obj.equipmetStandarName } </div>
          }
        />
      </div>
    )
  }
}

export default WaitForRepair;