import axios from 'axios'
import store from '../store'
import router from '../router'

const isProdMode = Object.is(process.env.NODE_ENV,'production');
const baseURL = isProdMode ? 'http://59.110.138.64:3000' : '/login';

//设置全局axios默认值
axios.defaults.timeout = 5000; //5000的超时验证
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//创建一个axios实例
const instance = axios.create({
	baseURL : baseURL
});
instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

axios.interceptors.request.use = instance.interceptors.request.use;

//request拦截器
instance.interceptors.request.use(
    config => {
        //每次发送请求之前都检测vuex是否存有token,放在请求头发送给服务器
        let token = store.state.token;
        if(token){
            config.headers={token};
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
//respone拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if(error.response){
            switch(error.response.status){
                case 401:
                    store.dispatch('UserLogout'); //可能是token过期，清除它
                    router.replace({ //跳转到登录页面
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
            }
        }
        return Promise.reject(error.response);
    }
);

export default instance;