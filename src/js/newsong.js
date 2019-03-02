{
    let view = {
        el: '.newsong',
        template: `
        音悦台
        `,
        render() {
            $(this.el).html(this.template)
        }
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render()
            
        },
    }
    controller.init(view, model)
}