<template>
  <div class="home-container">
    <h1>{{ loginStatus }}</h1>
  </div>
</template>

<script>
import { onMounted, nextTick, ref } from 'vue';
import axios from 'axios';
const appSecret = '1a70a901d8d07cd7fd71f613799c44d7';

const status = {
  success: 'Login Successful!',
  fail: 'Login Fail!',
};

export default {
  name: 'LoginSuccess',
  setup() {
    const loginStatus = ref('');
    const getUrlParameter = (e, uri) => {
      e = e.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      var t = new RegExp('[\\?&]' + e + '=([^&#]*)').exec(uri);
      return null === t ? null : decodeURIComponent(t[1].replace(/\+/g, ' '));
    };

    onMounted(() => {
      nextTick(async () => {
        const href = window.location.href.replace('#', '?');
        const access_token = getUrlParameter('access_token', href);
        if (access_token) {
          loginStatus.value = status.success;
          window.localStorage.setItem('accessToken', access_token);
          const expires_in = getUrlParameter('expires_in', href);
          const long_lived_token = getUrlParameter('long_lived_token', href);
          const data_access_expiration_time = getUrlParameter(
            'data_access_expiration_time',
            href
          );
          window.localStorage.setItem('expires_in', expires_in);
          window.localStorage.setItem('long_lived_token', long_lived_token);
          window.localStorage.setItem(
            'data_access_expiration_time',
            data_access_expiration_time
          );

          const buildUrlFbInspectToken = (token) =>
            `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appSecret}`;

          const buildUrlFbMe = (FB_ID_PERSON, token) =>
            `https://graph.facebook.com/${FB_ID_PERSON}?fields=id,name,email&access_token=${token}`;

          let dataFbToken = await axios.get(
            buildUrlFbInspectToken(access_token)
          );
          console.log('dataFbToken', dataFbToken);
          let userFbId = dataFbToken['data']['user_id'];
          let userData = await axios.get(buildUrlFbMe(userFbId, access_token));
          console.log('userData', userData);
        } else {
          loginStatus.value = status.fail;
        }
      });
    });
    return { loginStatus };
  },
};
</script>
