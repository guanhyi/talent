<template>
  <div class="layer">
    <div class="home">
      <div class="home-header MT_50 MB_20">
        <el-divider content-position="left">学者合作路径查询</el-divider>
        <div class="home-header-search PR_20 PL_20">
          <span id="start">查询人名</span>
          <el-autocomplete
            class="ML_30"
            v-model="name"
            :fetch-suggestions="remoteMethodName"
            placeholder="请输入内容"
            @select="changeName"
          ></el-autocomplete>
          <span class="ML_30" id="end">查询机构</span>
          <el-autocomplete
            class="ML_30"
            v-model="org"
            :fetch-suggestions="remoteMethodOrg"
            placeholder="请输入内容"
            @select="changeOrg"
          ></el-autocomplete>
          <el-button
            class="ML_30"
            type="primary"
            icon="el-icon-search"
            @click="search"
            :loading="loading"
          >搜索</el-button>
          <!-- <el-checkbox v-model="checked" class="check ML_30">合作者限制为中国学者</el-checkbox> -->
        </div>
      </div>
      <span>说明：</span>
      <p>同事：与查询学者在同机构且在同期刊上发文的学者</p>
      <p>同领域学者：与查询学者在同期刊上发文的学者</p>
      <p>展示时间受节点数量影响，二次跳转节点数量超过2000预计需耗时20秒，请您耐心等待</p>
      <div class="home-body row MT_20" v-if="searchShow" v-loading="loading">
        <tableTem
          :tableData="tableData1"
          class="tableTem"
          index="1"
          :showPath="showPath"
          @moreData="moreData"
        ></tableTem>
        <tableTem
          :loading="loading2"
          index="2"
          :tableData="tableData2"
          :tip="tip"
          class="tableTem"
          :showPath="showPath"
          @moreData="moreData"
        ></tableTem>
        <tableTem
          :loading="loading3"
          index="3"
          :tableData="tableData3"
          :tip="tip"
          @moreData="moreData"
          class="tableTem"
          :showPath="showPath"
        ></tableTem>
      </div>
    </div>
  </div>
</template>

