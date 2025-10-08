### YouTube API Experiments

API of https://youtu.be/m3dZl3yfGpc with syntax:

`![thumbnail|api=Thumb](https://youtu.be/oXyek2Q40AI)`

![thumbnail|api=Thumb](https://youtu.be/oXyek2Q40AI)


```javascript/playable/autoplay
function qsToJson(qs) {
  let res = {};
  const pars = qs.split('&');
  for (let i in pars) {
    const kv = pars[i].split('=');
    const k = kv[0];
    const v = kv[1];
    res[k] = decodeURIComponent(v);
  }
  return res;
}

this.dependOn = ['Thumb'];
this.depend = function() {
	var player = env.Thumb;

	// console.log('player', player);
	var videoData = player.getVideoData();
	console.log('videoData', videoData);

	var id = videoData.video_id;
	url = `https://cors-anywhere.herokuapp.com/https://www.youtube.com/get_video_info?video_id=${id}`;

	// console.log(url);
	smartdown.importTextUrl(url,
		function(body) {
			var json = qsToJson(body);
			var playerResponse = JSON.parse(json.player_response);
			var captionTracks = playerResponse.captions.playerCaptionsTracklistRenderer.captionTracks;

			// fmt=vtt
			// fmt=srv1 (default?)
			// fmt=srv3
			// fmt=ttml

/*
https://developers.google.com/youtube/v3/docs/captions/download
sbv – SubViewer subtitle
scc – Scenarist Closed Caption format
srt – SubRip subtitle
ttml – Timed Text Markup Language caption
vtt – Web Video Text Tracks caption
*/

			var firstCaption = '';
			if (captionTracks && captionTracks.length > 0) {
				firstCaption = captionTracks[0].baseUrl;
			}

			smartdown.setVariables([
				{lhs: 'VideoInfo', rhs: json},
				{lhs: 'PlayerResponse', rhs: playerResponse},
				{lhs: 'FirstCaption', rhs: firstCaption},
			]);
		},
		function (err) {

		});
};
```


[Transcription](:!FirstCaption|url)

[VideoInfo](:!VideoInfo|json)

[PlayerResponse](:!PlayerResponse|json)

---

[Back to Home](:@Home)
