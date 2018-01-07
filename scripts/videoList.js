/* global store, api */

const videoList = (function(){
  /**
   * Takes in decorated video object and returns HTML snippet
   * @param   {Object} video - should contain title, thumbnails, channelTitle, videoUrl properties 
   * @returns {String}       - HTML ready for DOM 
   */
  const generateListItem = function(video) {
    const { title, thumbnails, channelTitle, videoUrl } = video;
    return `
      <a target="_blank" class="list-item" href="${videoUrl || '#'}">
        <li>
          <div class="col col-left">
            <img src="${thumbnails.medium.url}" />
          </div>
          <div class="col col-right">
            <div class="video-content">
              <p class="heading">${title}</p>
              <p class="author">by ${channelTitle}</p>
            </div>
          </div>
        </li>
      </a>
      `;
  };

  const handleFormSubmit = function() {
    $('form').submit(e => {
      e.preventDefault();
      const searchInput = $('#search-term');
      const searchTerm = searchInput.val();
      api.fetchVideos(searchTerm, videos => {
        searchInput.val('');
        store.setVideos(videos);
        render();
      });
    });
  };

  const bindEventListeners = function() {
    handleFormSubmit();
  };

  const render = function() {
    const elements = store.videos.map(video => generateListItem(video));
    $('.results').html(elements);
  };

  return {
    bindEventListeners,
    render,
  };
    
}());