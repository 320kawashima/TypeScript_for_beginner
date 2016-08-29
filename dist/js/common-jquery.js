$(function () {
	var activeNum = $('.is-active').index(),
		frameListWidth = $('.frame__ListItem').width(),
		listItemNum = $('.frame__ListItem').length,
		positionValue = 0;

	function PositionValue() {
		positionValue = parseInt($('.frame__list').css('left'));
	};
	function hasNext() {
		if (activeNum + 1 != listItemNum) {
			return true;
		}
	};
	function hasPrev() {
		if (activeNum != 0) {
			return true;
		}
	};
	function toMoveActive() {
		$('.frame__ListItem').removeClass('is-active');
	};
	function toAddActive() {
		$('.frame__ListItem').eq(activeNum).addClass('is-active');
	};
	$('#next').on('click', function () {
		if (hasNext()) {
			PositionValue();
			toMoveActive();
			++activeNum;
			$('.frame__list').animate({
				left: positionValue - frameListWidth
			}, function () {
				if (activeNum + 1 == listItemNum) {
					$('.button--next').hide();
				} else if (activeNum == 1) {
					$('.button--prev').show();
				}
			});
			toAddActive()
		}
	});
	$('#prev').on('click', function () {
		if (hasPrev()) {
			PositionValue();
			toMoveActive();
			--activeNum;
			$('.frame__list').animate({
				left: positionValue + frameListWidth
			}, function () {
				if (activeNum == 0) {
					$('.button--prev').hide();
				} else if (activeNum + 1 == listItemNum - 1) {
					$('.button--next').show();
				}
			});
			toAddActive()
		}
	});
});