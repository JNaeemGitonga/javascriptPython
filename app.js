let newForm = `

    <div class='form-box'>
            
        <form onsubmit='return false' class='new-apt-form'>
            <div class="form-group">
                <label for="date">Email address</label>
                <input type="date" class="form-control" id="date_input" aria-describedby="date" >
            </div>
            <div class="form-group">
                <label for="time">Time</label>
                <input type="time" class="form-control" id="time_input"  >
            </div>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea class="form-control" id="description" rows="3"></textarea>
            </div>
            <button type="submit" class="btn btn-primary submit_bn2">Submit</button>
            <p class='options cancel'><a class='cancel-link' href='javascript:void(0)'>Cancel</a></p>
        </form>
    <div>

`

let apptTable = `

    <table class='table table-hover'>
        <thead>
            <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
            <tr>
        </thead>
        <tbody>
        
        </tbody>
    </table>
`

let box = `<div>look ma' no hands</div>`

const addBtn = `<a id='add_link 'class='nav-link active add_link' href='javascript:void(0)'> Add</a>`

const newLink = `<a id='new_link' class='nav-link active new_link' href='#newAppointment'> New</a>`

$(function(){
    const $root = $("#root")
    const $search = $('#search')
    const $cancel = $('.cancel')
    const $new = $('.new_link')
    const $add = $('.add_link')
    const $li = $('li')


    $root.html(apptTable)

    $('.bn1').on('click',function(e){
        e.preventDefault()
        $search.val('');
        $root.empty().append(apptTable)
        
    })

    $search.on('keydown', function(e){
        if (e.keyCode === 13) {
            $search.val('');
            $root.empty().append(apptTable)
        }

    })

    $li.on('click', '.add_link', function(){ 
        
        console.log('event bubbling')
        $root.html(apptTable)
        $('li.add').html(newLink)

    })
    
    $li.on('click', '.new_link', function(){ 
        $root.empty().append(newForm)
        $('li.add').html(addBtn)

    })

    $root.on('click', '.submit_bn2', function() {

        const newAppt = {
            time:$('#date_input').val(),
            date:$('#time_input').val(),
            description:$('#description').val()
        }
        $.ajax({
            url:'/send',
            method:'POST',
            dataType: 'json',
            data: newAppt
        }).then(res => console.log(res))
        // $.post('/send',newAppt,function(data){
        //    console.log(data)
        // })
        $('#date_input').val('')
        $('#time_input').val('')
        $('#description').val('')

        $root.html(apptTable)
        $('li.add').html(newLink)
        console.log('i submited', newAppt)
    })

    $root.on('click', '.cancel-link', function(){
        $('#date_input').val('')
        $('#time_input').val('')
        $('#description').val('')
        $root.html(apptTable)
        $('li.add').html(newLink)
    })
})


