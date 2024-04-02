<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">个人信息</header>
    </section>
    <div class="admin_set">
      <ul>
        <li>
          <span>昵称：</span><span>{{ user_name }}</span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import headTop from '../components/headTop'

export default {
  data() {
    return {
      user_name:sessionStorage.getItem("login_name"),
    }
  },
  components: {
    headTop,
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style lang="less">
@import '../style/mixin';

.table_container {
  padding: 20px;
}

.data_section {
  padding: 20px;
  margin-bottom: 40px;

  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
}

.admin_set {
  width: 60%;
  background-color: #F9FAFC;
  min-height: 400px;
  margin: 20px auto 0;
  border-radius: 10px;

  ul > li {
    padding: 20px;

    span {
      color: #666;
    }
  }
}

.admin_title {
  margin-top: 20px;
  .sc(24px, #666);
  text-align: center;
}
</style>