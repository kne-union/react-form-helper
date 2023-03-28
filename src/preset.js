import { merge } from 'lodash';

export const globalParams = {
  field: {}
};

export default props => {
  merge(globalParams, props);
};
