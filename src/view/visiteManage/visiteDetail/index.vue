<template>
  <div>
    <h2 style="textAlign:left;lineHeight:40px">{{flag == 'add'?'记录新增':'记录详情'}}</h2>
    <div class="formBox">
      <el-form
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        style="textAlign:left"
        label-width="120px"
      >
        <el-row>
            <el-form-item label="编号：">
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
            <el-form-item label="随访日期：">
                <el-date-picker
                  v-model="formInline.time"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="本次随访形式：">
              <el-select
                v-model="formInline.diseasesType"
                placeholder="请选择"
                style="width:220px"
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
            <el-form-item label="失访原因：">
              <el-select
                v-model="formInline.lostReason"
                placeholder="请选择"
                style="width:220px"
              >
                <el-option
                  v-for="item in lostReasonList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="死亡日期：">
                <el-date-picker
                  v-model="formInline.deathtime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="死亡原因：">
              <el-radio-group v-model="formInline.deathResult">
                <el-radio :label="item.value" v-for="item in deathResultList" :key="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row v-if="formInline.deathResult === 1">
            <el-form-item label="" style="marginLeft:120px">
              <el-radio-group v-model="formInline.deathResult2">
                <el-radio :label="item.value" v-for="item in deathResultList2" :key="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="危险评估：">
              <el-radio-group v-model="formInline.riskAssessment">
                <el-radio :label="item.value" v-for="item in riskAssessmentList" :key="item.value">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="目前症状：" style="display: flex;">
              <el-checkbox-group v-model="formInline.symptoms">
                <el-checkbox :label="item.value" v-for="item in symptomsList" :key="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="自知力：">
              <el-select
                v-model="formInline.selfKnowledge"
                placeholder="请选择"
                style="width:220px"
              >
                <el-option
                  v-for="item in selfKnowledgeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="睡眠情况：">
              <el-select
                v-model="formInline.sleepSituation"
                placeholder="请选择"
                style="width:220px"
              >
                <el-option
                  v-for="item in sleepSituationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="饮食情况：">
              <el-select
                v-model="formInline.dietSituation"
                placeholder="请选择"
                style="width:220px"
              >
                <el-option
                  v-for="item in dietSituationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="危险行为：">
              <el-select v-model="formInline.dangerBehavior" placeholder="请选择">
                <el-option
                  v-for="item in dangerBehaviorList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="次数：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.dangerBehaviorNum" placeholder="请输入次数" ></el-input-number>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="两次随访期间关锁情况：" label-width="200px">
              <el-select v-model="formInline.shutCase" placeholder="请选择">
                <el-option
                  v-for="item in shutCaseList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="两次随访期间住院情况：" label-width="200px">
              <el-select v-model="formInline.hospitalization" placeholder="请选择">
                <el-option
                  v-for="item in hospitalizationList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="末次出院时间：">
                <el-date-picker
                  v-model="formInline.time"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="实验室检查：">
              <el-select v-model="formInline.laboratoryTest" placeholder="请选择">
                <el-option
                  v-for="item in isNoList1"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用药依从性：">
              <el-select v-model="formInline.medicineComply" placeholder="请选择">
                <el-option
                  v-for="item in medicineComplyList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="药物不良反应：">
              <el-select v-model="formInline.medicineBed" placeholder="请选择">
                <el-option
                  v-for="item in isNoList2"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="反应症状" v-if="formInline.medicineBed === 2">
              <el-input type="textarea" v-model="formInline.medicineBedSymptom" placeholder="请输入内容" style="width:400px"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="治疗效果：">
              <el-select v-model="formInline.treatmentEffect" placeholder="请选择">
                <el-option
                  v-for="item in treatmentEffectList"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否转诊：">
              <el-select v-model="formInline.referral" placeholder="请选择">
                <el-option
                  v-for="item in isNoList1"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="转诊原因：" v-if="formInline.referral === 2" label-width="200px">
              <el-input v-model="formInline.referralReason" type="textarea" placeholder="请输入内容" style="width:600px"></el-input>
            </el-form-item>
            <el-form-item label="转诊至机构及科室：" v-if="formInline.referral === 2" label-width="200px">
              <el-input v-model="formInline.referralInstitutions" type="textarea" placeholder="请输入内容" style="width:600px"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
          <titleBox titleName="社会功能情况"></titleBox>
            <el-form-item label="个人生活料理：">
              <el-select v-model="formInline.selfCooking" placeholder="请选择">
                <el-option
                  v-for="item in SocialFunctionList1"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="学习能力：">
              <el-select v-model="formInline.selLearn" placeholder="请选择">
                <el-option
                  v-for="item in SocialFunctionList1"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="生产劳动及工作：" label-width="150px">
              <el-select v-model="formInline.labourWork" placeholder="请选择">
                <el-option
                  v-for="item in SocialFunctionList2"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="社会人际交往：">
              <el-select v-model="formInline.communication" placeholder="请选择">
                <el-option
                  v-for="item in SocialFunctionList1"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="家务劳动：">
              <el-select v-model="formInline.housework" placeholder="请选择">
                <el-option
                  v-for="item in SocialFunctionList1"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value">
                </el-option>
              </el-select>
            </el-form-item>
        </el-row>
        <el-row>
          <titleBox titleName="用药情况"></titleBox>
            <el-form-item label="药物1：">
              <el-input v-model="formInline.drug1" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="每日(月)：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug1Num" placeholder="请输入内容"></el-input-number> 次
            </el-form-item>
            <el-form-item label="每次剂量：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug1Dosage" placeholder="请输入内容"></el-input-number>mg
            </el-form-item>
            <el-form-item label="药物2：">
              <el-input v-model="formInline.drug2" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="每日(月)：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug2Num" placeholder="请输入内容"></el-input-number> 次
            </el-form-item>
            <el-form-item label="每次剂量：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug2Dosage" placeholder="请输入内容"></el-input-number>mg
            </el-form-item>
            <el-form-item label="药物3：">
              <el-input v-model="formInline.drug3" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="每日(月)：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug3Num" placeholder="请输入内容"></el-input-number> 次
            </el-form-item>
            <el-form-item label="每次剂量：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug3Dosage" placeholder="请输入内容"></el-input-number>mg
            </el-form-item>
        </el-row>
        <el-row>
          <titleBox titleName="用药指导"></titleBox>
            <el-form-item label="药物1：">
              <el-input v-model="formInline.drug1" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="每日(月)：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug1Num" placeholder="请输入内容"></el-input-number> 次
            </el-form-item>
            <el-form-item label="每次剂量：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug1Dosage" placeholder="请输入内容"></el-input-number>mg
            </el-form-item>
            <el-form-item label="药物2：">
              <el-input v-model="formInline.drug2" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="每日(月)：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug2Num" placeholder="请输入内容"></el-input-number> 次
            </el-form-item>
            <el-form-item label="每次剂量：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug2Dosage" placeholder="请输入内容"></el-input-number>mg
            </el-form-item>
            <el-form-item label="药物3：">
              <el-input v-model="formInline.drug3" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="每日(月)：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug3Num" placeholder="请输入内容"></el-input-number> 次
            </el-form-item>
            <el-form-item label="每次剂量：">
              <el-input-number controls-position="right" :min="0" v-model="formInline.drug3Dosage" placeholder="请输入内容"></el-input-number>mg
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="康复措施：">
              <el-checkbox-group v-model="formInline.recoveryMeasures">
                <el-checkbox :label="item.value" v-for="item in recoveryMeasuresList" :key="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="本次随访分类：">
            <el-select v-model="formInline.visiteClassification" placeholder="请选择">
              <el-option
                v-for="item in visiteClassificationList"
                :label="item.label"
                :value="item.value"
                :key="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="下次随访日期：">
              <el-date-picker
                v-model="formInline.lastTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
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
  name: 'visiteDetail',
  mixins: [mixin],
  components: {
    titleBox
  },
  data() {
    return {
      flag: 'add',
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
      lostReasonList: [
        {
          label: '外出打工',
          value: 1
        },
        {
          label: '迁居他处',
          value: 2
        },
        {
          label: '走失',
          value: 3
        },
        {
          label: '连续3次未到访',
          value: 4
        },
        {
          label: '其他',
          value: 5
        }
      ],
      deathResultList: [
        {
          label: '躯体疾病',
          value: 1
        },
        {
          label: '自杀',
          value: 2
        },
        {
          label: '他杀',
          value: 3
        },
        {
          label: '意外',
          value: 4
        },
        {
          label: '精神疾病相关并发症',
          value: 5
        },
        {
          label: '其他',
          value: 6
        }
      ],
      deathResultList2: [
        {
          label: '传染病和寄生虫病',
          value: 1
        },
        {
          label: '肿瘤',
          value: 2
        },
        {
          label: '心脏病',
          value: 3
        },
        {
          label: '脑血管病',
          value: 4
        },
        {
          label: '呼吸系统疾病',
          value: 5
        },
        {
          label: '消化系统疾病',
          value: 6
        },
        {
          label: '其他疾病',
          value: 7
        },
        {
          label: '不详',
          value: 8
        }
      ],
      riskAssessmentList: [
        {
          label: '0 级',
          value: 0
        },
        {
          label: '1 级',
          value: 1
        },
        {
          label: '2 级',
          value: 2
        },
        {
          label: '3 级',
          value: 3
        },
        {
          label: '4 级',
          value: 4
        },
        {
          label: '5 级',
          value: 5
        }
      ],
      symptomsList: [
        {
          label: '幻觉',
          value: 1
        },
        {
          label: '交流困难',
          value: 2
        },
        {
          label: '猜疑',
          value: 3
        },
        {
          label: '喜怒无常',
          value: 4
        },
        {
          label: '行为怪异',
          value: 5
        },
        {
          label: '兴奋话多',
          value: 6
        },
        {
          label: '伤人毁物',
          value: 7
        },
        {
          label: '悲观厌世',
          value: 8
        },
        {
          label: '无故外走',
          value: 9
        },
        {
          label: ' 自语自笑',
          value: 10
        },
        {
          label: '孤僻懒散',
          value: 11
        },
        {
          label: '其他',
          value: 12
        }
      ],
      selfKnowledgeList: [
        {
          label: '自知力完全',
          value: 1
        },
        {
          label: '自知力不全',
          value: 2
        },
        {
          label: '自知力缺失',
          value: 3
        }
      ],
      sleepSituationList: [
        {
          label: '良好',
          value: 1
        },
        {
          label: '一般',
          value: 2
        },
        {
          label: '较差',
          value: 3
        }
      ],
      dietSituationList: [
        {
          label: '良好',
          value: 1
        },
        {
          label: '一般',
          value: 2
        },
        {
          label: '较差',
          value: 3
        }
      ],
      SocialFunctionList1: [
        {
          label: '良好',
          value: 1
        },
        {
          label: '一般',
          value: 2
        },
        {
          label: '较差',
          value: 3
        }
      ],
      SocialFunctionList2: [
        {
          label: '良好',
          value: 1
        },
        {
          label: '一般',
          value: 2
        },
        {
          label: '较差',
          value: 3
        },
        {
          label: '此项不适用',
          value: 9
        }
      ],
      dangerBehaviorList: [
        {
          label: '轻度滋事',
          value: 1
        },
        {
          label: '肇事',
          value: 2
        },
        {
          label: '肇祸',
          value: 3
        },
        {
          label: '其他危害行为',
          value: 4
        },
        {
          label: '自伤',
          value: 5
        },
        {
          label: '自杀未遂',
          value: 6
        },
        {
          label: '无',
          value: 7
        }
      ],
      shutCaseList: [
        {
          label: '无关锁',
          value: 1
        },
        {
          label: '关锁',
          value: 2
        },
        {
          label: '关锁已解除',
          value: 3
        }
      ],
      hospitalizationList: [
        {
          label: '未住院',
          value: 0
        },
        {
          label: '目前正在住院',
          value: 1
        },
        {
          label: '曾住院，现未住院',
          value: 2
        }
      ],
      isNoList1: [
        {
          label: '无',
          value: 1
        },
        {
          label: '有',
          value: 2
        }
      ],
      isNoList2: [
        {
          label: '无',
          value: 1
        },
        {
          label: '有',
          value: 2
        },
        {
          label: '此项不适用',
          value: 9
        }
      ],
      medicineComplyList: [
        {
          label: '按医嘱规律用药',
          value: 1
        },
        {
          label: '间断用药',
          value: 2
        },
        {
          label: '不用药',
          value: 3
        },
        {
          label: '医嘱勿需用药',
          value: 4
        }
      ],
      treatmentEffectList: [
        {
          label: '痊愈',
          value: 1
        },
        {
          label: '好转',
          value: 2
        },
        {
          label: '无变化',
          value: 3
        },
        {
          label: '加重',
          value: 4
        },
        {
          label: '此项不适用',
          value: 9
        }
      ],
      recoveryMeasuresList: [
        {
          label: '生活劳动能力',
          value: 1
        },
        {
          label: '职业训练',
          value: 2
        },
        {
          label: '学习能力',
          value: 3
        },
        {
          label: '社会交往',
          value: 4
        },
        {
          label: '其他',
          value: 5
        }
      ],
      visiteClassificationList: [
        {
          label: '不稳定',
          value: 1
        },
        {
          label: '基本稳定',
          value: 2
        },
        {
          label: '稳定',
          value: 3
        }
      ],
      formInline: {
        symptoms: [],
        recoveryMeasures: []
      }
    }
  },
  mounted () {
    this.flag = this.$route.params.flag
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>
.title {
    line-height: 50px;
    font-size: 20px;
}
</style>