let newForm = `

            <div class='form-box'>
                 
                <form onsubmit='return false'>
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
                    <button type="submit" class="btn btn-primary">Submit</button>
                    <p class='options cancel'><a class='cancel-link' href='javascript:void(0)'>Cancel</a></p>
                </form>
            <div>

`

let box = `<div>look ma' no hands</div>`

const addBtn = `<a class='nav-link active add_link' href='javascript:void(0)'> Add</a>`

$(function(){
    const $root = $("#root")
    const $search = $('#search')
    const $cancel = $('.cancel')
    const $new = $('.new_link')

    $root.html(box)

    $('.bn1').on('click',function(e){
        e.preventDefault()
        $search.val('');
        $.get('/api/appointments', data => {
            console.log('ur get worked')
        })
    })

    $search.on('keydown', function(e){
        // e.preventDefault()
        if (e.keyCode === 13) {
            $search.val('');
        }
    })

    $new.on('click', function(){
        $root.html(newForm)
        $new.replaceWith(addBtn)

    })

    $('li').on('click', '.add_link', function(){ 
        const newAppt = {
            time:$('#date_input').val(),
            date:$('#time_input').val(),
            description:$('#description').val()
        }
        console.log('event bubbling')
        console.log(newAppt)
    })
    
})