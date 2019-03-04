{
    let view = {
        el:'#site-loading',
        show(){
            $(this.el).addClass('active')
        },
        hide(){
            $(this.el).removeClass('active')
        }
    }
    let controller ={
        init(view){
            this.view = view
            this.bindEvents()
        },
        bindEvents(){
            window.eventHub.on('beforeloading',()=>{
                this.view.show()
            })
            window.eventHub.on('afterloading',()=>{
                this.view.hide()
            })
        }
    }
    controller.init(view)
}