{
    let view = {
        el: '.newsong',
        template: `
        <div class ="logo">YinYueTai.com</div>
        <div class="uploaderArea"></div>
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