<script src="https://magi.com/assets/thirdparty/leader-line.min.js"></script>
<script>
import $ from "jquery";
import tableTem from "@/components/common/tableTem";
import figureChart from "@/components/Charts/figureChart";
export default {
  name: "home",
  components: {
    figureChart,
    tableTem
  },
  data() {
    return {
      loading: false,
      loading2: false,
      loading3: false,
      tip: true,
      searchShow: false, // 是否第一次查询
      name: this.$route.query.name || "tao,yunzhe", // 姓名
      org: this.$route.query.Organization || "columbia univ", // 机构
      showPath: "", // 路径
      checked: false, // 模糊匹配
      p1: "",
      id: "",
      ids: [],
      paparData: [],
      collData: [],
      fieldData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      pages: [
        { papar: 0, coll: 0, field: 0 },
        { papar: 0, coll: 0, field: 0 },
        { papar: 0, coll: 0, field: 0 }
      ],
      DomI: 0,
      DomIIndex: 0,
      DomIIndex2: 0,
      DomId1: [],
      DomId2: [],
      lines1: [],
      lines2: []
    };
  },
  methods: {
    // 搜索
    search() {
      if (!this.name) {
        this.$message("请输入查询姓名");
        return;
      }
      if (!this.org) {
        this.$message("请输入查询机构");
        return;
      }
      this.clear();
      this.showPath = this.name + "(" + this.org + ")";
      let data = this.getData({
        type: 3,
        s_name: this.name,
        s_org: this.org
      });
      if (!data.data.length) {
        this.$message("未能搜索到结果！");
        this.loading = false;
        return;
      }
      this.p1 =
        "#" + data.data[0].rid.cluster + ":" + data.data[0].rid.position;
      this.id = data.data[0].oData.Id;
      setTimeout(() => {
        this.getTableData1();
      }, 1000);
    },
    // 获取数据
    getData(data) {
      let temp;
      $.ajax({
        type: "post",
        url: "http://183.136.237.195/graph_db",
        data: data,
        dataType: "json",
        async: false,
        success: function(res) {
          temp = res;
        }
      });

      return temp;
    },
    remoteMethodName(queryString, cb) {
      if (queryString.length < 3) {
        return;
      }
      this.loading = true;
      let that = this;
      $.ajax({
        type: "post",
        url: "http://183.136.237.195/graph_namematch",
        data: {
          type: 1,
          name: queryString
        },
        dataType: "json",
        async: false,
        success: function(res) {
          that.optionsName = res.data.map(it => {
            return {
              id: it.id,
              name: it.name,
              org: it.organization,
              value: it.name + " (" + it.organization + ")"
            };
          });
          cb(that.optionsName);
          that.loading = false;
        }
      });
    },
    remoteMethodOrg(data, cb) {
      if (data.length < 3) {
        this.optionsName = [];
        return;
      }
      this.loading = true;
      let that = this;
      $.ajax({
        type: "post",
        url: "http://183.136.237.195/graph_namematch",
        data: {
          type: 2,
          name: this.name,
          org: data
        },
        dataType: "json",
        async: false,
        success: function(res) {
          that.optionsOrg = res.data.map(it => {
            return {
              id: it.id,
              name: it.name,
              org: it.organization,
              value: it.organization
            };
          });
          cb(that.optionsOrg);
          that.loading = false;
        }
      });
    },
    changeName(query) {
      this.name = query.name;
      this.org = query.org;
    },
    changeOrg(query) {
      this.org = query.org;
    },
    getTableData1() {
      let papar = [];
      let coll = [];
      let field = [];
      let paparTitle = [];
      let collTitle = [];
      let fieldTitle = [];
      let paparMore = [];
      let collMore = [];
      let fieldMore = [];
      this.paparData[0] = this.getData({
        type: 15,
        ids: [{ id: this.id, link: this.name }],
        l: 1,
        p0: this.id
      });
      papar = papar.concat(
        this.paparData[0].zjudata,
        this.paparData[0].chinadata,
        this.paparData[0].autodata
      );
      if (papar.length) {
        this.accIds(papar);
        paparTitle = {
          title: "论文合作者",
          isPath: true,
          linkinfo: "论文合作者"
        };
        if (papar.length > 30) {
          paparMore = {
            more: true,
            type: "papar"
          };
        }
        this.pages[0].papar = 1;
      }
      this.collData[0] = this.getData({
        type: 6,
        p1: this.p1,
        notin: this.ids
      });
      if (this.collData[0].data.length) {
        let zjudata = [];
        let chinadata = [];
        let autodata = [];
        collTitle = {
          title: "同事",
          isPath: true,
          linkinfo: "同事"
        };
        this.collData[0].data.forEach((item, index) => {
          if (item.texttype === "zju") {
            zjudata.push(item);
          } else if (item.texttype === "auto") {
            autodata.push(item);
          } else if (item.texttype === "chinese") {
            chinadata.push(item);
          }
        });
        coll = coll.concat(zjudata, chinadata, autodata);
        this.accIds(coll);
        if (coll.length > 30) {
          collMore = {
            more: true,
            type: "coll"
          };
        }
        this.pages[0].coll = 1;
      }
      let fieldIds = this.ids;
      fieldIds.push({ id: this.id });
      this.fieldData[0] = this.getData({
        type: 7,
        p1: this.p1,
        notin: fieldIds
      });
      if (this.fieldData[0].data.length) {
        let zjudata = [];
        let chinadata = [];
        let autodata = [];
        fieldTitle = {
          title: "同领域中国学者",
          isPath: true,
          linkinfo: "同领域中国学者"
        };
        this.fieldData[0].data.forEach((item, index) => {
          if (item.texttype === "zju") {
            zjudata.push(item);
          } else if (item.texttype === "auto") {
            autodata.push(item);
          } else if (item.texttype === "chinese") {
            chinadata.push(item);
          }
        });
        field = field.concat(zjudata, chinadata, autodata);
        this.accIds(field);
        if (field.length > 30) {
          fieldMore = {
            more: true,
            type: "field"
          };
        }
        this.pages[0].field = 1;
      }
      this.tableData1 = this.tableData1.concat(
        paparTitle,
        papar.slice(0, 30),
        paparMore,
        collTitle,
        coll.slice(0, 30),
        collMore,
        fieldTitle,
        field.slice(0, 30),
        fieldMore
      );
      this.loading = false;
      if (this.tableData1.length) {
        this.loading2 = true;
        this.loading3 = true;
        setTimeout(() => {
          this.getTableData2();
        }, 500);
      }
    },
    getTableData2() {
      let paparData = [];
      let papar = [];
      let field = [];
      let coll = [];
      let paparMore = [];
      let collMore = [];
      let fieldMore = [];
      let paparTitle = [];
      let collTitle = [];
      let fieldTitle = [];
      paparData = paparData.concat(
        this.paparData[0].zjudata,
        this.paparData[0].chinadata,
        this.paparData[0].autodata
      );
      if (paparData.length) {
        let paparIds = paparData.map(it => {
          return {
            id: it.oData.Id,
            link: it.linkinfo
          };
        });
        this.paparData[1] = this.getData({
          type: 15,
          notin: this.ids,
          ids: paparIds,
          l: 2,
          p0: this.id
        });

        papar = papar.concat(
          this.paparData[1].zjudata,
          this.paparData[1].chinadata,
          this.paparData[1].autodata
        );
        if (papar.length) {
          paparTitle = {
            title: "论文合作者的论文合作者",
            isPath: true,
            linkinfo: "论文合作者的论文合作者"
          };
        }
        this.pages[1].papar = 1;
        if (papar.length > 30) {
          paparMore = {
            more: true,
            type: "papar"
          };
        }
      }
      // if (this.fieldData[0].data.length) {
      //   let fieldIds = this.fieldData[0].data.map(it => {
      //     return {
      //       id: it.oData.Id,
      //       link: this.name + "-----" + it.oData.Name
      //     };
      //   });
      //   this.fieldData[1] = this.getData({
      //     type: 15,
      //     ids: fieldIds,
      //     notin: this.ids,
      //     l: 2,
      //     p0: this.id
      //   });

      //   field = field.concat(
      //     this.fieldData[1].zjudata,
      //     this.fieldData[1].chinadata,
      //     this.fieldData[1].autodata
      //   );
      //   if (field.length) {
      //     fieldTitle = {
      //       title: "同领域中国学者的论文合作者",
      //       isPath: true,
      //       linkinfo: "同领域中国学者的论文合作者"
      //     };
      //   }
      //   this.pages[1].field = 1;
      //   if (field.length > 30) {
      //     fieldMore = {
      //       more: true,
      //       type: "field"
      //     };
      //   }
      // }

      if (this.collData[0].data.length) {
        let collIds = this.collData[0].data.map(it => {
          return {
            id: it.oData.Id,
            link: this.name + "-----" + it.oData.Name
          };
        });
        this.collData[1] = this.getData({
          type: 15,
          ids: collIds,
          notin: this.ids,
          l: 2,
          p0: this.id
        });
        coll = coll.concat(
          this.collData[1].zjudata,
          // this.collData[1].chinadata,
          this.collData[1].autodata
        );
        if (coll.length) {
          collTitle = {
            title: "同事的论文合作者",
            isPath: true,
            linkinfo: "同事的论文合作者"
          };
        }
        this.pages[1].coll = 1;
        if (coll.length > 30) {
          collMore = {
            more: true,
            type: "coll"
          };
        }
      }
      this.accIds(papar);
      this.accIds(coll);
      this.accIds(field);
      this.tableData2 = this.tableData2.concat(
        paparTitle,
        papar.slice(0, 30),
        paparMore,
        collTitle,
        coll.slice(0, 30),
        collMore,
        fieldTitle,
        field.slice(0, 30),
        fieldMore
      );
      this.loading2 = false;
      if (this.tableData2.length) {
        // this.accLines();
        this.getTableData3();
      } else {
        this.loading3 = false;
      }
    },
    getTableData3() {
      this.loading3 = true;
      let paparData = [];
      let collData = [];
      let papar = [];
      let coll = [];
      let paparMore = [];
      let collMore = [];
      let paparTitle = [];
      let collTitle = [];
      if (this.paparData[1]) {
        paparData = paparData.concat(
          this.paparData[1].zjudata,
          this.paparData[1].chinadata,
          this.paparData[1].autodata
        );
      }
      if (paparData.length) {
        let paparIds = paparData.map(it => {
          return {
            id: it.oData.Id,
            link: it.linkinfo
          };
        });
        this.paparData[2] = this.getData({
          type: 15,
          ids: paparIds,
          l: 3,
          notin: this.ids,
          p0: this.id
        });
        papar = papar.concat(
          this.paparData[2].zjudata,
          this.paparData[2].chinadata,
          this.paparData[2].autodata
        );
        this.pages[2].papar = 1;
        if (papar.length) {
          paparTitle = {
            title: "论文合作者的论文合作者的论文合作者",
            isPath: true,
            linkinfo: "论文合作者的论文合作者的论文合作者"
          };
        }
        if (papar.length > 30) {
          paparMore = {
            more: true,
            type: "papar"
          };
        }
      }
      if (this.collData[1]) {
        collData = collData.concat(
          this.collData[1].zjudata,
          this.collData[1].chinadata,
          this.collData[1].autodata
        );
        if (collData.length) {
          let collIds = collData.map(it => {
            return {
              id: it.oData.Id,
              link: it.linkinfo
            };
          });
          this.collData[2] = this.getData({
            type: 15,
            notin: this.ids,
            ids: collIds,
            l: 3,
            p0: this.id
          });
          coll = coll.concat(
            this.collData[2].zjudata,
            this.collData[2].chinadata,
            this.collData[2].autodata
          );
        }
        this.pages[2].coll = 1;
        if (coll.length) {
          collTitle = {
            title: "同事的论文合作者的论文合作者",
            isPath: true,
            linkinfo: "同事的论文合作者的论文合作者"
          };
          if (coll.length > 30) {
            collMore = {
              more: true,
              type: "coll"
            };
          }
        }
      }
      this.tableData3 = this.tableData3.concat(
        paparTitle,
        papar.slice(0, 30),
        paparMore,
        collTitle,
        coll.slice(0, 30),
        collMore
      );
      if (this.tableData3.length) {
        // this.accLines2();
      }
      this.loading3 = false;
    },
    moreData(data) {
      if (data.type === "papar") {
        this.pages[parseInt(data.index) - 1].papar++;
      } else if (data.type === "coll") {
        this.pages[parseInt(data.index) - 1].coll++;
      } else if (data.type === "field") {
        this.pages[parseInt(data.index) - 1].field++;
      }
      if (data.index === "1") {
        this.addTableData1(data);
      } else if (data.index === "2") {
        this.addTableData2(data);
      } else if (data.index === "3") {
        this.addTableData3(data);
      }
    },
    addTableData1() {
      let papar = [];
      let paparMore = [];
      let paparTitle = [];
      let coll = [];
      let collTitle = [];
      let collMore = [];
      let field = [];
      let fieldMore = [];
      let fieldTitle = [];
      if (this.paparData[0]) {
        papar = papar.concat(
          this.paparData[0].zjudata,
          this.paparData[0].chinadata,
          this.paparData[0].autodata
        );
        if (papar.length > 30 * this.pages[0].papar) {
          paparMore = {
            more: true,
            type: "papar"
          };
        }
        paparTitle = {
          title: "论文合作者",
          isPath: true,
          linkinfo: "论文合作者"
        };
      }
      if (this.collData[0]) {
        let zjudata = [];
        let chinadata = [];
        let autodata = [];
        this.collData[0].data.forEach((item, index) => {
          if (item.texttype === "zju") {
            zjudata.push(item);
          } else if (item.texttype === "auto") {
            autodata.push(item);
          } else if (item.texttype === "chinese") {
            chinadata.push(item);
          }
        });
        coll = coll.concat(zjudata, chinadata, autodata);
        if (coll.length > 30 * this.pages[0].coll) {
          collMore = {
            more: true,
            type: "coll"
          };
        }
        collTitle = {
          title: "同事",
          isPath: true,
          linkinfo: "同事"
        };
      }
      if (this.fieldData[0]) {
        let zjudata = [];
        let chinadata = [];
        let autodata = [];
        this.fieldData[0].data.forEach((item, index) => {
          if (item.texttype === "zju") {
            zjudata.push(item);
          } else if (item.texttype === "auto") {
            autodata.push(item);
          } else if (item.texttype === "chinese") {
            chinadata.push(item);
          }
        });
        field = field.concat(zjudata, chinadata, autodata);
        if (field.length > 30 * this.pages[0].field) {
          fieldMore = {
            more: true,
            type: "field"
          };
        }
        fieldTitle = {
          title: "同领域中国学者",
          isPath: true,
          linkinfo: "同领域中国学者"
        };
      }
      this.tableData1 = [];
      this.tableData1 = this.tableData1.concat(
        paparTitle,
        papar.slice(0, 30 * this.pages[0].papar),
        paparMore,
        collTitle,
        coll.slice(0, 30 * this.pages[0].field),
        collMore,
        fieldTitle,
        field.slice(0, 30 * this.pages[0].field),
        fieldMore
      );
    },
    addTableData2(data) {
      // this.tableShow2 = false;
      let papar = [];
      let coll = [];
      let field = [];
      let paparMore = [];
      let paparTitle = [];
      let collMore = [];
      let collTitle = [];
      let fieldMore = [];
      let fieldTitle = [];
      if (this.paparData[1]) {
        papar = papar.concat(
          this.paparData[1].zjudata,
          this.paparData[1].chinadata,
          this.paparData[1].autodata
        );
      }
      if (papar.length) {
        paparTitle = {
          title: "论文合作者",
          isPath: true,
          linkinfo: "论文合作者"
        };
        if (papar.length > 30 * this.pages[1].papar) {
          paparMore = {
            more: true,
            type: "papar"
          };
        }
      }

      if (this.collData[1]) {
        coll = coll.concat(
          this.collData[1].zjudata,
          this.collData[1].chinadata,
          this.collData[1].autodata
        );

        if (coll.length) {
          if (coll.length > 30 * this.pages[1].coll) {
            collMore = {
              more: true,
              type: "coll",
              size: this.pages[1].coll
            };
          }
          collTitle = {
            title: "同事的论文合作者",
            isPath: true,
            linkinfo: "同事的论文合作者"
          };
        }
      }

      // if (this.fieldData[1]) {
      //   field = field.concat(
      //     this.fieldData[1].zjudata,
      //     this.fieldData[1].chinadata,
      //     this.fieldData[1].autodata
      //   );
      // }

      // if (field.length) {
      //   if (field.length > 30 * this.pages[1].field) {
      //     fieldMore = {
      //       more: true,
      //       type: "field"
      //     };
      //   }
      //   fieldTitle = {
      //     title: "同领域中国学者",
      //     isPath: true,
      //     linkinfo: "同领域中国学者"
      //   };
      // }
      this.tableData2 = [];
      this.tableData2 = this.tableData2.concat(
        paparTitle,
        papar.slice(0, 30 * this.pages[1].papar),
        paparMore,
        collTitle,
        coll.slice(0, 30 * this.pages[1].coll),
        collMore,
        fieldTitle,
        field.slice(0, 30 * this.pages[1].field),
        fieldMore
      );
      // this.accLines();
      // setTimeout(() => {
      //   this.tableShow2 = true;
      // }, 1000);
    },
    addTableData3() {
      // this.searchShow = false;
      let papar = [];
      let coll = [];
      let paparMore = [];
      let paparTitle = [];
      let collMore = [];
      let collTitle = [];
      if (this.paparData[2]) {
        papar = papar.concat(
          this.paparData[2].zjudata,
          this.paparData[2].chinadata,
          this.paparData[2].autodata
        );
        if (papar.length) {
          if (papar.length > 30 * this.pages[2].papar) {
            paparMore = {
              more: true,
              type: "papar"
            };
          }
          paparTitle = {
            title: "论文合作者的论文合作者的论文合作者",
            isPath: true,
            linkinfo: "论文合作者的论文合作者的论文合作者"
          };
        }
      }
      if (this.collData[2]) {
        coll = coll.concat(
          this.collData[2].zjudata,
          this.collData[2].chinadata,
          this.collData[2].autodata
        );
        if (coll.length) {
          if (this.collData[0].data.length > 30 * this.pages[2].coll) {
            collMore = {
              more: true,
              type: "coll"
            };
          }
          collTitle = {
            title: "同事的论文合作者的论文合作者",
            isPath: true,
            linkinfo: "同事的论文合作者的论文合作者"
          };
        }
      }
      this.tableData3 = [];
      this.tableData3 = this.tableData3.concat(
        paparTitle,
        papar.slice(0, 30 * this.pages[2].papar),
        paparMore,
        collTitle,
        coll.slice(0, 30 * this.pages[2].coll),
        collMore
      );
      this.lines2 = []
      // setTimeout(() => {

      //  this.accLines2()

      //    this.searchShow = true;
      // }, 1000);

    },
    accIds(data) {
      data.forEach(it => {
        this.ids.push({ id: it.oData.Id });
      });
    },
    accLines(data) {
      let table1 = this.tableData1;
      let table2 = this.tableData2;
      let index1 = 0;
      let index2 = 0;
      let table1Ids = [];
      table1.forEach(it => {
        if (!it.isPath && !it.more) {
          table1Ids.push({ id: "table1" + index1, name: it.oData.Name });
        }
        index1++;
      });
      table2.forEach((it, index) => {
        if (!it.isPath && !it.more) {
          let temp = it.linkinfo.split("-----");
          let indexn = table1Ids.findIndex(item => item.name === temp[1]);
          this.lines1.push({
            start: "table2" + index2,
            end: table1Ids[indexn].id
          });
        }
        index2++;
      });
    },
    accLines2(data) {
      let table1 = this.tableData2;
      let table2 = this.tableData3;
      let index1 = 0;
      let index2 = 0;
      let table1Ids = [];
      table1.forEach(it => {
        if (!it.isPath && !it.more) {
          table1Ids.push({ id: "table2" + index1, name: it.oData.Name });
        }
        index1++;
      });
      table2.forEach((it, index) => {
        if (!it.isPath && !it.more) {
          let temp = it.linkinfo.split("-----");
          let indexn = table1Ids.findIndex(item => item.name === temp[2]);
          this.lines2.push({
            start: "table3" + index2,
            end: table1Ids[indexn].id
          });
        }
        index2++;
      });
    },
    clear() {
      this.searchShow = true;
      this.loading = true;
      this.tableData1 = [];
      this.tableData2 = [];
      this.tableData3 = [];
      this.ids = [];
      (this.pages = [
        { papar: 0, coll: 0, field: 0 },
        { papar: 0, coll: 0, field: 0 },
        { papar: 0, coll: 0, field: 0 }
      ]),
        (this.DomI = 0),
        (this.DomIIndex = 0),
        (this.DomIIndex2 = 0),
        (this.DomId1 = []),
        (this.DomId2 = []),
        (this.lines1 = []),
        (this.lines2 = []);
    },
    handleClick() {}
  },
  mounted() {
    if (this.$route.query.name) {
      this.search();
    }
  },
  watch: {}
};
</script>

<style lang="scss">
.home {
  .home-header {
    width: 1100px;
    border-left: 1px solid #dcdfe6;
    border-right: 1px solid #dcdfe6;
    border-bottom: 1px solid #dcdfe6;
    .el-divider--horizontal {
      margin-top: 0 !important;
    }
    .home-header-search {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 24px;
      .el-input {
        width: 250px;
      }
      span {
        width: 70px;
      }

      .check span {
        width: 14px;
        height: 14px;
      }
    }
  }
  .el-icon-bottom {
    font-size: 4em;
    margin-left: 48%;
  }
  .home-body {
    margin-bottom: 40px;

    .tableTem {
      width: 33%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
