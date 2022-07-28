<template>
  <div class="login-container">
    <h1>Calorie Calculator</h1>
    <img
      class="fb_logo _8ilh img"
      src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
      alt="Facebook"
    />
    <form class="form-login">
      <button class="login-btn">
        <a
          class="login-btn-link"
          href="https://www.facebook.com/v14.0/dialog/oauth?client_id=1721885251448704&redirect_uri=https://172.16.1.183:8080"
          target="_blank"
          >Login</a
        >
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
