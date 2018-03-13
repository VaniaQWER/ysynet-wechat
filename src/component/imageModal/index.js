import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import styles from './style.css';
class ImageModal extends Component{
    render(){
        const baseData = this.props.data;
        return (<div>
            <Modal
                visible={this.props.visible}
                transparent={this.props.transparent}
                closable={this.props.closable}
                maskClosable={this.props.maskClosable}
                onClose={this.props.onClose}
            >
                <div className={styles.ysy_modal_content}>
                    <img src={baseData.src} style={{width:'100%',maxHeight:'90vw'}} alt='设备图片' onClick={this.props.onClose}/>
                    <div className={styles.tabs_body}>
                        <section>
                            <div className={styles.tabs_item_label}>设备名称:</div>
                            <div className={styles.tabs_item_text}>{baseData.equipmentName}</div>
                        </section>
                        <section>
                            <div className={styles.tabs_item_label}>故障描述:</div>
                            <div className={styles.tabs_item_text}>{baseData.faultWords}</div>
                        </section>
                    </div>
                </div>
            </Modal>
        </div>)
    }
}
export default ImageModal;