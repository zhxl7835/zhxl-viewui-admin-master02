<template>
  <div class="city_components flexC">
    <div>
      <div>
        <Form :model="formItem" :label-width="0">
          <FormItem>
            教材名称：<Input v-model="formItem.name" style="width: 200px"></Input>
            教材编号：<Input v-model="formItem.code" style="width: 200px"></Input>
            所属专业：<Select v-model="model1" style="width:200px">
              <Option v-for="item in kl" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            所属年级：<Select v-model="model2" style="width:200px">
            <Option v-for="item in k2" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
            <Button type="info" style="position: absolute;left: 1100px;" @click="queryJc">查询</Button>
          </FormItem>
        </Form>
        <Button type="success" style="margin-left:0px;"  @click="insert('0')">新增</Button>
        <!--        <Button type="warning" style="margin-left:10px;">修改</Button>-->
        <Button type="error" style="margin-left:10px;" @click="delAll">批量删除</Button>
      </div>
      <div style="margin-top: 8px">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
        </Alert>
      </div>
    </div>
    <div>
      <Table
          border
          ref="selection"
          :data="list1"
          :loading="loading1"
          :columns="columns1"
          @on-selection-change="changeSelect">
      </Table>
    </div>
    <bookwh ref="bookwhModal" @bookwhSucc="getInfoRy"></bookwh>
  </div>
