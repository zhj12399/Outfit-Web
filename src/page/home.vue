<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">穿搭世界</header>
      <el-row></el-row>
      <el-row :gutter="8">
        <el-col :span="8">
          <div class="data_list all_head"><span class="data_num head">{{ today_time }}</span></div>
        </el-col>
      </el-row>
      <el-row :gutter="8">
        {{ last_time_one }}
      </el-row>
      <el-row :gutter="8">
        {{last_time_two}}
      </el-row>
    </section>
  </div>
</template>

<script>
import headTop from '../components/headTop'

export default {
  data() {
    return {
      login_name: sessionStorage.getItem("login_name"),
      today_time: "",
      last_time_one: "",
      last_time_two: "",
    }
  },
  created() {

  },
  components: {
    headTop,
  },
  mounted() {
    var nowtime = new Date();
    this.today_time = "今天是：" + nowtime.getFullYear() + '-' + (nowtime.getMonth() + 1) + '-' + nowtime.getDate()
    this.$axios.post('outfit/get_last_outfit?name=' + this.login_name).then(
        (response) => {
          console.log(response)
          if (response.data === "") {
            this.last_time_one = "还没有记录穿搭过呦，快去添加吧";
          } else {
            this.last_time_one = "上次的记录是" + response.data.year+"年"+response.data.month+"月"+response.data.day+"日，上次的天气温度为："+response.data.t+"摄氏度。";
            this.last_time_two = "上身："+response.data.up+" 下身："+response.data.down+" 鞋子："+response.data.shoes+" 手饰："+response.data.hands
          }
        },
        (err) => {
          this.$message({
            type: 'error',
            message: '错误信息：' + err
          });
        }
    )
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