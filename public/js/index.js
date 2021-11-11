"use strict";

function getUsers() {
    $.ajax({
        url: "https://jsonplaceholder.typicode.com/users",
        dataType: 'json',
        type: 'get',
        cache:true,
        success: function(data){
            console.log(data);
            let event_data = '';
            $.each(data, function(index, value){
                event_data += `<tr>`;
                event_data += '<td>' + value.name +'</td>';
                event_data += '<td>' + value.address.city + '</td>';
                event_data += '<td>' + value.email + '</td>';
                event_data += '<td>' + value.website + '</td>';
                event_data += `<td><button id="${value.id}" type="btn" class="btn btn-primary">Posts</button></td>`;
                event_data += '</tr>';
                event_data += `<tr class="d-none"  id="${value.id}">`;
                event_data += `<td id="user${value.id}"  colspan="5"></td>`;
                event_data += '</tr>';
            });
            $("#userTable").append(event_data);
        },
        error: function(d){
            alert("404. Please wait until the File is Loaded.");
        }
    });
}

function getUserPosts(id,show) {
   
    if (show) {
        $.get(`https://jsonplaceholder.typicode.com/users/${id}/posts`, function (data) {
        let postData = '';
        $.each(data, function (i, val) {
            postData += '<div id="postDiv">';
            postData += '<h4 class="text-center fw-bold fst-italic">' + val.title + '</h4>';
            postData += '<div class="container-sm p-3">';
            postData += '<p class="pBody">' + val.body + '</p>';
            postData += '</div>';
            postData += '</div>';
        });
            $(`#userTable #user${id}`).append(postData);
            $(`#userTable tr#${id}`).removeClass("d-none");
    })
    } else {
        $(`#userTable #user${id}`).empty();
        $(`#userTable tr#${id}`).addClass("d-none");
    }
    
}

$(function () {
    getUsers();

    $("#userTable").on("click", ".btn", function (event) {
        event.preventDefault();
        const id = parseInt(this.id);
        let show = $(`#userTable tr#${id}`).hasClass('d-none');
        getUserPosts(id,show);
        
    })
});
