import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const url ='https://vue3-course-api.hexschool.io/v2'
const path='phil' ;

const app = createApp({
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login() {
            axios.post(`${url}/admin/signin`, this.user)
                .then((response) => {
                    // console.log(response);
                    const { token, expired } = response.data;
                    // console.log(token, expired, new Date(expired));
                    document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                    // return false
                    window.location = 'backstage.html';
                })
                .catch((error) => {
                    alert(error.data.message);
                });
        },
    }
})
app.mount('#app')