//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .

Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
};

$().ready(function() {
	//Set the threshold for the queue
    var threshold = 100;

    channel = pusher.subscribe('presence-cody');

    //If a user is succesfully added, we update the front end
    channel.bind('pusher:subscription_succeeded', function(members) {
        if (channel.members.count > threshold) {
            $("#presence").html("");
            updateHelper("cookie2", 10, "full", "You'll be added when a spot opens.");

        } else {
            $("#presence").html(channel.members.count);
            updateHelper("cookie", 85, "entered", "Online");

        }
    })

    //When someone leaves we check whether I can let a new member in
    channel.bind('pusher:member_removed', function(member) {
        if (channel.members.count > threshold) {
        } else {
            $("#presence").html(channel.members.count);
            updateHelper("cookie", 85, "entered", "Online");
        }

    })

    channel.bind('pusher:member_added', function(member) {
        if (channel.members.count > threshold) {
        } else {
            $("#presence").html(channel.members.count);
        }
    })


    //Update my widget data
    function updateHelper(accept, align, status, message) {
        $("#accept").attr("class", "widget-icon " + accept);
        $("#as").html("Status: " + status);
        $("#test").css('left', align);
        $("#test").html(message);
    }

});