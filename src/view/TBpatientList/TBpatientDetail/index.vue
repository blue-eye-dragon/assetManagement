<template>
  <div>
    <h2 style="textAlign:left;lineHeight:40px">结核病初诊登记</h2>

    <div class="formBox">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="textAlign:left"
        label-width="120px"
      >
        <el-row>
          <titleBox titleName="基本信息"></titleBox>
          <el-form-item label="门诊编号：">
            <el-input
              v-model="formInline.id"
              placeholder="编号"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input
              v-model="formInline.name"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select
              v-model="formInline.gender"
              placeholder="请选择"
              style="width:220px"
            >
              <el-option
                v-for="item in genderList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="年龄：">
            <el-input-number
              v-model="formInline.age"
              :min="0"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="证件类型：">
            <el-select
              v-model="formInline.certificateType"
              placeholder="请选择"
              style="width:220px"
            >
              <el-option
                v-for="item in certificateTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="证件号：">
            <el-input
              v-model="formInline.certificateNum"
              placeholder="证件号"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="联系电话：">
            <el-input
              v-model="formInline.iphone"
              placeholder="联系电话"
            ></el-input>
          </el-form-item>
          <el-form-item label="职业：">
            <el-select
              v-model="formInline.professionalType"
              placeholder="请选择"
              style="width:220px"
            >
              <el-option
                v-for="item in professionalTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="户籍类型：">
            <el-radio-group v-model="formInline.householdType">
              <el-radio :label="1">本地</el-radio>
              <el-radio :label="2">外地</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="户籍地址：">
            <el-cascader
              v-model="formInline.household1"
              :options="householdOptions"
              :props="{ expandTrigger: 'hover' }"
              @change="householdChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input
              type="textarea"
              style="width:500px"
              v-model="formInline.household2"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="居住地址：">
            <el-cascader
              v-model="formInline.address1"
              :options="addressOptions"
              :props="{ expandTrigger: 'hover' }"
              @change="addressChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input
              type="textarea"
              style="width:500px"
              v-model="formInline.address2"
              placeholder="请输入详细地址"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <titleBox titleName="疾病相关信息"></titleBox>
          <el-form-item label="患者来源：">
            <el-radio-group v-model="formInline.patientsSource">
              <el-radio
                :label="item.value"
                v-for="item in patientsSourceList"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row type="flex">
          <el-form-item
            label="目前症状："
            style="display: flex;"
          >
            <el-radio-group v-model="formInline.symptoms">
              <el-radio
                :label="item.value"
                v-for="item in symptomsList"
                :key="item.value"
              >{{item.label}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            style="marginLeft:50px"
            v-if="formInline.symptoms == 1"
          >
            <el-radio-group v-model="formInline.symptomsCough">
              <el-radio :label="1">≥2周</el-radio>
              <el-radio :label="2">＜2周</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            style="marginLeft:50px"
            v-if="formInline.symptoms == 9"
          >
            <el-input
              v-model="formInline.symptomsOther"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="结核病史：">
            <el-radio-group v-model="formInline.TBhistory">
              <el-radio :label="1">有</el-radio>
              <el-radio :label="2">无</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="胸片来源：">
            <el-radio-group v-model="formInline.ChestXRraySource">
              <el-radio :label="1">免费</el-radio>
              <el-radio :label="2">自带</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="结果：">
            <el-input
              type="textarea"
              style="width:400px"
              v-model="formInline.ChestXRraySourceResult"
              placeholder="请输入结果"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="痰涂片结果：">
            <div style="display: flex;">
              <el-input
                v-model="formInline.smearResult1"
                placeholder="结果1"
              ></el-input>
              <el-input
                v-model="formInline.smearResult2"
                placeholder="结果2"
                style="margin: 0 20px"
              ></el-input>
              <el-input
                v-model="formInline.smearResult3"
                placeholder="结果3"
              ></el-input>
            </div>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="治疗处理：">
            <el-input
              type="textarea"
              style="width:600px"
              v-model="formInline.treatment"
              placeholder="请输入结果"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="患者登记号：">
            <el-input
              v-model="formInline.registerNum"
              placeholder="结果3"
            ></el-input>
          </el-form-item>
          <el-form-item label="推荐单位：">
            <el-input
              type="textarea"
              v-model="formInline.referred"
              placeholder="请输入内容"
              style="width:400px"
            ></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="推荐人：">
            <el-input
              v-model="formInline.reportor"
              placeholder="推荐人"
            ></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              v-model="formInline.remarks"
              placeholder="请输入内容"
              style="width:400px"
            ></el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="buttonList">
      <el-button
        type="primary"
        @click="submit(2)"
      >暂存</el-button>
      <el-button
        type="primary"
        @click="submit(1)"
      >保存提交</el-button>
      <el-button
        type="primary"
        @click="back"
      >撤回</el-button>
    </div>
  </div>
</template>

<script>
import mixin from '@/mixins'
import titleBox from '@/components/title/index'
export default {
  name: 'TBpatientDetail',
  mixins: [mixin],
  components: {
    titleBox
  },
  data () {
    return {
      title: '结核病初诊登记',
      genderList: [
        {
          label: '男',
          value: 1
        },
        {
          label: '女',
          value: 2
        },
        {
          label: '不详',
          value: 3
        }
      ],
      certificateTypeList: [
        {
          label: '居民身份证',
          value: 1
        },
        {
          label: '居民身份证',
          value: 9
        }
      ],
      professionalTypeList: [
        // {
        //   label: '',
        //   value: 1
        // }
      ],
      addressOptions: [],
      householdOptions: [],
      patientsSourceList: [
        {
          label: '因症就诊',
          value: 1
        },
        {
          label: '转症',
          value: 2
        },
        {
          label: '追踪',
          value: 3
        },
        {
          label: '因症推荐',
          value: 4
        },
        {
          label: '接触者检查',
          value: 5
        },
        {
          label: '健康检查',
          value: 6
        },
        {
          label: '其他',
          value: 9
        }
      ],
      symptomsList: [
        {
          label: '咳嗽咳痰',
          value: 1
        },
        {
          label: '咯血或血痰',
          value: 2
        },
        {
          label: '其他',
          value: 9
        }
      ],
      formInline: {}
    }
  },
  mounted () {
  },
  methods: {
    addressChange () { },
    householdChange () { }
  },
}
</script>

<style lang="less" scoped>
.title {
  line-height: 50px;
  font-size: 20px;
}
</style>