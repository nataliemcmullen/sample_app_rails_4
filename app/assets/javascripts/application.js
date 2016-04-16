// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .

Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
};

$().ready(function() {
    var stack = [];
    var queue = [];
    var myId = 0;

    var pusher = new Pusher('210e48ecc2617b2f1809', {
        encrypted: true
    });

    channel = pusher.subscribe('presence-demo');
    channel.bind('pusher:subscription_succeeded', function(members) {
        if (channel.members.count > 3) {
            $("#accept").attr("class", "weather-icon sun2");
            $("#as").html("Status: full");
            $("#presence").html("");
            $("#test").css('left', 10);
            $("#test").html("You'll be added when a spot opens.");
        } else {
            $("#accept").attr("class", "weather-icon sun");
            $("#as").html("Status: accepting");
            $("#test").css('left', 85);
            $("#test").html("Online");
            $("#presence").html(channel.members.count);
        }
    })

    channel.bind('pusher:member_removed', function(member) {
        if (channel.members.count <= 3) {
            $("#accept").attr("class", "weather-icon sun");
            $("#as").html("Status: accepting");
            $("#test").css('left', 85);
            $("#test").html("Online");

        }
        $("#presence").html(channel.members.count);
        console.log("Count", channel.members.count)
    })

    channel.bind('pusher:member_added', function(member) {
        myId = member.id;
        $("#presence").html(channel.members.count);
        console.log("Count", channel.members.count)
    })
});