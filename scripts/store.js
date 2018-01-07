const store = (function(){
  const setVideos = function(videos) {
    this.videos = videos;
  };

  return {
    videos: [],
    setVideos: setVideos,
  };
}());
