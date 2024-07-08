import React from 'react';
import { MdOutlineVisibility, MdOutlineWindPower } from "react-icons/md";
import Widgetdata from "./Widgetdata";
import { WidgetIconsProps } from "@/types/types";
import { WiCloudyGusts, WiHumidity } from "react-icons/wi";
import { TbArrowBigDownLines } from "react-icons/tb";
import { FiSunrise, FiSunset } from "react-icons/fi";
import { GiHotSurface } from "react-icons/gi";


export default function Widgets(props: WidgetIconsProps) {
  const {
    visibility = "", humidity = "", windSpeed = "", airPressure = "", sunrise = "", sunset = "", windGust = "", seaLevel = "",
  } = props;

  return (
    <>
      <Widgetdata discritpion="Sunrise" icon={<FiSunrise />} value={sunrise} />
      <Widgetdata discritpion="Sunset" icon={<FiSunset />} value={sunset} />
      <Widgetdata
        discritpion="Air Pressure"
        icon={<TbArrowBigDownLines />}
        value={airPressure}
      />
      <Widgetdata
        discritpion="Pressure on Sea Level"
        icon={<GiHotSurface />}
        value={seaLevel}
      />
      <Widgetdata
        discritpion="Visibility"
        icon={<MdOutlineVisibility />}
        value={visibility}
      />
      <Widgetdata
        discritpion="Humidity"
        icon={<WiHumidity />}
        value={humidity}
      />
      <Widgetdata
        discritpion="Wind Speed"
        icon={<MdOutlineWindPower />}
        value={windSpeed}
      />

      <Widgetdata
        discritpion="Wind Gusts"
        icon={<WiCloudyGusts />}
        value={windGust}
      />
    </>
  );
}
