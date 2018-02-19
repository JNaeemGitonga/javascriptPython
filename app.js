const addBtn = `<button class='btn add_link'>ADD</button>`

const newLink = `
    <a id='new_link' class='nav-link active new_link' href='#newAppointment'>
        <button class='btn'>NEW</button>
    </a>`

$(function(){
    const $root = $("#root")
    const $search = $('#search')
    const $cancel = $('.cancel')
    const $new = $('.new_link')
    const $add = $('.add_link')
    const $li = $('li')
    
    let _handleTable = obj => {
        let data = JSON.parse(obj)
            if(data.length === 0) {
                let noApptMsg = `
                    <div class='no-appts'>                
                        <p>No new appointments</p>
                    </div>
                `
                $('.table-div').append(noApptMsg)
            }
            else {
                $('tbody').empty()
                data.forEach((list) => {
                    let newRow = `<td>${list[2]}</td><td>${list[0]}</td><td>${list[1]}</td>`
                    $('tbody').append(`<tr>${row}</tr>`)
                })
            }
    }

    let getAppointments = (term = '') => {

        if (term.length === 0) {
            return $.get('/getallappts').then(res=> {
                console.log(res)
                if(!res) return
                let data = JSON.parse(res)
    
                console.log(data)
                if(res.length === 0) {
                    let noApptMsg = `
                        <div class='no-appts'>                
                            <p>No new appointments</p>
                        </div>
                    `
                    $('.table-div').append(noApptMsg)
                }
                else {
                    $('tbody').empty()
                    data.forEach((list) => {
                        let newRow = `<td>${list[2]}</td><td>${list[0]}</td><td>${list[1]}</td>`
                        $('tbody').append(`<tr>${row}</tr>`)
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        }else {
            $.post(`/getOne`,{search:term}).then(res => {
                if(!res) return
                let data = JSON.parse(res)
                if(res.length === 0) {
                    let noApptMsg = `
                        <div class='no-appts'>                
                            <p>No new appointments</p>
                        </div>
                    `
                    $('.table-div').append(noApptMsg)
                }
                else {
                    $('tbody').empty()
                    data.forEach((list) => {
                        let newRow = `<td>${list[2]}</td><td>${list[0]}</td><td>${list[1]}</td>`
                        $('tbody').append(`<tr>${row}</tr>`)
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        }
       
    }
    

    $('.bn1').on('click',function(e){
        e.preventDefault()

        let value = $search.val().trim()

        if ($('div.form-box').hasClass('hidden')){
            $('div.table-div').removeClass('hidden')
        }
        else{
            $('div.form-box').addClass('hidden')
            $('div.table-div').removeClass('hidden')
        }

        if (value.length === 0){
            getAppointments()
        }
        else {
            getAppointments(value)
        }

        $search.val('');
    })

    $search.on('keydown', function(e){

        let value = $search.val().trim()

        if (e.keyCode === 13) {
            
            if ( !$('div.form-box').hasClass('hidden')) {
                $('div.form-box').addClass('hidden')
                
            }
            
            if($('.table-div').hasClass('hidden')) {
                $('.table-div').removeClass('hidden')
            }

            if (value.length === 0) {
                console.log('rockin')
                getAppointments()
            }
            else {
                getAppointments(value)
            }
            $search.val('');
        }
    })

    $li.on('click', '.new_link', function(){ 
        if ($('div.table-div').hasClass('hidden')){
            $('div.form-box').removeClass('hidden')
        }
        else {
            $('div.table-div').addClass('hidden')
            $('div.form-box').removeClass('hidden')
        }
      
        $('li.add').html(addBtn)

    })

    $('body').on('click', '.add_link', function() {
        const newAppt = {
            
            date:$('#time_input').val(),
            time:$('#date_input').val(),
            description:$('#description').val().trim()
        }
       
        $.post('/send',newAppt,function(data){
            $('tbody').empty()
            let obj = JSON.parse(data)
            obj.forEach((list) => {
                let newRow = `<td>${list[2]}</td><td>${list[0]}</td><td>${list[1]}</td>`
                $('tbody').append(`<tr>${newRow}</tr>`)
            })

        })
        
        $('#date_input').val('')
        $('#time_input').val('')
        $('#description').val('')

        
        $('li.add').html(newLink)
        $('.form-box').addClass('hidden')
        $('.table-div').removeClass('hidden')
    })

    $cancel.on('click', function() {
        $('#date_input').val('')
        $('#time_input').val('')
        $('#description').val('')
        $('.form-box').addClass('hidden')
        $('li.add').html(newLink)
    })
})


