

$(document).ready(function() {
    // register our function as the "callback" to be triggered
    //by the form's submission event
    //console.log(captcha_ans);
    //var captcha_error = $("#form-gif-request").append("<p>No gifs for you.</p>");
    $("#form-gif-request").submit(fetchAndDisplayGif)
    // in other words, when the form is submitted,
    //fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // This prevents the form submission from doing what it normally does:
    //send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request,
    //we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    var captcha_ans = $("#form-gif-request input[name=captcha]").val();
    if (captcha_ans !== "5"){
        $("#feedback").text("No gifs for you.");
        setGifLoadedStatus(false);
    } else {
        // get the user's input text from the DOM
        var searchQuery = $("#form-gif-request input[name=tag]").val();

        // configure a few parameters to attach to our request
        var params = {
            api_key: "dc6zaTOxFJmzC",
            tag : "jackson 5 " + searchQuery
        };

        // make an ajax request for a random GIF
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random",
            data: params, // attach those extra parameters onto the request
            success: function(response) {
                // if the response comes back successfully, the code in here will execute.

                // jQuery passes us the `response` variable,
                //a regular javascript object created from the JSON the server gave us


                // 1. set the source attribute of our image to the image_url of the GIF
                var image_url = response.data.image_url;
                $("img").attr("src", image_url);
                // 2. hide the feedback message and display the image
                setGifLoadedStatus(true);
            },
            error: function() {
                // if something went wrong, the code in here will execute
                //instead of the success function

                // give the user an error message
                $("#feedback").text("Sorry, could not load GIF. Try again!");
                setGifLoadedStatus(false);
            }
        })

        // give the user a "Loading..." message while they wait
        $("#feedback").text("Loading...");
        setGifLoadedStatus(false);
    }
};


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}
