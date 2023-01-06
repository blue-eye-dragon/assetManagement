<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="物资领用统计表" name="first">
            <el-row class="searchForm">
                <el-col :span="18">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" >
                        <el-form-item label="查询时间：">
                            <el-date-picker
                                v-model="formInline.time"
                                type="monthrange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <!-- <el-form-item label="院区：">
                            <el-select v-model="formInline.department" placeholder="请选择院区"
                            >
                                <el-option
                                    v-for="item in departmentList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item> -->
                        <!-- <transition
                            :duration="{ enter: 800, leave: 100 }"
                            mode="out-in"
                            name="el-fade-in-linear"
                        >
                            <div class="selectMode" v-if="!isUpDown" >
                                <el-form-item label="科室：">
                                    <el-select v-model="formInline.department" placeholder="请选择科室" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                    </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="耗材类别：">
                                    <el-select v-model="formInline.department" placeholder="请选择耗材类别" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="术式：">
                                    <el-select v-model="formInline.department" placeholder="请选择术式" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </transition> -->
                    </el-form>
                </el-col>
                <el-col :span="6" style="textAlign:right">
                    <el-button size="medium" type="primary" @click="onSubmit" >查询</el-button>
                    <el-button size="medium" type="primary" @click="onSubmit" >重置</el-button>
                    <!-- <el-button size="medium" type="primary" :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'" @click="onUpDown" class="highSearch" >高级查询</el-button> -->
                </el-col>
            </el-row>
            <el-table
                :data="formData1"
                stripe
                border
                style="width: 100%"
                :cell-style="cellStyle"
                :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
            >
                <el-table-column  type="index"  width="50" label="序号"></el-table-column>
                <el-table-column prop="name0" label="院区"></el-table-column>
                <el-table-column label="物资类别">
                    <el-table-column prop="name1" label="高值医用耗材"></el-table-column>
                    <el-table-column prop="name2" label="低值医用耗材"></el-table-column>
                    <el-table-column prop="name3" label="检验试剂"></el-table-column>
                    <el-table-column prop="name4" label="其它"></el-table-column>
                </el-table-column>
                <el-table-column label="对比情况">
                    <el-table-column prop="name5" label="本年合计"></el-table-column>
                    <el-table-column prop="name6" label="上年合计"></el-table-column>
                    <el-table-column prop="name7" label="环比情况"></el-table-column>
                </el-table-column>
            </el-table>
            <el-pagination
                class="com-pagination"
                @size-change="search"
                @current-change="search"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :current-page.sync="pager1.page"
                :page-size.sync="pager1.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pager1.total"
            >
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="高值医用耗材领用情况表" name="second">
            <el-row class="searchForm">
                <el-col :span="18">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" >
                        <el-form-item label="查询时间：">
                            <el-date-picker
                                v-model="formInline.time"
                                type="monthrange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="院区：">
                            <el-select v-model="formInline.department" placeholder="请选择院区"
                            >
                                <el-option
                                    v-for="item in departmentList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <transition
                            :duration="{ enter: 800, leave: 100 }"
                            mode="out-in"
                            name="el-fade-in-linear"
                        >
                            <div class="selectMode" v-if="!isUpDown" >
                                <el-form-item label="科室：">
                                    <el-select v-model="formInline.department" placeholder="请选择科室" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                    </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="耗材类别：">
                                    <el-select v-model="formInline.department" placeholder="请选择耗材类别" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="术式：">
                                    <el-select v-model="formInline.department" placeholder="请选择术式" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </transition> -->
                    </el-form>
                </el-col>
                <el-col :span="6" style="textAlign:right">
                    <el-button size="medium" type="primary" @click="onSubmit" >查询</el-button>
                    <el-button size="medium" type="primary" @click="onSubmit" >重置</el-button>
                    <!-- <el-button size="medium" type="primary" :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'" @click="onUpDown" class="highSearch" >高级查询</el-button> -->
                </el-col>
            </el-row>
            <el-table
                :data="formData2"
                stripe
                border
                style="width: 100%"
                :cell-style="cellStyle"
                :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
            >
                <el-table-column  type="index"  width="50" label="序号"></el-table-column>
                <el-table-column prop="name0" label="专科"></el-table-column>
                <el-table-column prop="name1" label="科室"></el-table-column>
                <el-table-column label="高值医用耗材领用金额">
                    <el-table-column prop="name2" label="1月"></el-table-column>
                    <el-table-column prop="name3" label="2月"></el-table-column>
                    <el-table-column prop="name4" label="3月"></el-table-column>
                    <el-table-column prop="name5" label="合计"></el-table-column>
                </el-table-column>
                <el-table-column prop="name6" label="季度耗占比"></el-table-column>
            </el-table>
            <el-pagination
                class="com-pagination"
                @size-change="search"
                @current-change="search"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :current-page.sync="pager2.page"
                :page-size.sync="pager2.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pager2.total"
            >
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="医保重点管控耗材领用情况表" name="third">
            <el-row class="searchForm">
                <el-col :span="18">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" >
                        <el-form-item label="查询时间：">
                            <el-date-picker
                                v-model="formInline.time"
                                type="monthrange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="院区：">
                            <el-select v-model="formInline.department" placeholder="请选择院区"
                            >
                                <el-option
                                    v-for="item in departmentList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <!-- <transition
                            :duration="{ enter: 800, leave: 100 }"
                            mode="out-in"
                            name="el-fade-in-linear"
                        >
                            <div class="selectMode" v-if="!isUpDown" >
                                <el-form-item label="科室：">
                                    <el-select v-model="formInline.department" placeholder="请选择科室" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                    </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="耗材类别：">
                                    <el-select v-model="formInline.department" placeholder="请选择耗材类别" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="术式：">
                                    <el-select v-model="formInline.department" placeholder="请选择术式" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </transition> -->
                    </el-form>
                </el-col>
                <el-col :span="6" style="textAlign:right">
                    <el-button size="medium" type="primary" @click="onSubmit" >查询</el-button>
                    <el-button size="medium" type="primary" @click="onSubmit" >重置</el-button>
                    <!-- <el-button size="medium" type="primary" :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'" @click="onUpDown" class="highSearch" >高级查询</el-button> -->
                </el-col>
            </el-row>
            <el-table
                :data="formData3"
                stripe
                border
                style="width: 100%"
                :cell-style="cellStyle"
                :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
            >
                <el-table-column  type="index"  width="50" label="序号"></el-table-column>
                <el-table-column prop="name0" label="专科"></el-table-column>
                <el-table-column prop="name1" label="科室"></el-table-column>
                <el-table-column prop="name2" label="1月"></el-table-column>
                <el-table-column prop="name3" label="2月"></el-table-column>
                <el-table-column prop="name4" label="3月"></el-table-column>
                <el-table-column prop="name5" label="合计信息"></el-table-column>
            </el-table>
            <el-pagination
                class="com-pagination"
                @size-change="search"
                @current-change="search"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :current-page.sync="pager3.page"
                :page-size.sync="pager3.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pager3.total"
            >
            </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="医生医用耗材使用情况表" name="fourth">
            <el-row class="searchForm">
                <el-col :span="18">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px" >
                        <el-form-item label="查询时间：">
                            <el-date-picker
                                v-model="formInline.time"
                                type="monthrange"
                                align="right"
                                unlink-panels
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :picker-options="pickerOptions"
                            >
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="院区：">
                            <el-select v-model="formInline.department" placeholder="请选择院区"
                            >
                                <el-option
                                    v-for="item in departmentList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <transition
                            :duration="{ enter: 800, leave: 100 }"
                            mode="out-in"
                            name="el-fade-in-linear"
                        >
                            <div class="selectMode" v-if="!isUpDown" >
                                <el-form-item label="科室：">
                                    <el-select v-model="formInline.department" placeholder="请选择科室" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                    </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="医生：">
                                    <el-select v-model="formInline.department" placeholder="请选择医生" >
                                        <el-option
                                            v-for="item in departmentList"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </div>
                        </transition>
                    </el-form>
                </el-col>
                <el-col :span="6" style="textAlign:right">
                    <el-button size="medium" type="primary" @click="onSubmit" >查询</el-button>
                    <el-button size="medium" type="primary" @click="onSubmit" >重置</el-button>
                    <el-button size="medium" type="primary" :icon="isUpDown?'el-icon-arrow-up':'el-icon-arrow-down'" @click="onUpDown" class="highSearch" >高级查询</el-button>
                </el-col>
            </el-row>
            <el-table
                :data="formData4"
                stripe
                border
                style="width: 100%"
                :cell-style="cellStyle"
                :header-cell-style="{background:'#cbe4ff',color:'black',borderColor:'black'}"
            >
                <el-table-column  type="index"  width="50" label="序号"></el-table-column>
                <el-table-column prop="name0" label="医生"></el-table-column>
                <el-table-column prop="name1" label="科室"></el-table-column>
                <el-table-column prop="name2" label="手术台次"></el-table-column>
                <el-table-column prop="name3" label="手术费用总额"></el-table-column>
                <el-table-column prop="name4" label="耗材费用总额"></el-table-column>
                <el-table-column prop="name5" label="平均耗材费用"></el-table-column>
                <el-table-column prop="name6" label="平均耗占比"></el-table-column>
            </el-table>
            <el-pagination
                class="com-pagination"
                @size-change="search"
                @current-change="search"
                :page-sizes="[10, 20, 30, 40, 50, 100]"
                :current-page.sync="pager4.page"
                :page-size.sync="pager4.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pager4.total"
            >
            </el-pagination>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import mixin from '@/mixins'
export default {
    name: 'statisticalReports',
    mixins: [mixin],
    data() {
        return {
            activeName: 'first',
            isUpDown: true,
            formInline: {},
            departmentList: [],
            pickerOptions: {
                shortcuts: [ {
                    text: '最近三个月',
                    onClick (picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(start.getMonth() - 3);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近六个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setMonth(start.getMonth() - 6);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '今年至今',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date(new Date().getFullYear(), 0);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            formData1: [],
            formData2: [],
            formData3: [],
            formData4: [],
            pager1: {
                page: 1,
                limit: 10,
                total: 10,
            },
            pager2: {
                page: 1,
                limit: 10,
                total: 10,
            },
            pager3: {
                page: 1,
                limit: 10,
                total: 10,
            },
            pager4: {
                page: 1,
                limit: 10,
                total: 10,
            }
        }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onUpDown () {
          this.isUpDown = !this.isUpDown
      }
    }
}
</script>

<style lang="less" scoped>
/deep/ .el-table__cell {
    text-align: center;
}
</style>