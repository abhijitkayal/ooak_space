import TimelineView from "./TimelineView";
import TableView from "./view/TableView";
import TableView1 from './gallery/TableView';
import GalleryView from "./gallery/GalleryView";


export default function DatabaseViewRenderer({ db }: any) {
  if (db.viewType === "timeline") {
    return <TimelineView databaseId={db._id}/>
  }

  if (db.viewType === "board") {
    return <div className="p-6 border rounded-2xl">🧩 Board View (coming)</div>;
  }

  if (db.viewType === "gallery") {
    return  <GalleryView databaseId={db._id} />;
  }
  if(db.viewType === "table"){
    return <TableView databaseId={db._id} />
  }

  return <div className="p-6 border rounded-2xl">📊 Table View (coming)</div>;
}


