webpackJsonp([1],{"1bIE":function(t,a){},B0qa:function(t,a){},EnYq:function(t,a){},NHnr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("7+uW"),n=e("zL8q"),s=e.n(n),o=(e("tvR6"),{render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",[a("el-row",{staticClass:"header",attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:6}}),this._v(" "),a("el-col",{attrs:{offset:12,span:4}})],1)],1)},staticRenderFns:[]});var r={name:"App",components:{Header:e("VU/8")({name:"Header",data:function(){return{}},methods:{goTalent:function(){this.$router.push({path:"/talent"})},goHome:function(){this.$router.push({path:"/"})}}},o,!1,function(t){e("PDRJ")},"data-v-3be0b12c",null).exports},data:function(){return{path:""}},mounted:function(){this.path=this.$route.path},watch:{$route:function(t,a){this.path=t.path}}},l={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{attrs:{id:"app"}},[a("Header"),this._v(" "),a("router-view")],1)},staticRenderFns:[]},h=e("VU/8")(r,l,!1,null,null,null).exports,c=e("/ocq"),d=e("7t+N"),u=e.n(d),p={name:"tableTem",props:{tableData:{type:Array,required:!0},index:{type:String},showPath:{type:String},tip:{type:Boolean,default:!1},lable:{type:String}},watch:{tableData:{deep:!0,handler:function(){}}},data:function(){return{}},methods:{tableRowClassName:function(t){var a=t.row;t.rowIndex;return"zju"===a.texttype?"row-red":"chinese"===a.texttype?"row-highlighted":a.isPath?"row-path":""},arraySpanMethod:function(t){var a=t.row;t.column,t.rowIndex,t.columnIndex;if(a.isPath||a.more)return{rowspan:1,colspan:2}},query:function(t){this.$emit("query",t)},moreData:function(t){var a={index:this.index,type:t.type,size:t.size};this.$emit("moreData",a)}},mounted:function(){}},m={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"tableTem"},[e("div",{staticClass:"home-body-relation"},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("合作路径")]),t._v(" "),e("div",{staticClass:"PL_50 PR_50"},[t._m(0),t._v(" "),t.tableData.length?e("div",{staticClass:"row relation-echart"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","span-method":t.arraySpanMethod,"row-class-name":t.tableRowClassName}},[e("el-table-column",{attrs:{label:"姓名",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.more?e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.moreData(a.row)}}},[t._v("加载更多")]):t.tip?e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.row.linkinfo,placement:"top-start"}},[e("span",[t._v(t._s(a.row.isPath?a.row.title:a.row.oData.Name))])]):e("span",[t._v(t._s(a.row.isPath?a.row.title:a.row.oData.Name))])]}}],null,!1,2204946514)}),t._v(" "),e("el-table-column",{attrs:{label:"机构",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return a.row.isPath||a.row.more?void 0:[t.tip?e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.row.linkinfo,placement:"top-start"}},[e("span",[t._v(t._s(a.row.oData.Organization))])]):e("span",[t._v(t._s(a.row.oData.Organization))])]}}],null,!0)})],1)],1):e("div",{staticClass:"none"},[t._v("无符合此条件学者")])])],1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"relation-top row"},[a("div")])}]};var D=e("VU/8")(p,m,!1,function(t){e("1bIE")},null,null).exports,f=e("fZjL"),v=e.n(f),b=e("XLwt"),_=e.n(b);e("lHA8"),e("c/Tr"),e("pFYg");var g={data:function(){return{$_sidebarElm:null}},mounted:function(){var t,a,e,i,n,s,o,r,l,h=this;this.__resizeHandler=(t=function(){h.chart&&h.chart.resize()},a=100,i=void 0,n=void 0,s=void 0,o=void 0,r=void 0,l=function l(){var h=+new Date-o;h<a&&h>0?i=setTimeout(l,a-h):(i=null,e||(r=t.apply(s,n),i||(s=n=null)))},function(){for(var n=arguments.length,h=Array(n),c=0;c<n;c++)h[c]=arguments[c];s=this,o=+new Date;var d=e&&!i;return i||(i=setTimeout(l,a)),d&&(r=t.apply(s,h),s=h=null),r}),window.addEventListener("resize",this.__resizeHandler),this.$_sidebarElm=document.getElementsByClassName("sidebar-container")[0],this.$_sidebarElm&&this.$_sidebarElm.addEventListener("transitionend",this.$_sidebarResizeHandler)},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeHandler),this.$_sidebarElm&&this.$_sidebarElm.removeEventListener("transitionend",this.$_sidebarResizeHandler)},methods:{$_sidebarResizeHandler:function(t){"width"===t.propertyName&&this.__resizeHandler()}}};e("tcAE");var y={mixins:[g],props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"550px"},figureData:{type:Object,required:!0}},data:function(){return{chart:null}},watch:{figureData:{deep:!0,handler:function(t){console.log(1),this.initChart()}}},mounted:function(){var t=this;this.$nextTick(function(){t.initChart()})},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart=_.a.init(this.$el,"macarons"),v()(this.figureData).length&&this.chart.setOption({title:{text:""},tooltip:{},animationDurationUpdate:1500,animationEasingUpdate:"quinticInOut",label:{normal:{show:!0,textStyle:{fontSize:12}}},legend:{x:"center",show:!1,data:["查询","机构","专家","起点"]},series:[{type:"graph",layout:"force",symbolSize:45,focusNodeAdjacency:!0,roam:!0,categories:[{name:"查询",itemStyle:{normal:{color:"#003366"}}},{name:"机构",itemStyle:{normal:{color:"#3399CC"}}},{name:"专家",itemStyle:{normal:{color:"#99CCFF"}}},{name:"起点",itemStyle:{normal:{color:"#32CD32"}}}],label:{normal:{show:!0,textStyle:{fontSize:16}}},force:{repulsion:3e3},edgeSymbolSize:[4,50],edgeLabel:{normal:{show:!0,textStyle:{fontSize:10},formatter:"{c}"}},data:this.figureData.nodes,links:this.figureData.lines,lineStyle:{normal:{opacity:.9,width:1,curveness:0}}}]})}}},w={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{class:this.className,style:{height:this.height,width:this.width}})},staticRenderFns:[]},k=e("VU/8")(y,w,!1,null,null,null).exports,x={name:"home",components:{figureChart:k,tableTem:D},data:function(){return{loading:!1,tip:!0,searchShow:!1,name:"tao,yunzhe",org:"columbia univ",showPath:"",checked:!1,p1:"",id:"",paparData:{},collData:{},fieldData:{},tableData1:[],tableData2:[],tableData3:[],figureData:{}}},methods:{search:function(){var t=this;if(this.name)if(this.org){this.searchShow=!0,this.loading=!0,this.tableData1=[],this.tableData2=[],this.tableData3=[],this.showPath=this.name+"("+this.org+")";var a=this.getData({type:3,s_name:this.name,s_org:this.org});this.p1="#"+a.data[0].rid.cluster+":"+a.data[0].rid.position,this.id=a.data[0].oData.Id,setTimeout(function(){t.getTableData1()},1e3)}else this.$message("请输入查询机构");else this.$message("请输入查询姓名")},getData:function(t){var a=void 0;return u.a.ajax({type:"post",url:"http://183.136.237.195/graph_db",data:t,dataType:"json",async:!1,success:function(t){a=t}}),a},getTableData1:function(){this.paparData[0]=this.getData({type:15,ids:[{id:this.id,link:this.name}]}),this.collData[0]=this.getData({type:6,p1:this.p1}),this.fieldData[0]=this.getData({type:7,p1:this.p1});var t=[];t=t.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata);this.tableData1=this.tableData1.concat({title:"论文合作者",isPath:!0,linkinfo:"论文合作者"},t,[],{title:"同事",isPath:!0,linkinfo:"同事"},this.collData[0].data,[],{title:"同领域中国学者",isPath:!0,linkinfo:"同领域中国学者"},this.fieldData[0].data,[]),this.getTableData2()},getTableData2:function(){var t=this,a=[],e=(a=a.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.paparData[1]=this.getData({type:15,ids:e});var i=this.fieldData[0].data.map(function(a){return{id:a.oData.Id,link:t.name+"-----"+a.oData.Name}});this.fieldData[1]=this.getData({type:15,ids:i});this.collData[0].coauthorsdata.forEach(function(a,e){t.collData[0].coauthorsdata[e].linkinfo=t.name+"-----"+a.oData.Name});var n=[],s=[];n=n.concat(this.paparData[1].zjudata,this.paparData[1].chinadata,this.paparData[1].autodata),s=s.concat(this.fieldData[1].zjudata,this.fieldData[1].chinadata,this.fieldData[1].autodata);this.tableData2=this.tableData2.concat({title:"论文合作者的论文合作者",isPath:!0,linkinfo:"论文合作者的论文合作者"},n,[],{title:"同事的论文合作者",isPath:!0,linkinfo:"同事的论文合作者"},this.collData[0].coauthorsdata,[],{title:"同领域中国学者的论文合作者",isPath:!0,linkinfo:"同领域中国学者的论文合作者"},s,[]),this.getTableData3()},getTableData3:function(){var t=this,a=[],e=(a=a.concat(this.paparData[1].zjudata,this.paparData[1].chinadata,this.paparData[1].autodata)).map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.paparData[2]=this.getData({type:15,ids:e});var i=this.collData[0].coauthorsdata.map(function(a){return{id:a.oData.Id,link:t.name+"-----"+a.oData.Name}});this.collData[1]=this.getData({type:15,ids:i});var n=[],s=[];n=n.concat(this.paparData[2].zjudata,this.paparData[2].chinadata,this.paparData[2].autodata),s=s.concat(this.collData[1].zjudata,this.collData[1].chinadata,this.collData[1].autodata);this.tableData3=this.tableData3.concat({title:"论文合作者的论文合作者的论文合作者",isPath:!0,linkinfo:"论文合作者的论文合作者的论文合作者"},n,[],{title:"同事的论文合作者的论文合作者",isPath:!0,linkinfo:"同事的论文合作者的论文合作者"},s,[]),this.loading=!1},moreData:function(t){"1"===t.index||("2"===t.index?this.tableData2=[]:t.index)},handleClick:function(){}},mounted:function(){},watch:{}},C={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"layer"},[e("div",{staticClass:"home"},[e("div",{staticClass:"home-header MT_50 MB_20"},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("学者合作路径查询")]),t._v(" "),e("div",{staticClass:"home-header-search PR_20 PL_20"},[e("span",[t._v("查询人名")]),t._v(" "),e("el-input",{staticClass:"ML_30",attrs:{placeholder:"必填"},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}}),t._v(" "),e("span",{staticClass:"ML_30"},[t._v("查询机构")]),t._v(" "),e("el-input",{staticClass:"ML_30",attrs:{placeholder:"必填"},model:{value:t.org,callback:function(a){t.org=a},expression:"org"}}),t._v(" "),e("el-button",{staticClass:"ML_30",attrs:{type:"primary",icon:"el-icon-search",loading:t.loading},on:{click:t.search}},[t._v("搜索")]),t._v(" "),e("el-checkbox",{staticClass:"check ML_30",model:{value:t.checked,callback:function(a){t.checked=a},expression:"checked"}},[t._v("合作者限制为中国学者")])],1)],1),t._v(" "),e("span",[t._v("说明：")]),t._v(" "),e("p",[t._v("同事：与查询学者在同机构且在同期刊上发文的学者")]),t._v(" "),e("p",[t._v("同领域学者：与查询学者在同期刊上发文的学者")]),t._v(" "),t.searchShow?e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"home-body row MT_20"},[e("tableTem",{staticClass:"tableTem",attrs:{tableData:t.tableData1,index:"1",showPath:t.showPath,lable:"论文合作学者"},on:{moreData:t.moreData}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{index:"2",tableData:t.tableData2,tip:t.tip,showPath:t.showPath,lable:"论文合作学者"},on:{moreData:t.moreData}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{index:"3",tableData:t.tableData3,tip:t.tip,showPath:t.showPath,lable:"论文合作学者"},on:{moreData:t.moreData}})],1):t._e()])])},staticRenderFns:[]};var T=e("VU/8")(x,C,!1,function(t){e("EnYq")},null,null).exports,z={name:"home",components:{figureChart:k,tableTem:D},data:function(){return{loading:!1,tip:!0,searchShow:!1,name:"tao,yunzhe",org:"columbia univ",showPath:"",checked:!1,p1:"",id:"",paparData:{},collData:{},fieldData:{},tableData1:[],tableData2:[],tableData3:[],figureData:{}}},methods:{search:function(){var t=this;if(this.name)if(this.org){this.loading=!0,this.searchShow=!0,this.tableData1=[],this.tableData2=[],this.tableData3=[],this.showPath=this.name+"("+this.org+")";var a=this.getData({type:3,s_name:this.name,s_org:this.org});this.p1="#"+a.data[0].rid.cluster+":"+a.data[0].rid.position,this.id=a.data[0].oData.Id,setTimeout(function(){t.getTableData1()},1e3)}else this.$message("请输入查询机构");else this.$message("请输入查询姓名")},getData:function(t){var a=void 0;return u.a.ajax({type:"post",url:"http://183.136.237.195/graph_db",data:t,dataType:"json",async:!1,success:function(t){a=t}}),a},getTableData1:function(){this.paparData[0]=this.getData({type:15,ids:[{id:this.id,link:this.name}]}),this.collData[0]=this.getData({type:6,p1:this.p1}),this.fieldData[0]=this.getData({type:7,p1:this.p1});var t=[];t=t.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata);var a=[],e=[],i=[];this.collData[0].data.forEach(function(t,n){"zju"===t.texttype?a.push(t):"auto"===t.texttype?i.push(t):"chinese"===t.texttype&&e.push(t)}),this.fieldData[0].data.forEach(function(t,n){"zju"===t.texttype?a.push(t):"auto"===t.texttype?i.push(t):"chinese"===t.texttype&&e.push(t)}),this.tableData1=this.tableData1.concat(this.paparData[0].zjudata,a,this.paparData[0].chinadata,e,this.paparData[0].autodata,i),this.getTableData2()},getTableData2:function(){var t=this,a=[],e=(a=a.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.paparData[1]=this.getData({type:15,ids:e});var i=this.fieldData[0].data.map(function(a){return{id:a.oData.Id,link:t.name+"-----"+a.oData.Name}});this.fieldData[1]=this.getData({type:15,ids:i}),this.collData[0].coauthorsdata.forEach(function(a,e){t.collData[0].coauthorsdata[e].linkinfo=t.name+"-----"+a.oData.Name}),this.getTableData3()},getTableData3:function(){var t=this,a=[],e=(a=a.concat(this.paparData[1].zjudata,this.paparData[1].chinadata,this.paparData[1].autodata)).map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.paparData[2]=this.getData({type:15,ids:e});var i=this.collData[0].coauthorsdata.map(function(a){return{id:a.oData.Id,link:t.name+"-----"+a.oData.Name}});this.collData[1]=this.getData({type:15,ids:i});var n=[],s=[],o=[];this.collData[0].coauthorsdata.forEach(function(t,a){"zju"===t.texttype?n.push(t):"auto"===t.texttype?o.push(t):"chinese"===t.texttype&&s.push(t)}),this.tableData2=this.tableData2.concat(this.paparData[1].zjudata,n,this.fieldData[1].zjudata,this.paparData[2].zjudata,this.collData[1].zjudata,this.paparData[1].chinadata,s,this.fieldData[1].chinadata,this.paparData[2].chinadata,this.collData[1].chinadata,this.paparData[1].autodata,o,this.fieldData[1].autodata,this.paparData[2].autodata,this.collData[1].autodata),this.loading=!1},moreData:function(t){"1"===t.index||("2"===t.index?this.tableData2=[]:t.index)},handleClick:function(){}},mounted:function(){this.search()},watch:{}},P={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"layer"},[e("div",{staticClass:"home"},[e("div",{staticClass:"home-header MT_50 MB_20"},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("学者合作路径查询")]),t._v(" "),e("div",{staticClass:"home-header-search PR_20 PL_20"},[e("span",[t._v("查询人名")]),t._v(" "),e("el-input",{staticClass:"ML_30",attrs:{placeholder:"必填"},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}}),t._v(" "),e("span",{staticClass:"ML_30"},[t._v("查询机构")]),t._v(" "),e("el-input",{staticClass:"ML_30",attrs:{placeholder:"必填"},model:{value:t.org,callback:function(a){t.org=a},expression:"org"}}),t._v(" "),e("el-button",{staticClass:"ML_30",attrs:{type:"primary",icon:"el-icon-search",loading:t.loading},on:{click:t.search}},[t._v("搜索")]),t._v(" "),e("el-checkbox",{staticClass:"check ML_30",model:{value:t.checked,callback:function(a){t.checked=a},expression:"checked"}},[t._v("合作者限制为中国学者")])],1)],1),t._v(" "),e("span",[t._v("说明：")]),t._v(" "),e("p",[t._v("同事：与查询学者在同机构且在同期刊上发文的学者")]),t._v(" "),e("p",[t._v("同领域学者：与查询学者在同期刊上发文的学者")]),t._v(" "),t.searchShow?e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"home-body row MT_20"},[e("tableTem",{staticClass:"tableTem",attrs:{tableData:t.tableData1,index:"1",showPath:t.showPath,lable:"论文合作学者"},on:{moreData:t.moreData}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{index:"2",tableData:t.tableData2,tip:t.tip,showPath:t.showPath,lable:"论文合作学者"},on:{moreData:t.moreData}})],1):t._e()])])},staticRenderFns:[]};var S=e("VU/8")(z,P,!1,function(t){e("B0qa")},null,null).exports;i.default.use(c.a);var E=new c.a({routes:[{path:"/",name:"Home",component:T},{path:"/view",name:"view",component:S}]}),j=e("NYxO");i.default.use(j.a);var $=new j.a.Store({state:{bAuth:!1},mutations:{loginStatue:function(t,a){t.bAuth=a}}}),L=(e("j1ja"),e("Yg9U")),N=e.n(L);e("yh13");i.default.config.productionTip=!1,i.default.use(s.a),i.default.use(N.a),E.beforeEach(function(t,a,e){t.meta.requiresAuth?$.state.bAuth?e():(alert("请先登录"),e("/Login")):e(),document.body.scrollTop=0,document.documentElement.scrollTop=0,window.pageYOffset=0,e()}),new i.default({el:"#app",router:E,components:{App:h},template:"<App/>"})},PDRJ:function(t,a){},tvR6:function(t,a){},yh13:function(t,a){}},["NHnr"]);
//# sourceMappingURL=app.fb6d62db03d67a68ab7d.js.map