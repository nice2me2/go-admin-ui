<template>
  <BasicLayout>
    <template #wrapper>
      <el-card class="box-card">
        <el-form ref="queryForm" :model="queryParams" :inline="true" label-width="48px">
          <el-form-item label="日期" prop="expressDate">
            <el-input
              v-model="queryParams.expressDate"
              placeholder="请输入客户姓名"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="客户" prop="customerName">
            <el-input
              v-model="queryParams.customerName"
              placeholder="请输入客户姓名"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="手机" prop="phoneNumber">
            <el-input
              v-model="queryParams.phoneNumber"
              placeholder="请输入手机号码"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="业务员" prop="operatorName" label-width="auto">
            <el-input
              v-model="queryParams.operatorName"
              placeholder="请输入业务员姓名"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="机具号" prop="machineNumber" label-width="auto">
            <el-input
              v-model="queryParams.machineNumber"
              placeholder="请输入机具号"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="表名" prop="sheetName" label-width="auto">
            <el-input
              v-model="queryParams.sheetName"
              placeholder="输入<9.2-98>查询"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item label="运单号" prop="expressNumber" label-width="auto">
            <el-input
              v-model="queryParams.expressNumber"
              placeholder="请输入运单号码"
              clearable
              size="small"
              style="width: 160px"
              @keyup.enter.native="handleQuery"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
            <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
          </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:sysCustomer:add']"
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="handleAdd"
            >新增</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:sysCustomer:edit']"
              type="success"
              icon="el-icon-edit"
              size="mini"
              :disabled="single"
              @click="handleUpdate"
            >修改</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:sysCustomer:remove']"
              type="danger"
              icon="el-icon-delete"
              size="mini"
              :disabled="multiple"
              @click="handleDelete"
            >删除</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:sysCustomer:export']"
              type="warning"
              icon="el-icon-download"
              size="mini"
              @click="handleExport"
            >导出</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:sysCustomer:import']"
              type="normal"
              icon="el-icon-upload"
              size="mini"
              @click="handleImport"
            >导入数据</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button
              v-permisaction="['admin:sysCustomer:importModel']"
              type="normal"
              icon="el-icon-download"
              size="mini"
              @click="handleImportModel('customer_model.xlsx', '/static/download_file/客户导入模板.xlsx')"
            >导入模板下载</el-button>
          </el-col>
        </el-row>

        <el-table
          v-loading="loading"
          :data="customerList"
          border
          @selection-change="handleSelectionChange"
          @sort-change="handleSortChang"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column
            label="ID"
            sortable="custom"
            width="75"
            prop="id"
          />
          <el-table-column
            label="日期"
            sortable="custom"
            prop="expressDate"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="客户"
            sortable="custom"
            prop="customerName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="电话"
            sortable="custom"
            prop="phoneNumber"
          />
          <el-table-column
            label="地址"
            prop="address"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="业务员"
            sortable="custom"
            prop="operatorName"
          />
          <el-table-column
            label="机具号"
            sortable="custom"
            prop="machineNumber"
          />
          <el-table-column
            label="处理问题"
            prop="issue"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="运单号"
            prop="expressNumber"
          />
          <el-table-column
            label="签收情况"
            prop="expressResult"
          />
          <el-table-column
            label="注册情况"
            prop="registerResult"
          />
          <el-table-column
            label="使用情况"
            prop="useResult"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="表名"
            prop="sheetName"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="备注"
            prop="remark"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            label="创建时间"
            sortable="custom"
            prop="createdAt"
            width="160"
          >
            <template slot-scope="scope">
              <span>{{ parseTime(scope.row.createdAt) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            class-name="small-padding fixed-width"
            width="120"
          >
            <template slot-scope="scope">
              <el-button
                v-permisaction="['admin:sysCustomer:edit']"
                size="mini"
                type="text"
                icon="el-icon-edit"
                @click="handleUpdate(scope.row)"
              >修改</el-button>
              <el-button
                v-permisaction="['admin:sysCustomer:remove']"
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageIndex"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
        />

        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="title" :visible.sync="open" width="600px" :close-on-click-modal="false">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-row>
              <el-col span="12">
                <el-form-item label="日期" prop="expressDate">
                  <el-input v-model="form.expressDate" placeholder="请输入日期" :disabled="false" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="业务员" prop="operatorName">
                  <el-input v-model="form.operatorName" placeholder="请输入业务员姓名" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="客户" prop="customerName">
                  <el-input v-model="form.customerName" placeholder="请输入客户姓名" :disabled="false" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="手机" prop="phoneNumber">
                  <el-input v-model="form.phoneNumber" placeholder="请输入手机号码" :disabled="false" />
                </el-form-item>
              </el-col>
              <el-col span="24">
                <el-form-item label="地址" prop="address">
                  <el-input v-model="form.address" placeholder="请输入地址" :disabled="false" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="机具号" prop="machineNumber">
                  <el-input v-model="form.machineNumber" placeholder="请输入机具号" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="品牌型号" prop="modelName">
                  <el-input v-model="form.modelName" placeholder="请输入品牌型号" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="运单号" prop="expressNumber">
                  <el-input v-model="form.expressNumber" placeholder="请输入运单号" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="签收情况" prop="expressResult">
                  <el-input v-model="form.expressResult" placeholder="请输入签收情况" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="注册情况" prop="registerResult">
                  <el-input v-model="form.registerResult" placeholder="请输入注册情况" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="使用情况" prop="useResult">
                  <el-input v-model="form.useResult" placeholder="请输入使用情况" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="表名(查询)" prop="sheetName">
                  <el-input v-model="form.sheetName" placeholder="日期周期范围，用于查询" />
                </el-form-item>
              </el-col>
              <el-col span="12">
                <el-form-item label="处理问题" prop="issue">
                  <el-input v-model="form.issue" placeholder="请输入处理问题" />
                </el-form-item>
              </el-col>
              <el-col span="24">
                <el-form-item label="备注" prop="remark">
                  <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>

        <!-- 上传文件对话框 -->
        <el-dialog :title="uploadTitle" :visible.sync="uploadOpen" max-width="500px" :close-on-click-modal="false">
          <upload-excel-component ref="excelComponent" v-loading="loading1" :on-success="handleSuccess" :before-upload="beforeUpload" />
          <div slot="footer" class="dialog-footer">
            <el-button v-loading="loading1" type="primary" @click="uploadExcel">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
          </div>
        </el-dialog>
      </el-card>
    </template>
  </BasicLayout>
</template>

<script>
import { listCustomer, getCustomer, delCustomer, addCustomer, updateCustomer, uploadCustomerFile } from '@/api/admin/sys-customer'
import UploadExcelComponent from '@/components/UploadExcel/custom.vue'
import { formatJson } from '@/utils'

export default {
  name: 'SysCustomerManage',
  components: { UploadExcelComponent },
  data() {
    return {
      // 遮罩层
      loading: true,
      loading1: false,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 参数表格数据
      customerList: [],
      // 排序字段
      order: 'createdAtOrder',
      // 弹出层标题
      title: '',
      uploadTitle: '',
      isEdit: false,
      // 是否显示弹出层
      open: false,
      uploadOpen: false,
      // 类型数据字典
      typeOptions: [],
      // 日期范围
      dateRange: [],
      // 查询参数
      queryParams: {
        pageIndex: 1,
        pageSize: 10,
        customerName: undefined,
        expressDate: undefined,
        phoneNumber: undefined,
        operatorName: undefined,
        machineNumber: undefined,
        sheetName: undefined,
        expressNumber: undefined,
        createdAtOrder: 'desc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        customerName: [{ required: true, message: '参数不能为空', trigger: 'blur' }],
        phoneNumber: [{ required: true, message: '参数不能为空', trigger: 'blur' }],
        machineNumber: [{ required: true, message: '参数不能为空', trigger: 'blur' }],
        operatorName: [{ required: true, message: '参数不能为空', trigger: 'blur' }]
      },
      xlsFile: null
    }
  },
  created() {
    this.getList()
    this.getDicts('sys_yes_no').then(response => {
      this.typeOptions = response.data
    })
  },
  methods: {
    /** 查询参数列表 */
    getList() {
      this.loading = true
      listCustomer(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
        this.customerList = response.data.list
        this.total = response.data.count
        this.loading = false
      }
      )
    },
    // 参数系统内置字典翻译
    typeFormat(row, column) {
      return this.selectDictLabel(this.typeOptions, row.customerType)
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.uploadOpen = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: undefined,
        customerName: undefined,
        customerKey: undefined,
        customerValue: undefined,
        customerType: 'Y',
        isFrontend: '1',
        remark: undefined
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageIndex = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = []
      this.resetForm('queryForm')
      this.queryParams['createdAtOrderOrder'] = 'desc'
      this.handleQuery()
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加客户信息'
      this.isEdit = false
    },
    handleSortChang(column, prop, order) {
      prop = column.prop
      order = column.order
      if (this.order !== '' && this.order !== prop + 'Order') {
        this.queryParams[this.order] = undefined
      }
      if (order === 'descending') {
        this.queryParams[prop + 'Order'] = 'desc'
        this.order = prop + 'Order'
      } else if (order === 'ascending') {
        this.queryParams[prop + 'Order'] = 'asc'
        this.order = prop + 'Order'
      } else {
        this.queryParams[prop + 'Order'] = undefined
      }
      this.getList()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const ID = row.id || this.ids
      getCustomer(ID).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改参数'
        this.isEdit = true
      })
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id !== undefined) {
            updateCustomer(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          } else {
            addCustomer(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess(response.msg)
                this.open = false
                this.getList()
              } else {
                this.msgError(response.msg)
              }
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const Ids = (row.id && [row.id]) || this.ids
      this.$confirm('是否确认删除参数编号为"' + Ids + '"的数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(function() {
        return delCustomer({ 'ids': Ids })
      }).then((response) => {
        if (response.code === 200) {
          this.msgSuccess(response.msg)
          this.open = false
          this.getList()
        } else {
          this.msgError(response.msg)
        }
      }).catch(function() {})
    },
    /** 导出按钮操作 */
    handleExport() {
      // const queryParams = this.queryParams
      this.$confirm('是否确认导出所有参数数据项?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['参数主键', '参数名称', '参数键名', '参数键值', '备注', '创建时间']
          const filterVal = ['customerId', 'customerName', 'customerKey', 'customerValue', 'remark', 'createdAt']
          const list = this.customerList
          const data = formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '参数设置',
            autoWidth: true, // Optional
            bookType: 'xlsx' // Optional
          })
          this.downloadLoading = false
        })
      })
    },
    /** 导出按钮操作 */
    handleImport() {
      // this.reset()
      this.uploadOpen = true
      this.uploadTitle = '选择导入文件'
      if (this.xlsFile) {
        this.xlsFile = null
        this.$refs.excelComponent.resetInfo()
      }
      // this.isEdit = false
    },
    /** 下载导入模板文件操作 */
    handleImportModel(filename, url) {
      this.downloadLoading = true
      const a = document.createElement('a')
      a.style = 'display: none'// 创建一个隐藏的a标签
      a.download = filename
      a.href = url
      document.body.appendChild(a)
      a.click() // 触发a标签的click事件
      document.body.removeChild(a)
      this.downloadLoading = false
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 10

      if (isLt1M) {
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess(xlsFile) {
      this.xlsFile = xlsFile
    },
    uploadExcel: function() {
      if (!this.xlsFile) {
        this.msgError('请先选择文件！')
        return
      }
      this.loading1 = true
      const filename = this.xlsFile.name
      const formData = new FormData()
      formData.append('attachFile[]', this.xlsFile)
      formData.append('filename', filename)
      uploadCustomerFile(formData).then(response => {
        this.cancel()
        this.loading1 = false
        if (response.code === 200) {
          this.getList()
          this.msgSuccess(response.msg)
        } else {
          this.msgError(response.msg)
        }
      }).catch(e => {
        this.loading1 = false
      })
    }
  }
}
</script>
