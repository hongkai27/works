{
    let view = {
        el:'.page-1',
        template:``,
        show(){
            $(this.el).addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
        }
    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.bindevents()
        },
        bindevents(){
            window.eventHub.on('selectTab',(tabname)=>{
                if(tabname==='page-1'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        }
    }
    controller.init(view,model)
}