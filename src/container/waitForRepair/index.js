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
            obj => {
              return <div style={{height: 150}}>12345</div>
            }
          }
        />
      </div>
    )
  }
}

export default WaitForRepair;