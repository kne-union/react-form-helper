import merge from 'lodash/merge';

export const globalParams = {
  field: {}
};

export default props => {
  merge(globalParams, props);
};
