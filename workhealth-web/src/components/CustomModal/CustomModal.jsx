import React from 'react';
import { Modal } from 'antd';

const CustomModal = ({
  children,
  className,
  closable,
  onCancel,
  style,
  visible,
}) => (
  <Modal
    centered
    className={className || null}
    closable={closable || false}
    destroyOnClose={true}
    footer={null}
    onCancel={onCancel || null}
    style={style || null}
    visible={visible || null}
  >
    {children}
  </Modal>
);

export default CustomModal;
