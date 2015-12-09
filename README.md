Swapping Playlist
=======================
2015-12-09


Plugin for videojs which provides playlist with no latency in between videos.

It depends from [jquery](https://jquery.com/).



What's the goal
--------------------

The goal is to play a list of videos with no latency between them.



How does this work?
----------------------

We have two video containers, container A and container B.
Only one of them is displayed on the screen, while the other is hidden in the background.

While a video is playing on container A, the next video is pre loading in container B, and vice versa.


Notes
---------

As for now, self hosted videos are supported, but I have'nt found a way to make it work with youtube.com hosted videos.
Maybe someday...



Example
-----------

The example below shows the basic setup.
The setup is quite involved. Assuming you're using the default settings, you have to:

- create two video tags 
- the second video tag has the class shadowed
- create the playlist with self hosted mp4 (or other format that videojs supports).




```html
<!DOCTYPE html>
<html>
<head>

    <title>Html page</title>

    <meta charset="utf-8"/>
    <link href="http://vjs.zencdn.net/5.3.0/video-js.css" rel="stylesheet">


    <!-- ad markers plugin, depends from jquery -->
    <script src="http://code.jquery.com/jquery-2.0.3.min.js"></script>


    <script src="http://vjs.zencdn.net/5.3.0/video.js"></script>

    <!-- If you'd like to support IE8 -->
    <script src="http://vjs.zencdn.net/ie8/1.1.0/videojs-ie8.min.js"></script>
    <script src="/js/vjs-5.3.0/plugins/swappingPlaylist/swapping-playlist.js"></script>

    <style>
        .shadowed {
            display: none;
        }
    </style>


</head>

<body>



<!-- This is the main video -->
<video id="vjs-swapper-a" class="video-js" controls preload="auto" width="640" height="264"
       poster="https://s-media-cache-ak0.pinimg.com/736x/81/23/e1/8123e1e5525c730644f85df3bb85b9ae.jpg"
    >
    <source src="/mp4/1sec_video.mp4" type='video/mp4'>
    <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
</video>


<!-- This is the ads video container -->
<video id="vjs-swapper-b" class="video-js shadowed" controls preload="auto" width="640" height="264"
       poster="https://s-media-cache-ak0.pinimg.com/736x/81/23/e1/8123e1e5525c730644f85df3bb85b9ae.jpg"
    >
    <source src="/mp4/1sec_video.mp4" type="video/mp4">
    <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
</video>


<div id="video-container"></div>
<button id="next">Add two videos dynamically to the playlist</button>

<script>


    (function ($) {
        $(document).ready(function () {


            var playList = [
                '/mp4/matrix.mp4',
                '/mp4/beer.mp4'
            ];

            var video = videojs('vjs-swapper-a');
            video.swappingPlaylist({
                playList: playList
            });


            $("#next").on('click', function () {
                video.swapper.add([
                    '/mp4/back-future.mp4',
                    '/mp4/titanic.mp4'
                ]);
                return false;
            })


        });
    })(jQuery);
</script>


</body>
</html>
```

 
 
Note: in the above example I use a default video (1sec_video.mp4) for both video containers. 
This is to avoid initialization errors.
 
 



History Log
------------------
    
    
- 1.0.0 -- 2015-12-09

    - initial commit
