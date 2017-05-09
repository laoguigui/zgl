/**
 * Created by Administrator on 2017/5/8 0008.
 */
var vm = new Vue({
    el:"#app",
    data:{
        totalmoney:0,
        productLists:[],
        checkall:false,
        delflag:false,
        curProd:''

    },
    mounted:function(){
        this.cartView();

    },
    filters:{
        formatMoney:function(value){
            return "￥" + value.toFixed(2);
        }

    },
    methods:{
        cartView:function(){
            var _this = this;
            this.$http.get("data/cart.json",{"id":123}).then(function(res){
                _this.productLists = res.body.result.productList;

            });
        },
        changeMoney:function(product,flag){
            if(flag>0){
                product.productQuentity++;
            }else if(product.productQuentity<=1){
                product.productQuentity=1;
            }else{
                product.productQuentity--;
            }
            this.caluPrice();
        },
        selectProduct:function(product){
            if(typeof product.checked =='undefined'){
                this.$set(product,"checked",true);
            }else{
                product.checked = !product.checked;
            }
            this.caluPrice();

        },
        selectAll:function(flag){
            this.checkall=flag;
            var _this=this;
            this.productLists.forEach(function(product,index){
                if(typeof product.checked =='undefined'){
                    _this.$set(product,"checked",_this.checkall);
                }else{
                    product.checked = _this.checkall;
                }
            });
            this.caluPrice();

        },
        caluPrice:function(){
            var _this = this;
            this.totalmoney = 0;
            this.productLists.forEach(function(item,index){
                if(item.checked){
                    _this.totalmoney +=item.productPrice*item.productQuentity;
                }
            });
        },
        delConfirm:function(item){
            this.delflag = true;
            this.curProd = item;

        },
        delProduct:function(){
            var index = this.productLists.indexOf(this.curProd);
            this.productLists.splice(index,1);
            this.delflag = false;
        }

    },


})
Vue.filter("money", function(value,type){
    return "￥" + value.toFixed(2)+type;
})