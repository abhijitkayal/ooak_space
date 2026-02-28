// "use client";

// import { useSortable } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// export default function TaskCard({
//   item,
//   titleProp,
// }: {
//   item: any;
//   titleProp: any;
// }) {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id: item._id });

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   };

//   const title = titleProp ? item.values?.[titleProp._id] : "Untitled";

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
//       className="rounded-xl border bg-white shadow-sm p-3 cursor-grab active:cursor-grabbing"
//     >
//       <div className="text-sm font-semibold text-gray-900 line-clamp-2">
//         {title || "Untitled"}
//       </div>
//     </div>
//   );
// }

"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card, CardContent } from "@/components/ui/card";

export default function TaskCard({
  item,
  titleProp,
}: {
  item: any;
  titleProp: any;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const title = titleProp ? item.values?.[titleProp._id] : "Untitled";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab active:cursor-grabbing touch-manipulation"
    >
      <Card className="shadow-sm hover:shadow-md transition-shadow bg-gradient-to-r from-teal-500 to-rose-500 dark:bg-inherit">
        <CardContent className="p-2.5 sm:p-3">
          <div className="text-xs sm:text-sm font-semibold line-clamp-2">
            {title || "Untitled"}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
