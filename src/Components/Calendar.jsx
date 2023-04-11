import { Calendar, LocaleConfig } from "react-native-calendars";
import React, { useState } from "react";
import Icon from 'react-native-vector-icons/Feather'

LocaleConfig.locales.fr = {
  monthNames: [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ],
  monthNamesShort: [
    "Jan.",
    "Fev.",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul.",
    "Ago",
    "Set.",
    "Out.",
    "Nov.",
    "Dez.",
  ],
  dayNames: [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."],
};

LocaleConfig.defaultLocale = "fr";

export default (props) => {
  const [selected, setSelected] = useState("");

  return (
    <Calendar
      theme={{
        backgroundColor: "#ffffff",
        calendarBackground: "#ffffff",
        textSectionTitleColor: "#b6c1cd",
        selectedDayBackgroundColor: "#4f46e5",
        selectedDayTextColor: "#ffffff",
        todayTextColor: "#4338ca",
        dayTextColor: "#111",
        textDisabledColor: "#a3a3a3",
        dotColor: "#4338ca",
        selectedDotColor: "#ffffff",
        arrowColor: "#4338ca",
        disabledArrowColor: "#d9e1e8",
        monthTextColor: "#000",
        indicatorColor: "#4f46e5",
      }}
      style={{
        borderWidth: 1.5,
        borderColor: "#ccc",
        borderRadius: 5,
      }}
      onDayPress={(day) => {
        setSelected(day.dateString);
      }}
      renderArrow={direction => direction === "right" ? <Icon name="chevron-right" size={15}/> : <Icon name="chevron-left" size={15}/>}
      hideExtraDays={true}
      markingType={"custom"}
      markedDates={{
        [selected]: {
          customStyles: {
            container: {
              borderRadius: 5,
            },
          },
          selected: true,
          disableTouchEvent: true,
          selectedDotColor: "orange",
        },
      }}
    />
  );
};
