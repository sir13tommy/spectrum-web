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

$(document).ready(function(){
    $('.carousel-slick .carousel-slick-inner').slick({
        centerMode: true,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        adaptiveHeight: true
    });
});