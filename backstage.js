console.clear();
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
const app = createApp({ //建立vue實體
  //定義資料  
  data() {
        return {
            api: {
                url: 'https://vue3-course-api.hexschool.io/v2',
                path: 'phil'
            },
            products: [],
            loaded: false,
            temp: {},
        }
    },
    //生命週期，在創建完後會立即啟用一次
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)signinToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;
        this.checkSignin();
    },
    //方法，可以帶入很多的方法在裡面
    methods: {
        checkSignin() {
            const checkUserApi = `${this.api.url}/api/user/check`
            axios.post(checkUserApi)
                .then((response) => {
                     console.log(response);
                    this.getProduct();
                })
                .catch((error) => {
                    console.dir(error);
                    alert(error.response.data.message)
                    window.location = 'index.html'; // 錯誤返回登入首頁
                })
        },
        getProduct() {
            const adminProductsUrl = `${this.api.url}/api/${this.api.path}/admin/products`;
            axios.get(adminProductsUrl)
                .then((response) => {
                     console.log(response);
                    this.products = response.data.products
                    this.loaded = true
                })
                .catch((error) => {
                    console.dir(error);
                    alert(error.response.data.message)
                    window.location = 'index.html'; // 錯誤返回登入首頁
                })
        },
    },
})
app.mount('#app')//掛載到DOM上