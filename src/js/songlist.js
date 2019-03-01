{
    let view = {
        el: '.songlist-container',
        template: `
        <ol class="songlist">
                    
        </ol>
        `,
        render(data) {
            $(this.el).html(this.template)
            let {songs} = data
            let lilist = songs.map((song) => {
              let domli = $('<li></li>').text(song.name)
              return domli
            })
            $(this.el).find('ol').empty()
            lilist.map((domli)=>{
                $(this.el).find('ol').append(domli)
            }) 
        },
            clearActive() {
                $(this.el).find('.active').removeClass('active')
            }
        }
    let model = {
        data: {
            songs: [ ]
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
            
            window.eventHub.on('create', (songdata) => {
              
                this.model.data.songs.push(songdata)
               
                this.view.render(this.model.data)
             
            })
        }
    }
    controller.init(view, model)
}