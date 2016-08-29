/// <reference path="jquery.d.ts" />
interface ICarousel {
    activeNum:number;
    frameListWidth:number;
    hasNext():boolean;
    hasPrev():boolean;
    listItemNum:number;
    PositionValue()
    toAddActive(presentActiveNum:number):void;
    toMoveActive():void;
    toNext(positionValue:number):void;
    toPrev(positionValue:number):void;
}
$(function () {
    class Carousel implements ICarousel {
        activeNum:number;
        listItemNum:number;
        frameListWidth:number;

        constructor() {
            this.listItemNum = $('.frame__ListItem').length;
            this.activeNum = $('.is-active').index();
            this.frameListWidth = $('.frame__ListItem').width();
        }

        hasNext() {
            if (this.activeNum + 1 != this.listItemNum) {
                return true;
            }
        }

        hasPrev() {
            if (this.activeNum != 0) {
                return true;
            }
        }

        PositionValue() {
            return parseInt($('.frame__list').css('left'));
        }

        toAddActive(presentActiveNum:number) {
            $('.frame__ListItem').eq(presentActiveNum).addClass('is-active');
        }

        toMoveActive() {
            $('.frame__ListItem').removeClass('is-active');
        }

        toNext(positionValue:number) {
            $('.frame__list').animate({
                left: positionValue - this.frameListWidth
            }, function () {
                if (carousel.activeNum + 1 == carousel.listItemNum) {
                    $('.button--next').hide();
                } else if (carousel.activeNum == 1) {
                    $('.button--prev').show();
                }
            });
        }

        toPrev(positionValue:number) {
            $('.frame__list').animate({
                left: positionValue + this.frameListWidth
            }, function () {
                if (carousel.activeNum == 0) {
                    $('.button--prev').hide();
                } else if (carousel.activeNum + 1 == carousel.listItemNum - 1) {
                    $('.button--next').show();
                }
            });
        }
    }
    var carousel = new Carousel();
    $('#next').on('click', function () {
        if (carousel.hasNext()) {
            carousel.toMoveActive();
            ++carousel.activeNum
            carousel.toAddActive(carousel.activeNum);
            carousel.toNext(carousel.PositionValue());
        }
    });
    $('#prev').on('click', function () {
        if (carousel.hasPrev()) {
            carousel.toMoveActive();
            --carousel.activeNum
            carousel.toAddActive(carousel.activeNum);
            carousel.toPrev(carousel.PositionValue());
        }
    });
});