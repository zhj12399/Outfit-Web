<template>
  <div class="login_page fillcontain">
    <router-view :key="componentKey"></router-view>
      <section class="form_contianer">
        <div class="manage_tip">
          <p>欢迎来到穿搭世界</p>
        </div>
        <div class="manage_smalltip">
          <p>记录你的每日穿搭</p>
        </div>
        <el-button type="primary" @click='Go_In' class="submit_btn">开启</el-button>
      </section>
  </div>
</template>

<script>
export default {
  name: "welcome",
  data() {
    return{
      // 初始时就设置一个时间戳
      componentKey: Date.now(),
    }
  },
  methods: {
    Go_In() {
      // 更改路由前，更新key为新的时间戳，强制重新渲染
      this.componentKey = Date.now();
      this.$router.replace('login')
    },
  }
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