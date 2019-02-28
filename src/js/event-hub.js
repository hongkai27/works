window.eventHub = {
    events:[],
    init(){},
    //触发
    emit(eventname,data){
        for(let key in this.events){
            if(key === enevtname){
                let fnlist = this.events[key]
                fnlist.map((fn)=>{
                    fn.call(undefined,data)
                })
            }
        }
    },
    //监听
    on(eventname,fn){
        for(let key in events){
            if(key === enevtname){
                if(this.events[key] === undefined){
                    this.events[key] = []
                }
                this.events[key].push(fn)
            }
        }
    },
    //结束
    off(){}
}