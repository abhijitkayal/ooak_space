// import TimelineView from "./TimelineView";
// import TableView from "./view/TableView";
// import TableView1 from './gallery/TableView';
// import GalleryView from "./gallery/GalleryView";
// import BoardView from "./board/BoardView";


// export default function DatabaseViewRenderer({ db }: any) {
//   if (db.viewType === "timeline") {
//     return <TimelineView databaseId={db._id}/>
//   }

//   if (db.viewType === "board") {
//     return <BoardView databaseId={db._id} />;
//   }

//   if (db.viewType === "gallery") {
//     return  <GalleryView databaseId={db._id} />;
//   }
//   if(db.viewType === "table"){
//     return <TableView databaseId={db._id} />
//   }

//   return <div className="p-6 border rounded-2xl">📊 Table View (coming)</div>;
// }


import TimelineView from "./TimelineView";
import TableView from "./view/TableView";
import TableView1 from './gallery/TableView';
import GalleryView from "./gallery/GalleryView";
import BoardView from "./board/BoardView";
import TodoView from "./todo/TodoView";
import TextView from "./text/TextView";
import HeadingView from "./heading/HeadingView";
import NumberListView from "./numberlist/NumberListView";
import BulletedListView from "./bullete/BulletedView";
import ExcelTable from "./excel/ExcelTable";
import { LinkProject } from "./link/LinkProject";


export default function DatabaseViewRenderer({ db, isViewOnly = false }: { db: any; isViewOnly?: boolean }) {
  if (db.viewType === "timeline") {
    return <TimelineView databaseId={db._id}/>
  }

  if (db.viewType === "board") {
    return <BoardView databaseId={db._id} />;
  }

  if (db.viewType === "gallery") {
    return  <GalleryView databaseId={db._id} />;
  }
  if(db.viewType === "table"){
    return <TableView databaseId={db._id} isViewOnly={isViewOnly} />
    // return <ExcelTable/>
  }
  if(db.viewType === "todo"){
    return <TodoView databaseId={db._id} />;
  }
   if(db.viewType === "text"){
    return <TextView databaseId={db._id} />;
  }
   if(db.viewType === "heading"){
    return <HeadingView databaseId={db._id} />;
  }
   if(db.viewType === "numberlist"){
    return <NumberListView databaseId={db._id} />;
  }
  if(db.viewType === "bullatedlist"){
    return <BulletedListView databaseId={db._id} />;
  }
  if(db.viewType === "pagelink"){
    return <LinkProject taskId="task1" />
  }

  return <div className="p-6 border rounded-2xl">📊 Table View (coming)</div>;
}


