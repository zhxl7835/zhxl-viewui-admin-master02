<template>
  <div style="width: 60%">
    <Modal :title="title"
           v-model="showBookw"
           :closable="false"
           @on-ok="ok"
           @on-cancel="cancel"
           class-name="vertical-center-modal"
           :mask-closable="false"
           width="50%">
      <fieldset>
        <Form ref="param1" :model="param1" style="margin-top: 25px;" :label-width="100">
          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="教材名称："
                        prop="name"
                        label-for="name">
                <Input v-model="param1.name" element-id="name" style="width: 90%"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="教材编号："
                        prop="code"
                        label-for="code">
                <Input v-model="param1.code" element-id="code" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="出版社："
                        prop="press"
                        label-for="press">
                <Input v-model="param1.press" element-id="press" style="width: 90%"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="作者："
                        prop="author"
                        label-for="author">
                <Input v-model="param1.author" element-id="author" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="出版日期："
                        prop="pdate"
                        label-for="pdate">
                <DatePicker v-model="param1.pdate" format="yyyy-MM-dd" type="date" placeholder="选择日期" style="width: 90%"></DatePicker>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="教材单价："
                        prop="uprice"
                        label-for="uprice">
                <Input v-model="param1.uprice" element-id="uprice" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="所属专业："
                        prop="type"
                        label-for="type">
<!--                <Input v-model="param1.type" element-id="type" style="width: 40%"></Input>-->
                <Select v-model="model1" style="width: 90%">
                  <Option v-for="item in kl" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="所属年级："
                        prop="type"
                        label-for="type">
                <!--                <Input v-model="param1.type" element-id="type" style="width: 40%"></Input>-->
                <Select v-model="model2" style="width: 90%">
                  <Option v-for="item in k2" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </fieldset>
      <div slot="footer">
        <Button type="error" size="large" @click="cancel">退出</Button>
        <Button type="primary" size="large" :disabled="disabled" @click="ok">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { insertBooks, updateBooks } from '@/api/book/book';
export default {
  name: "bookwh.vue",
  data() {
    return {
      showBookw: false,
      disabled: false,
      title:'教材维护',
      czlx:'',
      param1: {
        id: '', code: '', name: '', press: '', author: '', pdate: '', uprice: '', type: '',grade:''
      },
      /*reqData修改和删除请求参数，可以使用param1，为了防止以后功能变复杂，param1和reqData不要相互影响，使用单独建立了请求参数对象reqData*/
      reqData: {
        id: '', code: '', name: '', press: '', author: '', pdate: '', uprice: '', type: '',grade:''
      },
      param2: {
        czlx: '', code: '', message: ''
      },
      kl: [
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
    }
  },
  methods: {
    showBookwhModal(params) {
      if(params != null){
        this.param2.czlx = params.czlx;
        this.param1.id = params.param1.id;
        this.param1.code = params.param1.code;
        this.param1.name = params.param1.name;
        this.param1.press = params.param1.press;
        this.param1.author = params.param1.author;
        this.param1.pdate = params.param1.pdate;
        this.param1.uprice = params.param1.uprice;
        this.param1.major = params.param1.major;
        this.param1.grade = params.param1.grade;
        this.model1 = params.param1.major;
        this.model2 = params.param1.grade;
      }
      if(this.param2.czlx == 3){
        this.disabled = true;
      }else{
        this.disabled = false;
      }
      this.showBookw = true;
    },
    async ok () {
      if (this.param1.code == '' || this.param1.name == '' || this.param1.press == '' || this.model1 == '' ||
          this.param1.author == '' || this.param1.pdate == '' || this.param1.uprice == '' || this.model2 == '') {
        this.$Modal.error({title: '错误', content: `各输入框不能为空`})
        return;
      }
      try {
        this.showBookw = false;

        if(this.param2.czlx == 0){
          //新增
          this.init();
          this.reqData.code = this.param1.code.trim();
          this.reqData.name = this.param1.name.trim();
          this.reqData.press = this.param1.press.trim();
          this.reqData.author= this.param1.author.trim();
          this.reqData.pdate = this.param1.pdate;
          this.reqData.uprice = this.param1.uprice.trim();
          this.reqData.major = this.model1;
          this.reqData.grade = this.model2;

          const resp = await insertBooks(this.reqData);

          this.param2.code = resp.code;
          this.param2.message = resp.msg;

        }else if(this.param2.czlx == 1){
          //修改
          this.init();
          this.reqData.id = this.param1.id.trim();
          this.reqData.code = this.param1.code.trim();
          this.reqData.name = this.param1.name.trim();
          this.reqData.press = this.param1.press.trim();
          this.reqData.author= this.param1.author.trim();
          this.reqData.pdate = this.param1.pdate;
          this.reqData.uprice = this.param1.uprice.trim();
          this.reqData.major = this.model1;
          this.reqData.grade = this.model2;

          const resp = await updateBooks(this.reqData);

          this.param2.code = resp.code;
          this.param2.message = resp.msg;
        }
        this.$emit('bookwhSucc', this.param2);
      } catch (e) {
        throw e;
      }
    },
    cancel () {
      this.showBookw = false;
    },
    init () {
          this.reqData.id = '';
          this.reqData.code = '';
          this.reqData.name = '';
          this.reqData.press = '';
          this.reqData.author = '';
          this.reqData.pdate = '';
          this.reqData.uprice = '';
          this.reqData.type = '';
          this.reqData.grade ='';
    }
  }
}
</script>

<style scoped>

</style>