// import { ElButton } from 'element-plus';
import lang from 'element-plus/lib/locale/lang/zh-cn';
import locale from 'element-plus/lib/locale';
import 'element-plus/lib/theme-chalk/index.css';
import ElementPlus from 'element-plus';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default (app: any) => {
  locale.use(lang);
  app.use(ElementPlus);
};
