/// <reference path="jquery.d.ts" />
$(function () {
    var Carousel = (function () {
        function Carousel() {
            this.listItemNum = $('.frame__ListItem').length;
            this.activeNum = $('.is-active').index();
            this.frameListWidth = $('.frame__ListItem').width();
        }
        Carousel.prototype.hasNext = function () {
            if (this.activeNum + 1 != this.listItemNum) {
                return true;
            }
        };
        Carousel.prototype.hasPrev = function () {
            if (this.activeNum != 0) {
                return true;
            }
        };
        Carousel.prototype.PositionValue = function () {
            return parseInt($('.frame__list').css('left'));
        };
        Carousel.prototype.toAddActive = function (presentActiveNum) {
            $('.frame__ListItem').eq(presentActiveNum).addClass('is-active');
        };
        Carousel.prototype.toMoveActive = function () {
            $('.frame__ListItem').removeClass('is-active');
        };
        Carousel.prototype.toNext = function (positionValue) {
            $('.frame__list').animate({
                left: positionValue - this.frameListWidth
            }, function () {
                if (carousel.activeNum + 1 == carousel.listItemNum) {
                    $('.button--next').hide();
                }
                else if (carousel.activeNum == 1) {
                    $('.button--prev').show();
                }
            });
        };
        Carousel.prototype.toPrev = function (positionValue) {
            $('.frame__list').animate({
                left: positionValue + this.frameListWidth
            }, function () {
                if (carousel.activeNum == 0) {
                    $('.button--prev').hide();
                }
                else if (carousel.activeNum + 1 == carousel.listItemNum - 1) {
                    $('.button--next').show();
                }
            });
        };
        return Carousel;
    }());
    var carousel = new Carousel();
    $('#next').on('click', function () {
        if (carousel.hasNext()) {
            carousel.toMoveActive();
            ++carousel.activeNum;
            carousel.toAddActive(carousel.activeNum);
            carousel.toNext(carousel.PositionValue());
        }
    });
    $('#prev').on('click', function () {
        if (carousel.hasPrev()) {
            carousel.toMoveActive();
            --carousel.activeNum;
            carousel.toAddActive(carousel.activeNum);
            carousel.toPrev(carousel.PositionValue());
        }
    });
});
