{
    let view = {
        el: '.songlist-container',
        template: `
        <ol class="songlist">
                    <li>
                        <ol>生僻字</ol>
                    </li>
                    <li class="active">
                        <ol>我的一个道姑朋友</ol>
                    </li>
                    <li>
                        <ol>烦恼歌</ol>
                    </li>
                    <li>
                        <ol>探清水河</ol>
                    </li>
                </ol>
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
        }
    }
    controller.init(view, model)
}