<template>
  <div>
    <h2>双向转诊单</h2>
    
    <div class="formBox">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="textAlign:left"
        label-width="120px">
          <el-row>
              <titleBox titleName="转入方信息"></titleBox>
              <el-form-item label="转入机构名称：">
                <el-input v-model="formInline.organizationName" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-row>
          <el-row>
              <titleBox titleName="患者信息"></titleBox>
              <el-form-item label="患者名称：">
                <el-input v-model="formInline.name" placeholder="请输入内容"></el-input>
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
              <el-form-item label="年龄：">
                <el-input-number
                  v-model="formInline.age"
                  :min="0"
                ></el-input-number>
              </el-form-item>
          </el-row>
          <el-row>
              <titleBox titleName="疾病信息"></titleBox>
              <el-form-item label="初步印象：" label-width="200px">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="width:800px" v-model="formInline.organizationName" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="主要现病史（转出原因）：" label-width="200px">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="width:800px" v-model="formInline.organizationName" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="主要既往史：" label-width="200px">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="width:800px" v-model="formInline.organizationName" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="治疗经过：" label-width="200px">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" style="width:800px" v-model="formInline.organizationName" placeholder="请输入内容"></el-input>
              </el-form-item>
          </el-row>
          <el-row>
              <titleBox titleName="转出方信息"></titleBox>
              <el-form-item label="转诊医生：">
                <el-input v-model="formInline.organizationName" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="联系电话：">
                <el-input v-model="formInline.organizationName" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="转出机构名称：">
                <el-input v-model="formInline.organizationName" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="申请时间：">
                <el-date-picker v-model="formInline.upTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
          </el-row>
      </el-form>
    </div>
    <div class="buttonList">
      <el-button
        type="primary"
        @click="submit(2)"
      >提交</el-button>
      <!-- <el-button
        type="primary"
        @click="submit(1)"
      >保存提交</el-button>
      <el-button
        type="primary"
        @click="back"
      >撤回</el-button> -->
    </div>
  </div>
</template>

<script>
import mixin from '@/mixins'
import titleBox from '@/components/title/index'
export default {
  name: 'turnApplication',
  mixins: [mixin],
  components: {
    titleBox
  },
  data() {
    return {
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
      formInline: {}
    }
  },
}
</script>

<style>

</style>