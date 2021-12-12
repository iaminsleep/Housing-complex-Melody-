$(document).ready(function () {
  let currentFloor = 2; //переменная, куда записывается текущий этаж
  let counterUp = $('.counter-up'); //кнопка увеличения этажа
  let counterDown = $('.counter-down'); //кнопка уменьшения этажа
  let floorPath = $(".home-image path"); //каждый отдельный этаж в SVG

  //функция при наведении мышью на этаж
  floorPath.on("click", function() {
    floorPath.removeClass('current-floor'); //удаляем предыдущий этаж
    currentFloor = $(this).attr('data-floor'); //получаем значения текущего этажа
    $('.counter').text(currentFloor); //записываем значение этажа в счётчик
    usCurrentFloor = currentFloor.toLocaleString('en-US', {minimumIntegerDigits: 2, useGroupping: false}) //форматируем этаж, чтобы было не 1, а 01
    $(`[data-floor = ${usCurrentFloor}]`).toggleClass('current-floor'); //подсвечиваем текущий этаж
  })

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
});