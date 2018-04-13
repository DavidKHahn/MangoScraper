$(document).ready(function () {
    //registers the click function to start scraping articles
    $("#scrape").on("click", function (event) {
        event.preventDefault();
        $.get("/scrape").then(function () {
            window.location.href = "/";
        });
    })
    //registers the click function in order to allow notes to be saved
    $("button.notes").on("click", function () {
        $("#notes").empty();
        var id = $(this).attr("data-id");
        console.log(id);


        $.get("/articles/" + id).then(function (data) {
            console.log(data);
            // The title of the article
            $("#notes").append("<h2>" + data.title + "</h2>");
            // An input to enter a new title
            $("#notes").append("<input id='titleinput' name='title' >");
            // A textarea to add a new note body
            $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
            // A button to submit a new note, with the id of the article saved to it
            $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Notes</button>");
            $("#notes").append("<button data-id='" + data.notes[0]._id + "' id='deletenote'>Delete Notes</button>");

            // If there's a note in the article
            if (data.notes) {
                // Place the title of the note in the title input
                $("#titleinput").val(data.notes[0].title);
                // Place the body of the note in the body textarea
                $("#bodyinput").val(data.notes[0].body);
            }
        });
    });

    $("button.save").on("click", function () {
        var thisId = $(this).attr("data-id");
        var dataSaved = $(this).attr("data-saved");
        $.post("/api/saved/" + thisId, { saved: dataSaved })
            .then(function (data) {
                console.log(data);
            });
    });

    $(document).on("click", "#savenote", function () {
        
        var thisId = $(this).attr("data-id");
        var thisObj = {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        };

        $.post("/articles/" + thisId, thisObj)
            .then(function (data) {
                console.log(data);
                $("#notes").empty();
            });

        $("#titleinput").val("");
        $("#bodyinput").val("");
    });

    $(document).on("click", "#deletenote", function () {
        var thisId = $(this).attr("data-id");
        $("#notes").empty();
        console.log(thisId);
        $.ajax({
            method: "DELETE",
            url: "/articles/" + thisId
        })
            .then(function (data) {
                console.log("deleted");
                $("#notes").empty();
            });
    });

});