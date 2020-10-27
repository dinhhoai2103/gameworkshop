import { notification } from 'antd';

export const showAlertNotice = (params) => {
  const { type, message } = params;
  let style = {};
  switch (type) {
  case 'success': {
    style = { border: '1px solid #b7eb8f', backgroundColor: '#f6ffed' };
    break;
  }
  case 'error': {
    style = { border: '1px solid #d25109', backgroundColor: '#fff2f0' };
    break;
  }
  default: {
    break;
  }}
  return notification[type]({
    style,
    duration: 5,
    message,
    top: 50,
  });
};