</template>
<script>
  import bookwh from '@/views/book/modal/bookwh';
  import { deleteBooks, deleteAllBooks, queryBooks } from '@/api/book/book';

  export default {
    name: "book.vue",
    components: {
      bookwh
    },
    data() {
      return {
        list1: [],
        loading1: false,
        selectList: [], // 多选数据
        selectCount: 0, // 多选计数
        formItem: {
          name: '',
          code: '',
          major: '',
          grade:''
        },
        /*queryData查询请求参数，可以使用formItem，为了防止以后功能变复杂，queryData和formItem不要相互影响，使用单独建立了请求参数对象queryData*/
        queryData: {
          code:'',
          name:'',
          major:'',
          grade:''
        },
        kl: [
          {
            value: '全部',
            label: '全部'
          },
          {
            value: '计算机科学与技术',
            label: '计算机科学与技术'
          },
          {
            value: '网络工程',
            label: '网络工程'
          },
          {
            value: '网络安全',
            label: '网络安全'
          },
          {
            value: '软件工程',
            label: '软件工程'
          },
          {
            value: '物联网工程',
            label: '物联网工程'
          },
          {
            value: '智能科学与技术',
            label: '智能科学与技术'
          },
          {
            value: '计算机美术',
            label: '计算机美术'
          }
        ],
        k2: [
          {
            value: '全部',
            label: '全部'
          },
          {
            value: '大学1年级第1学期',
            label: '大学1年级第1学期'
          },
          {
            value: '大学1年级第2学期',
            label: '大学1年级第2学期'
          },
          {
            value: '大学2年级第1学期',
            label: '大学2年级第1学期'
          },
          {
            value: '大学2年级第2学期',
            label: '大学2年级第2学期'
          },
          {
            value: '大学3年级第1学期',
            label: '大学3年级第1学期'
          },
          {
            value: '大学3年级第2学期',
            label: '大学3年级第2学期'
          },
          {
            value: '大学4年级第1学期',
            label: '大学4年级第1学期'
          },
          {
            value: '大学4年级第2学期',
            label: '大学4年级第2学期'
          },
        ],
        model1 : '',
        model2 : '',
        param1:{
          code: '', name: '', press: '', author: '', pdate: '', uprice: '', major: '',grade:''
        },
        columns1: [
          {
            type: 'selection',
            width: 60,
            align: 'center',
            display: true
          },
          {
            title: '教材编号',
            key: 'code'
          },
          {
            title: '教材名称',
            key: 'name'
          },
          {
            title: '出版社',
            key: 'press'
          },
          {
            title: '作者',
            key: 'author'
          },
          {
            title: '出版日期',
            key: 'pdate',
            render: (h,params)=>{
              return h('div',
                  this.formatDate(new Date(params.row.pdate),'yyyy-MM-dd')
              )
            }
          },
          {
            title: '教材单价',
            key: 'uprice'
          },
          {
            title: '所属专业',
            key: 'major'
          },
          {
            title: '所属年级',
            width: 200,
            key: 'grade'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.select(params.index)
                    }
                  }
                }, '详情'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.update(params.index)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data1: [
          {code: '125478', name: '高等数学', press: '北京大学出版社', author: '郑晓龙', pdate: '2021-02-01', uprice: '58', major: '理课类'},
          {code: '122548', name: '大学英语', press: '北京大学出版社', author: '郑晓龙', pdate: '2021-02-01', uprice: '58', major: '全科'},
          {code: '564478', name: '历史', press: '北京大学出版社', author: '郑晓龙', pdate: '2021-02-01', uprice: '58', major: '文科类'},
          {code: '124578', name: 'JAVA开发教程', press: '北京大学出版社', author: '郑晓龙', pdate: '2021-02-01', uprice: '58', major: '理课类'}
        ]
      }
    },
    mounted () {
      this.queryJc();
    },
    methods: {
      select(index) {
        let params = { 'param1': this.list1[index], 'czlx': 3 };
        this.$refs.bookwhModal.showBookwhModal(params);
      },
      update(index) {
        let params = { 'param1': this.list1[index],'czlx': 1  };
        this.$refs.bookwhModal.showBookwhModal(params);
      },
      async remove(index) {
        const resp = await deleteBooks(this.list1[index].id);
        if(resp.code == 200){
          this.$Message.success(resp.msg);
          this.list1.splice(index, 1);
        }
      },

      async insert (val) {
        let params = { 'param1': this.param1,'czlx': 0 };
        this.$refs.bookwhModal.showBookwhModal(params);
      },

      async getInfoRy (data) {
        if(data.code == 200){
          this.$Message.success(data.message);
        }else if(data.code == 500){
          this.$Message.error(data.message);
        }
        this.queryJc();
      },
      //多选
      changeSelect(e) {
        this.selectList = e;
        this.selectCount = e.length;
      },
      //清空
      clearSelectAll() {
        this.$refs.selection.selectAll(false);
      },
      //批量删除
      async delAll() {
        if (this.selectCount <= 0) {
          this.$Modal.warning({title: '提醒', content: `您还未选择要删除的数据`});
          return;
        }
        this.$Modal.confirm({
          title: "确认删除",
          content: `您确认要删除所选的${this.selectCount}条数据?`,
          onOk: async () => {
            this.loading1 = true;
            let ids = "";
            this.selectList.forEach(function(e) {
              ids += e.id + ",";
            });
            ids = ids.substring(0, ids.length - 1);
            const resp = await deleteAllBooks(ids);
            if(resp.code == 200){
              this.$Message.success(resp.msg);
              this.queryJc();
              this.loading1 = false;
            }else{
              this.$Message.error(resp.msg);
            }
          }
        });
      },
      async queryJc() {
        this.loading1 = true;
        this.queryData.code=this.formItem.code.trim();
        this.queryData.name=this.formItem.name.trim();
        this.queryData.major=this.model1;
        this.queryData.grade=this.model2;

        const resp = await queryBooks(this.queryData);
        if(resp.code == 200){
          this.$Message.success(resp.msg);
          this.list1 = resp.data;
          this.loading1 = false;
        }else{
          this.$Message.error(resp.msg);
          this.loading1 = false;
        }
      },
      formatDate (date, fmt) {
        let o = {
          'M+': date.getMonth() + 1, // 月份
          'd+': date.getDate(), // 日
          'h+': date.getHours(), // 小时
          'm+': date.getMinutes(), // 分
          's+': date.getSeconds(), // 秒
          'S': date.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
          }
        }
        return fmt
      }
    }
  }
</script>