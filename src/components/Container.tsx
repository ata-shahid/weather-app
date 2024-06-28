import { cn } from "@/utils/cn";


export default function Container(props:React.HTMLProps<HTMLDivElement>) {
    return(
        <div {...props} className={cn("max-w-[800px] text-xs font-bold flex flex-wrap justify-around items-center gap-6 py-2 bg-gray-100", props.className)}/>
    );
}
