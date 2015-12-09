'use strict';
(function ($, videojs, undefined) {
    //default setting
    var defaultSetting = {
        playList: [],
        /**
         * How many seconds to wait before loading the next video
         * in the other video container.
         */
        maxDelay: 15,
        containerAId: 'vjs-swapper-a',
        containerBId: 'vjs-swapper-b',
        hideContainer: function (jHidingContainer, jShowingContainer) {
            jShowingContainer.removeClass('shadowed');
            jHidingContainer.addClass('shadowed');
        }
    };


    function getSrcFromElement(element) {
        /**
         * Maybe element will be an array in the future...
         */
        return element;
    }


    function registerSwapperPlugin(options) {
        /**
         * register the swapper plugin (dependent on jquery)
         */
        var setting = $.extend(true, {}, defaultSetting, options);
        var containerA = videojs(setting.containerAId);
        var jContainerA = $('#' + setting.containerAId);
        var containerB = videojs(setting.containerBId);
        var jContainerB = $('#' + setting.containerBId);
        var playList = [];
        var playListHasEnded = true;

        


        function getTimeout(containerX) {
            var duration = containerX.duration();
            var timeout = setting.maxDelay;
            if (timeout > duration) {
                timeout = 1; // assuming a video is always more than 1 sec
            }
            return timeout;
        }

        function prepareAIfAny() {
            var next = getNextElement();
            if (false !== next) {
                if (null === containerA) {
                    containerA = videojs(setting.containerAId);
                }
                var src = getSrcFromElement(next);
                containerA.src(src);
                containerA.load();
            }
            else {
                playListHasEnded = true;
            }
        }


        function prepareBIfAny() {
            var next = getNextElement();
            if (false !== next) {
                if (null === containerB) {
                    containerB = videojs(setting.containerBId);
                }
                var src = getSrcFromElement(next);
                containerB.src(src);
                containerB.load();
            }
            else {
                playListHasEnded = true;
            }
        }


        function addElementsToPlaylist(elements) {
            for (var i in elements) {
                playList.push(elements[i]);
                playListHasEnded = false;
            }
        }

        function getNextElement() {
            if (playList.length > 0) {
                return playList.shift();
            }
            return false;
        }


        function init() {

            // initial add
            addElementsToPlaylist(setting.playList);
            containerA.on("play", function () {
                var timeout = getTimeout(containerA);
                setTimeout(function () {
                    prepareBIfAny();
                }, timeout);
            });
            containerA.on("ended", function () {
                if (false === playListHasEnded) {
                    setting.hideContainer(jContainerA, jContainerB);
                    containerB.play();
                }
            });

            containerB.on('play', function () {
                var timeout = getTimeout(containerB);
                setTimeout(function () {
                    prepareAIfAny();
                }, timeout);
            });
            containerB.on("ended", function () {
                if (false === playListHasEnded) {
                    setting.hideContainer(jContainerB, jContainerA);
                    containerA.play();
                }
            });


            var el = getNextElement();
            if (false !== el) {
                var src = getSrcFromElement(el);
                containerA.src(src);
                containerA.load();
                containerA.play();
            }
        }

        init();


        // exposed plugin API
        containerA.swapper = {
            add: function (elements) {
                addElementsToPlaylist(elements);
            }
        };
    }

    videojs.plugin('swappingPlaylist', registerSwapperPlugin);

})(jQuery, window.videojs);
