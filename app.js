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
    
    // let list = [['asdfd','time','wtf']]
    let element = [];
    // list.forEach((list, i) => {
    //     // $('tbody').append(`<tr id='row-${i}'></tr>`)
    //     list.map( item => {
    //        element.push(`<td>${item}</td>`)
    //     //    $(`#row-${i}`).append(`<td>${item}</td>`)
    //     })

         
    // })

    console.log([...element])
    // $('tbody').append(`<tr>${element}</tr>`)
    

    let getAppointments = () => {

        return $.get('/getallappts').then(res=> {
            let data = JSON.parse(res)
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
                    let row = list.map( item => `<td>${item}</td>`)
                    $('tbody').append(`<tr>${row}</tr>`)
                })
            }
        })
    }
    
    let getOneAppt = (appt) => {
        $.get(`/getone/:${appt}`).then(res => {
            let data = JSON.parse(res)
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
                    let row = list.map( item => `<td>${item}</td>`)
                    $('tbody').append(`<tr>${row}</tr>`)
                })
            }
        })
    }

    $('.bn1').on('click',function(e){
        e.preventDefault()

        let value = $search.val().trim()
        console.log(value)

        if ($('div.form-box').hasClass('hidden')){
            $('div.table-div').removeClass('hidden')
            return true
        }
        else{
            $('div.form-box').addClass('hidden')
            $('div.table-div').removeClass('hidden')
        }

        if (value === ''){
            getAppointments()
        }
        else {
            getOneAppt(value)
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

            if (value === '') {
                getAppointments()
            }
            else {
                getOneAppt(value)
            }
            $search.val('');
        }
    })

    // $li.on('click', '.add_link', function(){ 
    //     if ($('div.table-div').hasClass('hidden')){
    //         $('div.form-box').removeClass('hidden')
    //     }
    //     else {
    //         $('div.table-div').addClass('hidden')
    //         $('div.form-box').removeClass('hidden')
    //     }
    //     $('li.add').html(newLink)

    // })
    
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
        console.log('working')
        const newAppt = {
            
            date:$('#time_input').val(),
            time:$('#date_input').val(),
            description:$('#description').val()
        }
       
        $.post('/send',newAppt,function(data){
            console.log(JSON.parse(data))
            $('tbody').empty()
            JSON.parse(data).forEach((list) => {
                let row = list.map( item => `<td>${item}</td>`)
                $('tbody').append(`<tr>${row}</tr>`)
            })

        })
        
        $('#date_input').val('')
        $('#time_input').val('')
        $('#description').val('')

        
        $('li.add').html(newLink)
        console.log('i submited', newAppt)
        $('.form-box').addClass('hidden')
        $('.table-div').removeClass('hidden')
    })

    $cancel.on('click', function() {
        console.log("trying to cancel")
        $('#date_input').val('')
        $('#time_input').val('')
        $('#description').val('')
        $('.form-box').addClass('hidden')
        $('li.add').html(newLink)
    })
})


