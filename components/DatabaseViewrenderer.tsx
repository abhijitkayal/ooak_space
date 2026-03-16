import TimelineView from "./TimelineView";
import TableView from "./view/TableView";
import GalleryView from "./gallery/GalleryView";
import BoardView from "./board/BoardView";
import TodoView from "./todo/TodoView";
import TextView from "./text/TextView";
import HeadingView from "./heading/HeadingView";
import NumberListView from "./numberlist/NumberListView";
import BulletedListView from "./bullete/BulletedView";
import { LinkProject } from "./link/LinkProject";
import PresentationView from "./presentation/PresentationView";
import VideoView from "./video/VideoView";
import WhiteboardView from "./whiteboard/WhiteboardView";
import SocialMediaView from "./socialmedia/SocialMediaView"; // ✅ new

function withDb(Component: any, databaseId: string) {
  return <Component databaseId={databaseId} />;
}

export default function DatabaseViewRenderer({
  db,
  isViewOnly = false,
}: {
  db: any;
  isViewOnly?: boolean;
}) {
  const id = db._id;

  if (db.viewType === "timeline")     return withDb(TimelineView, id);
  if (db.viewType === "board")        return withDb(BoardView, id);
  if (db.viewType === "gallery")      return withDb(GalleryView, id);
  if (db.viewType === "table")        return <TableView databaseId={id} isViewOnly={isViewOnly} />;
  if (db.viewType === "todo")         return withDb(TodoView, id);
  if (db.viewType === "text")         return withDb(TextView, id);
  if (db.viewType === "heading")      return withDb(HeadingView, id);
  if (db.viewType === "numberlist")   return withDb(NumberListView, id);
  if (db.viewType === "bullatedlist") return withDb(BulletedListView, id);
  if (db.viewType === "pagelink")     return <LinkProject taskId="task1" />;
  if (db.viewType === "presentation") return withDb(PresentationView, id);
  if (db.viewType === "video")        return withDb(VideoView, id);
  if (db.viewType === "whiteboard")   return withDb(WhiteboardView, id);
  if (db.viewType === "socialmedia")  return withDb(SocialMediaView, id); // ✅ new

  return <div className="p-6 border rounded-2xl">📊 View coming soon</div>;
}