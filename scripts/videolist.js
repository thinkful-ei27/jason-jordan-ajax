/**
 * @function generateVideoItemHtml
 * Template function, creates an HTML string from a single decorated video object
 * @param   {object} video - decorated video object
 * @returns {string} HTML 
 */
// TASK:
// 1. Using the decorated object, return an HTML string containing all the expected
// TEST IT!

const generateVideoItemHtml = function(video) {
  
	return `<li data-video-id="${video.id}">
          <a href="http://www.youtube.com/watch?v=${video.id}" target="_blank"><img src="${video.thumbnail}"/></a>
          <h3>${video.name}</h3>
          <a href="https://www.youtube.com/channel/${video.channelId}" target="_blank"><h4>Click for more</h4></a>
          </li>`;
};

/**
 * @function render
 * Responsible for scanning store and rendering the video list to DOM
 */
// TASK:
// 1. Map through `store.videos`, sending each `video` through `generateVideoItemHtml`
// 2. Add this array of DOM elements to the appropriate DOM element
// TEST IT!
const render = function() {
	const videoHTML = store.videos.map((item) => {
		return generateVideoItemHtml(item);
	});
	$(".results").html(videoHTML);
};

/**
 * @function handleFormSubmit
 * Adds form "submit" event listener that 1) initiates API call, 2) modifies store,
 * and 3) invokes render
 */
// TASK:
// 2. Add an event listener to the form that will:
//   a) Prevent default event
//   b) Retrieve the search input from the DOM
//   c) Clear the search input field
//   d) Invoke the `fetchVideos` function, sending in the search value
//   e) Inside the callback, send the API response through the `decorateResponse` function
//   f) Inside the callback, add the decorated response into your store using the 
//      `addVideosToStore` function
//   g) Inside the callback, run the `render` function 
// TEST IT!

const handleFormSubmit = function() {
	$("form").on("submit", function () {
		event.preventDefault();
		const queryTarget = $("form").find("#search-term");
        const searchTerm = queryTarget.val();
        store.searchTerm = searchTerm;
		queryTarget.val("");
		fetchVideos(searchTerm, function(response) {
            const decoratedResults = decorateResponse(response);
            const nextPage = response.nextPageToken;
            $("#nextPage").val(`${nextPage}`);
            const prevPage = response.prevPageToken;
            $("#prevPage").val(`${prevPage}`);
			addVideosToStore(decoratedResults);
            render();
            $("#nav").removeClass('hidden')
        });
	});
};

const handleNextSubmit = function() {
    $("#nextPage").on("click", function() {
        event.preventDefault();
        console.log("nextPage was clicked")
        const nextPage = $("#nextPage").val()
        searchTerm = store.searchTerm;
        fetchNextPage(searchTerm, nextPage, function(response) {
            const decoratedResults = decorateResponse(response);
            const nextPage = response.nextPageToken;
            $("#nextPage").val(`${nextPage}`);
            const prevPage = response.prevPageToken;
            $("#prevPage").val(`${prevPage}`);
			addVideosToStore(decoratedResults);
            render();
    })
    $('body,html').animate({
        scrollTop : 0
    }, 500);
})
}

const handlePrevSubmit = function() {
    $("#prevPage").on("click", function() {
        event.preventDefault();
        console.log("prevPage was clicked")
        const prevPage = $("#prevPage").val()
        searchTerm = store.searchTerm;
        fetchPrevPage(searchTerm, prevPage, function(response) {
            const decoratedResults = decorateResponse(response);
            const nextPage = response.nextPageToken;
            $("#nextPage").val(`${nextPage}`);
            const prevPage = response.prevPageToken;
            $("#prevPage").val(`${prevPage}`);
			addVideosToStore(decoratedResults);
            render();
    })
    $('body,html').animate({
        scrollTop : 0
    }, 500);
})
}
