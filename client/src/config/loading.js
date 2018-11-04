import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export const NProgresser =(loading)=>{
  if (loading) {
    NProgress.start();
    return true;
  }
  NProgress.done();
  return false;
}