// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(() => {

    let debounceTimeout;

    // Search post
    $("#search").keyup((e) => {
        //$(".search").on('keyup', (e) => {
        e.preventDefault();

        const query = $("#search").val();

        console.log(query);

        const url = `SearchPosts?query=${query}`;
        const url2 = `SearchPosts/${query}`;

        console.log(url);

        // Clear the previous timeout to reset the debounce timer
        clearTimeout(debounceTimeout);

        debouceTimeout = setTimeout(() => {
            $.ajax({
                url: url,
                //url: `SearchPosts`,
                type: "GET",
                //data: JSON.stringify({ query: query }),
                contentType: "application/json",
                beforeSend: () => {
                    $('#loadingIndicator').show();
                },
                success: (res) => {
                    $('#loadingIndicator').hide();
                    $('#posts-container').html(res);
                },
                error: () => {
                    console.log("Error searching posts");
                }
            });
        }
            , 500);
    });

    // Add a post 
    /* This is the old way of doing it */
    /*
    $("#add-post-button").click((e) => {
        e.preventDefault();
    
        const postData = {
            Title: $("#add-title").val(),
            Content: $("#add-description").val()
        };
    
        $.ajax({
            url: "AjaxTest/PublishPost",
            type: "POST",
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: (res) => {
                if (res.success) {
                    console.log(res.message);
                    console.log(res.post);
                    console.log(postData);
                    $("#posts-container").append(`
                            <div class="card" id="post-${res.post.id}">
                                <div class="card-body">
                                    <h3>${res.post.title}</h3>
                                    <p>${res.post.content}</p>
                                    <button class="editButton btn-primary" id="${res.post.id}">Edit</button>
                                    <button class="deleteButton btn-danger" id="${res.post.id}">Delete</button>
                                </div>
                            </div>
                     `);
                }
                else {
                    console.log("Failed to publish post");
                }
            },
            error: () => {
                console.log("Error while publishing post.");
            }
        });
    });
    */

    // Add a post 
    $("#add-post-button").click((e) => {
        e.preventDefault();

        const postData = {
            PublishedBy: $("#add-publishedBy").val(),
            Title: $("#add-title").val(),
            Content: $("#add-content").val()
        };

        $.ajax({
            url: "AjaxTest/PublishPostHTML",
            type: "POST",
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: (res) => {
                $("#posts-container").prepend(res);
            },
            error: () => {
                console.log("Error while publishing post.");
            }
        });
    });

    // Get form to edit post
    $(document).on("click", ".editButton", (e) => {
        //$(".editButton").click((e) => {
        e.preventDefault();

        const postId = e.target.getAttribute('id');
        const card = $(`#post-${postId}`);

        $.ajax({
            url: `AjaxTest/EditPost/${postId}`,
            type: "GET",
            success: (res) => {
                card.replaceWith(res);
            },
            error: () => {
                console.log("Error while editing post.");
            }
        });
    });

    //
    $(document).on("click", ".saveButton", (e) => {
        //$(".saveButton").click((e) => {
        e.preventDefault();

        const postId = e.target.getAttribute('id');

        const postData = {
            Id: postId,
            Title: $('#edit-title').val(),
            Content: $('#edit-content').val()
        };

        $.ajax({
            url: 'AjaxTest/EditPost',
            type: "POST",
            data: JSON.stringify(postData),
            contentType: "application/json",
            success: (res) => {
                $(`#form-${postId}`).replaceWith(res);
            },
            error: () => {
                console.log("Error while saving post.");
            }
        });
    });

    // 
    $(document).on("click", ".cancelEditingButton", (e) => {
        //$(".cancelEditingButton").click((e) => {
        e.preventDefault();

        const postId = e.target.getAttribute('id');

        $.ajax({
            url: `AjaxTest/Details/${postId}`,
            type: "GET",
            success: (res) => {
                $(`#form-${postId}`).replaceWith(res);
            },
            error: () => {
                console.log("Error while canceling editing post.");
            }
        });
    });

    // Delete a post
    // Since the delete button is dynamically created, we need to use the following syntax
    $(document).on("click", ".deleteButton", (e) => {
        // $(".deleteButton").click((e) => {
        e.preventDefault();

        //const postId = $(this).data("id");
        //const postId = $(this).attr('data-id');
        const postId = e.target.getAttribute('id');
        console.log(postId);

        if (confirm("Are you sure you want to delete this post?")) {
            $.ajax({
                url: `AjaxTest/DeletePost/${postId}`,
                type: "POST",
                //data: JSON.stringify({ id: postId }),
                contentType: "application/json",
                success: (res) => {
                    if (res.success) {
                        console.log(res.message);
                        $(`#post-${postId}`).remove();
                    } else {
                        console.log("Failed to delete post.");
                    }
                },
                error: () => {
                    console.log("Error while deleting post.");
                }
            });
        }
    });
});

