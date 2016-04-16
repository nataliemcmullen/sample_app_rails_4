//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .

Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
};

$().ready(function() {
    // var pusher = new Pusher('210e48ecc2617b2f1809', {
    // });

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