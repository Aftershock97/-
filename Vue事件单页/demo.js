
	function copy(obj){
		return Object.assign({},obj);
	};
	
	var Event = new Vue();
	
	Vue.component('task',{
		template:'#task-tpl',
		props:['todo'],
		methods:{
			action:function(name,params){
				Event.$emit(name,params);
			},
		}
	})
	
new Vue({
	el:'#main',
	data:{
		list:[],
		list_id:0,
		current:{},
		ip:'',
	},
	mounted:function(){
		var me = this;
		this.list = ms.get('list');
		this.list_id = ms.get('list_id')||this.list_id;
		Event.$on('remove',function(params){
			me.remove(params);
		});
		Event.$on('set_current',function(params){
			me.set_current(params);
		});
		Event.$on('toggle_complete',function(params){
			me.toggle_complete(params);
		});
		Event.$on('toggle_detail',function(params){
			me.toggle_detail(params);
		});
		me.reset_alert();
		setInterval(function(){
			me.check_time();
		},500);
	},
	methods:{
		check_time:function(){
			var me = this;
			this.list.forEach(function(row,i){
				var time = row.time;
				if(!time){return};
				var time = (new Date(time)).getTime()/1000;
				var time_now = (new Date()).getTime()/1000;
				var alerted = row.alerted;
				if(time_now>time&&alerted!==true){
					alert('事件'+row.title+'已经超过时间了');
					row.alerted = true;
				}
			})
		},
		merge:function(){
			var id;
			var id = this.current.id;
			if(id){
				var index = this.find_index(id);
				this.list[index] = this.current;
				this.current ={};
			}else{
				var current = this.current;
				if(!current.title&&current.title!==0){return}
				var todo = copy(current);
				console.log(todo);
				this.list_id++;
				ms.set('list_id',this.list_id);
				todo.id = this.list_id;
				todo.completed = true;
				this.list.push(todo);
				this.current ={};
			};
		},
		next_id:function(){
			return this.list.length+1;
		},
		remove:function(id){
			var index = this.find_index(id);
			this.list.splice(index,1)
			
		},
		find_index:function(id){
			return this.list.findIndex(function(item){
				return item.id ==id;
			})
		},
		set_current:function(todo){
			this.current = copy(todo);
			
		},
		toggle_complete:function(id){
			var index = this.find_index(id);
			this.list[index].completed = !this.list[index].completed
//			this.current = {};
			
		},
		reset_alert:function(){
			this.list.forEach(function(it){it.alerted = false})
		},
		ip_focus:function(){
			this.ip=true;
		},
		ip_blur:function(){
			this.ip=false;
		},
		toggle_detail:function(id){
			var index = this.find_index(id);
			Vue.set(this.list[index],'show_detail',!this.list[index].show_detail)
		},
	},
	watch:{
		list:{
			deep:true,
			handler:function(n,o){
				if(n){
					ms.set('list',n);
				}else{
					ms.set('list',[]);
				}
			}
		},
	}
})
