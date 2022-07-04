$( document ).ready(function() {
    $("#btn").click(
		function(){
			sendAjaxForm('result_form', 'formID', '../backend/form.php');
			return false; 
		}
	);
});
 
function sendAjaxForm(result_form, formID, url) {
    $.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+formID).serialize(),  // Сеарилизуем объект  - преобразование в объектный вид
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);
            console.log(result);
            if(result.code != 'error'){
                $('#result_form').html('Все класс!');
                $("#"+formID).trigger('reset');
            }else{
                console.log(result);
                $('#result_form').html('Ошибка. Данные не отправлены.');
            }
        	
    	},
    	error: function(response) { // Данные не отправлены
            $('#result_form').html('Ошибка. Данные не отправлены.');
    	}
 	});
}

function priceCard(price, countTxt){
    let card = 
    `<div>
    <p class="rub">`+ price+` руб
    <p class = "txt">`+countTxt+`</p>
    </div>`
    return card;
}

function getInfo(){
    $.ajax({
        url:     "../backend/getInfo.php", //url страницы
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);
            console.log(result);
            if(result.code != 'error'){
                for(i=0; i<result.info.length; i++){
                    row = result.info[i];
                    if(!isNaN(parseInt(row[0]))){
                        row[0] += ' занятий в месяц';
                    }
                    card = priceCard(row[1], row[0]);
                    $('.price2').append(card);
                }
            }else{
                console.log(result);
            }
        	
    	},
    	error: function(response) { // Данные не отправлены
            console.log(result);
    	}
 	});
}

function personalCard(fio, vacancy){
    let card = 
    `<div>
        <p class="name">` + fio+ `</p>
        <p class = "vacancy">` + vacancy +`</p>
    </div>`
    return card;
}

function getPersonalInfo(){
    $.ajax({
        url:     "../backend/getPersonalInfo.php", 
        type:     "POST", 
        dataType: "html", 
        
        success: function(response) {
        	result = $.parseJSON(response);
            console.log(result);
            if(result.code != 'error'){
                for(i=0; i<result.info.length; i++){
                    row = result.info[i];
                    card = personalCard(row[0], row[1]);
                    $('.first').append(card);
                }
            }else{
                console.log(result);
            }
    	},
    	error: function(response) {
            console.log(result);
    	}
 	});
}

function scheduleCard(array){
    day = '';
    switch(parseInt(array[0][3])){
        case 1: day = 'Понедельник'; break;
        case 2: day = 'Вторник'; break;
        case 3: day = 'Среда'; break;
        case 4: day = 'Четверг'; break;
        case 5: day = 'Пятница'; break;
        case 6: day = 'Суббота'; break;
    }
    console.log(array[0][3]);
    let card = 
    `<div class="card">
    <div class="day">
        <span>`+day+`</span>
    </div>`+getArrTeamsInSchedule(array)+`
</div>`
    return card;
}

function teamCardInSchedule(nameTeam, time){
    let card = 
    `<div class="team">
        <span>`+nameTeam+`</span>
        <div>
            <span>`+time+`</span>
        </div>
    </div>`
    return card;
}

function getArrTeamsInSchedule(array){
    let result = '';
    array.forEach(row => {
        result+= teamCardInSchedule(row[5], row[2]);
    });
    return result;
}

function getSchedule(){
    $.ajax({
        url:     "../backend/getSchedule.php", //url страницы
        type:     "POST", //метод отправки
        dataType: "html", //формат данных
        
        success: function(response) { //Данные отправлены успешно
        	result = $.parseJSON(response);
            console.log(result);
            if(result.code != 'error'){
                flag = 0;
                array = 0;
                resultArr = [];

                for(i=0; i<result.info.length; i++){
                    row = result.info[i];
                    if(row[3] == flag){
                        array.push(row);
                    }else{
                        if(array !=0){
                            resultArr.push(array);
                        }
                        array = [row];
                        flag = row[3];
                    }
                }
                if(array !=0){
                    resultArr.push(array);
                }
                console.log(resultArr);
                for(i=0;i<resultArr.length;i++){
                    card = scheduleCard(resultArr[i]);
                    $('.lol').append(card);
                }
            }else{
                console.log(result);
            }
    	},
    	error: function(response) { // Данные не отправлены
            console.log(result);
    	}
 	});
}