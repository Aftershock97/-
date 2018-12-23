function copy(val) { 
    return Object.assign({},val)
 }

var vm = new Vue({
    el:"#app",
    data:{
        list_id:0,
        things:{},
        list:[],
        ip_toggle:false,
    },
    methods: {
        add_things:function(){
            this.list_id++;
            this.ip_toggle=false;
            if (!this.things.id){
                var thing = this.things;
                if(thing.title==''||thing.title==null){return}
                this.things.id = this.list_id;
                this.things.done = false;
                this.things.toggle_detail=false;
                var obj = copy(this.things);
                this.list.push(obj);
                this.things = {};
            }else{
                var index = this.find_index(this.things.id);
                this.list[index]=this.things;
                this.things = {};
            }
        },
        remove:function (id) { 
            var index = this.find_index(id);
            this.list.splice(index,1);
            this.things = {};
         },
        find_index:function (id) {
            return this.list.findIndex(function (item) {
                return item.id == id;
              })
        },
        fix:function (id) { 
            var index = this.find_index(id);
            var obj = this.list[index];
            this.things = copy(obj);
            this.ip_toggle=true;
         },
         finish:function (id) {
            var index = this.find_index(id);
            this.list[index].done = ! this.list[index].done;
            
        },
        toggle_detail:function (id) { 
            var index = this.find_index(id);
            this.list[index].toggle_detail = ! this.list[index].toggle_detail;
        },
        mouseenter:function(id){
            var me = this;
            var x = event.clientX+10;
            var y = event.clientY+5;
            desc_time=setTimeout(function() {   
            $('.float_desc').css('display','block').offset({left:x,top:y});
            }, 700);
        },
        mouseout:function(id){
            clearTimeout(desc_time)
                $('.float_desc').css('display','none');
        },
        check_time:function () { 
            var time_now = (new Date()).getTime();
            this.list.forEach(function(e){
                var time_task = (new Date(e.time)).getTime();
                if (time_task<time_now||!e.done){
                    setTimeout(function (param) {
                        alert("任务"+e.title+"超时了")
                      },2000)
                } 
            });
         }
        
    },
    watch: {
        list:{
            deep:true,
            handler(newkey,oldkey){
                if(newkey){
                 ms.set('list',newkey);
                }else{
                    ms.set('list',[])
                };
             },
        },
        list_id:function(new_id,old_id){
            if(new_id){
                ms.set('list_id',new_id);
            }else{
                ms.set('list_id',0)
            }
        }
    },
    mounted:function (){
        this.list = ms.get('list')||[];
        this.list_id = ms.get('list_id');
        this.check_time();
    },
})