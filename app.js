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
    
    // let _handleTable = obj => {
    //     let data = JSON.parse(obj)
    //     if(data.length === 0) {
    //         let noApptMsg = `
    //             <div class='no-appts'>                
    //                 <p>No new appointments</p>
    //             </div>
    //         `
    //         $('.table-div').append(noApptMsg)
    //     }
    //     else {
    //         $('tbody').empty()
    //         data.forEach((list) => {
    //             let newRow = `<td>${list[2]}</td><td>${list[0]}</td><td>${list[1]}</td>`
    //             $('tbody').append(`<tr>${row}</tr>`)
    //         })
    //     }
    // }

    //  THE FORMER IS FOR REFACTORING PURPOSES

    let getAppointments = (term = '') => {

        if (term.length === 0) {
            return $.get('/getallappts').then(res=> {
                console.log(typeof res, res)

                if(!res) return
                let data = JSON.parse(res)
    
                if(data.length === 0) {
                    $('.no-appts').removeClass('hidden')
                }
                else {
                    $('tbody').empty()
                    $('.no-appts').addClass('hidden')
                    data.forEach((list) => {
                        let newRow = `<td>${list[0]}</td><td>${list[2]}</td><td>${list[1]}</td>`
                        $('tbody').append(`<tr>${newRow}</tr>`)
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        }else {
            $.post(`/getOne`,{search:term}).then(res => {
                if(!res) return
                console.log(res)
                if(res.length === 0) {
                    $('.no-appts').removeClass('hidden')
                }
                else {
                    $('tbody').empty()
                    $('.no-appts').addClass('hidden')
                    res.forEach((list) => {
                        let newRow = `<td>${list[0]}</td><td>${list[2]}</td><td>${list[1]}</td>`
                        $('tbody').append(`<tr>${newRow}</tr>`)
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
                    
            date:$('#date_input').val(),
            time:$('#time_input').val(),
            description:$('#description').val().trim()
        }

        if (newAppt.date === '' ){
            $('.date').removeClass('not-visible')
            setTimeout(function(){
                $('.date').addClass('not-visible')},3000)
            return
        }

        if(newAppt.time === '') {
            $('.time').removeClass('not-visible')
            setTimeout(function(){
                $('.time').addClass('not-visible')},3000)
            return
        }

        if(newAppt.description === '') {
            $('.description').removeClass('not-visible')
            setTimeout(function(){
                $('.description').addClass('not-visible')},3000)
            return
        }

        $.post('/send',newAppt,function(data){
            $('tbody').empty()
            let obj = JSON.parse(data)
            $('.no-appts').addClass('hidden')
            obj.forEach((list) => {
                let newRow = `<td>${list[0]}</td><td>${list[2]}</td><td>${list[1]}</td>`
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


