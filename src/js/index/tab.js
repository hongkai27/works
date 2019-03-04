{
    let view = {
        el:'#tabs',
        template:``,

    }
    let model = {}
    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.bindevents()
        },
        bindevents(){
            $(this.view.el).on('click','.tabs-nav>li',(e)=>{
                let li = $(e.currentTarget)
                let tabname = li.attr('data-tab-name')
                li.addClass('active').siblings('.active').removeClass('active')
                window.eventHub.emit('selectTab',tabname)
            })
        }
    }
    controller.init(view,model)
}