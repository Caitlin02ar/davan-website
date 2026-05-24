"use client";

interface TagProps {
  text: string;
}

export default function Tag({ text }: TagProps) {
  return (
    <div className="flex w-fit items-center rounded-full outline outline-1 outline-primary md:px-16 px-10 py-1 text-sm font-light font-body">
      {text}
    </div>
  );
}