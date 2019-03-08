{
    let view = {
        el: '.page >aside> main',
        template: `
            <form class="songform">
                <div class="row">
                    <label>歌曲名称</label>
                    <input name="name" type="text" value="__name__">
                </div>
                <div class="row">
                    <label>歌手名称</label>
                    <input name="singer" type="text" value="__singer__">
                </div>
                <div class="row">
                    <label>歌曲外链</label>
                    <input name="url" type="text" value="__url__">
                </div>
                <div class="row">
                    <label>封面链接</label>
                    <input name="cover" type="text" value="__cover__">
                </div>
                <div class="row">
                    <label>歌词</label>
                    <textarea name="lyrics" cols=100 rows=10>__lyrics__</textarea>
                </div>
                <div class="row">
                    <button type="submit">保存</button>
                </div>
            </form>
        `,
        render(data = {}) { //没有参数data就为空对象
            let placeholder = ['name', 'singer', 'url', 'id','cover','lyrics']
            let html = this.template
            placeholder.map((string) => { //data是emit执行时我们自己写的数据
                html = html.replace(`__${string}__`, data[string] || '') //placeholder为空的话就默认为空字符串
            })
            $(this.el).html(html)
            if (data.id) {
                $(this.el).prepend('<h1>歌曲信息</h1>') //在被选元素开头插入内容
                $('.row > button').addClass('down')
            } else {
                $(this.el).prepend('<h1>新建歌曲</h1>')
                
            }
        },
        reset() {
            this.render({})
        }
    }
    let model = {
        data: {
            name: '',
            singer: '',
            url: '',
            id: '',
            cover:'',
            lyrics:''
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
            song.set('id',data.id)
            song.set('cover',data.cover)
            song.set('lyrics',data.lyrics)
            //保存
            return song.save().then((newsong) => {
                
                let {id,attributes} = newsong //attributes是打印出来看到里面存在的
                Object.assign(this.data, //assign会深拷贝源文件地址
                    {id,...attributes}) //attributes里面有什么，就在这里生成赋值什么，等于下面三句话
                /*name:attributes.name,
                singer:attributes.singer,
                url:attributes.url,
                id:id*/
      
            });
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data) //初始化页面内容

            window.eventHub.on('upload', (data) => { //data是emit执行时我们自己写的数据，现在拿不到，执行才会写入
                this.view.render(data) //上传完毕后重新初始化页面，填充内容
            })
            this.bindEvents()
            window.eventHub.on('select', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })

        },
        save() {
            let need = 'name singer url cover lyrics'.split(' ')
                let data = {}
                need.map((string) => {
                data[string] = $(this.view.el).find(`[name='${string}']`).val()
            })
            this.model.create(data).then(() => {
                uploadStatus.textContent = ""
                this.view.reset()
                let string = JSON.stringify(this.model.data)
                let object = JSON.parse(string) //上面Object.assign会把引用的源文件地址深拷贝过来，所以新声明一个变量赋值
                window.eventHub.emit('create', object)
            })
        },
        bindEvents() { 
            $(this.view.el).on('submit', 'form', (e) => { 
                e.preventDefault()
                this.save()
            })
        }
    }
    controller.init(view, model)
}