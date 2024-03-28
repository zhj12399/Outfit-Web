<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <header class="section_title">纪录穿搭</header>
    </section>
    <el-row style="margin-top: 20px;">
      <el-form :model="formData" :rules="rules" ref="formData" label-width="110px" class="demo-formData">
        <el-form-item label="记录日期" class="block">
          <el-date-picker
              v-model="formData"
              type="date"
              placeholder="选择日期">
          </el-date-picker>
          <el>（未选择则默认当下时间）</el>
        </el-form-item>
        <el-form-item label="上衣" prop="brand">
          <el-radio v-model="formData.brand" label="1">星巴克</el-radio>
          <el-radio v-model="formData.brand" label="2">瑞幸</el-radio>
          <el-radio v-model="formData.brand" label="3">麦当劳</el-radio>
          <el-radio v-model="formData.brand" label="4">雀巢</el-radio>
          <el-radio v-model="formData.brand" label="5">其它品牌</el-radio>
        </el-form-item>
        <el-form-item label="下衣" prop="starbucks">
          <el-radio v-model="formData.type" label="1">美式</el-radio>
          <el-radio v-model="formData.type" label="2">拿铁</el-radio>
          <el-radio v-model="formData.type" label="3">摩卡</el-radio>
          <el-radio v-model="formData.type" label="4">馥芮白</el-radio>
          <el-radio v-model="formData.type" label="5">冷萃</el-radio>
        </el-form-item>
        <el-form-item label="鞋子" prop="luckin">
          <el-radio v-model="formData.type" label="1">美式</el-radio>
          <el-radio v-model="formData.type" label="2">拿铁</el-radio>
          <el-radio v-model="formData.type" label="3">摩卡</el-radio>
          <el-radio v-model="formData.type" label="4">澳瑞白</el-radio>
          <el-radio v-model="formData.type" label="5">加浓美式</el-radio>
        </el-form-item>
        <el-form-item label="手饰" prop="hands">
          <el-radio v-model="formData.type" label="1">美式</el-radio>
          <el-radio v-model="formData.type" label="2">拿铁</el-radio>
          <el-radio v-model="formData.type" label="3">摩卡</el-radio>
          <el-radio v-model="formData.type" label="4">冰醇咖啡</el-radio>
          <el-radio v-model="formData.type" label="5">卡布奇诺</el-radio>
        </el-form-item>
        <el-form-item class="button_submit">
          <el-button type="primary" @click='addcaffeinerecord'>立即添加</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import headTop from '@/components/headTop'

export default {
  data() {
    return {
      formData: {
        date: '',
        t: '1',
        up: '1',
        down: '2',
        shoes: '1',
        hands: '',
      },
      sqlData: {
        brand: '',
        type: '',
        cups: '',
        percent: '',
        caffeine: 0.0,
      },
      rules: {
        time: [
          {required: true, message: '请选择时间', trigger: 'blur'},
        ]
      },
    }
  },
  components: {
    headTop,
  },
  methods: {
    addcaffeinerecord() {

      if (this.formData.time === '') {
        this.formData.time = new Date();
      }
      this.$confirm('您选择了' + this.sqlData.brand + '的一杯' + this.sqlData.type + '，其杯型是：' + this.sqlData.cups + '杯，喝了' + this.sqlData.percent + '杯，大约含有咖啡因' + this.sqlData.caffeine.toFixed(2) + 'mg', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('People/ExistPeople/' + sessionStorage.getItem("loginid"))
            .then(
                (data) => {
                  if (!data.data) {
                    sessionStorage.setItem("loginid", "")
                    this.$message({
                      type: 'info',
                      message: '请您重新登录'
                    });
                    this.$router.push('/')
                  }
                },
                (err) => {
                  this.$message({
                    type: 'error',
                    message: '错误信息：' + err
                  });
                })
        this.$axios.post('Caffeine/AddCaffeineRecord', {
          "id": sessionStorage.getItem("loginid"),
          "time": this.formData.time,
          "brand": this.sqlData.brand,
          "type": this.sqlData.type,
          "size": this.sqlData.cups,
          "percent": this.sqlData.percent,
          "caffeine": this.sqlData.caffeine.toFixed(2),
        }).then(
            (data) => {
              if (data.data === true) {
                this.$message({
                  type: 'success',
                  message: '提交成功'
                });
              } else {
                this.$message({
                  type: 'warning',
                  message: '您不能在同一时间引用两个饮品',
                });
              }
            },
            () => {
              this.$message({
                type: 'error',
                message: '提交错误',
              });

            })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消提交'
        });
      });

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