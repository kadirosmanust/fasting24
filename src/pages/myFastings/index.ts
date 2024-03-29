import loadable from '@loadable/component';

const myFastings = loadable(() => import('./MyFastings'));

export default myFastings;
