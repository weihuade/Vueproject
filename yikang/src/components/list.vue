<template>
<div class="listsHeight" ref="listsHeight">
    <div class="list">
        <div class="header">
			<div class="pic">
				<img src="../img/homeimg/logonew.png" />
			</div>
			<mt-search 
				v-model="keywords"
				cancel-text 
				autofocus 
				placeholder="请输入要搜索的商品"
				 >
				<!--@input="search"  搜索结果显示出来的模块<mt-cell>-->
				<!-- <mt-cell v-for="item in result" :key="item.cat_id">
					<span>
						{{item.father_name}}
					</span>
				</mt-cell> -->

			</mt-search>
			<div class="list-tab">
                <!-- <myicons :type="tabs.icon" /> -->
            </div>
		</div>
        <div class="gallery">
            <div class="gallery-tab">
                <ul class="trigger-list clearfix">
                    <li>综合</li>
                    <li>销量</li>
                    <li>价格</li>
                    <li>筛选</li>
                </ul>
                <ul class="pt-list clearfix">
                    <li @click="goto('Detail',items.productCode)" v-for="items in list" :key="items.id">
                        <img :src="'https://image.jianke.com'+items.thumbnailUri" alt=""  class="pt-img">
                        <div class="pt-name">{{items.productName}}</div>
                        <div class="pt-price">￥：{{((items.lowestPrice)/100).toFixed(2)}}</div>
                    </li>
                </ul>
                <div class="pageview">
                    <!-- <select>
                        <option class="flip">1/8</option>
                        <option class="flip">2/8</option>
                        <option class="flip">3/8</option>
                        <option class="flip">4/8</option>
                        <option class="flip">5/8</option>
                    </select> -->
                    <a class="flip">- - - - 已无更多，谢谢 - - - -</a>
                </div>
            </div>
		</div>
    </div>
</div>
    
</template>
<script>
import Vue from 'vue';
import myicons from '../plugins/icons';
import { Indicator } from 'mint-ui';
//	//使用插件
Vue.use(myicons);
export default {
    data() {
        return {
        keywords: "",
        clientHeight:"",
        tabs: [{
            icon: 'list-unordered'
        }],
        list:[],
        timer:null,
        };
    },
    mounted(){
        this.clientHeight=`${document.documentElement.clientHeight}`
        window.onresize=function temp(){
            this.clientHeight=`${document.documentElement.clientHeight}`;
        }
    },
    watch: {
        // 如果 `clientHeight` 发生改变，这个函数就会运行
        clientHeight: function () {
            this.changeFixed(this.clientHeight)
        }
    },
    methods:{
        //动态修改样式
        changeFixed(clientHeight){                        
            this.$refs.listsHeight.style.height = clientHeight-43+ 'px';
        },
        goto(name,pcode){
            this.$router.push({name,params:{pcode:pcode}});
            // console.log(this.$route);
        },
    },
    created(){
        let cid=this.$route.params.code;
        clearTimeout(this.timer);
        Indicator.open('Loading...')//loading开始
        this.timer=setTimeout(()=>{
        this.$axios.get("http://59.110.138.64:12345",{
					params:{
                        rq:`https://fe-wcgi.jianke.com/v1/searchs?cid=${cid}&pn=1&ps=10`,
					}}).then(res=>{
            let dataList=res.data.products.results;
            this.list=dataList;
            console.log(this.list);
            Indicator.close();//请求数据结束关掉loading
        })
        },300)
    },
}
</script>
<style lang="scss">
.listsHeight{
    overflow-y: auto;
    .list {
        background: #f2f2f2;
        // max-width: 640px;
        min-width: 320px;
        margin: 0px auto;
        // margin-bottom: 43px;
        overflow: auto;
        /*这里有问题*/
        .header {
            width: 100%;
            height: 53px;
            background: #31c27c;
            .pic {
                float: left;
                width: 10%;
                height: auto;
                max-width: 53px;
                height: 53px;
                margin-left: 10px;
                img {
                    width: 100%;
                    margin-top: 10px;
                    max-width: 36px;
                    max-height: 36px;
                }
            }
            .mint-search {
                // background: #31c27c;
                width: 69%;
                height: 100%;
                height: 53px;
                float: left;
                text-align: center;
                line-height: 52.5px;
                margin-left: 1%;
                margin-right: 1%;
                padding: 0px;
                .mint-searchbar {
                    padding: 0;
                    margin-top: 9px;
                    border-radius: 20px;
                    width: 100%;
                    background-color: #fff;
                    .mint-searchbar-inner {
                        border-radius: 20px;
                        width: 100%;
                        input {
                            height: 100%;
                            margin-left: 5px;
                        }
                    }
                }
            }
            .list-tab {
                float: left;
                height: 53px;
                width: 10%;
                font-size: 16px;
                text-align: center;
                line-height: 52.5px;
                margin-left: 1%;
                margin-right: 1%;
                color: #fff;
            }
        }
        .gallery{
            .trigger-list{
                box-shadow: 0px 4px 20px #dfe4e2;
                // margin-bottom: 10px;
                background: #fff;
                font-size: 15px;
                width: 100%;
                li{
                    height: 45px;
                    line-height: 45px;
                    font-size: 16px;
                    float: left;
                    width: 25%;
                    text-align: center;
                }
            }
            .pt-list{
                li{
                    width: 48%;
                    background: #fff;
                    // margin-top: 10px;
                    margin: 10px 1% 0 1%;
                    box-shadow: 0px -1px 4px #dfe4e2; 
                    float: left;
                    // .pt-img{
                        /* width: 80%;
                        margin: 0px auto;
                        // height: 37vw;
                        max-height: 266px;
                        border: 0; */
                        img{
                            width: 60%;
                            height: auto;
                            margin: 5% 20% 0;
                            padding: 0px;
                            line-height: normal;
                            vertical-align: top;
                            text-align:center;
                        }
                    // }
                    .pt-name{
                        width: 90%;
                        margin: 0px auto;
                        font-size: 14px;
                        font-weight: bold;
                        margin-top: 10px;
                        padding-bottom: 10px;
                        border-bottom: 1px solid #d7d7d7;
                        text-align: center;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                    .pt-price{
                        font-weight: bold;
                        font-size: 16px;
                        width: 80%;
                        margin: 0px auto;
                        color: #fc4f4f;
                        text-align: left;
                        padding-top: 10px;
                        overflow: hidden;
                    }
                }
            }
            .pageview{
                width: 100%;
                height: 25px;
                padding: 10px 0;
                text-align: center;
                .flip{
                    display: inline-block;
                    padding: 1px 5px 2px;
                    margin: 0 2px;
                    color: #666;
                }
            }
        }
        .clearfix:after{
            content:'';
            display:block;
            clear:both;
            height:0;
            visibility:hidden;
        }
    }
}
    
</style>



