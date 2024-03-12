<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">穿搭世界</header>

    </section>
    <div id="chartLineBox" style="width: 90%;height:450px;"></div>
  </div>
</template>

<script>
import headTop from '../components/headTop'

export default {
  data() {
    return {
      login_name: sessionStorage.getItem("login_name"),
    }
  },
  created() {

  },
  components: {
    headTop,
  },
  mounted() {
  },
  computed: {},
  methods: {}
}
</script>

<style lang="less">
@import '../style/mixin';

.data_section {
  padding: 20px;
  margin-bottom: 40px;

  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #E5E9F2;

    .data_num {
      color: #333;
      font-size: 26px;
    }

    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }

  .today_head {
    background: #FF9800;
  }

  .all_head {
    background: #20A0FF;
  }
}
</style>