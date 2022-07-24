<template>
  <div class="cardInformation">
    <el-button
      class="patientBtn"
      type="primary"
      @click="openDiagon"
    >患者资料</el-button>
    <el-tabs
      v-model="activeName"
      type="card"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="传染病页一"
        name="first"
      >
        <h3>中华人民共和国传染病报告卡</h3>
        <el-row>
          <el-col
            :span="12"
            style="textAlign:left"
          >
            卡片编号：
            <el-input
              v-model="cardId"
              placeholder="请输入内容"
              style="width:200px"
            ></el-input>
          </el-col>
          <el-col :span="12">
            报卡类别：
            <el-select
              v-model="cardType"
              placeholder="请选择"
              style="width:200px"
            >
              <el-option
                label="初次报告"
                :value="1"
              ></el-option>
              <el-option
                label="订正报告"
                :value="2"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div style="padding:20px" class="mediaClass">
          <el-form
            ref="form"
            :model="form"
            label-width="85px"
            class="formOne"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="患者姓名：">
                  <el-input
                    v-model="form.name"
                    placeholder="请输入患者姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="( 患儿家长姓名 )："
                  label-width="130px"
                >
                  <el-input
                    v-model="form.name"
                    placeholder="请输入患儿家长姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="有效证件号："
                  label-width="100px"
                >
                  <el-input
                    v-model="form.name"
                    placeholder="请输入有效证件号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="性别：">
                  <el-radio-group v-model="form.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="出生日期：">
                  <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="*如出生日期不详，实足年龄："
                  label-width="210px"
                >
                  <el-input
                    v-model="form.age"
                    placeholder="请输入年龄"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="年龄单位：">
                  <template>
                    <el-select
                      v-model="form.ageType"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in option"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item
                  label="工作单位（幼儿园、学校或单位）："
                  label-width="240px"
                >
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="form.textarea1"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：">
                  <el-input
                    v-model="form.iphone"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="病人属于：">
                  <el-radio-group v-model="form.home">
                    <el-radio :label="1">本县区</el-radio>
                    <el-radio :label="2">本市其它县区</el-radio>
                    <el-radio :label="3">本省其他城市</el-radio>
                    <el-radio :label="4">其它省</el-radio>
                    <el-radio :label="5">港澳台</el-radio>
                    <el-radio :label="6">外籍</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="详细地址：">
                  <el-cascader
                    v-model="form.adress"
                    :options="options1"
                    @change="handleChange"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="精确到门牌号："
                  label-width="130px"
                >
                  <el-input
                    v-model="form.doorId"
                    placeholder="请输入门牌号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="人群分类：">
                  <el-radio-group
                    v-model="form.peopleType"
                    class="alignGrounp"
                  >
                    <el-radio
                      v-for="item in peopleTypeList"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-input
                    style="width: 300px;"
                    v-if="form.peopleType == 19"
                    v-model="form3.peopleTypeOther"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item
                  label="发病日期（病原携带者填写诊断日期）："
                  label-width="270px"
                >
                  <el-date-picker
                    v-model="form.data1"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="诊断日期：">
                  <el-date-picker
                    v-model="form.data2"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="死亡日期：">
                  <el-date-picker
                    v-model="form.data3"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="病历分类：">
                  <div>（1）：
                    <el-radio-group v-model="form.caseType1">
                      <el-radio :label="1">临床诊断病例</el-radio>
                      <el-radio :label="2">确诊病例</el-radio>
                      <el-radio :label="3">疑似病例</el-radio>
                      <el-radio :label="4">病原携带者</el-radio>
                    </el-radio-group>
                  </div>
                  <div>（2）：
                    <el-radio-group v-model="form.caseType2">
                      <el-radio :label="1">急性</el-radio>
                      <el-radio :label="2">慢性</el-radio>
                    </el-radio-group>（仅限乙型肝炎、血吸虫病填写）
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="传染病页二"
        name="second"
      >
        <div style="padding:20px" class="mediaClass">
          <el-form
            ref="form2"
            :model="form2"
            label-width="100px"
            class="formBorder formTwo"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="甲类传染病：">
                  <el-radio-group v-model="form2.contagionA">
                    <el-radio
                      v-for="item in contagionAList"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="乙类传染病：">
                  <el-radio-group
                    v-model="form2.contagionB"
                    class="alignGrounp"
                  >
                    <el-radio
                      v-for="item in contagionBList"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-radio-group
                    v-model="form2.viralHepatitis"
                    v-if="form2.contagionB == 3"
                  >
                    <el-radio
                      v-for="item in viralHepatitis"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-radio-group
                    v-model="form2.anthrax"
                    v-if="form2.contagionB == 11"
                  >
                    <el-radio
                      v-for="item in anthrax"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-radio-group
                    v-model="form2.diarrhea"
                    v-if="form2.contagionB == 12"
                  >
                    <el-radio
                      v-for="item in diarrhea"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-radio-group
                    v-model="form2.phthisis"
                    v-if="form2.contagionB == 13"
                  >
                    <el-radio
                      v-for="item in phthisis"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-radio-group
                    v-model="form2.Typhoid"
                    v-if="form2.contagionB == 14"
                  >
                    <el-radio
                      v-for="item in Typhoid"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-radio-group
                    v-model="form2.syphilis"
                    v-if="form2.contagionB == 22"
                  >
                    <el-radio
                      v-for="item in syphilis"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-radio-group
                    v-model="form2.malaria"
                    v-if="form2.contagionB == 25"
                  >
                    <el-radio
                      v-for="item in malaria"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="丙类传染病：">
                  <el-radio-group
                    v-model="form2.contagionC"
                    class="alignGrounp"
                  >
                    <el-radio
                      v-for="item in contagionCList"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="其他法定管理以及重点监测传染病："
                  label-width="240px"
                >
                  <el-input
                    v-model="form.otherContagion"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="密切接触者有无相同症状："
                  label-width="185px"
                >
                  <el-radio-group v-model="form2.same">
                    <el-radio :label="1">无</el-radio>
                    <el-radio :label="2">有</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  label="订正病名："
                  label-width="85px"
                >
                  <el-input
                    v-model="form.otherContagion"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="报告单位："
                  label-width="85px"
                >
                  <el-input
                    v-model="form.otherContagion"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="报告医生："
                  label-width="85px"
                >
                  <el-input
                    v-model="form.otherContagion"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  label="退卡原因："
                  label-width="85px"
                >
                  <el-input
                    v-model="form.otherContagion"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="联系电话："
                  label-width="85px"
                >
                  <el-input
                    v-model="form.otherContagion"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="填卡日期："
                  label-width="85px"
                >
                  <el-date-picker
                    v-model="form.data"
                    type="date"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item
                  label="备注："
                  label-width="60px"
                >
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="form2.note"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
      <el-tab-pane
        label="性病页一"
        name="third"
      >
        <h3>中华人民共和国性病报告卡</h3>
        <el-row>
          <el-col
            :span="12"
            style="textAlign:left"
          >
            卡片编号：
            <el-input
              v-model="cardId"
              placeholder="请输入内容"
              style="width:200px"
            ></el-input>
          </el-col>
          <el-col :span="12">
            报卡类别：
            <el-select
              v-model="cardType"
              placeholder="请选择"
              style="width:200px"
            >
              <el-option
                label="初次报告"
                :value="1"
              ></el-option>
              <el-option
                label="订正报告"
                :value="2"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <div style="padding:20px" class="mediaClass">
          <el-form
            ref="form"
            :model="form3"
            label-width="85px"
            class="formOne"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item label="患者姓名：">
                  <el-input
                    v-model="form3.name"
                    placeholder="请输入患者姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="( 患儿家长姓名 )："
                  label-width="130px"
                >
                  <el-input
                    v-model="form3.parentsName"
                    placeholder="请输入患儿家长姓名"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="性别：">
                  <el-radio-group v-model="form3.sex">
                    <el-radio :label="1">男</el-radio>
                    <el-radio :label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="有效证件号："
                  label-width="100px"
                >
                  <el-input
                    v-model="form3.idcard"
                    placeholder="请输入有效证件号"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="证件类型：">
                  <el-select
                    v-model="form3.idcardType"
                    placeholder="请选择"
                  >
                    <el-option
                      label="身份证"
                      :value="1"
                    ></el-option>
                    <el-option
                      label="社保卡"
                      :value="2"
                    ></el-option>
                    <el-option
                      label="其他"
                      :value="3"
                    ></el-option>
                  </el-select>
                  <el-input
                    style="width: 300px;"
                    v-if="form3.idcardType == 3"
                    v-model="form3.idcardTypeOther"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="实足年龄：">
                  <el-input
                    v-model="form3.age"
                    placeholder="请输入年龄"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="年龄单位：">
                  <template>
                    <el-select
                      v-model="form3.ageType"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in option"
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"
                      >
                      </el-option>
                    </el-select>
                  </template>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item
                  label="新生儿等填写出生日期："
                  label-width="170px"
                >
                  <el-date-picker
                    v-model="form3.birthday"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item
                  label="孕妇怀孕（周）："
                  label-width="170px"
                >
                  <el-input-number
                    v-model="form3.num"
                    controls-position="right"
                    @change="handleChange"
                    :min="1"
                    :max="50"
                  ></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="18">
                <el-form-item label="病人属于：">
                  <el-radio-group v-model="form3.home">
                    <el-radio :label="1">本县区</el-radio>
                    <el-radio :label="2">本市其它县区</el-radio>
                    <el-radio :label="3">本省其他城市</el-radio>
                    <el-radio :label="4">其它省</el-radio>
                    <el-radio :label="5">港澳台</el-radio>
                    <el-radio :label="6">外籍</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="详细地址：">
                  <el-cascader
                    v-model="form3.adress"
                    :options="options1"
                    @change="handleChange"
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  label="精确到门牌号："
                  label-width="130px"
                >
                  <el-input
                    v-model="form3.doorId"
                    placeholder="请输入门牌号"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="工作单位：">
                  <el-input
                    type="textarea"
                    autosize
                    placeholder="请输入内容"
                    v-model="form3.workPlace"
                  >
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话：">
                  <el-input
                    v-model="form3.iphone"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="患者职业：">
                  <el-radio-group
                    v-model="form3.patientsType"
                    class="alignGrounp"
                  >
                    <el-radio
                      v-for="item in patientsTypeList"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-input
                    style="width: 300px;"
                    v-if="form3.patientsType == 20"
                    v-model="form3.patientsTypeOther"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="病历分类：">
                  <div>
                    <el-radio-group v-model="form3.caseType">
                      <el-radio :label="1">临床诊断病例</el-radio>
                      <el-radio :label="2">实验室确诊病例</el-radio>
                      <el-radio :label="3">疑似病例</el-radio>
                      <el-radio :label="4">病原携带者</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="传染来源：">
                  <div>
                    <el-radio-group v-model="form3.surce">
                      <el-radio :label="1">非婚异性性接触</el-radio>
                      <el-radio :label="2">配偶</el-radio>
                      <el-radio :label="3">同性性接触</el-radio>
                      <el-radio :label="4">母婴传播</el-radio>
                      <el-radio :label="5">血液传播</el-radio>
                      <el-radio :label="6">不详</el-radio>
                    </el-radio-group>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="10">
                <el-form-item
                  label="发病日期（病原携带者填写诊断日期）："
                  label-width="270px"
                >
                  <el-date-picker
                    v-model="form3.accidentDate"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="诊断日期：">
                  <el-date-picker
                    v-model="form3.diagnosisDate"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="死亡日期：">
                  <el-date-picker
                    v-model="form3.deathDate"
                    type="date"
                    placeholder="选择日期"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

      </el-tab-pane>
      <el-tab-pane
        label="性病页二"
        name="fourth"
      >
        <div style="padding:20px" class="mediaClass">
          <el-form
            ref="form4"
            :model="form4"
            label-width="85px"
            class="formBorder formTwo"
          >
            <el-row>
              <el-col :span="24">
                <el-form-item label="疾病名称：">
                  <el-radio-group
                    v-model="form4.diseaseName"
                    class="alignGrounp"
                  >
                    <el-radio
                      v-for="item in diseaseNameList"
                      :label="item.value"
                      :key="item.value"
                    >{{item.label}}</el-radio>
                  </el-radio-group>
                  <el-input
                    style="width: 300px;"
                    v-if="form4.diseaseName == 12"
                    v-model="form4.diseaseNameOther"
                    placeholder="请输入内容"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <p class="title">实验室检测结果：</p>
                <p class="title">1、梅毒：</p>
                <p class="title header1">成人/患儿生母填写：</p>
                <el-col :span="24">
                  <el-form-item
                    label="滴度："
                    label-width="55px"
                  >
                    <el-radio-group v-model="form4.adultTiter">
                      <el-radio :label="0">1：1</el-radio>
                      <el-radio :label="1">1：2</el-radio>
                      <el-radio :label="2">1：4</el-radio>
                      <el-radio :label="3">1：8</el-radio>
                      <el-radio :label="4">1：16</el-radio>
                      <el-radio :label="5">1：32</el-radio>
                      <el-radio :label="6">1：64及以上</el-radio>
                      <el-radio :label="7">无</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="TRUST/RPR：">
                    <el-radio-group v-model="form4.adultTRUST">
                      <el-radio :label="0">没检测</el-radio>
                      <el-radio :label="1">阴性</el-radio>
                      <el-radio :label="2">阳性</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="TPPA/TPHA：">
                    <el-radio-group v-model="form4.adultTPPA">
                      <el-radio :label="0">没检测</el-radio>
                      <el-radio :label="1">阴性</el-radio>
                      <el-radio :label="2">阳性</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <p class="title header1">患儿填写：</p>
                <el-col :span="24">
                  <el-form-item
                    label="滴度："
                    label-width="55px"
                  >
                    <el-radio-group v-model="form4.childrenTiter">
                      <el-radio :label="0">1：1</el-radio>
                      <el-radio :label="1">1：2</el-radio>
                      <el-radio :label="2">1：4</el-radio>
                      <el-radio :label="3">1：8</el-radio>
                      <el-radio :label="4">1：16</el-radio>
                      <el-radio :label="5">1：32</el-radio>
                      <el-radio :label="6">1：64及以上</el-radio>
                      <el-radio :label="7">无</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="TRUST/RPR：">
                    <el-radio-group v-model="form4.childrenTRUST">
                      <el-radio :label="0">没检测</el-radio>
                      <el-radio :label="1">阴性</el-radio>
                      <el-radio :label="2">阳性</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="TPPA/TPHA：">
                    <el-radio-group v-model="form4.childrenTPPA">
                      <el-radio :label="0">没检测</el-radio>
                      <el-radio :label="1">阴性</el-radio>
                      <el-radio :label="2">阳性</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item
                    label="19S-IgM-TPPA："
                    label-width="125px"
                  >
                    <el-radio-group v-model="form4.children19TPPA">
                      <el-radio :label="0">没检测</el-radio>
                      <el-radio :label="1">阴性</el-radio>
                      <el-radio :label="2">阳性</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <p class="title header1">其它：</p>
                <el-col :span="24">
                  <el-form-item label-width="0px">
                    <el-radio-group v-model="form4.otherResult">
                      <el-radio :label="0">暗视野阳性</el-radio>
                      <el-radio :label="1">ELISA阳性</el-radio>
                      <el-radio :label="2">VDRL阳性</el-radio>
                      <el-radio :label="3">FTA-ABS阳性</el-radio>
                      <el-radio :label="4">脑脊液检测</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <p class="title">2、淋病：</p>
                <el-col :span="24">
                  <el-form-item
                    label="项目："
                    label-width="55px"
                  >
                    <el-radio-group v-model="form4.gonorrhoeaSub">
                      <el-radio :label="0">涂片</el-radio>
                      <el-radio :label="1">培养</el-radio>
                      <el-radio :label="2">核酸检测</el-radio>
                      <el-radio :label="3">其它</el-radio>
                    </el-radio-group>
                    <el-input
                      style="width: 300px;margin-left:30px"
                      v-if="form4.gonorrhoeaSub == 3"
                      v-model="form4.onorrhoeaSubOther"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="结果："
                    label-width="55px"
                  >
                    <el-radio-group v-model="form4.gonorrhoeaResult">
                      <el-radio :label="0">阴性</el-radio>
                      <el-radio :label="1">阳性</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <p class="title">临床表现：</p>
                <el-col :span="24">
                  <el-form-item label="1、梅毒：">
                    <el-radio-group v-model="form4.syphilisSymptoms">
                      <el-radio :label="0">头孢曲松</el-radio>
                      <el-radio :label="1">多西环素</el-radio>
                      <el-radio :label="2">皮疹</el-radio>
                      <el-radio :label="5">粘膜症状</el-radio>
                      <el-radio :label="6">神经症状</el-radio>
                      <el-radio :label="7">心血管症状</el-radio>
                      <el-radio :label="8">骨骼症状</el-radio>
                      <el-radio :label="9">其它</el-radio>
                    </el-radio-group>
                    <el-input
                      style="width: 250px;margin-left:30px"
                      v-if="form4.syphilisSymptoms == 9"
                      v-model="form4.syphilisSymptomsOther"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="2、淋病：">
                    <el-radio-group v-model="form4.gonorrheaSymptoms">
                      <el-radio :label="0">无症状</el-radio>
                      <el-radio :label="1">尿道炎</el-radio>
                      <el-radio :label="2">阴道炎</el-radio>
                      <el-radio :label="3">宫颈炎</el-radio>
                      <el-radio :label="4">直肠炎</el-radio>
                      <el-radio :label="5">咽炎</el-radio>
                      <el-radio :label="6">眼结膜炎</el-radio>
                      <el-radio :label="7">其它</el-radio>
                    </el-radio-group>
                    <el-input
                      style="width: 300px;margin-left:30px"
                      v-if="form4.gonorrheaSymptoms == 7"
                      v-model="form4.gonorrheaSymptomsOther"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <p class="title">治疗：</p>
                <el-col :span="24">
                  <el-form-item label="1、梅毒：">
                    <el-radio-group v-model="form4.syphilisMedicine">
                      <el-radio :label="1">头孢曲松</el-radio>
                      <el-radio :label="2">多西环素</el-radio>
                      <el-radio :label="3">盐酸四环素</el-radio>
                      <el-radio :label="4">其它药物</el-radio>
                    </el-radio-group>
                    <el-input
                      style="width: 300px;margin-left:30px"
                      v-if="form4.syphilisMedicine == 4"
                      v-model="form4.syphilisMedicineOther"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="2、淋病：">
                    <el-radio-group v-model="form4.gonorrheaMedicine">
                      <el-radio :label="1">头孢曲松</el-radio>
                      <el-radio :label="2">大观霉素</el-radio>
                      <el-radio :label="3">头孢噻肟</el-radio>
                      <el-radio :label="4">其它药物</el-radio>
                    </el-radio-group>
                    <el-input
                      style="width: 300px;margin-left:30px"
                      v-if="form4.gonorrheaMedicine == 4"
                      v-model="form4.gonorrheaMedicineOther"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报告单位：">
                    <el-input
                      v-model="form4.reporting"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="订正病名：">
                    <el-input
                      v-model="form4.revisedName"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报告医生：">
                    <el-input
                      v-model="form4.reportingDoctor"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    label="备注："
                    label-width="60px"
                  >
                    <el-input
                      v-model="form4.remark"
                      placeholder="请输入内容"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="填卡日期：">
                    <el-date-picker
                      v-model="form4.fillingDate"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                  <el-form-item label="收卡日期：">
                    <el-date-picker
                      v-model="form4.collectionDate"
                      type="date"
                      placeholder="选择日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
    <div class="buttonList">
      <el-button
        type="primary"
        @click="submit(2)"
      >暂存</el-button>
      <el-button
        v-if="userType == '1'"
        type="primary"
        @click="submit(1)"
      >保存提交</el-button>
      <el-button
        v-if="userType == '1'"
        type="primary"
        @click="back"
      >撤回</el-button>
      <el-button
        v-if="userType == '2'"
        type="primary"
        @click="audit"
      >审核确认</el-button>
      <el-button
        v-if="userType == '2'"
        type="primary"
        @click="reject"
      >退回</el-button>
    </div>
    <div class="patientData">

    </div>
    <el-drawer
      :with-header="false"
      :modal="false"
      :visible.sync="table"
      style="position:absolute;"
      z-index="99"
      size="50%"
      direction="btt"
    >
      <el-tabs
        v-model="patientActive"
        type="card"
        @tab-click="changePatient"
      >
        <el-tab-pane
          v-for="item in patientTabList"
          :key="item.value"
          :label="item.label"
          :name="item.value"
        >

        </el-tab-pane>
      </el-tabs>
    </el-drawer>
    <el-dialog
      title="请选择疾病类型"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="30%"
      center
    >
      <el-select
        v-model="selectDiseasesType"
        placeholder="请选择"
      >
        <el-option
          v-for="item in diseasesTypeList"
          :label="item.label"
          :value="item.value"
          :key="item.value"
        >
        </el-option>
      </el-select>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="closeDialog"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'cardInformation',
  data () {
    return {
      table: false,
      media: false,
      dialogVisible: false,
      activeName: 'first',
      patientActive: 1,
      cardId: '',
      cardType: '',
      options1: [],
      userType: '1',
      selectDiseasesType: '',
      patientTabList: [
        {
          label: '基本信息',
          value: 1
        },
        {
          label: '诊断信息',
          value: 2
        },
        {
          label: '医嘱信息',
          value: 3
        },
        {
          label: '影像报告',
          value: 4
        },
        {
          label: '常规检验',
          value: 5
        },
        {
          label: '微生物检验',
          value: 6
        },
        {
          label: '历史报卡',
          value: 7
        }
      ],
      peopleTypeList: [
        {
          label: '幼托儿童',
          value: 1
        },
        {
          label: '散居儿童',
          value: 2
        },
        {
          label: '学生（大、中、小学）',
          value: 3
        },
        {
          label: '教师',
          value: 4
        },
        {
          label: '保育员及保姆',
          value: 5
        },
        {
          label: '餐饮食品业',
          value: 6
        },
        {
          label: '公共场所服务员',
          value: 7
        },
        {
          label: '商务服务',
          value: 8
        },
        {
          label: '医务人员',
          value: 9
        },
        {
          label: '工人',
          value: 10
        },
        {
          label: '农名',
          value: 11
        },
        {
          label: '牧民',
          value: 12
        },
        {
          label: '渔（船）民',
          value: 13
        },
        {
          label: '海员及长途驾驶员',
          value: 14
        },
        {
          label: '干部职员',
          value: 15
        },
        {
          label: '离退人员',
          value: 16
        },
        {
          label: '家务及待业',
          value: 17
        },
        {
          label: '不详',
          value: 18
        },
        {
          label: '其他',
          value: 19
        }
      ],
      patientsTypeList: [
        {
          label: '幼托儿童',
          value: 1
        },
        {
          label: '散居儿童',
          value: 2
        },
        {
          label: '学生（大、中、小学）',
          value: 3
        },
        {
          label: '教师',
          value: 4
        },
        {
          label: '保育员及保姆',
          value: 5
        },
        {
          label: '餐饮食品业',
          value: 6
        },
        {
          label: '公共场所服务员',
          value: 7
        },
        {
          label: '商务服务',
          value: 8
        },
        {
          label: '医务人员',
          value: 9
        },
        {
          label: '工人',
          value: 10
        },
        {
          label: '民工',
          value: 11
        },
        {
          label: '农民',
          value: 12
        },
        {
          label: '牧民',
          value: 13
        },
        {
          label: '渔（船）民',
          value: 14
        },
        {
          label: '海员及长途驾驶员',
          value: 15
        },
        {
          label: '干部职员',
          value: 16
        },
        {
          label: '离退人员',
          value: 17
        },
        {
          label: '家务及待业',
          value: 18
        },
        {
          label: '不详',
          value: 19
        },
        {
          label: '其他',
          value: 20
        }
      ],
      medicalList: [
        {

        }
      ],
      option: [
        { label: '岁', value: 1 },
        { label: '月', value: 2 },
        { label: '天', value: 3 },
      ],
      contagionAList: [
        {
          label: '鼠疫',
          value: 1
        },
        {
          label: '霍乱',
          value: 2
        }
      ],
      contagionBList: [
        {
          label: '传染性非典',
          value: 1
        },
        {
          label: '艾滋病',
          value: 2
        },
        {
          label: '病毒性肝炎',
          value: 3
        },
        {
          label: '脊灰',
          value: 4
        },
        {
          label: '人禽流感',
          value: 5
        },
        {
          label: '麻疹',
          value: 6
        },
        {
          label: '出血热',
          value: 7
        },
        {
          label: '狂犬病',
          value: 8
        },
        {
          label: '乙脑',
          value: 9
        },
        {
          label: '登革热',
          value: 10
        },
        {
          label: '炭疽',
          value: 11
        },
        {
          label: '痢疾',
          value: 12
        },
        {
          label: '肺结核',
          value: 13
        },
        {
          label: '伤寒＋副伤寒',
          value: 14
        },
        {
          label: '流脑',
          value: 15
        },
        {
          label: '百日咳',
          value: 16
        },
        {
          label: '白喉',
          value: 17
        },
        {
          label: '新生儿破伤风',
          value: 18
        },
        {
          label: '猩红热',
          value: 19
        },
        {
          label: '布病',
          value: 20
        },
        {
          label: '淋病',
          value: 21
        },
        {
          label: '梅毒',
          value: 22
        },
        {
          label: '钩体病',
          value: 23
        },
        {
          label: '血吸虫病',
          value: 24
        },
        {
          label: '疟疾',
          value: 25
        },
        {
          label: '甲型H1N1流感',
          value: 26
        }
      ],
      contagionCList: [
        {
          label: '流行性感冒',
          value: 1
        },
        {
          label: '流行性腮腺炎',
          value: 2
        },
        {
          label: '风疹',
          value: 3
        },
        {
          label: '急性出血性结膜炎',
          value: 4
        },
        {
          label: '麻风病',
          value: 5
        },
        {
          label: '斑疹伤寒',
          value: 6
        },
        {
          label: '黑热病',
          value: 7
        },
        {
          label: '包虫病',
          value: 8
        },
        {
          label: '丝虫病',
          value: 9
        },
        {
          label: '其它感染性腹泻病',
          value: 10
        },
        {
          label: '手足口病',
          value: 11
        }
      ],
      diseaseNameList: [
        {
          label: '一期梅毒',
          value: 1
        },
        {
          label: '二期梅毒',
          value: 2
        },
        {
          label: '三期梅毒',
          value: 3
        },
        {
          label: '胎传梅毒',
          value: 4
        },
        {
          label: '隐形梅毒',
          value: 5
        },
        {
          label: '艾滋病',
          value: 6
        },
        {
          label: 'HIV',
          value: 7
        },
        {
          label: '淋病',
          value: 8
        },
        {
          label: '尖锐湿疣',
          value: 9
        },
        {
          label: '生殖器疱症',
          value: 10
        },
        {
          label: '生殖道沙眼衣原体感染',
          value: 11
        },
        {
          label: '其他',
          value: 12
        }
      ],
      viralHepatitis: [
        {
          label: '甲肝',
          value: 1
        },
        {
          label: '乙肝',
          value: 2
        },
        {
          label: '丙肝',
          value: 3
        },
        {
          label: '丁肝',
          value: 4
        },
        {
          label: '戊肝',
          value: 5
        },
        {
          label: '肝炎（未分型）',
          value: 6
        },
      ],
      anthrax: [
        {
          label: '炭疽',
          value: 1
        },
        {
          label: '皮肤炭疽',
          value: 2
        },
        {
          label: '炭疽（未分型）',
          value: 3
        }
      ],
      diarrhea: [
        {
          label: '细菌性痢疾',
          value: 1
        },
        {
          label: '阿米巴性痢疾',
          value: 2
        }
      ],
      phthisis: [
        {
          label: '涂（+）',
          value: 1
        },
        {
          label: '菌（-）',
          value: 2
        },
        {
          label: '未痰检',
          value: 3
        },
        {
          label: '仅培养',
          value: 4
        }
      ],
      Typhoid: [
        {
          label: '伤寒',
          value: 1
        },
        {
          label: '副伤寒',
          value: 2
        }
      ],
      syphilis: [
        {
          label: 'Ⅰ期梅毒',
          value: 1
        },
        {
          label: 'Ⅱ期梅毒',
          value: 2
        },
        {
          label: 'Ⅲ期梅毒',
          value: 3
        },
        {
          label: '胎传梅毒',
          value: 4
        },
        {
          label: '隐形梅毒',
          value: 5
        }
      ],
      malaria: [
        {
          label: '间日疟',
          value: 1
        },
        {
          label: '恶性疟',
          value: 2
        },
        {
          label: '疟疾（未分型）',
          value: 3
        }
      ],
      gridData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      diseasesTypeList: [
        {
          label: '传染病',
          value: 1
        },
        {
          label: '慢病',
          value: 2
        },
        {
          label: '精神障碍',
          value: 3
        },
        {
          label: '食源性疾病',
          value: 4
        },
        {
          label: '其他',
          value: 5
        }
      ],
      form: {},
      form2: {},
      form3: {},
      form4: {}
    }
  },
  created () {
    this.bus.$on('media', item => {
      this.media = item
    })
  },
  mounted () {
    const params = this.$route.params
    if (params.flag && params.flag == 'add') {
      this.dialogVisible = true
    }
    if (params.flag && params.flag == 'audit') {
      this.userType = '2'
    }
  },
  methods: {
    submit () {
      this.$router.push('/patientList')
    },
    back () {
      this.$router.push('/patientList')
    },
    audit () {
      this.$router.push('/patientList')
    },
    reject () {
      this.$router.push('/patientList')
    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    handleChange () { },
    openDiagon () {
      this.table = !this.table
    },
    changePatient () { },
    closeDialog () {
      if (this.selectDiseasesType !== '') {
        this.dialogVisible = false
        return false
      }
      this.$message.error('请优先选择疾病类型')
    },
  }
}
</script>

