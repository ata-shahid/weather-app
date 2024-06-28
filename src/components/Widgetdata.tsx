import { WidgetProps } from "@/types/types";


export default function Widgetdata(props: WidgetProps) {
  return (
    <div className="flex flex-col justify-between items-center text-sm font-semibold text-black bg-gray-50 border min-w-[175px] min-h-[100px] rounded-md shadow-sm">
      <p className="whitespace-nowrap mt-4">{props.discritpion}</p>
      <div className="text-4xl">{props.icon}</div>
      <p className="mb-4">{props.value}</p>
    </div>
  );
}
