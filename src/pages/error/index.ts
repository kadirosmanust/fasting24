import loadable from '@loadable/component';

const error = loadable(() => import('./Error'));

export default error;
