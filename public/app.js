$(document).ready(function getChirps() {
    $.ajax({
        type: "GET",
        url: "/api/chirps/",
        dataType: "json",
        success: function (data) {
            $.each(data, function (index, element) {
                if (index !== "nextid") {
                    $("#chirpDisplay").append(`
                    <div class="card">
                        <div class="card-body rounded mx-2 my-2 px-2 py-2">
                            <h5 class="card-title text-dark"><strong>${element.user}</strong></h5>
                            <p class="card-text text-dark">${element.text}</p>
                            <button id="deleteChirpButton" class="btn rounded btn-danger btn-outline-light btn-shadow-md" onClick="DeleteChirp(${index})">Delete</button>
                            <button id="editChirpButton" class="btn rounded btn-danger btn-outline-light btn-shadow-md" onClick="EditChirp(${index})">Edit</button>
                        </div>
                    </div>
                    `)
                }
            })
        }
    })
});

$("#postChirpButton").click(function () {
    const chirpText = $("#chirpText").val();
    const userName = $("#userName").val();
    $.ajaxSetup({
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
    $.ajax({
        type: "POST",
        url: "/api/chirps/",
        data: JSON.stringify({
            user: userName,
            text: chirpText
        })
    }).then(() => {
        location.reload();
    })
});

const DeleteChirp = index => {
    $.ajax({
        type: "DELETE",
        url: `/api/chirps/${index}`
    }).then(() => {
        location.reload();
    })
};

const EditChirp = index => {
    Swal.fire({
        title: 'Edit Chirp ' + index,
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Save Edit',
        preConfirm: (editedText) => {
             $.ajax({
                type: 'PUT',
                url: `/api/chirps/${index}`,
                data: {
                    user: 'fuck yo couch',
                    text: '0000'
                }
            })
                .then(() => {
                    return 'plz';
                })
                .catch((e) => console.log(e));
        }
    }).then((value) => {
        if (value === 'plz') {
            Swal.fire('Edited!', 'Your chirp has been edited.', 'success');
        }
    });
};

$(function () {
    zoom = $('.feature').css('background-size')
    zoom = parseFloat(zoom) / 100
    size = zoom * $('.feature').width();
    $(window).on('scroll', function () {
        fromTop = $(window).scrollTop();
        newSize = size - (fromTop / 3);
        if (newSize > $('.feature').width()) {
            $('.feature').css({
                '-webkit-background-size': newSize,
                '-moz-background-size': newSize,
                '-o-background-size': newSize,
                'background-size': newSize,
                '-webkit-filter': 'blur(' + 0 + (fromTop / 100) + 'px)',
                'opacity': 1 - ((fromTop / $('html').height()) * 1.3)
            });
        }
    });
});

$(function () {
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);

    if (isChrome || isSafari) {
    } else {
        $('.feature').append('<div class="opaque"></div>');
        $(window).on('scroll', function () {
            var opacity = 0 + ($(window).scrollTop() / 5000);
            $('.opaque').css('opacity', opacity);
        });
    }
});