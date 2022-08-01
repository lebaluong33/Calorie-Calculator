<template>
  <div class="login-container">
    <h1>Calorie Calculator</h1>
    <img
      class="fb_logo _8ilh img"
      src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
      alt="Facebook"
    />
    <form class="form-login">
      <button class="login-btn" @click="FbLogin">Login</button>
    </form>
  </div>
</template>

<script>
// import axios from 'axios';
import { ref } from 'vue';
// import axios from 'axios';
// http://172.16.1.183:8080/
// const redirectUri = 'http://172.16.1.183:8080/login-success'; // tricky test.
const appId = '567880838213220';
// const appSecret = '1a70a901d8d07cd7fd71f613799c44d7';

export default {
  name: 'LoginForm',
  props: {
    msg: String,
  },
  setup() {
    const location = ref(window.location.href);
    const getUrlParameter = (e, uri) => {
      e = e.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      var t = new RegExp('[\\?&]' + e + '=([^&#]*)').exec(uri);
      return null === t ? null : decodeURIComponent(t[1].replace(/\+/g, ' '));
    };

    const buildURL = () => {
      let params = 'fbloged=1';
      const redirectUri = window.location.origin+"/login-success";
      let uriEncoded = encodeURIComponent(redirectUri);
      return `https://www.facebook.com/v14.0/dialog/oauth?client_id=${appId}&redirect_uri=${uriEncoded}&state=${params}&response_type=code%20token`;
    };

    const popupWindow = (url, windowName, win, w, h) => {
      const y = win.top.outerHeight / 2 + win.top.screenY - h / 2;
      const x = win.top.outerWidth / 2 + win.top.screenX - w / 2;
      return win.open(
        url,
        windowName,
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`
      );
    };
    const openFBDialog = async () => {
      return new Promise((resolve, reject) => {
        let uri = buildURL();
        let loginWindow = popupWindow(uri, '', window, 500, 500);
        loginWindow.addEventListener('load', async () => {
          try {
            let localUri = loginWindow.location.href.replace('#', '?');
            console.log(loginWindow.location);
            let token = getUrlParameter('access_token', localUri);
            resolve(token);
            loginWindow.close();
          } catch (ex) {
            reject(null);
          }
        });
      });
    };

    const FbLogin = async () => {
      try {
        await openFBDialog();
      } catch (ex) {
        console.log('there was an error');
      }
    };

    return { appId, location, FbLogin };
  },
};
</script>

<style scoped lang="scss">
.login-container {
  display: block;
  align-items: center;
  background-color: #fff;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  box-sizing: border-box;
  margin: 40px auto;
  padding: 20px 0 28px;
  width: 396px;
  .login-btn {
    color: #fff;
    background-color: #1877f2;
    border: none;
    border-radius: 6px;
    font-size: 20px;
    line-height: 48px;
    padding: 0 16px;
    width: 332px;
    &-link {
      color: #fff;
      text-decoration: none;
    }
  }
}
</style>
