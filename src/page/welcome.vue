<template>
  <div class="login_page fillcontain">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>欢迎来到穿搭世界</p>
        </div>
        <div class="manage_smalltip">
          <p>记录你的每日穿搭</p>
        </div>
      </section>

  </div>
</template>

<script>
export default {
  name: "welcome",
  data() {
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@import '../style/mixin';

.login_page {
  background-color: #324057;
}

.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;

  p {
    font-size: 34px;
    color: #fff;
  }
}

.manage_smalltip {
  position: absolute;
  width: 100%;
  top: -60px;
  left: 0;

  p {
    font-size: 20px;
    color: #fff;
  }
}

.form_contianer {
  .wh(320px, 290px);
  .ctp(400px, 210px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #324057;

  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}

.tip {
  font-size: 12px;
  color: red;
}

.form-fade-enter-active, .form-fade-leave-active {
  transition: all 1s;
}

.form-fade-enter, .form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>