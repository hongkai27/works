{
    let view = {
        el: '#app',
        render(data) {
            $('#app').css({
                'background-image': `url(${data.cover})`
            }) //根据保存的背景图地址更换背景图
            $('img.cover').attr('src', data.cover)
            $(this.el).find('audio').attr('src', data.url)
            $(this.el).find('.song-description>h1').text(data.name)
            
            data.lyrics.split('\n').map((string)=>{
                let p = document.createElement('p')//将歌词分成多行p
                p.textContent = string
                $(this.el).find('.lyric>.lines').append(p)
            })
        },
        play() {
            $(this.el).find('audio')[0].play()
            $(this.el).find('.disc-container').addClass('playing')
            
        },
        pause(){
            $(this.el).find('audio')[0].pause()
            $(this.el).find('.disc-container').removeClass('playing')
        }
    }
    let model = {
        data: {
            id: '',
            name: '',
            singer: '',
            url: '',
            cover: '',
            status: 'paused',
            lyrics:''
        },
        idgetsong(id) {
            var query = new AV.Query('Song');
            return query.get(id).then((song) => {
                Object.assign(
                    this.data, {
                        id: song.id,
                        ...song.attributes
                    }
                )
                return song
            });
        },
    }
    let controller = {
        init(view, model) {
            this.model = model
            this.view = view
            let id = this.getsongid()
            this.model.idgetsong(id).then(() => {
                this.view.render(this.model.data)
            })
            this.bindEvents()
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
        bindEvents() {
            $(this.view.el).on('click', '.icon-play', () => {
                this.view.play()
            })
            $(this.view.el).on('click', '.icon-pause', () => {
                this.view.pause()
            })
        }
    }
    controller.init(view, model)
}