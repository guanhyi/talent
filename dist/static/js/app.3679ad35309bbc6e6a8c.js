webpackJsonp([1],{"/hRM":function(t,a){},MtmJ:function(t,a){},NHnr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("7+uW"),n=e("zL8q"),s=e.n(n),o=(e("tvR6"),{render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",[a("el-row",{staticClass:"header",attrs:{type:"flex",justify:"center"}},[a("el-col",{attrs:{span:6}}),this._v(" "),a("el-col",{attrs:{offset:12,span:4}})],1)],1)},staticRenderFns:[]});var l={name:"App",components:{Header:e("VU/8")({name:"Header",data:function(){return{}},methods:{goTalent:function(){this.$router.push({path:"/talent"})},goHome:function(){this.$router.push({path:"/"})}}},o,!1,function(t){e("PDRJ")},"data-v-3be0b12c",null).exports},data:function(){return{path:""}},mounted:function(){var t=document.createElement("script");t.type="text/javascript",t.src="/expert/static/js/leader-line.min.js",document.body.appendChild(t),this.path=this.$route.path},watch:{$route:function(t,a){this.path=t.path}}},h={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{attrs:{id:"app"}},[a("Header"),this._v(" "),a("router-view")],1)},staticRenderFns:[]},r=e("VU/8")(l,h,!1,null,null,null).exports,c=e("/ocq"),d=e("7t+N"),p=e.n(d),u={name:"tableTem",props:{tableData:{type:Array,required:!0},index:{type:String},showPath:{type:String},loading:{type:Boolean,default:!1},tip:{type:Boolean,default:!1},lines:{type:Array},lines2:{type:Array},drawLine:{type:Boolean,default:!1}},watch:{lines:{deep:!0,handler:function(){var t=this;this.lines.length&&this.$nextTick(function(){t.drwaLine(t.lines)})}}},data:function(){return{line1:[],line2:[],line3:[]}},methods:{tableRowClassName:function(t){var a=t.row;t.rowIndex;return"zju"===a.texttype?"row-red":"chinese"===a.texttype?"row-highlighted":a.isPath?"row-path":""},arraySpanMethod:function(t){var a=t.row;t.column,t.rowIndex,t.columnIndex;if(a.isPath||a.more)return{rowspan:1,colspan:2}},query:function(t){this.$emit("query",t)},moreData:function(t){var a={index:this.index,type:t.type};this.$emit("moreData",a)},clickCell:function(t,a,e,i){if(a&&!t.isPath){var n=this.$router.resolve({name:"/",query:{name:t.oData.Name,Organization:t.oData.Organization}});window.open(n.href,"_blank")}},drwaLine:function(t){var a=this;if(t.length){var e={color:"#5bf",endPlug:"disc",size:2,startSocket:"left",endSocket:"right",hide:!0},i=this;t.forEach(function(t,n){var s=LeaderLine.mouseHoverAnchor(document.getElementById(t.start),"draw",{animOptions:{duration:500},hoverStyle:{backgroundColor:null},style:{paddingTop:null,paddingRight:null,paddingBottom:null,paddingLeft:null,cursor:null,backgroundColor:null,backgroundImage:null,backgroundSize:null,backgroundPosition:null,backgroundRepeat:null},onSwitch:function(a){"3"===i.index&&("mouseenter"===a.type?i.line3[t.start].show():"mouseleave"===a.type&&i.line3[t.start].hide())}});if("2"===a.index)a.line1[t.start]=new LeaderLine(s,document.getElementById(t.end),e);else if("3"===a.index){a.line2[t.start]=new LeaderLine(s,document.getElementById(t.end),e);var o=i.lines2.findIndex(function(a){return a.start===t.end});i.line3[t.start]=new LeaderLine(document.getElementById(i.lines2[o].start),document.getElementById(i.lines2[o].end),{color:"#5bf",endPlug:"disc",size:2,duration:500,timing:[.58,0,.42,1],hide:!0}).hide("draw",{duration:2e3,timing:[.42,.6,.4,1]})}})}}},mounted:function(){}},g={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"tableTem"},[e("div",{staticClass:"home-body-relation"},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("合作路径")]),t._v(" "),e("div",{staticClass:"PL_50 PR_50"},[t._m(0),t._v(" "),t.tableData.length?e("div",{staticClass:"row relation-echart"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,border:"","span-method":t.arraySpanMethod,"row-class-name":t.tableRowClassName},on:{"row-click":t.clickCell}},[e("el-table-column",{attrs:{label:"姓名",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return[a.row.more?e("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.moreData(a.row)}}},[t._v("加载更多")]):t.tip?e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:a.row.linkinfo,placement:"top-start"}},[e("span",{staticStyle:{cursor:"pointer"},attrs:{id:"table"+t.index+a.$index}},[t._v(t._s(a.row.isPath?a.row.title:a.row.oData.Name))])]):e("span",{staticStyle:{cursor:"pointer"},attrs:{id:"table"+t.index+a.$index}},[t._v(t._s(a.row.isPath?a.row.title:a.row.oData.Name))])]}}],null,!1,2886947282)}),t._v(" "),e("el-table-column",{attrs:{label:"机构",align:"center"},scopedSlots:t._u([{key:"default",fn:function(a){return a.row.isPath||a.row.more?void 0:[t.tip?e("el-tooltip",{staticClass:"item",staticStyle:{cursor:"pointer"},attrs:{effect:"dark",content:a.row.linkinfo,placement:"top-start"}},[e("span",[t._v(t._s(a.row.oData.Organization))])]):e("span",[t._v(t._s(a.row.oData.Organization))])]}}],null,!0)})],1)],1):e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"none"},[t._v("无符合此条件学者")])])],1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"relation-top row"},[a("div")])}]};var m=e("VU/8")(u,g,!1,function(t){e("vH8w")},null,null).exports,f=e("fZjL"),D=e.n(f),v=e("XLwt"),b=e.n(v);e("lHA8"),e("c/Tr"),e("pFYg");var y={data:function(){return{$_sidebarElm:null}},mounted:function(){var t,a,e,i,n,s,o,l,h,r=this;this.__resizeHandler=(t=function(){r.chart&&r.chart.resize()},a=100,i=void 0,n=void 0,s=void 0,o=void 0,l=void 0,h=function h(){var r=+new Date-o;r<a&&r>0?i=setTimeout(h,a-r):(i=null,e||(l=t.apply(s,n),i||(s=n=null)))},function(){for(var n=arguments.length,r=Array(n),c=0;c<n;c++)r[c]=arguments[c];s=this,o=+new Date;var d=e&&!i;return i||(i=setTimeout(h,a)),d&&(l=t.apply(s,r),s=r=null),l}),window.addEventListener("resize",this.__resizeHandler),this.$_sidebarElm=document.getElementsByClassName("sidebar-container")[0],this.$_sidebarElm&&this.$_sidebarElm.addEventListener("transitionend",this.$_sidebarResizeHandler)},beforeDestroy:function(){window.removeEventListener("resize",this.__resizeHandler),this.$_sidebarElm&&this.$_sidebarElm.removeEventListener("transitionend",this.$_sidebarResizeHandler)},methods:{$_sidebarResizeHandler:function(t){"width"===t.propertyName&&this.__resizeHandler()}}};e("tcAE");var _={mixins:[y],props:{className:{type:String,default:"chart"},width:{type:String,default:"100%"},height:{type:String,default:"550px"},figureData:{type:Object,required:!0}},data:function(){return{chart:null}},watch:{figureData:{deep:!0,handler:function(t){console.log(1),this.initChart()}}},mounted:function(){var t=this;this.$nextTick(function(){t.initChart()})},beforeDestroy:function(){this.chart&&(this.chart.dispose(),this.chart=null)},methods:{initChart:function(){this.chart=b.a.init(this.$el,"macarons"),D()(this.figureData).length&&this.chart.setOption({title:{text:""},tooltip:{},animationDurationUpdate:1500,animationEasingUpdate:"quinticInOut",label:{normal:{show:!0,textStyle:{fontSize:12}}},legend:{x:"center",show:!1,data:["查询","机构","专家","起点"]},series:[{type:"graph",layout:"force",symbolSize:45,focusNodeAdjacency:!0,roam:!0,categories:[{name:"查询",itemStyle:{normal:{color:"#003366"}}},{name:"机构",itemStyle:{normal:{color:"#3399CC"}}},{name:"专家",itemStyle:{normal:{color:"#99CCFF"}}},{name:"起点",itemStyle:{normal:{color:"#32CD32"}}}],label:{normal:{show:!0,textStyle:{fontSize:16}}},force:{repulsion:3e3},edgeSymbolSize:[4,50],edgeLabel:{normal:{show:!0,textStyle:{fontSize:10},formatter:"{c}"}},data:this.figureData.nodes,links:this.figureData.lines,lineStyle:{normal:{opacity:.9,width:1,curveness:0}}}]})}}},w={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{class:this.className,style:{height:this.height,width:this.width}})},staticRenderFns:[]},x=e("VU/8")(_,w,!1,null,null,null).exports,T={name:"line",components:{figureChart:x,tableTem:m},data:function(){return{loading:!1,loading2:!1,loading3:!1,tip:!0,searchShow:!1,name:this.$route.query.name||"tao,yunzhe",org:this.$route.query.Organization||"columbia univ",p1:"",id:"",ids:[],paparData:[],collData:[],fieldData:[],tableData1:[],tableData2:[],tableData3:[],lines1:[],lines2:[]}},methods:{search:function(){var t=this;if(this.name)if(this.org){this.clear();var a=this.getData({type:3,s_name:this.name,s_org:this.org});if(!a.data.length)return this.$message("未能搜索到结果！"),void(this.loading=!1);this.p1="#"+a.data[0].rid.cluster+":"+a.data[0].rid.position,this.id=a.data[0].oData.Id,setTimeout(function(){t.getTableData1()},1e3)}else this.$message("请输入查询机构");else this.$message("请输入查询姓名")},getData:function(t){var a=void 0;return p.a.ajax({type:"post",url:"http://183.136.237.195/graph_db",data:t,dataType:"json",async:!1,success:function(t){a=t}}),a},remoteMethodName:function(t,a){if(!(t.length<3)){this.loading=!0;var e=this;p.a.ajax({type:"post",url:"http://183.136.237.195/graph_namematch",data:{type:1,name:t},dataType:"json",async:!1,success:function(t){e.optionsName=t.data.map(function(t){return{id:t.id,name:t.name,org:t.organization,value:t.name+" ("+t.organization+")"}}),a(e.optionsName),e.loading=!1}})}},remoteMethodOrg:function(t,a){if(t.length<3)this.optionsName=[];else{this.loading=!0;var e=this;p.a.ajax({type:"post",url:"http://183.136.237.195/graph_namematch",data:{type:2,name:this.name,org:t},dataType:"json",async:!1,success:function(t){e.optionsOrg=t.data.map(function(t){return{id:t.id,name:t.name,org:t.organization,value:t.organization}}),a(e.optionsOrg),e.loading=!1}})}},changeName:function(t){this.name=t.name,this.org=t.org},changeOrg:function(t){this.org=t.org},getTableData1:function(){var t=this,a=[],e=[],i=[],n=[],s=[],o=[];if(this.paparData[0]=this.getData({type:15,ids:[{id:this.id,link:this.name}],l:1,p0:this.id}),(a=a.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).length&&(this.accIds(a),n={title:"论文合作者",isPath:!0,linkinfo:"论文合作者"}),this.collData[0]=this.getData({type:6,p1:this.p1,notin:this.ids,p0:this.id}),this.collData[0].data.length){var l=[],h=[],r=[];s={title:"同事",isPath:!0,linkinfo:"同事"},this.collData[0].data.forEach(function(t,a){"zju"===t.texttype?l.push(t):"auto"===t.texttype?r.push(t):"chinese"===t.texttype&&h.push(t)}),e=e.concat(l,h,r),this.accIds(e)}var c=this.ids;if(c.push({id:this.id}),this.fieldData[0]=this.getData({type:7,p1:this.p1,notin:c,p0:this.id}),this.fieldData[0].data.length){var d=[],p=[],u=[];o={title:"同领域中国学者",isPath:!0,linkinfo:"同领域中国学者"},this.fieldData[0].data.forEach(function(t,a){"zju"===t.texttype?d.push(t):"auto"===t.texttype?u.push(t):"chinese"===t.texttype&&p.push(t)}),i=i.concat(d,p,u),this.accIds(i)}this.tableData1=this.tableData1.concat(n,a,s,e,o,i),this.loading=!1,this.tableData1.length&&(this.loading2=!0,this.loading3=!0,setTimeout(function(){t.getTableData2()},500))},getTableData2:function(){var t=this,a=[],e=[],i=[],n=[],s=[];if((a=this.paparData[0].zjudata.length?a.concat(this.paparData[0].chinadata,this.paparData[0].autodata):a.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).length){var o=a.map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.paparData[1]=this.getData({type:15,notin:this.ids,ids:o,l:21,p0:this.id}),(e=e.concat(this.paparData[1].zjudata,this.paparData[1].chinadata,this.paparData[1].autodata)).length&&(n={title:"论文合作者的论文合作者",isPath:!0,linkinfo:"论文合作者的论文合作者"})}if(this.collData[0].data.length){var l=[];this.collData[0].data.forEach(function(a){"zju"!==a.texttype&&l.push({id:a.oData.Id,link:t.name+"-----"+a.oData.Name})}),this.collData[1]=this.getData({type:15,ids:l,notin:this.ids,l:22,p0:this.id}),(i=i.concat(this.collData[1].zjudata,this.collData[1].chinadata,this.collData[1].autodata)).length&&(s={title:"同事的论文合作者",isPath:!0,linkinfo:"同事的论文合作者"})}this.accIds(e),this.accIds(i),this.tableData2=this.tableData2.concat(n,e,s,i),this.loading2=!1,this.tableData2.length?(this.accLines(),this.getTableData3()):this.loading3=!1},getTableData3:function(){this.loading3=!0;var t=[],a=[],e=[],i=[],n=[],s=[];if(this.paparData[1]&&(t=this.paparData[1].zjudata.length?t.concat(this.paparData[1].chinadata,this.paparData[1].autodata):t.concat(this.paparData[1].zjudata,this.paparData[1].chinadata,this.paparData[1].autodata)),t.length){var o=t.map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.paparData[2]=this.getData({type:15,ids:o,l:31,notin:this.ids,p0:this.id}),(e=e.concat(this.paparData[2].zjudata,this.paparData[2].chinadata,this.paparData[2].autodata)).length&&(n={title:"论文合作者的论文合作者的论文合作者",isPath:!0,linkinfo:"论文合作者的论文合作者的论文合作者"})}if(this.collData[1]){if((a=(this.collData[1].zjudata.length,a.concat(this.collData[1].zjudata,this.collData[1].chinadata,this.collData[1].autodata))).length){var l=a.map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.collData[2]=this.getData({type:15,notin:this.ids,ids:l,l:32,p0:this.id}),i=i.concat(this.collData[2].zjudata,this.collData[2].chinadata,this.collData[2].autodata)}i.length&&(s={title:"同事的论文合作者的论文合作者",isPath:!0,linkinfo:"同事的论文合作者的论文合作者"})}this.tableData3=this.tableData3.concat(n,e,s,i),this.tableData3.length&&this.accLines2(),this.loading3=!1},accIds:function(t){var a=this;t.forEach(function(t){a.ids.push({id:t.oData.Id})})},accLines:function(t){var a=this,e=this.tableData1,i=this.tableData2,n=0,s=0,o=[];e.forEach(function(t){t.isPath||t.more||o.push({id:"table1"+n,name:t.oData.Name}),n++}),i.forEach(function(t,e){if(!t.isPath&&!t.more){var i=t.linkinfo.split("-----"),n=o.findIndex(function(t){return t.name===i[1]});a.lines1.push({start:"table2"+s,end:o[n].id})}s++})},accLines2:function(t){var a=this,e=this.tableData2,i=this.tableData3,n=0,s=0,o=[];e.forEach(function(t){t.isPath||t.more||o.push({id:"table2"+n,name:t.oData.Name}),n++}),i.forEach(function(t,e){if(!t.isPath&&!t.more){var i=t.linkinfo.split("-----"),n=o.findIndex(function(t){return t.name===i[2]});a.lines2.push({start:"table3"+s,end:o[n].id})}s++})},clear:function(){this.searchShow=!0,this.loading=!0,this.tableData1=[],this.tableData2=[],this.tableData3=[],this.ids=[],this.lines1=[],this.lines2=[]},handleClick:function(){}},mounted:function(){this.$route.query.name&&this.search()},watch:{}},k={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"layer"},[e("div",{staticClass:"home"},[e("div",{staticClass:"home-header MT_50 MB_20"},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("学者合作路径查询")]),t._v(" "),e("div",{staticClass:"home-header-search PR_20 PL_20"},[e("span",{attrs:{id:"start"}},[t._v("查询人名")]),t._v(" "),e("el-autocomplete",{staticClass:"ML_30",attrs:{"fetch-suggestions":t.remoteMethodName,placeholder:"请输入内容"},on:{select:t.changeName},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}}),t._v(" "),e("span",{staticClass:"ML_30",attrs:{id:"end"}},[t._v("查询机构")]),t._v(" "),e("el-autocomplete",{staticClass:"ML_30",attrs:{"fetch-suggestions":t.remoteMethodOrg,placeholder:"请输入内容"},on:{select:t.changeOrg},model:{value:t.org,callback:function(a){t.org=a},expression:"org"}}),t._v(" "),e("el-button",{staticClass:"ML_30",attrs:{type:"primary",icon:"el-icon-search",loading:t.loading},on:{click:t.search}},[t._v("搜索")])],1)],1),t._v(" "),e("span",[t._v("说明：")]),t._v(" "),e("p",[t._v("同事：与查询学者在同机构且在同期刊上发文的学者")]),t._v(" "),e("p",[t._v("同领域学者：与查询学者在同期刊上发文的学者")]),t._v(" "),e("p",[t._v("展示时间受节点数量影响，二次跳转节点数量超过2000预计需耗时20秒，请您耐心等待")]),t._v(" "),t.searchShow?e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"home-body row MT_20"},[e("tableTem",{staticClass:"tableTem",attrs:{tableData:t.tableData1,index:"1"}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{lines:t.lines1,loading:t.loading2,index:"2",tableData:t.tableData2,tip:t.tip}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{lines:t.lines2,lines2:t.lines1,loading:t.loading3,index:"3",tableData:t.tableData3,tip:t.tip}})],1):t._e()])])},staticRenderFns:[]};var z=e("VU/8")(T,k,!1,function(t){e("/hRM")},null,null).exports,j={name:"home",components:{figureChart:x,tableTem:m},data:function(){return{loading:!1,loading1:!1,loading2:!1,loading3:!1,tip:!0,searchShow:!1,value:"",name:this.$route.query.name||"tao,yunzhe",org:this.$route.query.Organization||"columbia univ",showPath:"",checked:!1,p1:"",id:"",pages:[{page:1},{page:1},{page:1}],ids:[],data2:[],data3:[],paparData:{},collData:{},fieldData:{},tableData1:[],locData1:[],tableData2:[],locData2:[],tableData3:[],locData3:[]}},methods:{search:function(){var t=this;if(this.name)if(this.org){this.loading1=!0,this.searchShow=!0,this.tableData1=[],this.tableData2=[],this.ids=[],this.tableData3=[],this.locData2=[],this.locData3=[],this.locData1=[],this.locData1=[],this.showPath=this.name+"("+this.org+")";var a=this.getData({type:3,s_name:this.name,s_org:this.org});if(!a.data.length)return this.$message("未能搜索到结果！"),void(this.loading=!1);this.p1="#"+a.data[0].rid.cluster+":"+a.data[0].rid.position,this.id=a.data[0].oData.Id,setTimeout(function(){t.getTableData1()},1e3)}else this.$message("请输入查询机构");else this.$message("请输入查询姓名")},remoteMethodName:function(t,a){if(!(t.length<3)){this.loading=!0;var e=this;p.a.ajax({type:"post",url:"http://183.136.237.195/graph_namematch",data:{type:1,name:t},dataType:"json",async:!1,success:function(t){e.optionsName=t.data.map(function(t){return{id:t.id,name:t.name,org:t.organization,value:t.name+" ("+t.organization+")"}}),a(e.optionsName),e.loading=!1}})}},remoteMethodOrg:function(t,a){if(t.length<3)this.optionsName=[];else{this.loading=!0;var e=this;p.a.ajax({type:"post",url:"http://183.136.237.195/graph_namematch",data:{type:2,name:this.name,org:t},dataType:"json",async:!1,success:function(t){e.optionsOrg=t.data.map(function(t){return{id:t.id,name:t.name,org:t.organization,value:t.organization}}),a(e.optionsOrg),e.loading=!1}})}},changeName:function(t){this.name=t.name,this.org=t.org},changeOrg:function(t){this.org=t.org},getData:function(t){var a=void 0;return p.a.ajax({type:"post",url:"http://183.136.237.195/graph_db",data:t,dataType:"json",async:!1,success:function(t){a=t}}),a},getTableData1:function(){var t=this;this.paparData[0]=this.getData({type:15,ids:[{id:this.id,link:this.name}],l:1,p0:this.id});var a=[],e=(a=a.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).map(function(t){return{id:t.oData.Id}});this.collData[0]=this.getData({type:6,p1:this.p1,notin:e}),this.collData[0].data.forEach(function(t){e.push({id:t.oData.Id})}),e.push({id:this.id}),this.fieldData[0]=this.getData({type:7,notin:e,p1:this.p1});var i=[],n=[],s=[];this.collData[0].data.forEach(function(t,a){"zju"===t.texttype?i.push(t):"auto"===t.texttype?s.push(t):"chinese"===t.texttype&&n.push(t)}),this.fieldData[0].data.forEach(function(t,a){"zju"===t.texttype?i.push(t):"auto"===t.texttype?s.push(t):"chinese"===t.texttype&&n.push(t)}),this.tableData1=this.tableData1.concat(this.paparData[0].zjudata,i,this.paparData[0].chinadata,n,this.paparData[0].autodata,s),this.locData1=this.locData1.concat(this.paparData[0].zjudata,i,this.paparData[0].chinadata,n,this.paparData[0].autodata,s),this.accIds(this.locData1),this.tableData1.length>50&&(this.tableData1=this.tableData1.slice(0,50),this.tableData1.push({more:!0,type:"papar"})),this.loading1=!1,this.tableData1.length&&(this.loading2=!0,this.loading3=!0,setTimeout(function(){t.getTableData2()},500))},getTableData2:function(){var t=this;this.loading2=!0;var a=[],e=[];this.paparData[0]&&(a=a.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).length&&a.forEach(function(t){e.push({id:t.oData.Id,link:t.linkinfo})}),this.collData[0]&&this.collData[0].data.forEach(function(a){e.push({id:a.oData.Id,link:t.name+"-----"+a.oData.Name})}),this.data2=this.getData({type:15,ids:e,l:2,notin:this.ids,p0:this.id}),this.locData2=this.locData2.concat(this.data2.zjudata,this.data2.chinadata,this.data2.autodata),this.accIds(this.locData2),this.locData2.length>50?(this.tableData2=this.locData2.slice(0,50),this.tableData2.push({more:!0,type:"papar"})):this.tableData2=this.locData2,this.loading2=!1,this.tableData2.length?this.getTableData3():this.loading3=!1},getTableData3:function(){this.loading3=!0;var t=[];this.locData2.forEach(function(a){t.push({id:a.oData.Id,link:a.linkinfo})}),this.data3=this.getData({type:15,ids:t,l:3,notin:this.ids,p0:this.id}),this.locData3=this.locData3.concat(this.data3.zjudata,this.data3.chinadata,this.data3.autodata),this.locData3.length>50?(this.tableData3=this.locData3.slice(0,50),this.tableData3.push({more:!0,type:"papar"})):this.tableData3=this.locData3,this.loading3=!1},moreData:function(t){"1"===t.index?(this.pages[0].page++,this.addTableData1()):"2"===t.index?(this.pages[1].page++,this.addTableData2()):"3"===t.index&&(this.pages[2].page++,this.addTableData3())},addTableData1:function(){this.tableData1=this.locData1.slice(0,50*this.pages[0].page),this.locData1.length>50*this.pages[0].page&&this.tableData1.push({more:!0,type:"papar"})},addTableData2:function(){this.tableData2=this.locData2.slice(0,50*this.pages[1].page),this.locData2.length>50*this.pages[1].page&&this.tableData2.push({more:!0,type:"papar"})},addTableData3:function(){this.tableData3=this.locData3.slice(0,50*this.pages[2].page),this.locData3.length>50*this.pages[2].page&&this.tableData3.push({more:!0,type:"papar"})},accIds:function(t){var a=this;t.forEach(function(t){a.ids.push({id:t.oData.Id})})},handleClick:function(){}},mounted:function(){this.search()},watch:{}},C={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"layer"},[e("div",{staticClass:"home"},[e("div",{staticClass:"home-header MT_50 MB_20"},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("学者合作路径查询")]),t._v(" "),e("div",{staticClass:"home-header-search PR_20 PL_20"},[e("span",[t._v("查询人名")]),t._v(" "),e("el-autocomplete",{staticClass:"ML_30",attrs:{"fetch-suggestions":t.remoteMethodName,placeholder:"请输入内容"},on:{select:t.changeName},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}}),t._v(" "),e("span",{staticClass:"ML_30"},[t._v("查询机构")]),t._v(" "),e("el-autocomplete",{staticClass:"ML_30",attrs:{"fetch-suggestions":t.remoteMethodOrg,placeholder:"请输入内容"},on:{select:t.changeOrg},model:{value:t.org,callback:function(a){t.org=a},expression:"org"}}),t._v(" "),e("el-button",{staticClass:"ML_30",attrs:{type:"primary",icon:"el-icon-search",loading:t.loading},on:{click:t.search}},[t._v("搜索")])],1)],1),t._v(" "),e("span",[t._v("说明：")]),t._v(" "),e("p",[t._v("同事：与查询学者在同机构且在同期刊上发文的学者")]),t._v(" "),e("p",[t._v("同领域学者：与查询学者在同期刊上发文的学者")]),t._v(" "),e("p",[t._v("展示时间受节点数量影响，二次跳转节点数量超过2000预计需耗时20秒，请您耐心等待")]),t._v(" "),t.searchShow?e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading1,expression:"loading1"}],staticClass:"home-body row MT_20"},[e("tableTem",{staticClass:"tableTem",attrs:{tableData:t.tableData1,index:"1",showPath:t.showPath,lable:"论文合作学者"},on:{moreData:t.moreData}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{loading:t.loading2,index:"2",tableData:t.tableData2,tip:t.tip,showPath:t.showPath,lable:"论文合作学者"},on:{moreData:t.moreData}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{loading:t.loading3,index:"3",tableData:t.tableData3,tip:t.tip,showPath:t.showPath,lable:"论文合作学者"},on:{moreData:t.moreData}})],1):t._e()])])},staticRenderFns:[]};var I=e("VU/8")(j,C,!1,function(t){e("MtmJ")},null,null).exports,P={name:"line",components:{figureChart:x,tableTem:m},data:function(){return{loading:!1,loading2:!1,loading3:!1,tip:!0,searchShow:!1,name:this.$route.query.name||"tao,yunzhe",org:this.$route.query.Organization||"columbia univ",showPath:"",checked:!1,p1:"",id:"",ids:[],paparData:[],collData:[],fieldData:[],tableData1:[],tableData2:[],tableData3:[],pages:[{papar:0,coll:0,field:0},{papar:0,coll:0,field:0},{papar:0,coll:0,field:0}],DomI:0,DomIIndex:0,DomIIndex2:0,DomId1:[],DomId2:[],lines1:[],lines2:[]}},methods:{search:function(){var t=this;if(this.name)if(this.org){this.clear(),this.showPath=this.name+"("+this.org+")";var a=this.getData({type:3,s_name:this.name,s_org:this.org});if(!a.data.length)return this.$message("未能搜索到结果！"),void(this.loading=!1);this.p1="#"+a.data[0].rid.cluster+":"+a.data[0].rid.position,this.id=a.data[0].oData.Id,setTimeout(function(){t.getTableData1()},1e3)}else this.$message("请输入查询机构");else this.$message("请输入查询姓名")},getData:function(t){var a=void 0;return p.a.ajax({type:"post",url:"http://183.136.237.195/graph_db",data:t,dataType:"json",async:!1,success:function(t){a=t}}),a},remoteMethodName:function(t,a){if(!(t.length<3)){this.loading=!0;var e=this;p.a.ajax({type:"post",url:"http://183.136.237.195/graph_namematch",data:{type:1,name:t},dataType:"json",async:!1,success:function(t){e.optionsName=t.data.map(function(t){return{id:t.id,name:t.name,org:t.organization,value:t.name+" ("+t.organization+")"}}),a(e.optionsName),e.loading=!1}})}},remoteMethodOrg:function(t,a){if(t.length<3)this.optionsName=[];else{this.loading=!0;var e=this;p.a.ajax({type:"post",url:"http://183.136.237.195/graph_namematch",data:{type:2,name:this.name,org:t},dataType:"json",async:!1,success:function(t){e.optionsOrg=t.data.map(function(t){return{id:t.id,name:t.name,org:t.organization,value:t.organization}}),a(e.optionsOrg),e.loading=!1}})}},changeName:function(t){this.name=t.name,this.org=t.org},changeOrg:function(t){this.org=t.org},getTableData1:function(){var t=this,a=[],e=[],i=[],n=[],s=[],o=[],l=[],h=[],r=[];if(this.paparData[0]=this.getData({type:15,ids:[{id:this.id,link:this.name}],l:1,p0:this.id}),(a=a.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).length&&(this.accIds(a),n={title:"论文合作者",isPath:!0,linkinfo:"论文合作者"},a.length>9999&&(l={more:!0,type:"papar"}),this.pages[0].papar=999),this.collData[0]=this.getData({type:6,p1:this.p1,notin:this.ids}),this.collData[0].data.length){var c=[],d=[],p=[];s={title:"同事",isPath:!0,linkinfo:"同事"},this.collData[0].data.forEach(function(t,a){"zju"===t.texttype?c.push(t):"auto"===t.texttype?p.push(t):"chinese"===t.texttype&&d.push(t)}),e=e.concat(c,d,p),this.accIds(e),e.length>9999&&(h={more:!0,type:"coll"}),this.pages[0].coll=999}var u=this.ids;if(u.push({id:this.id}),this.fieldData[0]=this.getData({type:7,p1:this.p1,notin:u}),this.fieldData[0].data.length){var g=[],m=[],f=[];o={title:"同领域中国学者",isPath:!0,linkinfo:"同领域中国学者"},this.fieldData[0].data.forEach(function(t,a){"zju"===t.texttype?g.push(t):"auto"===t.texttype?f.push(t):"chinese"===t.texttype&&m.push(t)}),i=i.concat(g,m,f),this.accIds(i),i.length>9999&&(r={more:!0,type:"field"}),this.pages[0].field=999}this.tableData1=this.tableData1.concat(n,a.slice(0,9999),l,s,e.slice(0,9999),h,o,i.slice(0,9999),r),this.loading=!1,this.tableData1.length&&(this.loading2=!0,this.loading3=!0,setTimeout(function(){t.getTableData2()},500))},getTableData2:function(){var t=this,a=[],e=[],i=[],n=[],s=[],o=[],l=[];if((a=a.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).length&&!this.paparData[0].zjudata.length){var h=a.map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.paparData[1]=this.getData({type:15,notin:this.ids,ids:h,l:2,p0:this.id}),(e=e.concat(this.paparData[1].zjudata,this.paparData[1].chinadata,this.paparData[1].autodata)).length&&(o={title:"论文合作者的论文合作者",isPath:!0,linkinfo:"论文合作者的论文合作者"}),this.pages[1].papar=999,e.length>9999&&(n={more:!0,type:"papar"})}var r=[];if(this.collData[0].data.forEach(function(a){"zju"===a.texttype&&r.push({id:a.oData.Id,link:t.name+"-----"+a.oData.Name})}),this.collData[0].data.length&&!r.length){var c=this.collData[0].data.map(function(a){return{id:a.oData.Id,link:t.name+"-----"+a.oData.Name}});this.collData[1]=this.getData({type:15,ids:c,notin:this.ids,l:2,p0:this.id}),(i=i.concat(this.collData[1].zjudata,this.collData[1].autodata)).length&&(l={title:"同事的论文合作者",isPath:!0,linkinfo:"同事的论文合作者"}),this.pages[1].coll=999,i.length>9999&&(s={more:!0,type:"coll"})}this.accIds(e),this.accIds(i),this.tableData2=this.tableData2.concat(o,e.slice(0,9999),n,l,i.slice(0,9999),s),this.loading2=!1,this.tableData2.length?(this.accLines(),this.getTableData3()):this.loading3=!1},getTableData3:function(){this.loading3=!0;var t=[],a=[],e=[],i=[],n=[],s=[],o=[],l=[];if(this.paparData[1]&&(t=t.concat(this.paparData[1].zjudata,this.paparData[1].chinadata,this.paparData[1].autodata)),t.length&&!this.paparData[1].zjudata.length){var h=t.map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.paparData[2]=this.getData({type:15,ids:h,l:3,notin:this.ids,p0:this.id}),e=e.concat(this.paparData[2].zjudata,this.paparData[2].chinadata,this.paparData[2].autodata),this.pages[2].papar=999,e.length&&(o={title:"论文合作者的论文合作者的论文合作者",isPath:!0,linkinfo:"论文合作者的论文合作者的论文合作者"}),e.length>9999&&(n={more:!0,type:"papar"})}if(this.collData[1]){if((a=a.concat(this.collData[1].zjudata,this.collData[1].chinadata,this.collData[1].autodata)).length&&!this.collData[1].zjudata.length){var r=a.map(function(t){return{id:t.oData.Id,link:t.linkinfo}});this.collData[2]=this.getData({type:15,notin:this.ids,ids:r,l:3,p0:this.id}),i=i.concat(this.collData[2].zjudata,this.collData[2].chinadata,this.collData[2].autodata)}this.pages[2].coll=999,i.length&&(l={title:"同事的论文合作者的论文合作者",isPath:!0,linkinfo:"同事的论文合作者的论文合作者"},i.length>9999&&(s={more:!0,type:"coll"}))}this.tableData3=this.tableData3.concat(o,e.slice(0,9999),n,l,i.slice(0,9999),s),this.tableData3.length&&this.accLines2(),this.loading3=!1},moreData:function(t){"papar"===t.type?this.pages[parseInt(t.index)-1].papar++:"coll"===t.type?this.pages[parseInt(t.index)-1].coll++:"field"===t.type&&this.pages[parseInt(t.index)-1].field++,"1"===t.index?this.addTableData1(t):"2"===t.index?this.addTableData2(t):"3"===t.index&&this.addTableData3(t)},addTableData1:function(){var t=[],a=[],e=[],i=[],n=[],s=[],o=[],l=[],h=[];if(this.paparData[0]&&((t=t.concat(this.paparData[0].zjudata,this.paparData[0].chinadata,this.paparData[0].autodata)).length>30*this.pages[0].papar&&(a={more:!0,type:"papar"}),e={title:"论文合作者",isPath:!0,linkinfo:"论文合作者"}),this.collData[0]){var r=[],c=[],d=[];this.collData[0].data.forEach(function(t,a){"zju"===t.texttype?r.push(t):"auto"===t.texttype?d.push(t):"chinese"===t.texttype&&c.push(t)}),(i=i.concat(r,c,d)).length>30*this.pages[0].coll&&(s={more:!0,type:"coll"}),n={title:"同事",isPath:!0,linkinfo:"同事"}}if(this.fieldData[0]){var p=[],u=[],g=[];this.fieldData[0].data.forEach(function(t,a){"zju"===t.texttype?p.push(t):"auto"===t.texttype?g.push(t):"chinese"===t.texttype&&u.push(t)}),(o=o.concat(p,u,g)).length>30*this.pages[0].field&&(l={more:!0,type:"field"}),h={title:"同领域中国学者",isPath:!0,linkinfo:"同领域中国学者"}}this.tableData1=[],this.tableData1=this.tableData1.concat(e,t.slice(0,30*this.pages[0].papar),a,n,i.slice(0,30*this.pages[0].field),s,h,o.slice(0,30*this.pages[0].field),l)},accIds:function(t){var a=this;t.forEach(function(t){a.ids.push({id:t.oData.Id})})},accLines:function(t){var a=this,e=this.tableData1,i=this.tableData2,n=0,s=0,o=[];e.forEach(function(t){t.isPath||t.more||o.push({id:"table1"+n,name:t.oData.Name}),n++}),i.forEach(function(t,e){if(!t.isPath&&!t.more){var i=t.linkinfo.split("-----"),n=o.findIndex(function(t){return t.name===i[1]});a.lines1.push({start:"table2"+s,end:o[n].id})}s++})},accLines2:function(t){var a=this,e=this.tableData2,i=this.tableData3,n=0,s=0,o=[];e.forEach(function(t){t.isPath||t.more||o.push({id:"table2"+n,name:t.oData.Name}),n++}),i.forEach(function(t,e){if(!t.isPath&&!t.more){var i=t.linkinfo.split("-----"),n=o.findIndex(function(t){return t.name===i[2]});a.lines2.push({start:"table3"+s,end:o[n].id})}s++})},clear:function(){this.searchShow=!0,this.loading=!0,this.tableData1=[],this.tableData2=[],this.tableData3=[],this.ids=[],this.pages=[{papar:0,coll:0,field:0},{papar:0,coll:0,field:0},{papar:0,coll:0,field:0}](this.DomI=0),this.DomIIndex=0,this.DomIIndex2=0,this.DomId1=[],this.DomId2=[],this.lines1=[],this.lines2=[]},handleClick:function(){}},mounted:function(){this.$route.query.name&&this.search()},watch:{}},E={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"layer"},[e("div",{staticClass:"home"},[e("div",{staticClass:"home-header MT_50 MB_20"},[e("el-divider",{attrs:{"content-position":"left"}},[t._v("学者合作路径查询")]),t._v(" "),e("div",{staticClass:"home-header-search PR_20 PL_20"},[e("span",{attrs:{id:"start"}},[t._v("查询人名")]),t._v(" "),e("el-autocomplete",{staticClass:"ML_30",attrs:{"fetch-suggestions":t.remoteMethodName,placeholder:"请输入内容"},on:{select:t.changeName},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}}),t._v(" "),e("span",{staticClass:"ML_30",attrs:{id:"end"}},[t._v("查询机构")]),t._v(" "),e("el-autocomplete",{staticClass:"ML_30",attrs:{"fetch-suggestions":t.remoteMethodOrg,placeholder:"请输入内容"},on:{select:t.changeOrg},model:{value:t.org,callback:function(a){t.org=a},expression:"org"}}),t._v(" "),e("el-button",{staticClass:"ML_30",attrs:{type:"primary",icon:"el-icon-search",loading:t.loading},on:{click:t.search}},[t._v("搜索")])],1)],1),t._v(" "),e("span",[t._v("说明：")]),t._v(" "),e("p",[t._v("同事：与查询学者在同机构且在同期刊上发文的学者")]),t._v(" "),e("p",[t._v("同领域学者：与查询学者在同期刊上发文的学者")]),t._v(" "),e("p",[t._v("展示时间受节点数量影响，二次跳转节点数量超过2000预计需耗时20秒，请您耐心等待")]),t._v(" "),t.searchShow?e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"home-body row MT_20"},[e("tableTem",{staticClass:"tableTem",attrs:{tableData:t.tableData1,index:"1",showPath:t.showPath},on:{moreData:t.moreData}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{lines:t.lines1,loading:t.loading2,index:"2",tableData:t.tableData2,tip:t.tip,showPath:t.showPath},on:{moreData:t.moreData}}),t._v(" "),e("tableTem",{staticClass:"tableTem",attrs:{lines:t.lines2,lines2:t.lines1,loading:t.loading3,index:"3",tableData:t.tableData3,tip:t.tip,showPath:t.showPath},on:{moreData:t.moreData}})],1):t._e()])])},staticRenderFns:[]};var N=e("VU/8")(P,E,!1,function(t){e("plsY")},null,null).exports;i.default.use(c.a);var $=new c.a({routes:[{path:"/",name:"Home",component:z},{path:"/view",name:"view",component:I},{path:"/line",name:"line",component:N}]}),L=e("NYxO");i.default.use(L.a);var S=new L.a.Store({state:{bAuth:!1},mutations:{loginStatue:function(t,a){t.bAuth=a}}}),M=(e("j1ja"),e("Yg9U")),O=e.n(M);e("yh13");i.default.config.productionTip=!1,i.default.use(s.a),i.default.use(O.a),$.beforeEach(function(t,a,e){t.meta.requiresAuth?S.state.bAuth?e():(alert("请先登录"),e("/Login")):e(),document.body.scrollTop=0,document.documentElement.scrollTop=0,window.pageYOffset=0,e()}),new i.default({el:"#app",router:$,components:{App:r},template:"<App/>"})},PDRJ:function(t,a){},plsY:function(t,a){},tvR6:function(t,a){},vH8w:function(t,a){},yh13:function(t,a){}},["NHnr"]);
//# sourceMappingURL=app.3679ad35309bbc6e6a8c.js.map