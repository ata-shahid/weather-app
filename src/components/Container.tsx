import { cn } from "@/utils/cn";


export default function Container(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        "max-w-[900px] text-xs font-bold flex flex-wrap justify-around items-center gap-4 bg-white/20 rounded drop-shadow-lg py-4",
        props.className
      )}
    />
  );
}
