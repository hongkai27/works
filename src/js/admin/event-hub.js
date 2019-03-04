window.eventHub = {
    events:[],
    init(){},
    //触发
    emit(eventname,data){//发布
        for(let key in this.events){
            if(key === eventname){
                let fnlist = this.events[key]
                fnlist.map((fn)=>{
                    fn.call(undefined,data)
                })
            }
        }
    },
    //监听
    on(eventname,fn){//订阅
        if(this.events[eventname]===undefined){
            this.events[eventname] = []
        }
        this.events[eventname].push(fn)
    },
    //结束
    off(){}
}