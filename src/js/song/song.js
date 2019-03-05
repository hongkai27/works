{
    let view = {
        el:'#app',
        template:`
        <audio src={{url}}></audio>
        <div>
          <button class="play">播放</button>
          <button class="pause">暂停</button>
        </div>
        `,
        render(data){
            $(this.el).html(this.template.replace('{{url}}',data.url))
        },
        play(){
            let audio = $(this.el).find('audio')[0]
            audio.play()//domAPI，可以自动播放
        },
        pause(){
            let audio = $(this.el).find('audio')[0]
            audio.pause()//domAPI，可以自动播放
        }
    }
    let model = {
        data: {
            id: '',
            name: '',
            singer: '',
            url: ''
        },
        idgetsong(id) {
            var query = new AV.Query('Song');
            return query.get(id).then((song) => {
                Object.assign(
                    this.data,{id:song.id,...song.attributes}
                )
                return song
            });
        }
    }
    let controller = {
        init(view, model) {
            this.model = model
            this.view = view
            let id = this.getsongid()
            this.model.idgetsong(id).then(() => {
                this.view.render(this.model.data)
                this.bindEvents()
            })
        },
        getsongid() {
            let search = window.location.search
            if (search.indexOf('?') === 0) { //如果？在第一位
                search = search.substring(1) //从第二位开始打印
            }
            let id = ''
            let array = search.split('&').filter((v => v)) //通过filter过滤空字符串
            for (let i = 0; i < array.length; i++) {
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if (key === 'id') {
                    id = value
                    break
                }
            }
            return id
        },
        bindEvents(){
            $(this.view.el).on('click','.play',()=>{
                this.view.play()
            }),
            $(this.view.el).on('click','.pause',()=>{
                this.view.pause()
            })
        }
    }
    controller.init(view, model)
}