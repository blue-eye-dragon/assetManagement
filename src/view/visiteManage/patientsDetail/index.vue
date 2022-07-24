<template>
  <div>
    <div class="backBox">
      <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="back">返回</el-button>
    </div>
    <el-form
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      label-width="85px"
    >
      <div class="formItem">
        <p class="title">患者详情</p>
        <el-row type="flex" justify="space-around" >
          <el-form-item label="患者姓名：">
            <el-input
              v-model="formInline.name"
              placeholder="患者姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号：">
            <el-input
              v-model="formInline.id"
              placeholder="身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-input
              v-model="formInline.age"
              placeholder="年龄"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row type="flex" justify="space-around" >
          <el-form-item label="性别：">
            <el-input
              v-model="formInline.sex"
              placeholder="性别"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系电话：">
            <el-input
              v-model="formInline.iphone"
              placeholder="联系电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="患者状态：">
            <el-select
              v-model="formInline.state"
              placeholder="请选择"
              style="width: 205px;"
            >
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
      </div>
      <div class="formItem">
        <p class="title">诊疗信息</p>
        <el-row type="flex" justify="space-around" >
          <el-col :span="10" class="information">
            <el-form-item label="病种：" label-width="120px">
                <el-select
                  v-model="formInline.diseasesType"
                  placeholder="请选择"
                  style="width:200px"
                >
                  <el-option
                    v-for="item in diseasesTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="现管理单位：" label-width="120px">
              <el-input
                v-model="formInline.nowManagement"
                placeholder="现管理单位"
                style="width:350px"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="information">
            <el-form-item label="确诊时间：" label-width="120px">
              <el-date-picker
                v-model="formInline.confirmedTime"
                type="date"
                placeholder="确诊时间：">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="首诊断单位：" label-width="120px">
              <el-input
                v-model="formInline.firstManagement"
                placeholder="首诊断单位"
                style="width:350px"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div>
        <p class="title">随访调查</p>
        <el-row type="flex" justify="space-around" >
          
          <el-col :span="10" class="information">
            <el-form-item label="上次随访时间：" label-width="120px">
              <el-date-picker
                v-model="formInline.name"
                type="date"
                placeholder="上次随访时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="下次随访时间：" label-width="120px">
              <el-date-picker
                v-model="formInline.name"
                type="date"
                placeholder="下次随访时间：">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10" class="information">
            <el-form-item label="上次随访方式：" label-width="120px">
                <el-select
                  v-model="formInline.diseasesType"
                  placeholder="请选择"
                  style="width:200px"
                >
                  <el-option
                    v-for="item in visitList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="随访周期：" label-width="120px">
                <el-select
                  v-model="formInline.period"
                  placeholder="请选择"
                  style="width: 205px;"
                >
                  <el-option
                    v-for="item in periodList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import mixin from '@/mixins'
export default {
  name: 'visiteDetail',
  mixins: [mixin],
  data() {
    return {
      diseasesTypeList: [
        {
          label: '结核病',
          value: 1
        },
        {
          label: '高血压',
          value: 2
        },
        {
          label: '糖尿病',
          value: 3
        },
        {
          label: '精神分裂症',
          value: 4
        },
        {
          label: '其他',
          value: 5
        }
      ],
      stateList: [
        {
          value: '稳定',
          label: '稳定'
        },
        {
          value: '住院',
          label: '住院'
        },
        {
          value: '未知',
          label: '未知'
        },
        {
          value: '全部',
          label: '全部'
        }
      ],
      visitList: [
        {
          label: '门诊',
          value: 1
        },
        {
          label: '家庭随访',
          value: 2
        },
        {
          label: '电话随访',
          value: 3
        },
        {
          label: '其他',
          value: 4
        }
      ],
      periodList: [
        {
          label: '72小时',
          value: '1'
        },
        {
          label: '一周',
          value: '2'
        },
        {
          label: '二周',
          value: '3'
        },
        {
          label: '三周',
          value: '4'
        },
        {
          label: '一个月',
          value: '5'
        }
      ],
      formInline: {}
    }
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
.backBox {
  display: flex;
  align-items: center;
  text-align: left;
}
.title {
  line-height: 80px;
  text-align: left;
  font-size: 24px;
  padding-left: 30px;
}
.formItem {
  border-bottom: 1px solid;
}
.information {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>