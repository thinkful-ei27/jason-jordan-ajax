// TASK: Add the Youtube Search API Base URL here: 
// Documentation is here: https://developers.google.com/youtube/v3/docs/search/list#usage
const BASE_URL = "https://www.googleapis.com/youtube/v3/search";
const API_KEY = "AIzaSyAuD_JlyrZ6quDVxvm0m0bsYAv7Jbmf2Tw";
/**
 * @function fetchVideos
 * Async function, responsible for calling the Youtube API with jQuery, constructing
 * the correct query object, and passing along the callback into the AJAX call.
 * @param {string}   searchTerm
 * @param {function} callback
 */
// TASK:
// 1. Use `searchTerm` to construct the right query object based on the Youtube API docs
//    - Refer to curriculum assignment for help with the required parameters
// 2. Make a getJSON call using the query object and sending the provided callback in 
//    as the last argument
//
// TEST IT! Execute this function and console log the results inside the callback.
const fetchVideos = function(searchTerm, callback) {
	console.log("fetchVideos ran");
	const query = {
		"maxResults": "5",
		"part": "snippet",
		"q": `${searchTerm}`, 
		"type":"",
		"key":`${API_KEY}`
	};
	$.getJSON(BASE_URL, query, callback);
};

/**
 * @function decorateResponse
 * Uses Youtube API response to create an array of "decorated" video objects as 
 * defined at the top of the file.
 * @param   {object} response - should match Youtube API response shape
 * @returns {array}
 */
// TASK:
// 1. Map through the response object's `items` array
// 2. Return an array of objects, where each object contains the keys `id`, `title`, 
//    `thumbnail` which each hold the appropriate values from the API item object. You 
//    WILL have to dig into several nested properties!
//
// TEST IT! Grab an example API response and send it into the function - make sure
// you get back the object you want.

const decorateResponse = function(response) {
	console.log("decorateResponse ran");
	return response.items.map((item) => {
		return {
			id: item.id.videoId,
			thumbnail: item.snippet.thumbnails.default.url,
			name: item.snippet.title
		};
	});
};

