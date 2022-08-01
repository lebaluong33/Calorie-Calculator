<template>
  <div class="home-container">
    <h1>Home Page</h1>
    <p>Hello {{ userData }} đẹp trai</p>
    <img :src="imageSource" alt="facebook image" />
  </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';

export default {
  name: 'HomePage',
  setup() {
    const userData = ref('');
    const imageSource = ref('');

    const appAccessToken = '567880838213220|xfgFJSZTeyIXXrgw1JPuQAVnZ58';

    const buildUrlFbInspectToken = (token) =>
      `https://graph.facebook.com/v14.0/debug_token?input_token=${token}&access_token=${appAccessToken}`;

    const buildUrlFbMe = (FB_ID_PERSON, token) =>
      `https://graph.facebook.com/v14.0/${FB_ID_PERSON}?fields=id,name,picture,email&access_token=${token}`;

    onMounted(async () => {
      const token = window.localStorage.getItem('accessToken');

      let dataFbToken = await axios.get(buildUrlFbInspectToken(token));

      let userFbId = dataFbToken['data']['data']['user_id'];
      console.log('userFbId', userFbId);
      const userInfo = await axios.get(buildUrlFbMe(userFbId, token));
      console.log('userData', userInfo);
      userData.value = userInfo?.data?.name;
      imageSource.value = userInfo?.data?.picture?.data?.url;
      console.log(imageSource);
    });
    return { userData, imageSource };
  },
};
</script>
