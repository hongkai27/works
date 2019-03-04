{
    let view = {
        el: '.songlist-container',
        template: `
        <div class="listtitle">歌单列表</div>
        <ol class="songlist">      
        </ol>
        `,
        render(data) {
            $(this.el).html(this.template)
            let {songs} = data
            let lilist = songs.map((song) => {
                let domli = $('<li></li>').text(song.name).attr('songdata-id', song.id)
                return domli
            })
            $(this.el).find('ol').empty()
            lilist.map((domli) => {
                $(this.el).find('ol').append(domli)
            })
        },
        clearActive() {
            $(this.el).find('.active').removeClass('active')
        },
        clickColor(e) {
            let li = $(e)
            li.addClass('active').siblings('.active').removeClass('active')
            $('.main').addClass('active')
        }
    }
    let model = {
        data: {
            songs: []
        },
        find() {
            var query = new AV.Query('Song');
            return query.find().then((songs) => {
                this.data.songs = songs.map((song) => {
                    return {
                        id: song.id,
                        ...song.attributes
                    }
                })
                return songs
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            //this.view.render(this.model.data)
            this.bindeventHub()
            this.bindevents()
        },
        bindeventHub(){
            window.eventHub.on('create', (songdata) => {//主要是用来提交时立刻显示在歌单列表中
                
                this.model.data.songs.push(songdata)
                this.view.render(this.model.data)
                
            })
            this.model.find().then(()=>{//从leancloud数据库中读取数据再渲染页面
                this.view.render(this.model.data)
            })
        },
        bindevents() {
            $(this.view.el).on('click', 'li', (e) => {
                this.view.clickColor(e.currentTarget)
                let songid = e.currentTarget.getAttribute('songdata-id')
                let data
                let songs = this.model.data.songs
                for (let i = 0; i < songs.length; i++) {
                    if (songid === songs[i].id) {
                        data = songs[i]
                    }
                }
                window.eventHub.emit('select', JSON.parse(JSON.stringify(data)))
            })
        } 
    }
    controller.init(view, model)
}