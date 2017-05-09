/**
 * Created by Administrator on 2017/5/9 0009.
 */
new Vue({
    el:'.container',
    data:{
        addresslist:[],
        shownum:3,
        currIndex:0,
        shippingMethod:1

    },
    mounted:function(){
        this.$nextTick(function(){
            this.getAddress();

        })
    },
    computed:{
      filterAddress:function(){
          return this.addresslist.slice(0,this.shownum);
      }
    },
    methods:{
        getAddress:function(){
        var _this = this;
        this.$http.get('data/address.json').then(function(res){
            _this.addresslist = res.body.result;
        })
},
        showmore:function(){
            this.shownum = this.addresslist.length;
        },
        setDefaultAddress:function(addid){
            this.addresslist.forEach(function(address,index){
                if(address.addressId == addid){
                    address.isDefault = true;
                }else{
                    address.isDefault = false;
                }
            })



        }

    }
})