<style lang="less" scoped>
.cardInformation {
  height: 100%;
  position: relative;
  overflow: hidden;
  .el-col {
    padding: 0 20px;
  }
  .el-drawer.btt {
    padding-top: 10px;
  }
  .el-dialog__header {
    text-align: center;
    border-bottom: 0;
  }
  .alignGrounp {
    display: flex;
    flex-wrap: wrap;
    height: 80px;
    flex-direction: row;
    align-content: stretch;
    align-items: center;
  }
  .formBorder {
    border: 1px solid #2b2b2b;
    .el-row {
      padding-top: 10px;
      border-bottom: 1px solid;
      .title {
        text-align: left;
        padding: 5px 0;
      }
      .header1 {
        font-size: 14px;
      }
    }
  }
  .formOne {
    border: 1px solid;
    padding-top: 20px;
    height: calc(100vh - 310px);
    overflow: auto;
  }
  .formTwo {
    height: calc(100vh - 200px);
    overflow: auto;
  }
  .patientBtn {
    position: absolute;
    right: 20px;
    top: 40px;
    height: 35px;
    z-index: 999;
  }
}

@media screen and (max-width:1200px) {
  .cardInformation {
    .mediaClass {
      overflow-x: auto;
    }
    .formOne {
      border: 1px solid;
      padding-top: 20px;
      width: 250%;
      height: calc(100vh - 330px);
      overflow: auto;
    }
    .formTwo {
      width: 250%;
      height: calc(100vh - 200px);
      overflow: auto;
    }
    .alignGrounp {
      display: flex;
      flex-wrap: wrap;
      height: 80px;
      flex-direction: row;
      align-content: stretch;
      align-items: center;
    }
  }
} 
</style>