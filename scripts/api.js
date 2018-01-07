/* global API_KEY */

const api = (function(){
  /**
   * Asyncronously call Youtube API and invoke callback when response received, 
   * sending in a `videos` array of objects with following properties:
   * title (string), thumbnails (array), channelTitle (string), videoId (string)
   *  
   * @param {string}   searchTerm
   * @param {function} callback
   */
  const fetchVideos = function(searchTerm, callback) {
    const BASE_API = 'https://www.googleapis.com/youtube/v3/search';

    const query = {
      part: 'snippet',
      key: API_KEY,
      q: searchTerm
    };

    $.ajax({
      method: 'GET',
      url: BASE_API,
      data: query,
      success: response => {
      // from the large API response, we want to create a `videos` array of "decorated objects" 
      // - objects that only contain the information we want for our rendering function
        const videos = response.items.map(item => {
          const { title, thumbnails, channelTitle } = item.snippet;
          const { videoId } = item.id;
          return {
            title, thumbnails, channelTitle,
            videoUrl: videoId ? `https://youtube.com/watch?v=${videoId}` : null
          };
        });

        // send the `videos` array back into the callback function
        callback(videos);
      }
    });
  };

  return {
    fetchVideos,
  };
}());