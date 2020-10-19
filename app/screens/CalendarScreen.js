import React, { useState } from "react";
import { Text, View, Button, FlatList, StyleSheet } from "react-native";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

import Colors from "../constants/colors";

import {LocaleConfig} from 'react-native-calendars';
import MoodColors from "../constants/moodColors";
import MoodNames from "../constants/moodNames";
import generateDates from "../utils/generateDates";

LocaleConfig.locales['pl'] = {
  monthNames: ['Styczeń','Luty','Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień'],
  monthNamesShort: ['Sty.','Luty','Mar.','Kw.','Maj','Cze.','Lip.','Sier.','Wrz.','Paź.','Lis.','Gr.'],
  dayNames: ['Niedziela','Poniedziałek','Wtorek','Środa','Czwartek','Piątek','Sobota'],
  dayNamesShort: ['Nd.','Pn.','Wt.','Śr.','Czw.','Pt.','Sb.'],
  today: 'Dzisiaj\'Dziś' //???
};
LocaleConfig.defaultLocale = 'pl';


// Do tej zmiennej powinny zostać pobrane Dane z Pliku (dane o zaznaczonych Dniach)
var daty = {}


function CalendarScreen(props) {

    const [myMarkedDates, setMarkedDates] = useState();
    var baza = generateDates();

    function MarkDay(day)
    {
        // var key = day.dateString;
        // var dayTimestamp = day.timestamp;

        for(var timestamp in baza)
        {
            var nowaData = { };
            var key = ConvertTimestampToKey(parseInt(timestamp));
            //console.log(key);

            var mood = baza[timestamp]["mood"];
            var color = MoodColors[mood];


            // if key exists = nie zamieniaj tej rzeczy, tylko dopisz
            nowaData[key] = {selected: true, marked: true, selectedColor: color, timestamp: timestamp};
            
            daty = {...daty, ...nowaData};
        }

        setMarkedDates(daty);
    }

    return (
        <View>
            <CalendarList
                // renderDay={(day, item) => {return (<View />);}}
                onDayPress={(day) => {MarkDay(day)}}
                onDayLongPress={(day) => {console.log('selected day', day)}}
                firstDay={1}
                horizontal={true}
                pagingEnabled={true}
                pastScrollRange={10}
                futureScrollRange={10}
                markedDates={myMarkedDates}
            />
        </View>
      );
}

function ConvertTimestampToKey(timestamp)
{
    var date = new Date(timestamp);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    
    if (day < 10) {day = "0" + String(day)};
    if (month < 10) {month = "0" + String(month)};

    var key = year + "-" + month + "-" + day;
    return key;
}

const styles = StyleSheet.create({

});

export default CalendarScreen;
