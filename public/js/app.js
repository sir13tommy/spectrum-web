$(document).ready(function(){
    // Slick plugin for image slider
    $('.carousel-slick .carousel-slick-inner').slick({
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        infinite: true,
        responsive: [
            {
              breakpoint: 1224,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            },
        ]
    });

    // ligthbox plugin for image modal preview
    $(document).on('click', '[data-toggle="lightbox"]', function(event) {
        event.preventDefault();
        $(this).ekkoLightbox();
    });
});