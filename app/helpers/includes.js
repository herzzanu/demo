import { helper } from '@ember/component/helper';

export default helper(([needle, haystack]) => haystack.includes(needle));
