import { cn } from "@/utils/cn";
import Image from "next/image";


    type props={};

export default function Weatherimage(props: React.HTMLProps<HTMLDivElement> & {icon: string}) {

    return (
        <div {...props} className={cn("relative h-20 w-20")}>

            <Image height={100} width={100} className="absolute h-full w-full"
             src={`https://openweathermap.org/img/wn/${props.icon}@2x.png`} alt="image"/>

        </div>
    );

}
