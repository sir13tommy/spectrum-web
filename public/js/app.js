(function () {
    var $subscribeForm = $('.subscribe-form')
    $subscribeForm.on('submit', function (event) {
        event.preventDefault()
        var $emailField = $subscribeForm.find('.input-email')
        var data = {
            email: $emailField.val()
        }
        $.ajax('/api/subscriber', {
            method: 'post',
            data: data
        }).then(function() {
            $('.modal').modal('show')
        },
        function() {
        })
    })
})()