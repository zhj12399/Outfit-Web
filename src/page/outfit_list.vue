<template>
  <div class="fillcontain">
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">穿搭记录</header>
    </section>
    <div class="table_container">
      <el-table
          :data="tableData"
          highlight-current-row
          style="width: 100%">
        <el-table-column
            property="time"
            label="日期"
            sortable>
        </el-table-column>
        <el-table-column
            property="t"
            label="温度"
            sortable>
        </el-table-column>
        <el-table-column
            property="up"
            label="上身">
        </el-table-column>
        <el-table-column
            property="down"
            label="下身">
        </el-table-column>
        <el-table-column
            property="shoes"
            label="鞋子">
        </el-table-column>
        <el-table-column
            property="hands"
            label="手饰">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import headTop from '../components/headTop'

export default {
  data() {
    return {
      tableData: [],
    }
  },
  components: {
    headTop,
  },
  created() {

  },
  mounted() {
    this.getCaffeineList();
  },
  methods: {
    getCaffeineList() {
      this.$axios.post('outfit/get_all_outfit/?name=' + sessionStorage.getItem("login_name"))
          .then(
              (response) => {
                for (var i in response.data) {
                  var tmp_json = {};
                  tmp_json.time = response.data[i].year + "-" + response.data[i].month + "-" + response.data[i].day;
                  tmp_json.t = response.data[i].t;
                  tmp_json.up = response.data[i].up;
                  tmp_json.down = response.data[i].down;
                  tmp_json.shoes = response.data[i].shoes;
                  tmp_json.hands = response.data[i].hands;
                  this.tableData.push(tmp_json)
                }
              },
              (err) => {
                this.$message({
                  type: 'error',
                  message: '错误信息：' + err
                });
              })
    }
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
</style>