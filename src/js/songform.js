{
    let view = {
        el: '.page > main',
        template: `
        <h1>新建歌曲</h1>
            <form class="songform">
                <div class="row">
                    <label>歌名</label>
                    <input name="name" type="text" value="__key__">
                </div>
                <div class="row">
                    <label>歌手</label>
                    <input name="singer" type="text">
                </div>
                <div class="row">
                    <label>外链</label>
                    <input name="url" type="text" value="__link__">
                </div>
                <div class="row">
                    <button type="submit">保存</button>
                </div>
            </form>
        `,
        render(data = {}) {//data没数据就为空对象
            let placeholder = ['key', 'link']
            let html = this.template
            placeholder.map((string) => { //data是emit执行时我们自己写的数据
                html = html.replace(`__${string}__`, data[string] || '') //placeholder为空的话就默认为空字符串
            })
            $(this.el).html(html)
        }
    }
    let model = {
        data: {
            name: '',
            singer: '',
            url: ''
        },
        create(data) {
            // 声明一个对象
            var Song = AV.Object.extend('Song');
            // 新建对象
            var song = new Song();
            // 设置名称
            song.set('name', data.name);
            song.set('singer', data.singer);
            song.set('url', data.url)
            //保存
            song.save().then((newsong) => {
                console.log(newsong);
            }, (error) => {
                console.error(error);
            });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render()//初始化页面内容
            window.eventHub.on('upload', (data) => { //data是emit执行时我们自己写的数据，现在拿不到，执行才会写入
                this.view.render(data)//上传完毕后重新初始化页面，填充内容
            })
            this.bindEvents()
        },
        bindEvents() {//获取上传完毕后填充的内容
            $(this.view.el).on('submit', 'form', (e) => {
                e.preventDefault()
                let need = 'name singer url'.split(' ')
                let data = {}
                need.map((string) => {
                    data[string] = $(this.view.el).find(`[name='${string}']`).val()
                })
                this.model.create(data)
            })
        }
    }
    controller.init(view, model)
}