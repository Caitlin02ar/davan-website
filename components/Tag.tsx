"use client";

interface TagProps {
  text: string;
}

export default function Tag({ text }: TagProps) {
  return (
    <div className="flex w-fit items-center rounded-full outline outline-1 outline-primary px-16 py-1 text-sm font-normal font-body">
      {text}
    </div>
  );
}