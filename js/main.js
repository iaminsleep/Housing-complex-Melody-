$(document).ready(function () {
  let currentFloor = 2; //переменная, куда записывается текущий этаж

  const counterUp = $('.counter-up'); //кнопка увеличения этажа
  const counterDown = $('.counter-down'); //кнопка уменьшения этажа
  const floorPath = $(".home-image path"); //каждый отдельный этаж в SVG

  const modal = $('.modal');
  const modalCloseButton = $('.close-button');
  const viewFlatsButton = $('.button-primary');

  let currentFlat = 1;
  const flatPath = $('.flats path');
  const flatName = $('.flat-link');

  //функция при наведении мышью на этаж
  floorPath.mouseover(function() {
    floorPath.removeClass('current-floor'); //удаляем предыдущий этаж
    currentFloor = $(this).attr('data-floor'); //получаем значения текущего этажа
    $('.counter').text(currentFloor); //записываем значение этажа в счётчик
    usCurrentFloor = currentFloor.toLocaleString('en-US', {minimumIntegerDigits: 2, useGroupping: false}) //форматируем этаж, чтобы было не 1, а 01
  });

  const changeFloor = ($actionUp, $floorLimit) => {
    if($actionUp === true) {
      if(currentFloor < $floorLimit) { //текущий этаж не должен быть выше заданного
        currentFloor++;
      }
    }
    else {
      if(currentFloor > $floorLimit) { //текущий этаж не должен быть ниже заданного
        currentFloor--;
      }
    }
    usCurrentFloor = currentFloor.toLocaleString('en-US', {minimumIntegerDigits: 2, useGroupping: false})
    $('.counter').text(usCurrentFloor);
    floorPath.removeClass('current-floor');
    $(`[data-floor = ${usCurrentFloor}]`).toggleClass('current-floor');
  }

  counterUp.click(function() {
    changeFloor(true, 18);
  })
  counterDown.click(function() {
    changeFloor(false, 2)
  });

  //открытие и закрытия модального окна при нажатии на этаж и крестик соответственно
  const toggleModal = function() {
    modal.toggleClass('open');
  }
  viewFlatsButton.click(toggleModal);
  floorPath.on("click", toggleModal);
  modalCloseButton.click(toggleModal);

  //функция при наведении мышью на этаж
  flatPath.mouseover(function() {
    currentFlat = $(this).attr('data-flat'); //получаем значения текущего этажа
    $(`[data-flat-name = ${currentFlat}]`).toggleClass('current-flat');
  })
  flatPath.mouseout(function() {
    $(`[data-flat-name = ${currentFlat}]`).removeClass('current-flat');
  })
  flatName.mouseover(function(){
    currentFlat = $(this).attr('data-flat-name'); //получаем значения текущего этажа
    $(`[data-flat = ${currentFlat}]`).toggleClass('hovered');
  })
  flatName.mouseout(function() {
    $(`[data-flat = ${currentFlat}]`).removeClass('hovered');
  })
});
