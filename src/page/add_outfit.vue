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
              v-model="formData.time"
              type="date"
              placeholder="选择日期时间">
          </el-date-picker>
          <el>（未选择则默认当下时间）</el>
        </el-form-item>
        <el-form-item label="选择温度">
          <el-slider v-model="formData.t" :min="-30" :max="40" :show-input="true" :step="1"></el-slider>
        </el-form-item>
        <el-form-item label="上衣" prop="up">
          <el-radio v-model="formData.up" label="1">棉袄</el-radio>
          <el-radio v-model="formData.up" label="2">夹克</el-radio>
          <el-radio v-model="formData.up" label="3">卫衣</el-radio>
          <el-radio v-model="formData.up" label="4">短袖</el-radio>
        </el-form-item>
        <el-form-item label="下衣" prop="down">
          <el-radio v-model="formData.down" label="1">棉裤</el-radio>
          <el-radio v-model="formData.down" label="2">秋裤</el-radio>
          <el-radio v-model="formData.down" label="3">加绒</el-radio>
          <el-radio v-model="formData.down" label="4">单裤</el-radio>
          <el-radio v-model="formData.down" label="5">短裤</el-radio>
        </el-form-item>
        <el-form-item label="鞋子" prop="shoes">
          <el-radio v-model="formData.shoes" label="1">球鞋</el-radio>
          <el-radio v-model="formData.shoes" label="2">布鞋</el-radio>
          <el-radio v-model="formData.shoes" label="3">皮鞋</el-radio>
        </el-form-item>
        <el-form-item label="手饰" prop="hands">
          <el-radio v-model="formData.hands" label="1">遮阳帽</el-radio>
          <el-radio v-model="formData.hands" label="2">冰袖</el-radio>
          <el-radio v-model="formData.hands" label="3">围巾</el-radio>
        </el-form-item>
        <el-form-item class="button_submit">
          <el-button type="primary" @click='add_outfit'>立即添加</el-button>
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
        t: 15,
        up: '1',
        down: '1',
        shoes: '1',
        hands: '1',
      },
      sqlData: {
        up: '',
        down: '',
        shoes: '',
        hands: '',
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
    add_outfit() {
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